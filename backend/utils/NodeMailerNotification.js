import nodemailer from 'nodemailer';
// Setup Nodemailer transporter using Gmail
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL, // Your Gmail address
      pass: process.env.PASSWORD   // Your Gmail password or App password (if 2FA is enabled)
    },
    tls: {
      rejectUnauthorized: false
    }
  });