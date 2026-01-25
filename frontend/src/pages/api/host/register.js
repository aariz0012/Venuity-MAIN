import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import Host from '../../../models/Host';
import { hashPassword } from '../../../utils/auth';

export const config = {
  api: {
    bodyParser: false, // Disable body parsing, we'll handle it manually
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    // Parse form data
    const formData = await new Promise((resolve, reject) => {
      const form = new (require('formidable').IncomingForm)();
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    const { fields, files } = formData;
    const { name, email, password, phone, businessName, address, city, state, zipCode } = fields;

    // Validate required fields
    if (!name || !email || !password || !phone || !businessName || !address) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Handle file upload (if any)
    let logoUrl = '';
    if (files && files.image) {
      // In a real app, you'd upload this to a service like AWS S3 or Cloudinary
      // For now, we'll just store the file name
      logoUrl = `/uploads/${files.image.originalFilename}`;
      // TODO: Implement actual file upload logic
    }

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: 'host',
      phone,
    });

    await user.save();

    // Create host profile
    const host = new Host({
      user: user._id,
      businessName,
      address,
      city,
      state,
      zipCode,
      logo: logoUrl,
      status: 'pending', // Set initial status as pending for admin approval
    });

    await host.save();

    // Update user with host reference
    user.hostProfile = host._id;
    await user.save();

    // Send verification email (implement this function)
    // await sendVerificationEmail(user.email, user.verificationToken);

    res.status(201).json({ 
      message: 'Registration successful! Please check your email to verify your account.',
      userId: user._id 
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'An error occurred during registration',
      error: error.message 
    });
  }
}