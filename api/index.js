// api/index.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';

// Routers
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import deletingRouter from './routes/deleting.route.js';
import listingRouter from './routes/listing.route.js';
import displayRoute from './routes/display.route.js';
import getUser from './routes/contact.route.js';

dotenv.config();

// --------------------
// Setup __dirname (ESM)
// --------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --------------------
// Database connection
// --------------------
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// --------------------
// App setup
// --------------------
const app = express();
app.use(express.json());
app.use(cookieParser());

// Serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// --------------------
// API routes
// --------------------
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/deleting', deletingRouter);
app.use('/api/listing', listingRouter);
app.use('/api/display', displayRoute);
app.use('/api/contact', getUser);

// --------------------
// Serve React frontend safely
// --------------------
const clientBuildPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientBuildPath));

// Catch-all for frontend routes (avoids path-to-regexp crash)
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// --------------------
// Error handler
// --------------------
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
  });
});

// --------------------
// Start server
// --------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
