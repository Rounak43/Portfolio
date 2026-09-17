import { aboutRepo } from '../services/repositories.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getAbout = asyncHandler(async (_req, res) => {
  const about = await aboutRepo.get();
  res.json({ success: true, data: about });
});

export const updateAbout = asyncHandler(async (req, res) => {
  const about = await aboutRepo.set(req.body);
  res.json({ success: true, data: about });
});
