import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
dotenv.config();

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

// Initialize Express application
const app=express();
app.use(express.json()); // Middleware to parse JSON bodies
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

//All /api/user/* requests go to user.route.js
// All /api/auth/* requests go to auth.route.js
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message,
  });
});