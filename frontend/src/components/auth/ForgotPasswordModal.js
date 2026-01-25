import { useState } from 'react';
import { toast } from 'react-toastify';
import { FiX, FiMail, FiCheck, FiArrowLeft } from 'react-icons/fi';
import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import Logo from '../common/Logo';

function ForgotPasswordModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setEmailSent(true);
      } else {
        // For security, don't reveal if email exists or not
        setEmailSent(true);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Transition show={isOpen} as="div">
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={onClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as="div"
            className="fixed inset-0 bg-black/30"
            aria-hidden="true"
          />

          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title
                as="h3"
                className="text-2xl font-bold text-gray-900"
              >
                {emailSent ? 'Check Your Email' : 'Forgot Password?'}
              </Dialog.Title>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-4">
              {!emailSent ? (
                <>
                  <p className="text-sm text-gray-500 mb-6">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiMail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center py-4">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                    <FiCheck className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Check Your Email
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">
                    We've sent a password reset link to <span className="font-medium">{email}</span>. 
                    The link will expire in 1 hour.
                  </p>
                  <p className="text-xs text-gray-500">
                    Didn't receive the email?{' '}
                    <button
                      onClick={() => setEmailSent(false)}
                      className="text-blue-600 hover:text-blue-500 font-medium"
                    >
                      Click to resend
                    </button>
                  </p>
                </div>
              )}

              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center justify-center mx-auto"
                >
                  <FiArrowLeft className="mr-1" /> Back to Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ForgotPasswordModal;