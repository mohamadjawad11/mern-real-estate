import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
//User:  MongoDB model for creating and saving user data.
// bcryptjs: Library for hashing passwords securely.
// errorHandler: Utility function for creating standardized error responses.
export const signup = async (req, res, next) => {
  const { username, email, password, repeatpassword } = req.body;

  // Check required fields
  if (!username || !email || !password || !repeatpassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check that passwords match
  if (password !== repeatpassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (error) {
    console.error("Signup error:", error);
    next(error);
  }
};




