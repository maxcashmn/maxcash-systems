import { sendEmail, sendWelcomeEmail, sendLoanApprovedEmail } from '../adapters/emailjs.adapter';

export const emailService = {
  sendEmail,
  sendWelcomeEmail,
  sendLoanApprovedEmail,

  async sendPasswordResetEmail(email: string, resetToken: string) {
    const html = `
      <h1>Password Reset Request</h1>
      <p>You requested to reset your password.</p>
      <p>Click the link below to reset your password:</p>
      <a href="${process.env.FRONTEND_URL}/reset-password?token=${resetToken}">
        Reset Password
      </a>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `;

    return await sendEmail({
      to: email,
      subject: 'Password Reset - MaxCash',
      html,
      text: `Reset your password using this link: ${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`,
    });
  },

  async sendOTPEmail(email: string, otp: string) {
    const html = `
      <h1>Your OTP Code</h1>
      <p>Your OTP code is: <strong>${otp}</strong></p>
      <p>This code will expire in 10 minutes.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `;

    return await sendEmail({
      to: email,
      subject: 'OTP Code - MaxCash',
      html,
      text: `Your OTP code is: ${otp}`,
    });
  },
};
