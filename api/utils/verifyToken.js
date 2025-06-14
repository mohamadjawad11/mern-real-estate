import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js"; // adjust if needed

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandler(401, "Access denied. No token provided."));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // will contain { id: user._id }
    next();
  } catch (err) {
    return next(errorHandler(403, "Invalid or expired token."));
  }
};
