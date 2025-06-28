import React, { useState } from 'react';
import './Verification2.css';
import { useNavigate } from 'react-router-dom';

export default function Verification2() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState(1); // 1 = enter email, 2 = enter code
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSendCode = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/auth/send-reset-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      if (data.success === false) {
        setMessage(data.message || 'Failed to send code.');
      } else {
        setStep(2);
        setMessage('Code sent to your email.');
      }
    } catch (error) {
      setMessage('Server error.');
        console.error(error);
    }
    setLoading(false);
  };

  const handleVerifyCode = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/auth/verify-reset-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      });

      const data = await res.json();
      if (data.success === false) {
        setMessage(data.message || 'Invalid code.');
      } else {
        navigate('/reset-password', { state: { email } });
      }
    } catch (error) {
      setMessage('Server error.');
        console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="verification-container">
      <div className="verification-card">
        <h2>Password Reset</h2>
        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSendCode} disabled={loading} className='verify-button'>
              {loading ? 'Sending...' : 'Send Code'}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter 6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button onClick={handleVerifyCode} disabled={loading} className='verify-button'>
              {loading ? 'Verifying...' : 'Verify Code'}
            </button>
          </>
        )}

        {message && <p className="message-text">{message}</p>}
      </div>
    </div>
  );
}
