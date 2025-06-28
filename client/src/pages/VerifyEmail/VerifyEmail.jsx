import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./VerifyEmail.css";

export default function VerifyEmail() {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("signupEmail");
    if (savedEmail) {
      setEmail(savedEmail);
    } else {
      navigate("/signup");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify-and-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Verification failed.");
      } else {
        setSuccess("Email verified and user created!");
        localStorage.removeItem("signupEmail");
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
        console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="verify-wrapper">
      <div className="verify-card">
        <h2>Email Verification</h2>
        <p>Enter the 6-digit code sent to your email: <strong>{email}</strong></p>
        <form onSubmit={handleSubmit} className="verify-form">
          <input
            type="text"
            placeholder="Enter verification code"
            maxLength="6"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button disabled={loading || code.length !== 6} type="submit">
            {loading ? "Verifying..." : "Verify & Register"}
          </button>
        </form>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
      </div>
    </div>
  );
}
