import { db, FieldValue } from '../config/firebase.js';
import { ApiError } from '../utils/ApiError.js';

/** Turn Firestore Timestamps into ISO strings so JSON responses stay portable. */
const serialize = (doc) => {
  const data = doc.data() || {};

  for (const [key, value] of Object.entries(data)) {
    if (value && typeof value.toDate === 'function') {
      data[key] = value.toDate().toISOString();
    }
  }

  return { id: doc.id, ...data };
};

/**
 * A thin CRUD wrapper around one Firestore collection. Every content type in
 * this API is an ordered list of documents, so they all share this shape
 * rather than each controller re-implementing the same five calls.
 */
export function createRepository(collectionName, { label = collectionName } = {}) {
  const collection = () => db.collection(collectionName);

  return {
    /** Documents sorted by their `order` field, ascending. */
    async list() {
      const snapshot = await collection().orderBy('order', 'asc').get();
      return snapshot.docs.map(serialize);
    },

    async get(id) {
      const doc = await collection().doc(id).get();
      if (!doc.exists) throw ApiError.notFound(`${label} "${id}" does not exist.`);
      return serialize(doc);
    },

    /**
     * Creates a document. When `id` is given it is used as the document key
     * (so competitions keep readable slugs like `odoo-hackathon-2026`);
     * otherwise Firestore generates one.
     */
    async create(data, id = null) {
      const ref = id ? collection().doc(id) : collection().doc();

      if (id) {
        const existing = await ref.get();
        if (existing.exists) throw ApiError.conflict(`${label} "${id}" already exists.`);
      }

      // New items go to the end of the list unless the caller placed them.
      const order = data.order ?? (await this.nextOrder());

      await ref.set({
        ...data,
        order,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });

      return this.get(ref.id);
    },

    async update(id, data) {
      const ref = collection().doc(id);
      const existing = await ref.get();
      if (!existing.exists) throw ApiError.notFound(`${label} "${id}" does not exist.`);

      await ref.update({ ...data, updatedAt: FieldValue.serverTimestamp() });
      return this.get(id);
    },

    async remove(id) {
      const ref = collection().doc(id);
      const existing = await ref.get();
      if (!existing.exists) throw ApiError.notFound(`${label} "${id}" does not exist.`);

      await ref.delete();
      return { id };
    },

    /**
     * Rewrites the `order` field across many documents in one atomic batch,
     * so a drag-to-reorder in the admin UI cannot leave the list half-sorted.
     */
    async reorder(orderedIds) {
      const batch = db.batch();

      orderedIds.forEach((id, index) => {
        batch.update(collection().doc(id), {
          order: index,
          updatedAt: FieldValue.serverTimestamp(),
        });
      });

      await batch.commit();
      return this.list();
    },

    /** One past the current highest `order`, or 0 for an empty collection. */
    async nextOrder() {
      const snapshot = await collection().orderBy('order', 'desc').limit(1).get();
      if (snapshot.empty) return 0;
      return (snapshot.docs[0].data().order ?? 0) + 1;
    },
  };
}

/**
 * For content that is a single document rather than a list — the About
 * section is one record, not a collection of them.
 */
export function createSingletonRepository(collectionName, docId, fallback = {}) {
  const ref = () => db.collection(collectionName).doc(docId);

  return {
    async get() {
      const doc = await ref().get();
      if (!doc.exists) return { id: docId, ...fallback };
      return serialize(doc);
    },

    async set(data) {
      await ref().set({ ...data, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
      return this.get();
    },
  };
}

export { serialize };
