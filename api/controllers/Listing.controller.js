import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js'; // Only if you're using custom error handling

export const createListing = async (req, res, next) => {
  try {
    const {
      name,
      description,
      address,
      type,
      parking,
      furnished,
      offer,
      bedrooms,
      bathrooms,
      regularPrice,
      discountedPrice,
      imageUrls,
      userRef
    } = req.body;

    // ✅ Basic validations
    if (!imageUrls || !Array.isArray(imageUrls) || imageUrls.length === 0) {
      return next(errorHandler(400, "At least one image URL is required."));
    }

    if (offer && discountedPrice >= regularPrice) {
      return next(errorHandler(400, "Discounted price must be less than regular price."));
    }

    const listing = await Listing.create({
      name,
      description,
      address,
      type,
      parking,
      furnished,
      offer,
      bedrooms,
      bathrooms,
      regularPrice,
      discountedPrice,
      imageUrls,
      userRef
    });

    res.status(201).json(listing);

  } catch (error) {
    next(error);
  }
};
