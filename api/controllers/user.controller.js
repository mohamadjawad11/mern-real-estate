import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import Listing from '../models/listing.model.js';



export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only delete your own account!'));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json('User has been deleted!');
  } catch (error) {
    next(error);
  }
};

export const getUserListing = async (req, res, next) => {
  try {
    const userIdFromToken = (req.user._id || req.user.id)?.toString();
    const userIdFromParams = req.params.id.toString();

    if (userIdFromToken !== userIdFromParams) {
      return next(errorHandler(401, 'You can only access your own listings!'));
    }

    const listings = await Listing.find({ userRef: userIdFromParams });
    res.status(200).json({
      success: true,
      data: listings,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
try{
 const user=await User.findById(req.params.id);
 if(!user) return next(errorHandler(404,'User not found'));

 const { password:pass, ...rest } = user._doc;
 res.status(200).json(rest);
}catch(error){
  next(error);
}
}

