import express from "express";
import { deleteUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.delete('/delete/:id', verifyToken, deleteUser);


export default router;