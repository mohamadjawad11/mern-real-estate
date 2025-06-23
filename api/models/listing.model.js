import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  regularPrice: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  furnished: {
    type: Boolean,
    required: true,
  },
  parking: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['sell', 'rent'], // Optional: restrict values
  },
  offer: {
    type: Boolean,
    required: true,
  },

  // ❌ Fix 1: Rename imageURL ➤ imageUrls (to match frontend)
  imageUrls: {
    type: [String], // ✅ Better than just Array
    required: true,
  },

  // ❌ Fix 2: userRef should be ObjectId, not String
  userRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

const Listing = mongoose.model("Listing", listingSchema);
export default Listing;
