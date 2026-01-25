import jwt from 'jsonwebtoken';
import { compare, hash } from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

// Create a JWT token
export const createToken = (payload, options = {}) => {
  return jwt.sign(
    payload,
    JWT_SECRET,
    { expiresIn: options.expiresIn || JWT_EXPIRES_IN }
  );
};

// Verify a JWT token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};

// Hash a password
export const hashPassword = async (password) => {
  return await hash(password, 12);
};

// Compare password with hash
export const comparePasswords = async (password, hashedPassword) => {
  return await compare(password, hashedPassword);
};