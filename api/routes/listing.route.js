import express from "express";
import { createListing,deleteListing,updateListing } from "../controllers/Listing.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post('/create',verifyToken,createListing);
router.delete('/delete/:id', verifyToken,deleteListing);
router.post('/update/:id', verifyToken, updateListing); // Assuming update uses the same controller as create

export default router;