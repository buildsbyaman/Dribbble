const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Email server connection error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: `"Dribbble" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Email Verification - OTP Code',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #4CAF50; color: white; padding: 20px; text-align: center; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 5px; margin-top: 20px; }
          .otp-box { background: white; border: 2px dashed #4CAF50; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 8px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #777; font-size: 12px; }
          .warning { color: #f44336; margin-top: 15px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Email Verification</h1>
          </div>
          <div class="content">
            <h2>Hello!</h2>
            <p>Please use the following OTP to verify your email address:</p>
            
            <div class="otp-box">
              ${otp}
            </div>
            
            <p><strong>This OTP will expire in 10 minutes.</strong></p>
            
            <p>If you didn't request this verification, please ignore this email.</p>
            
            <p class="warning">⚠️ Never share this OTP with anyone!</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `Your OTP for email verification is: ${otp}. This OTP will expire in 10 minutes.`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('OTP email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw new Error('Failed to send OTP email');
  }
};

const sendWelcomeEmail = async (email) => {
  const mailOptions = {
    from: `"Your App Name" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Welcome! Your Email is Verified',
    html: `
      <h1>Welcome to Our Platform! 🎉</h1>
      <p>Your email has been successfully verified.</p>
      <p>You can now access all features of your account.</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};

module.exports = { sendOTPEmail, sendWelcomeEmail };