import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FiUser, FiMail, FiPhone, FiLock, FiMapPin, FiHome, FiUsers } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/Layout/Layout';
import OTPVerification from '../../components/auth/OTPVerification';

// Static export - no server-side rendering needed

const HostRegister = () => {
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [registeredMobile, setRegisteredMobile] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  
  const { registerHost } = useAuth();
  const router = useRouter();

  // Validation schema for step 1 (Basic Information)
  const Step1Schema = Yup.object().shape({
    businessName: Yup.string()
      .min(3, 'Business name must be at least 3 characters')
      .required('Business name is required'),
    ownerName: Yup.string()
      .min(3, 'Owner name must be at least 3 characters')
      .required('Owner name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    mobileNumber: Yup.string()
      .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
      .required('Mobile number is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required')
  });

  // Validation schema for step 2 (Business Details)
  const Step2Schema = Yup.object().shape({
    hostType: Yup.string()
    .oneOf(['venue', 'caterer', 'decorator', 'organizer'], 'Please select a valid host type')
    .required('Host type is required'),
  venueType: Yup.string()
    .when('hostType', (hostType, schema) => {
      return hostType === 'venue' 
        ? schema
            .oneOf(['lawn', 'banquet', 'cafe', 'hotel', 'resort', 'other'], 'Please select a valid venue type')
            .required('Venue type is required')
        : schema.notRequired();
    }),
  maxGuestCapacity: Yup.mixed()
    .when('hostType', (hostType, schema) => {
      return hostType === 'venue'
        ? Yup.number()
            .min(1, 'Capacity must be at least 1')
            .required('Maximum guest capacity is required')
            .typeError('Must be a number')
        : schema.notRequired();
    }),
    address: Yup.string()
      .required('Address is required'),
    city: Yup.string()
      .required('City is required'),
    zipCode: Yup.string()
      .required('ZIP/Postal code is required'),
    services: Yup.array()
      .min(1, 'Please select at least one service')
      .required('Services are required'),
    termsAccepted: Yup.boolean()
      .oneOf([true], 'You must accept the terms and conditions')
  });

  // Handle step 1 submission
  const handleStep1Submit = (values) => {
    setFormData({ ...formData, ...values });
    setFormErrors({}); // Clear any previous errors when moving forward
    setCurrentStep(2);
  };

  // Handle step 2 submission (final registration)
  const handleStep2Submit = async (values, { setSubmitting, setErrors }) => {
    try {
      // Combine data from both steps
      const hostData = {
        ...formData,
        ...values
      };

      // Remove confirmPassword from hostData if it exists
      delete hostData.confirmPassword;

      // Register host
      const response = await registerHost(hostData);
      
      if (response && response.success) {
        setRegisteredEmail(formData.email);
        setRegisteredMobile(formData.mobileNumber);
        setShowOTPForm(true);
        setFormErrors({});
        toast.success('Registration successful! Please verify your email and mobile.');
      } else {
        // Handle registration failure
        const errorMessage = response?.error || 'Registration failed. Please try again.';
        console.error('Registration error:', errorMessage);
        
        // Set form-level errors based on error message
        if (errorMessage.toLowerCase().includes('email')) {
          const emailError = 'This email is already registered. Please use a different email or try logging in.';
          setFormErrors({ email: emailError });
          setCurrentStep(1); // Go back to step 1 to show the email error
          toast.error('This email is already registered. Please use a different email.');
        } else if (errorMessage.toLowerCase().includes('mobile')) {
          const mobileError = 'This mobile number is already registered. Please use a different number.';
          setFormErrors({ mobileNumber: mobileError });
          setCurrentStep(1); // Go back to step 1 to show the mobile error
          toast.error('This mobile number is already registered. Please use a different number.');
        } else {
          setFormErrors({ submit: errorMessage });
          toast.error(errorMessage);
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.message || 'Registration failed. Please try again.';
      
      // Handle specific error messages
      if (errorMessage.toLowerCase().includes('email')) {
        const emailError = 'This email is already registered. Please use a different email.';
        setFormErrors({ email: emailError });
        setCurrentStep(1); // Go back to step 1 to show the email error
        toast.error('This email is already registered. Please use a different email.');
      } else if (errorMessage.toLowerCase().includes('mobile')) {
        const mobileError = 'This mobile number is already registered. Please use a different number.';
        setFormErrors({ mobileNumber: mobileError });
        setCurrentStep(1); // Go back to step 1 to show the mobile error
        toast.error('This mobile number is already registered. Please use a different number.');
      } else {
        setFormErrors({ submit: errorMessage });
        toast.error(errorMessage);
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Handle OTP verification success
  const handleOTPVerified = () => {
    toast.success('Verification successful!');
    router.push('/host/dashboard');
  };

  // Go back to step 1
  const handleBackToStep1 = () => {
    setCurrentStep(1);
  };

  return (
        <Layout title="Host Registration - Venuity">
      <div className="min-h-screen bg-white flex">
        {/* Left Column - Host Grid (60%) */}
        <div className="w-3/5 bg-gray-50 relative overflow-hidden p-16">
          {/* Geometric Grid Background - Positioned at Top */}
          <div className="relative w-full h-1/2 grid grid-cols-4 grid-rows-4 gap-0 scale-87">
            {/* Host-specific images */}
            <div className="bg-white opacity-80"></div>
            <img src="/images/host-venue-management.jpg" alt="Venue management dashboard" className="object-cover w-full h-full opacity-100" />
            <div className="bg-white opacity-80"></div>
            <img src="/images/host-booking-calendar.jpg" alt="Booking calendar management" className="object-cover w-full h-full opacity-100" />

            <img src="/images/host-revenue-analytics.jpg" alt="Revenue analytics dashboard" className="object-cover w-full h-full opacity-100" />
            <div className="bg-white opacity-80"></div>
            <img src="/images/host-property-listing.jpg" alt="Property listing interface" className="object-cover w-full h-full opacity-100" />
            <div className="bg-white opacity-80"></div>

            <div className="bg-white opacity-80"></div>
            <img src="/images/host-event-planners.jpg" alt="Event planners network" className="object-cover w-full h-full opacity-100" />
            <div className="bg-white opacity-80"></div>
            <img src="/images/host-earning-reports.jpg" alt="Earnings and financial reports" className="object-cover w-full h-full opacity-100" />

            <img src="/images/host-customer-support.jpg" alt="Customer support dashboard" className="object-cover w-full h-full opacity-100" />
            <div className="bg-white opacity-80"></div>
            <img src="/images/host-growth-metrics.jpg" alt="Business growth metrics" className="object-cover w-full h-full opacity-100" />
            <div className="bg-white opacity-80"></div>
          </div>

          {/* Text Content - Below Grid */}
          <div className="relative z-10 h-1/2 flex items-center justify-center pt-4 pb-12">
            <div className="text-center text-gray-800 max-w-2xl">
              <h1 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                Empower your venue with the right tools.
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-6">
                Join a curated network of premium venues. Showcase your space, manage inquiries effortlessly, and watch your business grow with our dedicated Host Dashboard.
              </p>
              <div className="flex justify-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-600">20%↑</div>
                  <div className="text-sm text-gray-600">Average Revenue Growth</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-600">5,000+</div>
                  <div className="text-sm text-gray-600">Active Event Planners</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-600">Top 1%</div>
                  <div className="text-sm text-gray-600">Tech-Enabled Platform</div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-10 right-10 w-20 h-20 bg-brand-400 rounded-full opacity-20 blur-xl"></div>
          <div className="absolute bottom-20 left-20 w-32 h-32 bg-brand-300 rounded-full opacity-20 blur-xl"></div>
        </div>

        {/* Right Column - Registration Form (40%) */}
        <div className="w-2/5 flex items-start justify-center p-12">
          <div className="w-full max-w-sm">
            {/* Simple Registration Header */}
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Create Host Account</h2>

            {/* Minimalist Progress Tracker */}
            {!showOTPForm && (
              <div className="flex justify-center mb-8">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    currentStep >= 1 ? 'bg-brand-600 text-white' : 'bg-gray-300 text-gray-600'
                  } font-bold text-sm`}>
                    1
                  </div>
                  <div className={`w-16 h-0.5 transition-all duration-300 ${
                    currentStep >= 2 ? 'bg-brand-600' : 'bg-gray-300'
                  }`}></div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    currentStep >= 2 ? 'bg-brand-600 text-white' : 'bg-gray-300 text-gray-600'
                  } font-bold text-sm`}>
                    2
                  </div>
                </div>
              </div>
            )}

            {!showOTPForm ? (
              <div>
                {currentStep === 1 && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-6">Basic Information</h3>
                    <Formik
                      initialValues={{
                        businessName: formData.businessName || '',
                        ownerName: formData.ownerName || '',
                        email: formData.email || '',
                        mobileNumber: formData.mobileNumber || '',
                        password: formData.password || '',
                        confirmPassword: formData.confirmPassword || ''
                      }}
                      initialErrors={formErrors}
                      enableReinitialize
                      validationSchema={Step1Schema}
                      onSubmit={handleStep1Submit}
                    >
                      {({ isSubmitting, errors, touched }) => (
                        <Form className="space-y-6">
                          {/* Business Name and Owner Name - Horizontal Layout with Icons */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                  </svg>
                                </div>
                                <Field
                                  type="text"
                                  name="businessName"
                                  id="businessName"
                                  className={`w-full pl-10 pr-0 py-3 border-0 border-b-2 border-gray-300 focus:border-brand-600 focus:ring-0 bg-transparent placeholder-gray-400 text-gray-900 transition-colors duration-200 ${
                                    errors.businessName && touched.businessName ? 'border-red-500' : ''
                                  }`}
                                  placeholder="Business Name"
                                />
                              </div>
                              <ErrorMessage name="businessName" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <div>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                  </svg>
                                </div>
                                <Field
                                  type="text"
                                  name="ownerName"
                                  id="ownerName"
                                  className={`w-full pl-10 pr-0 py-3 border-0 border-b-2 border-gray-300 focus:border-brand-600 focus:ring-0 bg-transparent placeholder-gray-400 text-gray-900 transition-colors duration-200 ${
                                    errors.ownerName && touched.ownerName ? 'border-red-500' : ''
                                  }`}
                                  placeholder="Owner Name"
                                />
                              </div>
                              <ErrorMessage name="ownerName" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                          </div>

                          {/* Email Field - Minimalist Design */}
                          <div>
                            <Field
                              type="email"
                              name="email"
                              id="email"
                              className={`w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-brand-600 focus:ring-0 bg-transparent placeholder-gray-400 text-gray-900 transition-colors duration-200 ${
                                errors.email && touched.email ? 'border-red-500' : ''
                              }`}
                              placeholder="Email Address"
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                            {formErrors.email && !errors.email && (
                              <div className="text-red-500 text-sm mt-1">{formErrors.email}</div>
                            )}
                          </div>

                          {/* Mobile Number Field - Minimalist Design */}
                          <div>
                            <Field
                              type="text"
                              name="mobileNumber"
                              id="mobileNumber"
                              className={`w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-brand-600 focus:ring-0 bg-transparent placeholder-gray-400 text-gray-900 transition-colors duration-200 ${
                                errors.mobileNumber && touched.mobileNumber ? 'border-red-500' : ''
                              }`}
                              placeholder="Business Contact Number"
                            />
                            <ErrorMessage name="mobileNumber" component="div" className="text-red-500 text-sm mt-1" />
                            {formErrors.mobileNumber && !errors.mobileNumber && (
                              <div className="text-red-500 text-sm mt-1">{formErrors.mobileNumber}</div>
                            )}
                          </div>

                          {/* Password and Confirm Password - Horizontal Layout */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Field
                                type="password"
                                name="password"
                                id="password"
                                className={`w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-brand-600 focus:ring-0 bg-transparent placeholder-gray-400 text-gray-900 transition-colors duration-200 ${
                                  errors.password && touched.password ? 'border-red-500' : ''
                                }`}
                                placeholder="Password"
                              />
                              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <div>
                              <Field
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                className={`w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-brand-600 focus:ring-0 bg-transparent placeholder-gray-400 text-gray-900 transition-colors duration-200 ${
                                  errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : ''
                                }`}
                                placeholder="Confirm Password"
                              />
                              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                          </div>

                          {/* Submit Button */}
                          <div>
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full py-3 px-4 bg-green-800 hover:bg-green-900 text-white font-medium rounded-lg transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isSubmitting ? 'Processing...' : 'Next'}
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                )}

                {currentStep === 2 && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-6">Business Details</h3>
                    <Formik
                      initialValues={{
                        hostType: formData.hostType || '',
                        venueType: formData.venueType || '',
                        maxGuestCapacity: formData.maxGuestCapacity || '',
                        address: formData.address || '',
                        city: formData.city || '',
                        zipCode: formData.zipCode || '',
                        services: formData.services || [],
                        termsAccepted: formData.termsAccepted || false
                      }}
                      validationSchema={Step2Schema}
                      onSubmit={handleStep2Submit}
                    >
                      {({ isSubmitting, errors, touched, values }) => (
                        <Form className="space-y-6">
                          {/* Host Type Field - Minimalist Design */}
                          <div>
                            <Field
                              as="select"
                              name="hostType"
                              id="hostType"
                              className={`w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-brand-600 focus:ring-0 bg-transparent text-gray-900 transition-colors duration-200 ${
                                errors.hostType && touched.hostType ? 'border-red-500' : ''
                              }`}
                            >
                              <option value="" className="text-gray-400">Select host type</option>
                              <option value="venue">Venue Owner</option>
                              <option value="caterer">Caterer</option>
                              <option value="decorator">Decorator</option>
                              <option value="organizer">Event Organizer</option>
                            </Field>
                            <ErrorMessage name="hostType" component="div" className="text-red-500 text-sm mt-1" />
                          </div>

                          {values.hostType === 'venue' && (
                            <>
                              {/* Venue Type Field - Minimalist Design */}
                              <div>
                                <Field
                                  as="select"
                                  name="venueType"
                                  id="venueType"
                                  className={`w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-brand-600 focus:ring-0 bg-transparent text-gray-900 transition-colors duration-200 ${
                                    errors.venueType && touched.venueType ? 'border-red-500' : ''
                                  }`}
                                >
                                  <option value="" className="text-gray-400">Select venue type</option>
                                  <option value="lawn">Lawn</option>
                                  <option value="banquet">Banquet</option>
                                  <option value="cafe">Cafe</option>
                                  <option value="hotel">Hotel</option>
                                  <option value="resort">Resort</option>
                                  <option value="other">Other</option>
                                </Field>
                                <ErrorMessage name="venueType" component="div" className="text-red-500 text-sm mt-1" />
                              </div>

                              {/* Max Guest Capacity Field - Minimalist Design */}
                              <div>
                                <Field
                                  type="number"
                                  name="maxGuestCapacity"
                                  id="maxGuestCapacity"
                                  min="1"
                                  className={`w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-brand-600 focus:ring-0 bg-transparent placeholder-gray-400 text-gray-900 transition-colors duration-200 ${
                                    errors.maxGuestCapacity && touched.maxGuestCapacity ? 'border-red-500' : ''
                                  }`}
                                  placeholder="Maximum Guest Capacity"
                                />
                                <ErrorMessage name="maxGuestCapacity" component="div" className="text-red-500 text-sm mt-1" />
                              </div>
                            </>
                          )}

                          {/* Address Field - Minimalist Design */}
                          <div>
                            <Field
                              as="textarea"
                              name="address"
                              id="address"
                              rows="2"
                              className={`w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-brand-600 focus:ring-0 bg-transparent placeholder-gray-400 text-gray-900 transition-colors duration-200 resize-none ${
                                errors.address && touched.address ? 'border-red-500' : ''
                              }`}
                              placeholder="Full Address"
                            />
                            <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
                          </div>

                          {/* City and ZIP Code - Horizontal Layout */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Field
                                type="text"
                                name="city"
                                id="city"
                                className={`w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-brand-600 focus:ring-0 bg-transparent placeholder-gray-400 text-gray-900 transition-colors duration-200 ${
                                  errors.city && touched.city ? 'border-red-500' : ''
                                }`}
                                placeholder="City"
                              />
                              <ErrorMessage name="city" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <div>
                              <Field
                                type="text"
                                name="zipCode"
                                id="zipCode"
                                className={`w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-brand-600 focus:ring-0 bg-transparent placeholder-gray-400 text-gray-900 transition-colors duration-200 ${
                                  errors.zipCode && touched.zipCode ? 'border-red-500' : ''
                                }`}
                                placeholder="ZIP/Postal Code"
                              />
                              <ErrorMessage name="zipCode" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                          </div>

                          {/* Services Checkbox Grid */}
                          <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">Services Provided</label>
                            <div className="grid grid-cols-2 gap-2">
                              <label className="flex items-center">
                                <Field
                                  type="checkbox"
                                  name="services"
                                  value="catering"
                                  className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
                                />
                                <span className="ml-2 text-sm text-gray-600">Catering</span>
                              </label>
                              <label className="flex items-center">
                                <Field
                                  type="checkbox"
                                  name="services"
                                  value="decoration"
                                  className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
                                />
                                <span className="ml-2 text-sm text-gray-600">Decoration</span>
                              </label>
                              <label className="flex items-center">
                                <Field
                                  type="checkbox"
                                  name="services"
                                  value="organization"
                                  className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
                                />
                                <span className="ml-2 text-sm text-gray-600">Organization</span>
                              </label>
                              <label className="flex items-center">
                                <Field
                                  type="checkbox"
                                  name="services"
                                  value="parking"
                                  className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
                                />
                                <span className="ml-2 text-sm text-gray-600">Parking</span>
                              </label>
                              <label className="flex items-center">
                                <Field
                                  type="checkbox"
                                  name="services"
                                  value="music"
                                  className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
                                />
                                <span className="ml-2 text-sm text-gray-600">Music</span>
                              </label>
                              <label className="flex items-center">
                                <Field
                                  type="checkbox"
                                  name="services"
                                  value="photography"
                                  className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
                                />
                                <span className="ml-2 text-sm text-gray-600">Photography</span>
                              </label>
                            </div>
                            <ErrorMessage name="services" component="div" className="text-red-500 text-sm mt-1" />
                          </div>

                          {/* Terms Checkbox */}
                          <div>
                            <label className="flex items-start">
                              <Field
                                type="checkbox"
                                name="termsAccepted"
                                className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded mt-1"
                              />
                              <span className="ml-2 text-sm text-gray-600">
                                I agree to{' '}
                                <Link href="/terms" className="text-brand-600 hover:text-brand-500">
                                  Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link href="/privacy" className="text-brand-600 hover:text-brand-500">
                                  Privacy Policy
                                </Link>
                              </span>
                            </label>
                            <ErrorMessage name="termsAccepted" component="div" className="text-red-500 text-sm mt-1" />
                          </div>

                          {errors.submit && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                              {errors.submit}
                            </div>
                          )}

                          {/* Navigation Buttons */}
                          <div className="flex space-x-4">
                            <button
                              type="button"
                              onClick={handleBackToStep1}
                              className="w-1/2 py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-300 ease-in-out"
                            >
                              Back
                            </button>
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-1/2 py-3 px-4 bg-green-800 hover:bg-green-900 text-white font-medium rounded-lg transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isSubmitting ? 'Registering...' : 'Register'}
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                )}

                {/* Already have account link */}
                <div className="mt-6 text-center text-sm text-gray-600">
                  Already a host?{' '}
                  <Link href="/login?userType=host" className="text-brand-600 hover:text-brand-500 font-medium">
                    Log In
                  </Link>
                </div>
              </div>
            ) : (
              <OTPVerification
                email={registeredEmail}
                mobileNumber={registeredMobile}
                onVerified={handleOTPVerified}
                onCancel={() => setShowOTPForm(false)}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HostRegister;
