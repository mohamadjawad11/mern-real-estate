import React, { useState } from "react";
import "./CreateListing.css";

export default function CreateListing() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    type: "sell",
    parking: false,
    furnished: false,
    offer: false,
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 0,
    discountedPrice: 0,
    images: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, images: files }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form className="listing-form-container" onSubmit={handleSubmit}>
      <h2>Create a Listing</h2>

      <div className="form-layout">
        {/* Left Side */}
        <div className="form-left">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            id="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <div className="checkbox-group">
            <label className="input-inline">
              <input
                type="radio"
                name="type"
                id="sale"
                value="sell"
                checked={formData.type === "sell"}
                onChange={handleChange}
              />
              <span>Sell</span>
            </label>

            <label className="input-inline">
              <input
                type="radio"
                name="type"
                id="rent"
                value="rent"
                checked={formData.type === "rent"}
                onChange={handleChange}
              />
              <span>Rent</span>
            </label>

            <label className="input-inline">
              <input
                type="checkbox"
                name="parking"
                id="parking"
                checked={formData.parking}
                onChange={handleChange}
              />
              <span>Parking spot</span>
            </label>

            <label className="input-inline">
              <input
                type="checkbox"
                name="furnished"
                id="furnished"
                checked={formData.furnished}
                onChange={handleChange}
              />
              <span>Furnished</span>
            </label>

            <label className="input-inline">
              <input
                type="checkbox"
                name="offer"
                id="offer"
                checked={formData.offer}
                onChange={handleChange}
              />
              <span>Offer</span>
            </label>
          </div>

          <div className="input-pair">
            <div>
              <input
                type="number"
                name="bedrooms"
                id="bedrooms"
                min="1"
                value={formData.bedrooms}
                onChange={handleChange}
              />
              <label>Beds</label>
            </div>
            <div>
              <input
                type="number"
                name="bathrooms"
                id="bathrooms"
                min="1"
                value={formData.bathrooms}
                onChange={handleChange}
              />
              <label>Baths</label>
            </div>
            <div>
              <input
                type="number"
                name="regularPrice"
                id="regularPrice"
                min="0"
                value={formData.regularPrice}
                onChange={handleChange}
              />
              <label>Regular price<br />($ / month)</label>
            </div>
            {formData.offer && (
              <div>
                <input
                  type="number"
                  name="discountedPrice"
                  id="discountedPrice"
                  min="0"
                  value={formData.discountedPrice}
                  onChange={handleChange}
                />
                <label>Discounted price<br />($ / month)</label>
              </div>
            )}
          </div>
        </div>

        {/* Right Side */}
        <div className="form-right">
          <p>
            <strong>Images:</strong> The first image will be the cover (max 6 images)
          </p>

          <div className="image-upload-wrapper">
            <div className="image-upload-border">
              <input
                type="file"
                name="images"
                id="images"
                accept="image/*"
                multiple
                className="custom-file-input"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="upload-btn">UPLOAD</button>
          </div>
          <button className="create-button">Create Listing</button>
        </div>
      </div>
      
    </form>
  );
}
