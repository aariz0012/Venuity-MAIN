import mongoose from 'mongoose';

const hostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  businessName: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    required: true,
  },
  city: String,
  state: String,
  zipCode: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  // Add other host-specific fields as needed
}, { timestamps: true });

export default mongoose.models.Host || mongoose.model('Host', hostSchema);