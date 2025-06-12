import { useSelector } from "react-redux";
import "./Profile.css";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1 className="profile-title">User Profile</h1>
        <form className="profile-form">
          <img
            src={currentUser.avatar}
            alt="profile"
            referrerPolicy="no-referrer"
            className="profile-avatar2"
          />
          <input type="text" placeholder="Username" id="username" className="profile-input" />
          <input type="email" placeholder="Email" id="email" className="profile-input" />
          <input type="password" placeholder="Password" id="password" className="profile-input" />
          <button className="profile-button">Update</button>
        </form>
        <div className="profile-actions">
          <span className="delete-account">Delete Account?</span>
          <span className="sign-out">Sign Out</span>
        </div>
      </div>
    </div>
  );
} 