import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout/Layout';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  FiHome, FiPlus, FiCalendar, FiDollarSign, FiUsers, FiSettings, FiBarChart2, FiTrendingUp, FiMapPin,
  FiUser, FiImage, FiCheckCircle, FiClock, FiZap, FiShield, FiMail, FiX, FiHeadphones, FiEye,
  FiAlertCircle, FiCheckCircle as FiCheckCircleIcon, FiInfo
} from 'react-icons/fi';

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
  
  // Settings states
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState('profile');
  const [activeSubCategory, setActiveSubCategory] = useState('basic');
  const [settings, setSettings] = useState({
    // Venue Profile & Identity
    businessName: '',
    businessType: '',
    description: '',
    contactEmail: '',
    contactPhone: '',
    website: '',
    address: '',
    
    // Media Gallery
    images: [],
    
    // Amenity Checklist
    amenities: {
      'WiFi': false,
      'AC': false,
      'Parking': false,
      'Catering': false,
      'Sound System': false,
      'Stage': false,
      'Projector': false,
      'Dance Floor': false,
      'Bar': false,
      'Restrooms': false,
      'Outdoor Space': false,
      'Kitchen': false
    },
    
    // Operational Hours
    openingTime: '09:00',
    closingTime: '23:00',
    blackoutDates: [],
    
    // Business & Financial
    payoutMethod: '',
    gstEnabled: false,
    gstNumber: '',
    cancellationPolicy: 'moderate',
    
    // AI & Automation Control
    aiSummaryFrequency: 'weekly',
    autoResponder: false,
    aiCredits: 100,
    
    // Security & Audit Logs
    twoFactorEnabled: false,
    activityHistory: [],
    staffAccounts: [],
    
    // Notification Preferences
    bookingAlerts: 'email',
    lowCreditAlerts: true
  });

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

  // Settings management functions
  const handleOpenSettings = () => {
    setShowSettingsDialog(true);
  };

  const handleCloseSettings = () => {
    setShowSettingsDialog(false);
  };

  const handleSettingsChange = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: category === 'amenities' 
        ? { ...prev[category], [field]: value }
        : { ...prev, [field]: value }
    }));
  };

  const handleAmenityToggleSettings = (amenity) => {
    setSettings(prev => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [amenity]: !prev.amenities[amenity]
      }
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setSettings(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls]
    }));
  };

  const handleDeleteImage = (index) => {
    setSettings(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleAddBlackoutDate = (date) => {
    setSettings(prev => ({
      ...prev,
      blackoutDates: [...prev.blackoutDates, date]
    }));
  };

  const handleRemoveBlackoutDate = (date) => {
    setSettings(prev => ({
      ...prev,
      blackoutDates: prev.blackoutDates.filter(d => d !== date)
    }));
  };

  const handleSaveSettings = () => {
    // Save settings to backend
    console.log('Saving settings:', settings);
    setShowSettingsDialog(false);
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
                    onClick={handleOpenSettings}
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

        {/* Settings Dialog */}
        {showSettingsDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div 
              className="bg-white rounded-xl p-6 w-full max-w-7xl max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                  <FiSettings className="mr-3 text-blue-600" />
                  Settings
                </h2>
                <button 
                  onClick={handleCloseSettings}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FiX size={24} />
                </button>
              </div>

              {/* Main Settings Tabs */}
              <div className="flex space-x-1 mb-6 border-b">
                {[
                  { id: 'profile', label: 'Venue Profile & Identity', icon: <FiUser /> },
                  { id: 'financial', label: 'Business & Financial', icon: <FiDollarSign /> },
                  { id: 'ai', label: 'AI & Automation Control', icon: <FiZap /> },
                  { id: 'security', label: 'Security & Audit Logs', icon: <FiShield /> },
                  { id: 'notifications', label: 'Notification Preferences', icon: <FiMail /> }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSettingsTab(tab.id)}
                    className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                      activeSettingsTab === tab.id 
                        ? 'text-indigo-600 border-indigo-600 bg-indigo-50' 
                        : 'text-gray-600 border-transparent hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    <span className="inline mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="space-y-8">
                {/* Venue Profile & Identity */}
                {activeSettingsTab === 'profile' && (
                  <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <FiUser className="mr-3 text-blue-600" />
                      Venue Profile & Identity
                    </h3>
                    
                    {/* Sub-category Navigation */}
                    <div className="flex space-x-2 mb-6 border-b">
                      {[
                        { id: 'basic', label: 'Basic Info', icon: <FiUser /> },
                        { id: 'media', label: 'Media Gallery', icon: <FiImage /> },
                        { id: 'amenities', label: 'Amenity Checklist', icon: <FiCheckCircle /> },
                        { id: 'hours', label: 'Operational Hours', icon: <FiClock /> }
                      ].map(sub => (
                        <button
                          key={sub.id}
                          onClick={() => setActiveSubCategory(sub.id)}
                          className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                            activeSubCategory === sub.id 
                              ? 'text-indigo-600 border-indigo-600' 
                              : 'text-gray-600 border-transparent hover:text-gray-800'
                          }`}
                        >
                          <span className="inline mr-2">{sub.icon}</span>
                          {sub.label}
                        </button>
                      ))}
                    </div>

                    {/* Basic Info Sub-category */}
                    {activeSubCategory === 'basic' && (
                      <motion.div 
                        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                          <span className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm mr-3">1</span>
                          Basic Information
                        </h4>
                        <div className="space-y-4">
                          <div className="group">
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              Business Name
                            </label>
                            <input
                              type="text"
                              value={settings.businessName}
                              onChange={(e) => handleSettingsChange('profile', 'businessName', e.target.value)}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm"
                              placeholder="Your Business Name"
                            />
                          </div>
                          <div className="group">
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              Business Type
                            </label>
                            <select
                              value={settings.businessType}
                              onChange={(e) => handleSettingsChange('profile', 'businessType', e.target.value)}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm"
                            >
                              <option value="">Select Type</option>
                              <option value="banquet">Banquet Hall</option>
                              <option value="conference">Conference Center</option>
                              <option value="outdoor">Outdoor Venue</option>
                              <option value="restaurant">Restaurant</option>
                              <option value="hotel">Hotel</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                          <div className="group">
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              Description
                            </label>
                            <textarea
                              value={settings.description}
                              onChange={(e) => handleSettingsChange('profile', 'description', e.target.value)}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm"
                              rows="4"
                              placeholder="Describe your business..."
                            />
                          </div>
                          <div className="group">
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              Contact Email
                            </label>
                            <input
                              type="email"
                              value={settings.contactEmail}
                              onChange={(e) => handleSettingsChange('profile', 'contactEmail', e.target.value)}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm"
                              placeholder="contact@business.com"
                            />
                          </div>
                          <div className="group">
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              Contact Phone
                            </label>
                            <input
                              type="tel"
                              value={settings.contactPhone}
                              onChange={(e) => handleSettingsChange('profile', 'contactPhone', e.target.value)}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm"
                              placeholder="+91 98765 43210"
                            />
                          </div>
                          <div className="group">
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              Website
                            </label>
                            <input
                              type="url"
                              value={settings.website}
                              onChange={(e) => handleSettingsChange('profile', 'website', e.target.value)}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm"
                              placeholder="https://yourbusiness.com"
                            />
                          </div>
                          <div className="group">
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              Address
                            </label>
                            <textarea
                              value={settings.address}
                              onChange={(e) => handleSettingsChange('profile', 'address', e.target.value)}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm"
                              rows="3"
                              placeholder="Full business address"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Media Gallery Sub-category */}
                    {activeSubCategory === 'media' && (
                      <motion.div 
                        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                          <span className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm mr-3">2</span>
                          Media Gallery
                        </h4>
                        <div className="border-2 border-dashed border-purple-300 rounded-lg p-6 bg-white">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            {settings.images.map((image, index) => (
                              <div key={index} className="relative group">
                                <Image 
                                  src={image} 
                                  alt={`Venue image ${index + 1}`}
                                  width={200} 
                                  height={150}
                                  className="w-full h-32 object-cover rounded-lg shadow-md group-hover:shadow-xl transition-shadow duration-200"
                                />
                                <button
                                  onClick={() => handleDeleteImage(index)}
                                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600"
                                >
                                  <FiX size={12} />
                                </button>
                              </div>
                            ))}
                          </div>
                          <div className="text-center">
                            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                              <FiImage size={32} className="text-purple-600" />
                            </div>
                            <p className="text-sm text-gray-600 mb-2">Upload high-quality venue photos</p>
                            <p className="text-xs text-gray-500 mb-4">PNG, JPG, GIF up to 10MB</p>
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                              id="media-upload"
                            />
                            <label
                              htmlFor="media-upload"
                              className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg cursor-pointer hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                              Select Images
                            </label>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Amenity Checklist Sub-category */}
                    {activeSubCategory === 'amenities' && (
                      <motion.div 
                        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                          <span className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm mr-3">3</span>
                          Amenity Checklist
                        </h4>
                        <p className="text-sm text-gray-600 mb-6 bg-green-100 p-3 rounded-lg">Toggle amenities that are available at your venue</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {Object.entries(settings.amenities).map(([amenity, available]) => (
                            <motion.div 
                              key={amenity} 
                              className={`flex items-center space-x-3 cursor-pointer p-4 rounded-lg border-2 transition-all duration-200 ${
                                available 
                                  ? 'bg-green-50 border-green-300 hover:bg-green-100' 
                                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <input
                                type="checkbox"
                                checked={available}
                                onChange={() => handleAmenityToggleSettings(amenity)}
                                className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                              />
                              <span className={`text-sm font-medium ${available ? 'text-green-800' : 'text-gray-700'}`}>{amenity}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Operational Hours Sub-category */}
                    {activeSubCategory === 'hours' && (
                      <motion.div 
                        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                          <span className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm mr-3">4</span>
                          Operational Hours
                        </h4>
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-4 rounded-lg border border-orange-200">
                              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <FiClock className="mr-2 text-orange-600" />
                                Opening Time
                              </label>
                              <input
                                type="time"
                                value={settings.openingTime}
                                onChange={(e) => handleSettingsChange('operations', 'openingTime', e.target.value)}
                                className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                              />
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-orange-200">
                              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <FiClock className="mr-2 text-orange-600" />
                                Closing Time
                              </label>
                              <input
                                type="time"
                                value={settings.closingTime}
                                onChange={(e) => handleSettingsChange('operations', 'closingTime', e.target.value)}
                                className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                              />
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-lg border border-orange-200">
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                              <FiCalendar className="mr-2 text-orange-600" />
                              Blackout Dates (Maintenance)
                            </label>
                            <p className="text-sm text-gray-600 mb-3">Prevent double-bookings during maintenance</p>
                            <input
                              type="date"
                              onChange={(e) => {
                                if (e.target.value && !settings.blackoutDates.includes(e.target.value)) {
                                  handleAddBlackoutDate(e.target.value);
                                }
                              }}
                              className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                            />
                            <div className="flex flex-wrap gap-2 mt-3">
                              {settings.blackoutDates.map((date, index) => (
                                <span key={index} className="inline-flex items-center bg-red-100 text-red-800 px-3 py-2 rounded-full text-xs font-medium">
                                  {date}
                                  <button
                                    onClick={() => handleRemoveBlackoutDate(date)}
                                    className="ml-2 text-red-600 hover:text-red-800"
                                  >
                                    <FiX size={12} />
                                  </button>
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Business & Financial */}
                {activeSettingsTab === 'financial' && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <FiDollarSign className="mr-3 text-green-600" />
                      Business & Financial
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Payout Methods */}
                      <motion.div 
                        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                          <span className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm mr-3">1</span>
                          Payout Methods
                          <div className="relative group ml-2">
                            <FiInfo className="w-4 h-4 text-gray-400 cursor-help" />
                            <div className="absolute left-0 top-6 z-10 w-64 p-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-lg">
                              <div className="text-gray-300">Connect your bank account to receive automated settlements after successful events</div>
                              <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-800 transform rotate-45"></div>
                            </div>
                          </div>
                        </h4>
                        <div className="space-y-4">
                          <select
                            value={settings.payoutMethod}
                            onChange={(e) => handleSettingsChange('financial', 'payoutMethod', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm"
                          >
                            <option value="">Select Method</option>
                            <option value="bank">Bank Transfer</option>
                            <option value="upi">UPI</option>
                            <option value="paypal">PayPal</option>
                            <option value="stripe">Stripe</option>
                          </select>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <FiShield className="text-blue-600" />
                            Secure payment processing
                          </div>
                        </div>
                      </motion.div>

                      {/* GST Configuration */}
                      <motion.div 
                        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                          <span className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm mr-3">2</span>
                          GST Configuration
                          <div className="relative group ml-2">
                            <FiInfo className="w-4 h-4 text-gray-400 cursor-help" />
                            <div className="absolute left-0 top-6 z-10 w-64 p-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-lg">
                              <div className="text-gray-300">Toggle this to include GST on customer invoices. Required for businesses with ₹20L+ turnover</div>
                              <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-800 transform rotate-45"></div>
                            </div>
                          </div>
                        </h4>
                        <div className="space-y-4">
                          <div className="bg-white p-4 rounded-lg border border-green-200">
                            <label className="flex items-center space-x-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={settings.gstEnabled}
                                onChange={(e) => handleSettingsChange('financial', 'gstEnabled', e.target.checked)}
                                className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                              />
                              <span className="text-sm font-medium text-gray-700">Enable GST</span>
                            </label>
                          </div>
                          {settings.gstEnabled && (
                            <div className="bg-white p-4 rounded-lg border border-green-200">
                              <label className="block text-sm font-medium text-gray-700 mb-2">GST Number</label>
                              <input
                                type="text"
                                value={settings.gstNumber}
                                onChange={(e) => handleSettingsChange('financial', 'gstNumber', e.target.value)}
                                className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                placeholder="12ABCDE1234F1Z2"
                              />
                            </div>
                          )}
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <FiCheckCircleIcon className="text-green-600" />
                            Indian business compliance
                          </div>
                        </div>
                      </motion.div>

                      {/* Cancellation Policy */}
                      <motion.div 
                        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                          <span className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm mr-3">3</span>
                          Cancellation Policy
                          <div className="relative group ml-2">
                            <FiInfo className="w-4 h-4 text-gray-400 cursor-help" />
                            <div className="absolute left-0 top-6 z-10 w-64 p-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-lg">
                              <div className="text-gray-300">Choose how you want to handle refunds. Strict policies help prevent revenue leakage for high-demand dates</div>
                              <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-800 transform rotate-45"></div>
                            </div>
                          </div>
                        </h4>
                        <div className="space-y-4">
                          <select
                            value={settings.cancellationPolicy}
                            onChange={(e) => handleSettingsChange('financial', 'cancellationPolicy', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white shadow-sm"
                          >
                            <option value="flexible">Flexible (24hr notice)</option>
                            <option value="moderate">Moderate (48hr notice)</option>
                            <option value="strict">Strict (7 days notice)</option>
                          </select>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <FiShield className="text-purple-600" />
                            Protect your business
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                )}

                {/* AI & Automation Control */}
                {activeSettingsTab === 'ai' && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <FiZap className="mr-3 text-purple-600" />
                      AI & Automation Control
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* AI Summary Frequency */}
                      <motion.div 
                        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                          <span className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm mr-3">1</span>
                          AI Summary Frequency
                          <div className="relative group ml-2">
                            <FiInfo className="w-4 h-4 text-gray-400 cursor-help" />
                            <div className="absolute left-0 top-6 z-10 w-64 p-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-lg">
                              <div className="text-gray-300">Set the delivery schedule for automated insights and audit reports to your dashboard</div>
                              <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-800 transform rotate-45"></div>
                            </div>
                          </div>
                        </h4>
                        <div className="space-y-4">
                          <select
                            value={settings.aiSummaryFrequency}
                            onChange={(e) => handleSettingsChange('ai', 'aiSummaryFrequency', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white shadow-sm"
                          >
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                          </select>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <FiZap className="text-purple-600" />
                            Automated insights
                          </div>
                        </div>
                      </motion.div>

                      {/* Auto-Responder */}
                      <motion.div 
                        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                          <span className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm mr-3">2</span>
                          Auto-Responder
                          <div className="relative group ml-2">
                            <FiInfo className="w-4 h-4 text-gray-400 cursor-help" />
                            <div className="absolute left-0 top-6 z-10 w-64 p-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-lg">    
                              <div className="text-gray-300">Enable automated 24/7 responses for guest questions to reduce administrative friction</div>
                              <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-800 transform rotate-45"></div>
                            </div>
                          </div>
                        </h4>
                        <div className="space-y-4">
                          <div className="bg-white p-4 rounded-lg border border-cyan-200">
                            <label className="flex items-center space-x-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={settings.autoResponder}
                                onChange={(e) => handleSettingsChange('ai', 'autoResponder', e.target.checked)}
                                className="w-5 h-5 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                              />
                              <span className="text-sm font-medium text-gray-700">Enable Auto-Responder</span>
                            </label>
                            <p className="text-xs text-gray-500 mt-2">AI bot answers basic guest questions</p>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <FiHeadphones className="text-cyan-600" />
                            24/7 support
                          </div>
                        </div>
                      </motion.div>

                      {/* AI Credits Management */}
                      <motion.div 
                        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                          <span className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm mr-3">3</span>
                          AI Credits Management
                          <div className="relative group ml-2">
                            <FiInfo className="w-4 h-4 text-gray-400 cursor-help" />
                            <div className="absolute left-0 top-6 z-10 w-64 p-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-lg">                             
                              <div className="text-gray-300">Track your available credits and monthly usage for AI-powered summaries and site intelligence tools</div>
                              <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-800 transform rotate-45"></div>
                            </div>
                          </div>
                        </h4>
                        <div className="space-y-4">
                          <div className="bg-white p-4 rounded-lg border border-orange-200">
                            <div className="flex items-center justify-between mb-3">
                              <label className="text-sm font-medium text-gray-700">Available Credits</label>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="number"
                                  value={settings.aiCredits}
                                  onChange={(e) => handleSettingsChange('ai', 'aiCredits', e.target.value)}
                                  className="w-24 px-3 py-2 border-2 border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                                  min="0"
                                />
                                <span className="text-sm text-gray-600">credits</span>
                              </div>
                            </div>
                            <div className="bg-orange-100 rounded-lg p-3">
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-orange-800 font-medium">Usage this month</span>
                                <span className="text-lg font-bold text-orange-600">47</span>
                              </div>
                            </div>
                          </div>
                          <button className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg hover:from-orange-700 hover:to-red-700">
                            Purchase More Credits
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                )}

                {/* Security & Audit Logs */}
                {activeSettingsTab === 'security' && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <FiShield className="mr-3 text-red-600" />
                      Security & Audit Logs
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Activity History */}
                      <motion.div 
                        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                          <span className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm mr-3">1</span>
                          Activity History
                          <div className="relative group ml-2">
                            <FiInfo className="w-4 h-4 text-gray-400 cursor-help" />
                            <div className="absolute left-0 top-6 z-10 w-64 p-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-lg">                       
                              <div className="text-gray-300">Track every modification made to your profile and venues with a detailed, time-stamped audit trail</div>
                              <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-800 transform rotate-45"></div>
                            </div>
                          </div>
                        </h4>
                        <div className="space-y-4">
                          <div className="bg-white rounded-lg p-4 border border-red-200 max-h-48 overflow-y-auto">
                            <p className="text-sm text-gray-600 mb-3">Recent venue changes and access logs</p>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm p-2 bg-gray-50 rounded">
                                <span>Venue details updated</span>
                                <span className="text-gray-500 text-xs">2 hours ago</span>
                              </div>
                              <div className="flex justify-between text-sm p-2 bg-gray-50 rounded">
                                <span>Login from IP: 192.168.1.1</span>
                                <span className="text-gray-500 text-xs">1 day ago</span>
                              </div>
                              <div className="flex justify-between text-sm p-2 bg-gray-50 rounded">
                                <span>Settings modified by admin</span>
                                <span className="text-gray-500 text-xs">3 days ago</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <FiEye className="text-red-600" />
                            Full audit trail
                          </div>
                        </div>
                      </motion.div>

                      {/* Staff Access */}
                      <motion.div 
                        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                          <span className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm mr-3">2</span>
                          Staff Access
                          <div className="relative group ml-2">
                            <FiInfo className="w-4 h-4 text-gray-400 cursor-help" />
                            <div className="absolute left-0 top-6 z-10 w-64 p-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-lg">                            
                              <div className="text-gray-300">Securely add managers or staff to help handle bookings without sharing your primary owner credentials</div>
                              <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-800 transform rotate-45"></div>
                            </div>
                          </div>
                        </h4>
                        <div className="space-y-4">
                          <div className="bg-white rounded-lg p-4 border border-blue-200">
                            <p className="text-sm text-gray-600 mb-3">Manage sub-accounts with limited permissions</p>
                            {settings.staffAccounts.length === 0 ? (
                              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                                Add Staff Account
                              </button>
                            ) : (
                              settings.staffAccounts.map((staff, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2">
                                  <div>
                                    <span className="font-medium text-sm">{staff.name}</span>
                                    <span className="text-xs text-gray-600">{staff.role}</span>
                                  </div>
                                  <div className="flex space-x-2">
                                    <button className="text-blue-600 hover:text-blue-800 text-xs">Edit</button>
                                    <button className="text-red-600 hover:text-red-800 text-xs">Remove</button>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <FiUsers className="text-blue-600" />
                            Role-based access
                          </div>
                        </div>
                      </motion.div>

                      {/* Two-Factor Authentication */}
                      <motion.div 
                        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                          <span className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm mr-3">3</span>
                          Two-Factor Authentication
                          <div className="relative group ml-2">
                            <FiInfo className="w-4 h-4 text-gray-400 cursor-help" />
                            <div className="absolute left-0 top-6 z-10 w-64 p-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-lg">                             
                              <div className="text-gray-300">Secure your business revenue and sensitive data by enabling mandatory two-step verification for all logins</div>
                              <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-800 transform rotate-45"></div>
                            </div>
                          </div>
                        </h4>
                        <div className="space-y-4">
                          <div className="bg-white p-4 rounded-lg border border-green-200">
                            <label className="flex items-center space-x-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={settings.twoFactorEnabled}
                                onChange={(e) => handleSettingsChange('security', 'twoFactorEnabled', e.target.checked)}
                                className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                              />
                              <span className="text-sm font-medium text-gray-700">Enable 2FA</span>
                            </label>
                            <p className="text-xs text-gray-500 mt-2">Essential for high-stakes data</p>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <FiShield className="text-green-600" />
                            Enhanced security
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                )}

                {/* Notification Preferences */}
                {activeSettingsTab === 'notifications' && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <FiMail className="mr-3 text-blue-600" />
                      Notification Preferences
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Booking Alerts */}
                      <motion.div 
                        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                          <span className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm mr-3">1</span>
                          Booking Alerts
                          <div className="relative group ml-2">
                            <FiInfo className="w-4 h-4 text-gray-400 cursor-help" />
                            <div className="absolute left-0 top-6 z-10 w-64 p-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-lg">
                              <div className="text-gray-300">Get real-time updates on new bookings and guest schedule changes to stay on top of your calendar</div>
                              <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-800 transform rotate-45"></div>
                            </div>
                          </div>
                        </h4>
                        <div className="space-y-4">
                          <div className="bg-white p-4 rounded-lg border border-blue-200">
                            <select
                              value={settings.bookingAlerts}
                              onChange={(e) => handleSettingsChange('notifications', 'bookingAlerts', e.target.value)}
                              className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            >
                              <option value="email">Email</option>
                              <option value="sms">SMS</option>
                              <option value="whatsapp">WhatsApp</option>
                              <option value="all">All</option>
                            </select>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <FiMail className="text-blue-600" />
                            Instant notifications
                          </div>
                        </div>
                      </motion.div>

                      {/* Low-Credit Alerts */}
                      <motion.div 
                        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                          <span className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm mr-3">2</span>
                          Low-Credit Alerts
                          <div className="relative group ml-2">
                            <FiInfo className="w-4 h-4 text-gray-400 cursor-help" />
                            <div className="absolute left-0 top-6 z-10 w-64 p-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-lg">
                              <div className="text-gray-300">Receive a reminder to top up your account before your AI-powered administrative tools are paused</div>
                              <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-800 transform rotate-45"></div>
                            </div>
                          </div>
                        </h4>
                        <div className="space-y-4">
                          <div className="bg-white p-4 rounded-lg border border-orange-200">
                            <label className="flex items-center space-x-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={settings.lowCreditAlerts}
                                onChange={(e) => handleSettingsChange('notifications', 'lowCreditAlerts', e.target.checked)}
                                className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                              />
                              <span className="text-sm font-medium text-gray-700">Enable Alerts</span>
                            </label>
                            <p className="text-xs text-gray-500 mt-2">Notify when AI summary credits are running low</p>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <FiAlertCircle className="text-orange-600" />
                            Proactive reminders
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={handleCloseSettings}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveSettings}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Save Settings
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HostDashboard;
