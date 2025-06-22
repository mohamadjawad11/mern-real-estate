import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { getUserListing } from "../controllers/user.controller.js";

const router = express.Router();

router.get('/listings/:id',verifyToken,getUserListing);