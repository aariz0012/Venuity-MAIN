import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FiMail, FiLock, FiUser, FiHome } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout/Layout';
import ForgotPasswordModal from '../components/auth/ForgotPasswordModal';

const Login = () => {
  const [userType, setUserType] = useState('user'); // 'user' or 'host'
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { loginUser, loginHost } = useAuth();
  const router = useRouter();
 
  // Get the redirect path from location state or default to '/'
  const from = router.query.from || '/';
 
  // Validation schema
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
  });
 
  // Handle login submission
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
  try {
    console.log('Login attempt with:', { 
      email: values.email, 
      userType 
    });
 
    setSubmitting(true);
    setErrors({});
 
    let response;
 
    if (userType === 'user') {
      response = await loginUser(values.email, values.password);
    } else {
      response = await loginHost(values.email, values.password);
    }
 
    if (response && response.success) {
      toast.success('Login successful!');
      router.push(userType === 'user' ? '/dashboard' : '/host/dashboard');
      return;
    } else {
      throw new Error(response?.error || 'Login failed. Please check your credentials.');
    }
  } catch (error) {
    console.error('Login error:', {
      error,
      message: error.message,
      response: error.response?.data
    });
 
    let errorMessage = error.message || 'Login failed. Please try again.';
 
    if (error.response) {
      if (error.response.status === 401) {
        errorMessage = 'Invalid email or password. Please try again.';
      } else if (error.response.status === 403) {
        errorMessage = 'Account not verified. Please check your email for verification link.';
      } else if (error.response.data?.error) {
        errorMessage = error.response.data.error;
      }
    }
 
    toast.error(errorMessage);
    setErrors({ submit: errorMessage });
  } finally {
    setSubmitting(false);
  }
};
 
  return (
    <Layout title="Login - Venuity">
      <div className="min-h-screen bg-white flex">
        {/* Left Column - Login Form (40%) */}
        <div className="w-2/5 flex items-start justify-center p-12">
          <div className="w-full max-w-sm">
            {/* Simple Login Header */}
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Login</h2>
 
            {/* User/Host Toggle - Sleek Tabs */}
            <div className="flex mb-8 bg-gray-100 rounded-lg p-1">
              <button
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-300 ease-in-out ${
                  userType === 'user'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setUserType('user')}
              >
                User
              </button>
              <button
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-300 ease-in-out ${
                  userType === 'host'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setUserType('host')}
              >
                Host
              </button>
            </div>
 
            <Formik
              initialValues={{
                email: '',
                password: ''
              }}
              validationSchema={LoginSchema}
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
                      Sign in with Google
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
 
                  <div className="flex justify-between items-center">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
                      <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-sm text-brand-600 hover:text-brand-500"
                    >
                      Forgot password?
                    </button>
                  </div>
 
                  {errors.submit && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                      {errors.submit}
                    </div>
                  )}
 
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ease-in-out disabled:opacity-50 ${
                        userType === 'host'
                          ? 'bg-brand-800 hover:bg-brand-900 text-white'
                          : 'bg-brand-600 hover:bg-brand-700 text-white'
                      }`}
                    >
                      {isSubmitting ? 'Signing in...' : 'Sign In'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
 
            <div className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/register" className="text-brand-600 hover:text-brand-500 font-medium">
                Sign up
              </Link>
            </div>
          </div>
        </div>
 
        {/* Right Column - Brand Visuals (60%) */}
        <div className="w-3/5 bg-gray-50 relative overflow-hidden">
          {/* Geometric Grid Background - Positioned at Top */}
          <div className="relative w-full h-1/2 grid grid-cols-4 grid-rows-4 gap-0 scale-87">
            {/* Mix of solid colors and images - Different for User vs Host */}
            <div className={`bg-white transition-opacity duration-300 ease-in-out ${
              userType === 'host' ? 'opacity-60' : 'opacity-80'
            }`}></div>
            {userType === 'host' ? (
              <img src="/images/host-venue-management.jpg" alt="Venue management dashboard" className={`object-cover w-full h-full transition-opacity duration-300 ease-in-out ${
                userType === 'host' ? 'opacity-60' : 'opacity-100'
              }`} />
            ) : (
              <img src="/images/wedding-couple.jpg" alt="Happy wedding couple" className={`object-cover w-full h-full transition-opacity duration-300 ease-in-out ${
                userType === 'host' ? 'opacity-60' : 'opacity-100'
              }`} />
            )}
            <div className={`bg-white transition-opacity duration-300 ease-in-out ${
              userType === 'host' ? 'opacity-60' : 'opacity-80'
            }`}></div>
            {userType === 'host' ? (
              <img src="/images/host-booking-calendar.jpg" alt="Booking calendar management" className={`object-cover w-full h-full transition-opacity duration-300 ease-in-out ${
                userType === 'host' ? 'opacity-60' : 'opacity-100'
              }`} />
            ) : (
              <img src="/images/corporate-event.jpg" alt="Corporate event setup" className={`object-cover w-full h-full transition-opacity duration-300 ease-in-out ${
                userType === 'host' ? 'opacity-60' : 'opacity-100'
              }`} />
            )}
 
            {userType === 'host' ? (
              <img src="/images/host-revenue-analytics.jpg" alt="Revenue analytics dashboard" className={`object-cover w-full h-full transition-opacity duration-300 ease-in-out ${
                userType === 'host' ? 'opacity-60' : 'opacity-100'
              }`} />
            ) : (
              <img src="/images/birthday-party.jpg" alt="Birthday celebration" className={`object-cover w-full h-full transition-opacity duration-300 ease-in-out ${
                userType === 'host' ? 'opacity-60' : 'opacity-100'
              }`} />
            )}
            <div className={`bg-white transition-opacity duration-300 ease-in-out ${
              userType === 'host' ? 'opacity-60' : 'opacity-80'
            }`}></div>
            {userType === 'host' ? (
              <img src="/images/host-property-listing.jpg" alt="Property listing interface" className={`object-cover w-full h-full transition-opacity duration-300 ease-in-out ${
                userType === 'host' ? 'opacity-60' : 'opacity-100'
              }`} />
            ) : (
              <img src="/images/elegant-dinner.jpg" alt="Elegant dinner venue" className={`object-cover w-full h-full transition-opacity duration-300 ease-in-out ${
                userType === 'host' ? 'opacity-60' : 'opacity-100'
              }`} />
            )}
            <div className={`bg-white transition-opacity duration-300 ease-in-out ${
              userType === 'host' ? 'opacity-60' : 'opacity-80'
            }`}></div>
 
            <div className={`bg-white transition-opacity duration-300 ease-in-out ${
              userType === 'host' ? 'opacity-60' : 'opacity-80'
            }`}></div>
            {userType === 'host' ? (
              <img src="/images/host-event-planners.jpg" alt="Event planners network" className={`object-cover w-full h-full transition-opacity duration-300 ease-in-out ${
                userType === 'host' ? 'opacity-60' : 'opacity-100'
              }`} />
            ) : (
              <img src="/images/outdoor-ceremony.jpg" alt="Outdoor ceremony" className={`object-cover w-full h-full transition-opacity duration-300 ease-in-out ${
                userType === 'host' ? 'opacity-60' : 'opacity-100'
              }`} />
            )}
            <div className={`bg-white transition-opacity duration-300 ease-in-out ${
              userType === 'host' ? 'opacity-60' : 'opacity-80'
            }`}></div>
            {userType === 'host' ? (
              <img src="/images/host-earning-reports.jpg" alt="Earnings and financial reports" className={`object-cover w-full h-full transition-opacity duration-300 ease-in-out ${
                userType === 'host' ? 'opacity-60' : 'opacity-100'
              }`} />
            ) : (
              <img src="/images/conference-hall.jpg" alt="Conference hall setup" className={`object-cover w-full h-full transition-opacity duration-300 ease-in-out ${
                userType === 'host' ? 'opacity-60' : 'opacity-100'
              }`} />
            )}
 
            {userType === 'host' ? (
              <img src="/images/host-customer-support.jpg" alt="Customer support dashboard" className={`object-cover w-full h-full transition-opacity duration-300 ease-in-out ${
                userType === 'host' ? 'opacity-60' : 'opacity-100'
              }`} />
            ) : (
              <img src="/images/buffet-setup.jpg" alt="Beautiful buffet setup" className={`object-cover w-full h-full transition-opacity duration-300 ease-in-out ${
                userType === 'host' ? 'opacity-60' : 'opacity-100'
              }`} />
            )}
            <div className={`bg-white transition-opacity duration-300 ease-in-out ${
              userType === 'host' ? 'opacity-60' : 'opacity-80'
            }`}></div>
            {userType === 'host' ? (
              <img src="/images/host-growth-metrics.jpg" alt="Business growth metrics" className={`object-cover w-full h-full transition-opacity duration-300 ease-in-out ${
                userType === 'host' ? 'opacity-60' : 'opacity-100'
              }`} />
            ) : (
              <img src="/images/celebration-dance.jpg" alt="Celebration dance floor" className={`object-cover w-full h-full transition-opacity duration-300 ease-in-out ${
                userType === 'host' ? 'opacity-60' : 'opacity-100'
              }`} />
            )}
            <div className={`bg-white transition-opacity duration-300 ease-in-out ${
              userType === 'host' ? 'opacity-60' : 'opacity-80'
            }`}></div>
          </div>

          {/* Text Content - Below Grid */}
          <div className="relative z-10 h-1/2 flex items-center justify-center pt-4 pb-12">
            <div className="text-center text-gray-800 max-w-2xl">
              <h1 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                <span className={`inline-block transition-all duration-300 ease-in-out ${
                  userType === 'user' 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-4 absolute'
                }`}>
                  Find the perfect space for your next big moment.
                </span>
                <span className={`inline-block transition-all duration-300 ease-in-out ${
                  userType === 'host' 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-4 absolute'
                }`}>
                  Turn your space into a thriving business
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-6">
                {userType === 'host' 
                  ? "Manage bookings, track earnings, and showcase your property to India's top event planners" 
                  : "From intimate gatherings to grand celebrations, discover venues that bring your vision to life."
                }
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
      </div>
 
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </Layout>
  );
};
 
export default Login;

