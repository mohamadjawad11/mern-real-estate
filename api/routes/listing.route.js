import express from "express";
import { createListing } from "../controllers/Listing.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post('/create',verifyToken,createListing);

export default router;