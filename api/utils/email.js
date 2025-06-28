import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

console.log("Loaded ENV values:");
console.log("GMAIL_USER =", process.env.GMAIL_USER);
console.log("GMAIL_APP_PASSWORD =", process.env.GMAIL_APP_PASSWORD);
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

/**
 * Send a 6-digit verification code via Gmail.
 * @param {string} toEmail - recipient email address
 * @param {string} code - 6-digit verification code
 */
export const sendVerificationEmail = async (toEmail, code) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: toEmail,
    subject: 'Your Verification Code',
    html: `
      <div style="font-family:sans-serif;">
        <h2>Real Estate App – Verification</h2>
        <p>Your verification code is:</p>
        <h1 style="letter-spacing:4px;">${code}</h1>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${toEmail}`);
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    throw error;
  }
};
