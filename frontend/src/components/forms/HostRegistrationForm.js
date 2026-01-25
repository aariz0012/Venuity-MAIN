import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { FiUpload, FiUser, FiMail, FiPhone, FiHome, FiMapPin } from 'react-icons/fi';

const HostRegistrationForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    businessName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const formDataToSend = new FormData();
    
    // Append all form fields
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });

    // Append image if exists
    if (image) {
      formDataTo.append('image', image);
    }

    try {
      setIsLoading(true);
      const response = await fetch('/api/host/register', {
        method: 'POST',
        body: formDataToSend,
        // Don't set Content-Type header, let the browser set it with the correct boundary
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Show success message
      toast.success('Registration successful! Please check your email to verify your account.');
      
      // Redirect to login or dashboard
      router.push('/host/login');
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || 'Registration failed. Please try again.');
      toast.error(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Become a Host</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiUser className="text-gray-400" />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMail className="text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            minLength="6"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            minLength="6"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="phone">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiPhone className="text-gray-400" />
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Business Name */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="businessName">
            Business Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiHome className="text-gray-400" />
            </div>
            <input
              type="text"
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Address */}
        <div className="mb-4 col-span-2">
          <label className="block text-gray-700 mb-2" htmlFor="address">
            Business Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-start pt-2 pointer-events-none">
              <FiMapPin className="text-gray-400" />
            </div>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* City, State, Zip */}
        <div className="grid grid-cols-3 gap-4 mb-4 col-span-2">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="city">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="state">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="zipCode">
              ZIP Code
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Logo Upload */}
        <div className="mb-6 col-span-2">
          <label className="block text-gray-700 mb-2" htmlFor="logo">
            Business Logo
          </label>
          <div className="flex items-center">
            <input
              type="file"
              id="logo"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FiUpload className="mr-2" />
              {image ? image.name : 'Choose File'}
            </button>
            {image && (
              <span className="ml-2 text-sm text-gray-500">
                {Math.round(image.size / 1024)} KB
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Upload your business logo (JPG, PNG, max 5MB)
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? 'Registering...' : 'Register as Host'}
        </button>
      </div>

      <div className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <a href="/host/login" className="text-blue-600 hover:underline">
          Sign in
        </a>
      </div>
    </form>
  );
};

export default HostRegistrationForm;