import express from "express";
import { createListing,deleteListing,updateListing,getListing,getListings } from "../controllers/Listing.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post('/create',verifyToken,createListing);
router.delete('/delete/:id', verifyToken,deleteListing);
router.post('/update/:id', verifyToken, updateListing);
router.get('/get/:id',getListing);
router.get('/get',getListings) 

export default router;