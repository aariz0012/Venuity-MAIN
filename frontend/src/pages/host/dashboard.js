import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout/Layout';
import { motion } from 'framer-motion';
import { FiHome, FiPlus, FiCalendar, FiDollarSign, FiUsers, FiSettings, FiBarChart2, FiTrendingUp, FiMapPin } from 'react-icons/fi';

const HostDashboard = () => {
  const { host, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalVenues: 0,
    activeBookings: 0,
    monthlyRevenue: 0,
    customerRating: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    if (loading) return;
    
    // Redirect if not a host
    if (!host) {
      router.push('/login');
      return;
    }

    // Fetch host statistics and recent bookings
    fetchHostData();
  }, [host, loading, router]);

  const fetchHostData = async () => {
    try {
      // Mock data for now - replace with actual API calls
      setStats({
        totalVenues: 5,
        activeBookings: 12,
        monthlyRevenue: 45000,
        customerRating: 4.8
      });

      setRecentBookings([
        {
          id: 1,
          venue: 'Luxury Banquet Hall',
          customer: 'John Doe',
          date: '2024-03-25',
          amount: 25000,
          status: 'confirmed'
        },
        {
          id: 2,
          venue: 'Garden Paradise',
          customer: 'Jane Smith',
          date: '2024-03-28',
          amount: 15000,
          status: 'pending'
        },
        {
          id: 3,
          venue: 'Rooftop Lounge',
          customer: 'Mike Johnson',
          date: '2024-04-01',
          amount: 35000,
          status: 'confirmed'
        }
      ]);
    } catch (error) {
      console.error('Error fetching host data:', error);
    }
  };

  if (loading) {
    return (
      <Layout title="Loading...">
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    );
  }

  if (!host) {
    return null; // Will redirect in useEffect
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <Layout title="Host Dashboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back, {host.businessName || 'Host'}!
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              Manage your venues and track your performance.
            </p>
          </div>
          <div className="mt-4 flex items-center md:mt-0 md:ml-4 space-x-3">
            <button
              onClick={() => router.push('/host/venues/new')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <FiPlus className="-ml-1 mr-2 h-5 w-5" />
              Add New Venue
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-primary-500 rounded-md p-3">
                  <FiHome className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Total Venues
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900 dark:text-white">
                      {stats.totalVenues}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <FiCalendar className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Active Bookings
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900 dark:text-white">
                      {stats.activeBookings}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <FiDollarSign className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Monthly Revenue
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900 dark:text-white">
                      ₹{stats.monthlyRevenue.toLocaleString()}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                  <FiUsers className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Customer Rating
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900 dark:text-white">
                      ⭐ {stats.customerRating}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Bookings */}
          <div className="lg:col-span-2">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 shadow rounded-lg"
            >
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Recent Bookings
                </h3>
              </div>
              <div className="overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                  {recentBookings.length > 0 ? (
                    <div className="space-y-4">
                      {recentBookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <FiCalendar className="h-8 w-8 text-primary-500" />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                {booking.venue}
                              </h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Customer: {booking.customer}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Date: {booking.date}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              ₹{booking.amount.toLocaleString()}
                            </p>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              booking.status === 'confirmed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {booking.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FiCalendar className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                        No recent bookings
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Your recent bookings will appear here.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ delay: 0.5 }}
              className="bg-white dark:bg-gray-800 shadow rounded-lg"
            >
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Quick Actions
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <button
                    onClick={() => router.push('/host/venues')}
                    className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                        <FiHome className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          My Venues
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Manage your venues
                        </p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => router.push('/host/bookings')}
                    className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                        <FiCalendar className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          Bookings
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          View all bookings
                        </p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => router.push('/host/analytics')}
                    className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                        <FiBarChart2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          Analytics
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          View performance metrics
                        </p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => router.push('/host/settings')}
                    className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                        <FiSettings className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          Settings
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Account settings
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HostDashboard;
