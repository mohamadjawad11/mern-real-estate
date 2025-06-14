import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { updateUser } from "../../redux/user/userSlice";
import "./Profile.css";

export default function Profile() {
  const avatarRef = useRef(null);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [successMessage, setSuccessMessage] = useState("");

  if (!currentUser) {
    return <h1 style={{ textAlign: "center", marginTop: "5rem" }}>You must log in first.</h1>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    avatar: currentUser.avatar,
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [preview, setPreview] = useState(
    currentUser.avatar?.startsWith("http")
      ? currentUser.avatar
      : `http://localhost:3000${currentUser.avatar}`
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [uploadProgress, setUploadProgress] = useState(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isUploading, setIsUploading] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);
    setUploadComplete(false);

    const tempPreview = URL.createObjectURL(file);
    setPreview(tempPreview);

    const formDataToSend = new FormData();
    formDataToSend.append("avatar", file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/user/upload-avatar");

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percent);
      }
    };

    xhr.onload = () => {
      setIsUploading(false);
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        setFormData((prev) => ({ ...prev, avatar: response.imageUrl }));
        setUploadComplete(true);
      } else {
        console.error("Upload failed:", xhr.responseText);
      }
    };

    xhr.onerror = () => {
      setIsUploading(false);
      console.error("Upload error");
    };

    xhr.send(formDataToSend);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Check if anything changed
    if (
      formData.username === currentUser.username &&
      formData.email === currentUser.email &&
      formData.avatar === currentUser.avatar
    ) {
      setSuccessMessage("⚠️ No changes made.");
      setTimeout(() => setSuccessMessage(""), 3000);
      return;
    }

    try {
      const res = await fetch("/api/user/update-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const updatedUser = await res.json();
      dispatch(updateUser(updatedUser));

      setPreview(
        updatedUser.avatar?.startsWith("http")
          ? updatedUser.avatar
          : `http://localhost:3000${updatedUser.avatar}`
      );

      setSuccessMessage("✅ Profile updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Profile update failed:", err);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1 className="profile-title">User Profile</h1>

        {successMessage && <p className="success-message">{successMessage}</p>}

        <form className="profile-form" onSubmit={handleSubmit}>
          <input
            type="file"
            ref={avatarRef}
            hidden
            accept="image/*"
            onChange={handleAvatarChange}
          />

          <div className="avatar-wrapper" onClick={() => avatarRef.current.click()}>
            <img
              key={preview}
              src={preview}
              alt="profile"
              className={`profile-avatar2 ${isUploading ? "faded" : uploadComplete ? "fade-in" : ""}`}
              referrerPolicy="no-referrer"
            />
            {isUploading && (
              <div className="upload-progress-bar">
                Uploading... {uploadProgress}%
              </div>
            )}
          </div>

          <input
            type="text"
            placeholder="Username"
            className="profile-input"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="profile-input"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="profile-input"
            disabled
          />
          <button className="profile-button" type="submit">
            Update
          </button>
        </form>

        <div className="profile-actions">
          <span className="delete-account">Delete Account?</span>
          <span className="sign-out">Sign Out</span>
        </div>
      </div>
    </div>
  );
}
