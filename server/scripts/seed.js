/**
 * Copies the content that used to be hardcoded in the frontend into Firestore.
 *
 *   npm run seed            populate only the collections that are still empty
 *   npm run seed -- --force wipe those collections first, then repopulate
 *
 * Safe to run on a fresh project. Without --force it will not touch a
 * collection that already has documents, so it cannot clobber edits you made
 * through the admin panel.
 */
import { assertEnv } from '../src/config/env.js';

assertEnv();

const { db, FieldValue } = await import('../src/config/firebase.js');
const content = await import('./data/initialContent.js');

const force = process.argv.includes('--force');

const stamp = () => ({
  createdAt: FieldValue.serverTimestamp(),
  updatedAt: FieldValue.serverTimestamp(),
});

async function clearCollection(name) {
  const snapshot = await db.collection(name).get();
  if (snapshot.empty) return 0;

  const batch = db.batch();
  snapshot.docs.forEach((doc) => batch.delete(doc.ref));
  await batch.commit();
  return snapshot.size;
}

/**
 * Seeds one collection. Documents carrying an explicit `id` use it as the
 * document key so competition slugs stay readable and stable.
 */
async function seedCollection(name, items) {
  const existing = await db.collection(name).limit(1).get();

  if (!existing.empty && !force) {
    console.log(`  ${name.padEnd(14)} skipped (already has documents; use --force to replace)`);
    return;
  }

  if (force) {
    const removed = await clearCollection(name);
    if (removed > 0) console.log(`  ${name.padEnd(14)} cleared ${removed} existing document(s)`);
  }

  const batch = db.batch();

  items.forEach((item, index) => {
    const { id, ...fields } = item;
    const ref = id ? db.collection(name).doc(id) : db.collection(name).doc();
    batch.set(ref, { ...fields, order: fields.order ?? index, ...stamp() });
  });

  await batch.commit();
  console.log(`  ${name.padEnd(14)} wrote ${items.length} document(s)`);
}

async function seedAbout() {
  const ref = db.collection('site').doc('about');
  const existing = await ref.get();

  if (existing.exists && !force) {
    console.log('  about          skipped (already exists; use --force to replace)');
    return;
  }

  await ref.set({ ...content.about, ...stamp() });
  console.log('  about          written');
}

console.log(`\nSeeding Firestore${force ? ' (force mode — existing content will be replaced)' : ''}:\n`);

try {
  await seedCollection('projects', content.projects);
  await seedCollection('skills', content.skills);
  await seedCollection('timeline', content.timeline);
  await seedCollection('competitions', content.competitions);
  await seedAbout();

  console.log('\nDone. Start the API with `npm run dev`.\n');
  process.exit(0);
} catch (error) {
  console.error('\nSeeding failed:', error.message);
  console.error(error);
  process.exit(1);
}
