import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import { sendVerificationEmail } from '../utils/email.js';

import { getVerificationData, saveVerificationCode, deleteVerificationCode } from '../utils/verificationStore.js';


export const signup = async (req, res, next) => {
  const { username, email, password, repeatpassword } = req.body;

  if (!username || !email || !password || !repeatpassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password !== repeatpassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    avatar: "data:image/png;base64,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", // ✅ Default avatar
  });

  try {
    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (error) {
    console.error("Signup error:", error);
    next(error);
  }
};

export const verifyAndRegister = async (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ message: 'Email and code are required' });
  }

  const entry = getVerificationData(email);

  if (!entry) {
    return res.status(400).json({ message: 'No verification data found. Please request a new code.' });
  }

  if (Date.now() > entry.expiresAt) {
    deleteVerificationCode(email);
    return res.status(400).json({ message: 'Code expired. Please request a new one.' });
  }

  if (entry.code !== code) {
    return res.status(400).json({ message: 'Invalid verification code.' });
  }

  const { username, password } = entry.userData;

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
     avatar: "data:image/png;base64,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", // ✅ Default avatar
  });

  try {
    await newUser.save();
    deleteVerificationCode(email); // cleanup
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'User creation failed.' });
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  // Check required fields
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    const isPasswordValid = bcryptjs.compareSync(password, user.password);

    if (!isPasswordValid) {
      return next(errorHandler(401, "Wrong Credentials!"));
    }

    const { password: pwd, ...userData } = user._doc;

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("access_token", token, {
      httpOnly: true,
    }).status(200).json(userData); // ✅ send plain userData directly (no { user: ... })

  } catch (error) { 
    next(error);
  }
};



export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
  // If Google photo changed, update avatar
  if (req.body.photo && user.avatar !== req.body.photo) {
    user.avatar = req.body.photo;
    await user.save();
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  const { password: pass, ...rest } = user._doc;
  res
    .cookie('access_token', token, { httpOnly: true })
    .status(200)
    .json(rest);
}

  else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({ message: "User signed out successfully" });
  } catch (error) {
    next(error);
  }
};



export const requestVerification = async (req, res) => {
  const { username, email, password, repeatpassword } = req.body;

  // ✅ Basic validation
  if (!username || !email || !password || !repeatpassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (password !== repeatpassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  // ✅ Generate 6-digit code
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    // ✅ Send email
    await sendVerificationEmail(email, code);

    // ✅ Save code + user formData temporarily
    saveVerificationCode(email, code, { username, email, password });

    return res.status(200).json({ message: 'Verification code sent to email.' });
  } catch (err) {
    console.error('Verification send failed:', err);
    return res.status(500).json({ message: 'Failed to send verification email.' });
  }
};



export const verifyCode = async (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ message: "Email and code are required" });
  }

  const verification = getVerificationData(email);

  if (!verification) {
    return res.status(400).json({ message: "No code found. Please request a new one." });
  }

  if (Date.now() > verification.expiresAt) {
    deleteVerificationCode(email);
    return res.status(400).json({ message: "Code has expired. Request a new one." });
  }

  if (verification.code !== code) {
    return res.status(400).json({ message: "Invalid code." });
  }

  deleteVerificationCode(email); // ✅ One-time use
  return res.status(200).json({ message: "Email verified successfully." });
};