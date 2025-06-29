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



export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }

    res.status(200).json(listing); 
  } catch (error) {
    next(error);
  }
};

// UPDATE LISTING
export const updateListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }

    if (req.user.id !== listing.userRef.toString()) {
      return next(errorHandler(403, "You are not authorized to update this listing"));
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // ✅ optional: ensures validation rules apply again
    );

    res.status(200).json({ success: true, data: updatedListing });
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try{

    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;
    
    if(offer==='undefined'||offer==='false'){
      offer={$in: [false, true]};
    }

    let furnished = req.query.furnished;
    if(furnished===undefined||furnished==='false'){
      furnished={$in: [false, true]};
    }

    let parking = req.query.parking;
    if(parking===undefined||parking==='false'){
      parking={$in: [false, true]};
    }

    let type = req.query.type;
    if(type===undefined||type==='all'){
      type={$in: ['sale', 'rent']};
    }

    const searchTerm = req.query.searchTerm  ||'';

    const sort = req.query.sort || 'createdAt';
    const order=req.query.order || 'desc';

    const listings=await Listing.find({
      name: { $regex: searchTerm, $options: 'i' },
      offer,
      furnished,
      parking,
      type
    }).sort(
      {[sort]:order}
    ).limit(limit).skip(startIndex);
    
    return res.status(200).json(listings);




  }catch(error) {
    next(error);
  }
}