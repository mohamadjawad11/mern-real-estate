import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import deletingRouter from './routes/deleting.route.js';
import listingRouter from './routes/listing.route.js';
import displayRoute from './routes/display.route.js'; 
import getUser from './routes/contact.route.js'
import path from 'path';



import cookieParser from 'cookie-parser';
dotenv.config();


mongoose.connect(process.env.MONGO).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});



const app = express();
const __dirname = path.resolve();

app.use(express.json()); 

app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));


app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/deleting', deletingRouter);
app.use('/api/listing',listingRouter);
app.use('/api/display', displayRoute); 
app.use('/api/contact', getUser);

app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message,
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
