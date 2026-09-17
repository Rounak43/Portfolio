import { messagesRepo } from '../services/repositories.js';
import { db, FieldValue } from '../config/firebase.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { serialize } from '../services/firestore.service.js';

/**
 * Public endpoint. Always answers 201 — even for a honeypot hit — so a bot
 * cannot tell which submissions were discarded.
 */
export const createMessage = asyncHandler(async (req, res) => {
  const { name, email, message, website } = req.body;

  if (website) {
    return res.status(201).json({ success: true, data: { received: true } });
  }

  await db.collection('messages').add({
    name,
    email,
    message,
    read: false,
    // Useful for spotting abuse; never shown in the public UI.
    ip: req.ip,
    userAgent: req.get('user-agent') || '',
    createdAt: FieldValue.serverTimestamp(),
  });

  res.status(201).json({ success: true, data: { received: true } });
});

/** Admin inbox, newest first. */
export const listMessages = asyncHandler(async (_req, res) => {
  const snapshot = await db
    .collection('messages')
    .orderBy('createdAt', 'desc')
    .limit(200)
    .get();

  const items = snapshot.docs.map(serialize);
  const unread = items.filter((item) => !item.read).length;

  res.json({ success: true, count: items.length, unread, data: items });
});

export const updateMessage = asyncHandler(async (req, res) => {
  const item = await messagesRepo.update(req.params.id, { read: req.body.read });
  res.json({ success: true, data: item });
});

export const deleteMessage = asyncHandler(async (req, res) => {
  await messagesRepo.remove(req.params.id);
  res.json({ success: true, data: { id: req.params.id } });
});
