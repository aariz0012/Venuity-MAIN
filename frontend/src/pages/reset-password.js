import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { FiLock, FiCheck, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';
import Logo from '../components/common/Logo';

export default function ResetPassword() {
  const router = useRouter();
  const { token } = router.query;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to reset password');
      }

      toast.success('Password reset successfully!');
      setIsSuccess(true);
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPasswordStrength = (pass) => {
    if (!pass) return 0;
    let strength = 0;
    if (pass.length >= 8) strength += 1;
    if (pass.match(/[a-z]+/)) strength += 1;
    if (pass.match(/[A-Z]+/)) strength += 1;
    if (pass.match(/[0-9]+/)) strength += 1;
    if (pass.match(/[!@#$%^&*(),.?":{}|<>]+/)) strength += 1;
    return strength;
  };

  const passwordStrength = getPasswordStrength(password);
  const passwordStrengthText = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'][passwordStrength];

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Logo withTagline={false} />
          </div>
          <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <FiCheck className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="mt-3 text-2xl font-extrabold text-gray-900">
                Password Updated Successfully!
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Your password has been successfully updated.
              </p>
              <div className="mt-6">
                <Link
                  href="/login"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Logo withTagline={false} />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Reset Your Password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Please create a new password for your account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter new password"
                />
              </div>
              <div className="mt-1">
                <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      passwordStrength < 2
                        ? 'bg-red-500'
                        : passwordStrength < 4
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Password Strength: <span className="font-medium">{passwordStrengthText}</span>
                </p>
                <ul className="text-xs text-gray-500 mt-2 space-y-1">
                  <li className={`flex items-center ${password.length >= 8 ? 'text-green-600' : ''}`}>
                    <FiCheck className="mr-1" /> At least 8 characters
                  </li>
                  <li className={`flex items-center ${password.match(/[0-9]+/) ? 'text-green-600' : ''}`}>
                    <FiCheck className="mr-1" /> At least one number
                  </li>
                  <li className={`flex items-center ${password.match(/[!@#$%^&*(),.?":{}|<>]+/) ? 'text-green-600' : ''}`}>
                    <FiCheck className="mr-1" /> At least one special character
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Remember your password?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/login"
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <FiArrowLeft className="mr-2" /> Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}