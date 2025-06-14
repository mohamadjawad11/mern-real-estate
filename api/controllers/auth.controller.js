import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  // Check required fields
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
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

    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("access_token", token, {
      httpOnly: true,
    }).status(200).json({ success: true, message: "Signin successful", user: userData });


    
  } catch (error) { 
    next(error);
  }
};

// export const google = async (req, res, next) => {
//   const { name, email,photo } = req.body;

//   if (!name || !email) {
//     return res.status(400).json({ success: false, message: "Name and email are required" });
//   }

//   try{
//     const user = await User.findOne({ email:req.body.email });
//     if(user){
//       const { password: pwd, ...userData } = user._doc;
//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

//       return res.cookie("access_token", token, {
//         httpOnly: true,
//       }).status(200).json({ success: true, message: "Signin successful", user: userData });
//     }else{
//       const generatedPassword=Math.random().toString(36).slice(-8)+ Math.random().toString(36).slice(-8);
//       const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
//       const newUser = new User({
//         username: req.body.name.split("").join("").toLowerCase() + Math.random().toString(36).slice(-5),
//         email: req.body.email,
//         password: hashedPassword,
//         avatar: req.body.photo
//       });
//       await newUser.save();
//       const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
//       const { password: pwd, ...userData } = newUser._doc;
//       res.cookie("access_token", token, {
//         httpOnly: true,
//       }).status(200).json({ success: true, message: "User created successfully", user: userData });

//     }
//   }catch(error) {
//     next(error);

//   }
// }
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



