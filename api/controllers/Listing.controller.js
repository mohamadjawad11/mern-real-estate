import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js'; 

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


export const deleteListing = async (req, res, next) => {

  const listing=await Listing.findById(req.params.id);
  if(!listing) {
    return next(errorHandler(404, "Listing not found"));
  }

  if(req.user.id!== listing.userRef.toString()) {
    return next(errorHandler(403, "You are not authorized to delete this listing"));
  }

  try{
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Listing deleted successfully" });
  }catch(error){
    next(error);
  }

}