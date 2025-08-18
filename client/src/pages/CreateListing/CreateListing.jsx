import React, { useState } from "react";
import { FaTrashAlt, FaCloudUploadAlt } from "react-icons/fa";
import "./CreateListing.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const API_KEY = import.meta.env.VITE_IMGBB_API_KEY;
  const currentUser = useSelector((state) => state.user);
  const token = currentUser?.token || currentUser?.currentUser?.token;
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [uploadedURLs, setUploadedURLs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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
    imageUrls: [],
  });

  const handleImageChange = (e) => {
    const selected = Array.from(e.target.files);
    const totalImages = images.length + uploadedURLs.length;

    if (totalImages >= 6) {
      setErrorMessage("❌ Maximum 6 images allowed.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    const allowedCount = Math.min(6 - totalImages, selected.length);
    const accepted = selected.slice(0, allowedCount);

    setImages((prev) => [...prev, ...accepted]);
    setErrorMessage("");
  };

  const uploadToImgBB = async () => {
    if (images.length === 0) {
      setErrorMessage("❌ Choose at least 1 image.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    if (uploadedURLs.length + images.length > 6) {
      setErrorMessage("❌ Cannot upload more than 6 images in total.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    setIsUploading(true);
    const uploaded = [...uploadedURLs];

    for (const image of images) {
      const imgData = new FormData();
      imgData.append("image", image);

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
        method: "POST",
        body: imgData,
      });

      const data = await res.json();
      if (data.success) {
        uploaded.push(data.data.url);
      } else {
        setErrorMessage("❌ Some images failed to upload.");
        setIsUploading(false);
        return;
      }
    }

    setUploadedURLs(uploaded);
    setFormData((prev) => ({ ...prev, imageUrls: uploaded }));
    setImages([]);
    setErrorMessage("");
    setIsUploading(false);
  };

  const handleRemoveUploadedImage = (index) => {
    const updated = [...uploadedURLs];
    updated.splice(index, 1);
    setUploadedURLs(updated);
    setFormData((prev) => ({ ...prev, imageUrls: updated }));
  };

  const handleChange = (e) => {
    const { id, checked, value } = e.target;

    if (id === "sale" || id === "rent") {
      setFormData((prev) => ({
        ...prev,
        type: id === "sale" ? "sell" : "rent",
      }));
    } else if (["parking", "furnished", "offer"].includes(id)) {
      setFormData((prev) => ({ ...prev, [id]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (+formData.regularPrice < +formData.discountedPrice) {
      setErrorMessage("❌ Discounted price cannot be higher than regular price.");
      return;
    }

    try {
      setLoading(true);
      setError(false);

      console.log("Submitting:", formData); 

      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser?.currentUser?._id || currentUser?._id,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success === false) {
        setError(data.message);
      } else {
        setFormData({
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
          imageUrls: [],
        });
        setImages([]);
        setUploadedURLs([]);
        setErrorMessage("");
        setSuccessMessage("✅ Listing created successfully!");

        setTimeout(() => {
          setSuccessMessage("");
          navigate(`/listing/${data._id}`);
        }, 3000);
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <form className="listing-form-container" onSubmit={handleSubmit}>
      <h2>Create a Listing</h2>
      <div className="form-layout">
        <div className="form-left">
          <input type="text" id="name" placeholder="Title" value={formData.name} onChange={handleChange} required />
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
                  <FaCloudUploadAlt style={{ marginRight: "13px", width: "40px", height: "15px" }} />
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
              <span className="image-counter">{images.length} file{images.length !== 1 ? "s" : ""} selected</span>
            </div>
            <button type="button" className="upload-btn" onClick={uploadToImgBB} disabled={isUploading}>
              {isUploading ? "UPLOADING..." : "UPLOAD"}
            </button>
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
            {loading ? "Creating..." : "CREATE LISTING"}
          </button>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {error && <p className="error-message">{error}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
    </form>
  );
}
