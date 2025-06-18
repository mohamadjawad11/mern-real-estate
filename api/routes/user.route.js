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
// router.put('/update-profile', verifyToken, async (req, res, next) => {
//   try {
//     const { username, email, avatar, newPassword } = req.body;

//     console.log("📥 Incoming data:", req.body);

//     const updateFields = {
//       username,
//       email,
//       avatar,
//     };

//     if (newPassword && newPassword.trim() !== "") {
//       console.log("🔐 Updating password...");
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(newPassword, salt);
//       updateFields.password = hashedPassword;
//     } else {
//       console.log("⚠️ No password provided or empty");
//     }

//     console.log("🛠️ Fields to update:", updateFields);

//     const updatedUser = await User.findByIdAndUpdate(
//       req.user.id,
//       { $set: updateFields },
//       { new: true }
//     );

//     const { password, ...userData } = updatedUser._doc;
//     res.status(200).json({
//       ...userData,
//       passwordChanged: !!updateFields.password,
//     });
//   } catch (err) {
//     console.error("❌ Error in profile update:", err);
//     next(err);
//   }
// });

router.put('/update-profile', verifyToken, async (req, res, next) => {
  try {
    const { username, email, avatar, newPassword, currentPassword } = req.body;

    // Get current user
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // If newPassword exists, verify current password
    if (newPassword && newPassword.trim() !== "") {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Current password is incorrect" });
      }
    }

    // Build update fields
    const updateFields = { username, email, avatar };
    if (newPassword && newPassword.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      updateFields.password = await bcrypt.hash(newPassword, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateFields },
      { new: true }
    );

    const { password, ...userData } = updatedUser._doc;
    res.status(200).json({
      ...userData,
      passwordChanged: !!updateFields.password,
    });

  } catch (err) {
    console.error("❌ Profile update error:", err);
    next(err);
  }
});


export default router;

//changed user.route.js
//changed index.js
//created public/uploads folders