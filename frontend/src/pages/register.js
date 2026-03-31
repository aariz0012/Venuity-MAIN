import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FiUser, FiMail, FiPhone, FiLock, FiMapPin } from 'react-icons/fi';
import Layout from '../components/Layout/Layout';
import OTPVerification from '../components/auth/OTPVerification';

// Static export - no server-side rendering needed

const Register = () => {
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [registeredMobile, setRegisteredMobile] = useState('');
  
  const router = useRouter();

  // Validation schema
  const RegisterSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .required('Full name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    mobileNumber: Yup.string()
      .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
      .required('Mobile number is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
    address: Yup.string()
      .required('Address is required'),
    termsAccepted: Yup.boolean()
      .oneOf([true], 'You must accept the terms and conditions')
  });

  // Handle registration submission
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      // Build payload expected by backend
      const userData = {
        fullName: values.fullName,       // backend expects "fullName"
        email: values.email,
        mobileNumber: values.mobileNumber,
        password: values.password,
        address: values.address
      };

      // Call backend directly
      const response = await fetch("https://venuity-backend.onrender.com/api/auth/register/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (response.ok) {
        setRegisteredEmail(values.email);
        setRegisteredMobile(values.mobileNumber);
        setShowOTPForm(true);
        toast.success('Registration successful! Please verify your email and mobile.');
      } else {
        toast.error(data.error || 'Registration failed. Please try again.');
        setErrors({ submit: data.error || 'Registration failed' });
      }
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      setErrors({ submit: 'Registration failed' });
    } finally {
      setSubmitting(false);
    }
  };

  // Handle OTP verification success
  const handleOTPVerified = () => {
    toast.success('Verification successful!');
    router.push('/login');
  };

  return (
    <Layout title="Register - Venuity">
      <div className="min-h-screen bg-white flex">
        {/* Left Column - Brand Visuals (60%) */}
        <div className="w-3/5 bg-gray-50 relative overflow-hidden">
          {/* Geometric Grid Background - Positioned at Top */}
          <div className="relative w-full h-1/2 grid grid-cols-4 grid-rows-4 gap-0 scale-87">
            {/* Mix of solid colors and images */}
            <div className="bg-white opacity-80"></div>
            <img src="/images/wedding-couple.jpg" alt="Happy wedding couple" className="object-cover w-full h-full opacity-100" />
            <div className="bg-white opacity-80"></div>
            <img src="/images/corporate-event.jpg" alt="Corporate event setup" className="object-cover w-full h-full opacity-100" />

            <img src="/images/birthday-party.jpg" alt="Birthday celebration" className="object-cover w-full h-full opacity-100" />
            <div className="bg-white opacity-80"></div>
            <img src="/images/elegant-dinner.jpg" alt="Elegant dinner venue" className="object-cover w-full h-full opacity-100" />
            <div className="bg-white opacity-80"></div>

            <div className="bg-white opacity-80"></div>
            <img src="/images/outdoor-ceremony.jpg" alt="Outdoor ceremony" className="object-cover w-full h-full opacity-100" />
            <div className="bg-white opacity-80"></div>
            <img src="/images/conference-hall.jpg" alt="Conference hall setup" className="object-cover w-full h-full opacity-100" />

            <img src="/images/buffet-setup.jpg" alt="Beautiful buffet setup" className="object-cover w-full h-full opacity-100" />
            <div className="bg-white opacity-80"></div>
            <img src="/images/celebration-dance.jpg" alt="Celebration dance floor" className="object-cover w-full h-full opacity-100" />
            <div className="bg-white opacity-80"></div>
          </div>

          {/* Text Content - Below Grid */}
          <div className="relative z-10 h-1/2 flex items-center justify-center pt-4 pb-12">
            <div className="text-center text-gray-800 max-w-2xl">
              <h1 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                Your journey to unforgettable events starts here.
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-6">
                Create your account to discover exclusive venues and seamless booking experiences tailored just for you.
              </p>
              <div className="flex justify-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-600">5,000+</div>
                  <div className="text-sm text-gray-600">Events</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-600">1,000+</div>
                  <div className="text-sm text-gray-600">Premium Venues</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-600">50K+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Join Venuity</h2>

            {!showOTPForm ? (
              <Formik
                initialValues={{
                  fullName: '',
                  email: '',
                  mobileNumber: '',
                  password: '',
                  confirmPassword: '',
                  address: '',
                  termsAccepted: false
                }}
                validationSchema={RegisterSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form className="space-y-6">
                    {/* Google Sign In Button */}
                    <div>
                      <button
                        type="button"
                        className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                      >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Sign up with Google
                      </button>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or continue with email</span>
                      </div>
                    </div>

                    {/* Full Name and Mobile Number - Horizontal Layout */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Field
                          type="text"
                          name="fullName"
                          id="fullName"
                          className={`w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-brand-600 focus:ring-0 bg-transparent placeholder-gray-400 text-gray-900 transition-colors duration-200 ${
                            errors.fullName && touched.fullName ? 'border-red-500' : ''
                          }`}
                          placeholder="Full Name"
                        />
                        <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                      <div>
                        <Field
                          type="text"
                          name="mobileNumber"
                          id="mobileNumber"
                          className={`w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-brand-600 focus:ring-0 bg-transparent placeholder-gray-400 text-gray-900 transition-colors duration-200 ${
                            errors.mobileNumber && touched.mobileNumber ? 'border-red-500' : ''
                          }`}
                          placeholder="Mobile Number"
                        />
                        <ErrorMessage name="mobileNumber" component="div" className="text-red-500 text-sm mt-1" />
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
                        placeholder="Email"
                      />
                      <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    {/* Password Field - Minimalist Design */}
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

                    {/* Confirm Password Field - Minimalist Design */}
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
                        placeholder="Address"
                      />
                      <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    {/* Terms */}
                    <div>
                      <label className="flex items-start">
                        <Field
                          type="checkbox"
                          name="termsAccepted"
                          className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded mt-1"
                        />
                        <span className="ml-2 text-sm text-gray-600">
                          I agree to the{' '}
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

                    {/* Submit Button */}
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 px-4 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Creating Account...' : 'Create Account'}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            ) : (
              <OTPVerification
                email={registeredEmail}
                mobileNumber={registeredMobile}
                onVerificationSuccess={handleOTPVerified}
              />
            )}

            {/* Already have account link */}
            <div className="mt-6 text-center text-sm text-gray-600">
              Already a member?{' '}
              <Link href="/login" className="text-brand-600 hover:text-brand-500 font-medium">
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
