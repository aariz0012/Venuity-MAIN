import nodemailer from 'nodemailer';

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: process.env.EMAIL_SERVER_PORT,
  secure: process.env.EMAIL_SERVER_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export const sendEmail = async ({ to, subject, html, text }) => {
  try {
    await transporter.sendMail({
      from: `"Venuity" <${process.env.EMAIL_FROM || 'noreply@venuity.com'}>`,
      to,
      subject,
      text: text || '',
      html,
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};