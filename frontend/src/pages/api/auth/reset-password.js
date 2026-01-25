import { verifyToken } from '../../../utils/auth'; // You'll need to implement this
import { hash } from 'bcryptjs'; // For hashing the new password
import prisma from '../../../lib/prisma'; // Your database client

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Token and password are required'
      });
    }

    // Verify the token
    const decoded = await verifyToken(token);
    if (!decoded || !decoded.userId) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid or expired token'
      });
    }

    // Find user by ID and check if the reset token matches
    const user = await prisma.user.findUnique({
      where: { 
        id: decoded.userId,
        resetToken: token,
        resetTokenExpiry: {
          gte: new Date() // Token hasn't expired
        }
      }
    });

    if (!user) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid or expired token'
      });
    }

    // Hash the new password
    const hashedPassword = await hash(password, 12);

    // Update the user's password and clear the reset token
    await prisma.user.update({
      where: { id: user.id },
      data: { 
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null
      }
    });

    return res.status(200).json({ 
      success: true,
      message: 'Password has been reset successfully'
    });
  } catch (error) {
    console.error('Password reset error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Something went wrong. Please try again later.'
    });
  }
}