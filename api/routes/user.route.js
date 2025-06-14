// routes/user.route.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import User from '../models/user.model.js';
import { verifyToken } from '../utils/verifyToken.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Configure Multer
const storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Avatar upload route
router.post('/upload-avatar', upload.single('avatar'), (req, res) => {
  const imageUrl = `/uploads/${req.file.filename}`;
  res.status(200).json({ imageUrl });
});

// Profile update route
router.put('/update-profile', verifyToken, async (req, res, next) => {
  try {
    const { username, email, avatar } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { username, email, avatar } },
      { new: true }
    );

    const { password, ...userData } = updatedUser._doc;
    res.status(200).json(userData);
  } catch (err) {
    next(err);
  }
});

export default router;

//changed user.route.js
//changed index.js
//created public/uploads folders