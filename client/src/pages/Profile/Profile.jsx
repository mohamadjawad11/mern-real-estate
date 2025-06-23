import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { updateUser,deleteUserStart,deleteUserFailure,deleteUserSuccess,SignOutUserStart,SignOutUserFailure,SignOutUserSuccess } from "../../redux/user/userSlice";
import "./Profile.css";

export default function Profile() {
  const avatarRef = useRef(null);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);



  if (!currentUser) {
    return <h1 style={{ textAlign: "center", marginTop: "5rem" }}>You must log in first.</h1>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    avatar: currentUser.avatar,
    currentPassword: "",
    newPassword: "",
  });

  
const fallbackAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

// eslint-disable-next-line react-hooks/rules-of-hooks
const [preview, setPreview] = useState(
  currentUser.avatar
    ? (currentUser.avatar.startsWith("http") || currentUser.avatar.startsWith("data:")
        ? currentUser.avatar
        : `http://localhost:3000${currentUser.avatar}`)
    : fallbackAvatar
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
      formData.avatar === currentUser.avatar&&
      formData.newPassword === ""
      
      
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

  const data = await res.json();

  if (!res.ok) {
  setErrorMessage("❌ " +"Profile update failed");
  setTimeout(() => setErrorMessage(""), 3000);

    return;
    
  }

dispatch(updateUser(data));
setPreview(
  data.avatar
    ? (data.avatar.startsWith("http") || data.avatar.startsWith("data:")
        ? data.avatar
        : `http://localhost:3000${data.avatar}`)
    : fallbackAvatar
);



  setSuccessMessage(
    data.passwordChanged
      ? "✅ Password and profile updated!"
      : "✅ Profile updated successfully!"
  );

  setFormData((prev) => ({ ...prev, newPassword: "", currentPassword: "" }));
  setTimeout(() => setSuccessMessage(""), 3000);

} catch (err) {
  console.error("Profile update failed:", err);
}

  };


const confirmDeleteUser = async () => {
  try {
    dispatch(deleteUserStart());
    const res = await fetch(`/api/deleting/delete/${currentUser._id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (data.success === false) {
      setErrorMessage(data.message || "Account deletion failed.");
      dispatch(deleteUserFailure(data.message));
      return;
    }
    dispatch(deleteUserSuccess(data));
  } catch (error) {
    setErrorMessage(error.message || "Something went wrong.");
    dispatch(deleteUserFailure(error.message));
  } finally {
    setShowConfirmModal(false);
  }
};



  const handleSignOut = async () => {
    try {
      dispatch(SignOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1 className="profile-title">User Profile</h1>

        
        {successMessage && <p className="success-message">{successMessage}</p>}
         {errorMessage && <p className="error-message">{errorMessage}</p>}

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
            placeholder="Current Password"
            className="profile-input"
            value={formData.currentPassword}
            onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
            />
          <input
            type="password"
            placeholder="New Password"
            className="profile-input"
            value={formData.newPassword}
            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
            />

          <button className="profile-button" type="submit">
            Update
          </button>

          <Link to="/create-listing" className="create-listing-button" uppercase>
            Create Listing
          </Link>


        </form>


        <div className="profile-actions">
          {/* <span onClick={handleDeleteUser} className="delete-account">Delete Account?</span> */}
          <span onClick={() => setShowConfirmModal(true)} className="delete-account">
              Delete Account?
          </span>
          <Link to="/my-listings" className="show-listings">
            MyListings
          </Link>

          <span onClick={handleSignOut} className="sign-out">Sign Out</span>
          
        </div>
        
      </div>
     
      {showConfirmModal && (
  <div className="modal-overlay">
    <div className="modal-content">
      <p>⚠️ Are you sure you want to delete your account?</p>
      <div className="modal-buttons">
        <button onClick={confirmDeleteUser} className="confirm-btn">Yes, delete</button>
        <button onClick={() => setShowConfirmModal(false)} className="cancel-btn">Cancel</button>
      </div>
    </div>
   
  </div>
)}

     

    </div>
    
  );
}

