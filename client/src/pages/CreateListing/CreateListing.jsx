import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FaCloudUploadAlt } from "react-icons/fa";

import "./CreateListing.css";

export default function CreateListing() {
  const API_KEY = "9f7a35c9176c30c507aa666e3809b603";

  const [images, setImages] = useState([]);
  const [uploadedURLs, setUploadedURLs] = useState([]);

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

  const handleImageChange = (e) => {
    const selected = Array.from(e.target.files).slice(0, 6 - images.length);
    setImages((prev) => [...prev, ...selected]);
  };

  const uploadToImgBB = async () => {
    if (images.length === 0) return alert("Please select images first.");

    const uploaded = [...uploadedURLs];

    for (const image of images) {
      const formData = new FormData();
      formData.append("image", image);

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        uploaded.push(data.data.url);
      } else {
        alert("Upload failed for one or more images.");
        return;
      }
    }

    setUploadedURLs(uploaded);
    setFormData((prev) => ({ ...prev, images: uploaded }));
    setImages([]);
    alert("All images uploaded successfully!");
  };

  const handleRemoveUploadedImage = (index) => {
    const updated = [...uploadedURLs];
    updated.splice(index, 1);
    setUploadedURLs(updated);
    setFormData((prev) => ({ ...prev, images: updated }));
  };

  const handleChange = (e) => {
    const { id, checked, value } = e.target;

    if (id === "sale" || id === "rent") {
      setFormData((prev) => ({ ...prev, type: id }));
    } else if (["parking", "furnished", "offer"].includes(id)) {
      setFormData((prev) => ({ ...prev, [id]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
  };

  return (
    <form className="listing-form-container" onSubmit={handleSubmit}>
      <h2>Create a Listing</h2>
      <div className="form-layout">
        <div className="form-left">
          <input type="text" id="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <textarea id="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
          <input type="text" id="address" placeholder="Address" value={formData.address} onChange={handleChange} required />

          <div className="checkbox-group">
            <label className="input-inline">
              <input type="radio" name="type" id="sale" checked={formData.type === "sell"} onChange={handleChange} />
              <span>Sell</span>
            </label>
            <label className="input-inline">
              <input type="radio" name="type" id="rent" checked={formData.type === "rent"} onChange={handleChange} />
              <span>Rent</span>
            </label>
            <label className="input-inline">
              <input type="checkbox" id="parking" checked={formData.parking} onChange={handleChange} />
              <span>Parking spot</span>
            </label>
            <label className="input-inline">
              <input type="checkbox" id="furnished" checked={formData.furnished} onChange={handleChange} />
              <span>Furnished</span>
            </label>
            <label className="input-inline">
              <input type="checkbox" id="offer" checked={formData.offer} onChange={handleChange} />
              <span>Offer</span>
            </label>
          </div>

          <div className="input-pair">
            <div>
              <input type="number" id="bedrooms" min="1" value={formData.bedrooms} onChange={handleChange} />
              <label>Beds</label>
            </div>
            <div>
              <input type="number" id="bathrooms" min="1" value={formData.bathrooms} onChange={handleChange} />
              <label>Baths</label>
            </div>
            <div>
              <input type="number" id="regularPrice" min="0" value={formData.regularPrice} onChange={handleChange} />
              <label>Regular price<br />($ / month)</label>
            </div>
            {formData.offer && (
              <div>
                <input type="number" id="discountedPrice" min="0" value={formData.discountedPrice} onChange={handleChange} />
                <label>Discounted price<br />($ / month)</label>
              </div>
            )}
          </div>
        </div>

        <div className="form-right">
          <p><strong>Images:</strong> Upload up to 6 images. The first will be the cover.</p>
          <div className="image-upload-wrapper">
            <div className="image-upload-border">
             <div className="custom-file-wrapper">
  <label htmlFor="images" className="custom-file-label">
    <FaCloudUploadAlt style={{ marginRight: "13px", width:"40px", height:"15px" }} />
    {images.length}/6 selected
  </label>
  <input
    type="file"
    id="images"
    accept="image/*"
    multiple
    className="custom-file-input"
    onChange={handleImageChange}
  />
</div>


              <span className="image-counter">{images.length} file{images.length !== 1 ? 's' : ''} selected</span>
            </div>
            <button type="button" className="upload-btn" onClick={uploadToImgBB}>UPLOAD</button>
          </div>

          {uploadedURLs.length > 0 && (
            <div className="image-preview-multi">
              {uploadedURLs.map((url, i) => (
                <div className="image-preview-wrapper" key={i}>
                  <img src={url} alt={`Uploaded ${i}`} />
                  <button type="button" className="remove-btn" onClick={() => handleRemoveUploadedImage(i)}>
                    <FaTrashAlt size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <button type="submit" className="create-button" disabled={uploadedURLs.length === 0}>
            Create Listing
          </button>
        </div>
      </div>
    </form>
  );
}
