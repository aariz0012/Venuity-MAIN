import { sendEmail } from '../../../utils/email'; // You'll need to implement this
import { ResetPasswordEmail } from '../../../components/emails/ResetPasswordEmail';
import { createToken } from '../../../utils/auth'; // You'll need to implement this
import prisma from '../../../lib/prisma'; // Your database client

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, name: true, email: true },
    });

    // For security, don't reveal if the email exists or not
    if (!user) {
      return res.status(200).json({ 
        success: true,
        message: 'If your email is registered, you will receive a password reset link.'
      });
    }

    // Create a password reset token that expires in 1 hour
    const resetToken = await createToken(
      { userId: user.id },
      { expiresIn: '1h' }
    );

    // Save the reset token to the database
    await prisma.user.update({
      where: { id: user.id },
      data: { 
        resetToken,
        resetTokenExpiry: new Date(Date.now() + 3600000) // 1 hour from now
      }
    });

    // Create reset link
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

    // Send email
    await sendEmail({
      to: user.email,
      subject: 'Reset Your Venuity Password',
      html: ResetPasswordEmail({ 
        resetLink, 
        name: user.name || 'User' 
      })
    });

    return res.status(200).json({ 
      success: true,
      message: 'If your email is registered, you will receive a password reset link.'
    });
  } catch (error) {
    console.error('Password reset error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Something went wrong. Please try again later.'
    });
  }
}