import express from 'express';
//I should import the controller function for signup
import { signup } from '../controllers/auth.controller.js';

const router = express.Router();

//When someone sends a POST request to /api/auth/signup
//   it calls the signup controller.
router.post("/signup",signup);

export default router;