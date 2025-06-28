import express from 'express';
//I should import the controller function for signup
import { signup,signin,google,signOut,requestVerification } from '../controllers/auth.controller.js';
import { verifyAndRegister } from '../controllers/auth.controller.js';


const router = express.Router();

//When someone sends a POST request to /api/auth/signup
//   it calls the signup controller.
router.post("/signup",signup);
router.post("/signin",signin)
router.post("/google",google);
router.get("/signout",signOut);
router.post('/request-verification', requestVerification);
router.post('/verify-and-register', verifyAndRegister);



export default router;