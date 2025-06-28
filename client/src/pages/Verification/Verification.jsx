// frontend/src/pages/Verification.jsx
import React, { useState } from "react";
import "./Verification.css";
import { useNavigate } from "react-router-dom";

export default function Verification() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const res = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Verified! Now you can sign up.");
        setTimeout(() => navigate("/signup", { state: { emailVerified: true, email } }), 2000);
      } else {
        setMessage("❌ " + data.message);
      }
    } catch (err) {
      setMessage("❌ Error verifying code.");
      console.error("Verification error:", err);
    }
  };

  return (
    <div className="verification-container">
      <h2>Email Verification</h2>
      <form onSubmit={handleVerify}>
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter 6-digit code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <button type="submit">Verify</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}
