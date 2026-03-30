import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../components/Layout/Layout';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaMapMarkerAlt, FaStar, FaRegCalendarAlt, FaSearch, FaTimes, FaPlus, FaCheck, FaShoppingCart } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Static export - no server-side rendering needed

const VenuesPage = () => {
  const router = useRouter();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [itinerary, setItinerary] = useState([]);
  const [showItinerary, setShowItinerary] = useState(false);
  const [showMyVenues, setShowMyVenues] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null, 
  }, []);

  useEffect(() => {
    // Load itinerary from localStorage on component mount
    const savedItinerary = localStorage.getItem('venueItinerary');
    if (savedItinerary) {
      try {
        setItinerary(JSON.parse(savedItinerary));
      } catch (err) {
        console.error('Error loading itinerary:', err);
        localStorage.removeItem('venueItinerary');
      }
    }
  }, []);

  useEffect(() => {
    // Save itinerary to localStorage whenever it changes
    localStorage.setItem('venueItinerary', JSON.stringify(itinerary));
  }, [itinerary]);

  useEffect(() => {
    // Check if user is authenticated and get user role
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // You'll need to implement this API endpoint to return user info
          const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (userRes.ok) {
            const userData = await userRes.json();
            setIsHost(userData.isHost || false);
            setIsAdmin(userData.role === 'admin');
          }
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    // Get category from URL query parameter
    if (router.isReady) {
      const category = router.query.category;
      if (category) {
        setSelectedCategory(category);
      }
    }
  }, [router.isReady, router.query]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
        
        let url = `${process.env.NEXT_PUBLIC_API_URL}/api/venues`;
        const params = new URLSearchParams();
        
        if (isHost && showMyVenues) {
          params.append('myVenues', 'true');
        }
        
        // Add category filter if selected
        if (selectedCategory) {
          params.append('venueType', selectedCategory);
        }
        
        if (params.toString()) {
          url += '?' + params.toString();
        }
        const res = await fetch(url, { headers });
        if (!res.ok) throw new Error('Failed to fetch venues');
        const data = await res.json();
        let venuesArray = [];
        if (Array.isArray(data)) {
          venuesArray = data;
        } else if (data && Array.isArray(data.venues)) {
          venuesArray = data.venues;
        } else if (data && Array.isArray(data.data)) {
          venuesArray = data.data;
        }
        setVenues(Array.isArray(venuesArray) ? venuesArray : []);
      } catch (err) {
        setError(err.message || 'Error loading venues');
      } finally {
        setLoading(false);
      }
    };
    fetchVenues();
  }, [showMyVenues, isHost, selectedCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    // For now, just log the search query and date range
    // Filtering can be implemented later
    console.log('Search query:', searchQuery);
    console.log('Date range:', dateRange);
  };

  const handleWidenSearch = () => {
    // Smart search widening logic
    let widenedSearch = false;
    
    // If there's a location search, try to broaden it
    if (searchQuery && searchQuery.trim()) {
      const locationTerms = ['delhi', 'mumbai', 'bangalore', 'hyderabad', 'chennai', 'kolkata', 'pune'];
      const searchLower = searchQuery.toLowerCase();
      
      // Check if user searched for a specific area within a city
      for (const city of locationTerms) {
        if (searchLower.includes(city)) {
          // Expand to the broader metropolitan area
          if (city === 'delhi') {
            setSearchQuery('Delhi NCR');
            widenedSearch = true;
            break;
          } else {
            // For other cities, remove specific area names and keep city name
            setSearchQuery(city.charAt(0).toUpperCase() + city.slice(1));
            widenedSearch = true;
            break;
          }
        }
      }
      
      // If no city match found, clear the location search to show all areas
      if (!widenedSearch) {
        setSearchQuery('');
        widenedSearch = true;
      }
    }
    
    // If category is selected, try removing it to show more venue types
    if (selectedCategory && !widenedSearch) {
      setSelectedCategory('');
      widenedSearch = true;
    }
    
    // If date range is set, try clearing it to show more availability
    if ((dateRange.startDate || dateRange.endDate) && !widenedSearch) {
      setDateRange({ startDate: null, endDate: null });
      widenedSearch = true;
    }
    
    // If no specific filters were found to widen, clear everything
    if (!widenedSearch) {
      setSearchQuery('');
      setSelectedCategory('');
      setDateRange({ startDate: null, endDate: null });
    }
    
    // Update URL to reflect the widened search
    router.push('/venues', undefined, { shallow: true });
  };

  const handleClearCategory = () => {
    setSelectedCategory('');
    router.push('/venues', undefined, { shallow: true });
  };

  // Itinerary functions
  const addToItinerary = (venue) => {
    const exists = itinerary.find(item => item._id === venue._id);
    if (!exists) {
      setItinerary([...itinerary, venue]);
    }
  };

  const removeFromItinerary = (venueId) => {
    setItinerary(itinerary.filter(item => item._id !== venueId));
  };

  const clearItinerary = () => {
    setItinerary([]);
  };

  const isInItinerary = (venueId) => {
    return itinerary.some(item => item._id === venueId);
  };

  const handleToggleStatus = async (venueId, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/venues/${venueId}/status`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!res.ok) throw new Error('Failed to update venue status');

      // Update the venue in the local state
      setVenues(venues.map(venue => 
        venue._id === venueId 
          ? { ...venue, isActive: !currentStatus } 
          : venue
      ));
    } catch (err) {
      setError(err.message || 'Error updating venue status');
    }
  };

  const handleApproveVenue = async (venueId, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/venues/${venueId}/approval`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ isApproved: !currentStatus })
        }
      );

      if (!res.ok) throw new Error('Failed to update venue approval');

      // Update the venue in the local state
      setVenues(venues.map(venue => 
        venue._id === venueId 
          ? { 
              ...venue, 
              isApproved: !currentStatus,
              isActive: !currentStatus // Auto-activate when approved
            } 
          : venue
      ));
    } catch (err) {
      setError(err.message || 'Error updating venue approval');
    }
  };

  // Render status badge for venue
  const renderStatusBadge = (venue) => {
    if (!venue.isApproved) {
      return (
        <span className="px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded-full">
          Pending Approval
        </span>
      );
    }
    if (!venue.isActive) {
      return (
        <span className="px-2 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded-full">
          Inactive
        </span>
      );
    }
    return (
      <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
        Active
      </span>
    );
  };

  // Animation variants (from Home page)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
        <Layout title="Venues | Venuity">
      <div className="min-h-screen">
        {/* Hero/Header Section */}
        <motion.section
          className="relative text-white py-20"
          style={{
            backgroundImage: 'url(/images/venue-showcase.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div className="max-w-3xl mx-auto text-center" variants={itemVariants}>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {showMyVenues ? 'My Venues' : 'Explore Our Venues'}
              </h1>
              <p className="text-xl mb-8">
                {showMyVenues 
                  ? 'Manage your listed venues and view their status'
                  : 'Your ideal event space awaits. Browse and discover the perfect venue for your next occasion.'}
              </p>
              
              {/* Itinerary Summary */}
              {itinerary.length > 0 && (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FaShoppingCart className="mr-2" />
                      <span className="font-semibold">
                        {itinerary.length} venue{itinerary.length !== 1 ? 's' : ''} in itinerary
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowItinerary(!showItinerary)}
                        className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm transition-colors"
                      >
                        {showItinerary ? 'Hide' : 'View'}
                      </button>
                      <button
                        onClick={clearItinerary}
                        className="bg-red-500/20 hover:bg-red-500/30 px-3 py-1 rounded text-sm transition-colors"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Detailed Itinerary View */}
              {showItinerary && itinerary.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold mb-4">Your Itinerary</h3>
                  <div className="space-y-3">
                    {itinerary.map((venue) => (
                      <div key={venue._id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{venue.businessName || 'Unnamed Venue'}</h4>
                          <p className="text-sm text-gray-600">
                            {venue.city || 'Location not specified'}
                            {venue.state ? `, ${venue.state}` : ''}
                          </p>
                          <p className="text-sm font-semibold text-blue-600">
                            ${(venue.pricing?.basePrice || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}/day
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromItinerary(venue._id)}
                          className="text-red-500 hover:text-red-700 p-2"
                          title="Remove from itinerary"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">Total Venues</p>
                        <p className="text-xl font-bold">{itinerary.length}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => router.push('/booking?itinerary=true')}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                        >
                          Proceed to Booking
                        </button>
                        <button
                          onClick={clearItinerary}
                          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
                        >
                          Clear All
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Host Controls */}
              {isHost && (
                <div className="flex justify-center mb-6">
                  <button
                    onClick={() => setShowMyVenues(!showMyVenues)}
                    className={`px-6 py-2 rounded-md mr-4 ${
                      showMyVenues
                        ? 'bg-white text-blue-600 hover:bg-gray-100'
                        : 'bg-blue-700 hover:bg-blue-800 text-white'
                    } transition-colors`}
                  >
                    {showMyVenues ? 'View All Venues' : 'View My Venues'}
                  </button>
                  <Link
                    href="/host/venues/new"
                    className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-2 rounded-md transition-colors"
                  >
                    + Add New Venue
                  </Link>
                </div>
              )}

              {/* Search Form */}
{!showMyVenues && (
  <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-xl border border-white/30">
    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-end">
      {/* Search Input */}
      <div className="w-full md:w-1/3">
        <label htmlFor="search" className="block text-sm font-medium text-white mb-1">
          Search
        </label>
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            id="search"
            type="text"
            placeholder="Search venues by name or location"
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/90 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-800 placeholder-gray-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Date Range Picker */}
      <div className="w-full md:w-1/3">
        <label htmlFor="date-range" className="block text-sm font-medium text-white mb-1">
          Date
        </label>
        <div className="relative">
          <FaRegCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <DatePicker
            id="date-range"
            selectsRange
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            onChange={(update) => {
              const [start, end] = update;
              setDateRange({ startDate: start, endDate: end });
            }}
            isClearable
            placeholderText="Select your date"
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/90 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-800 placeholder-gray-500"
            dateFormat="MMM dd"
          />
        </div>
      </div>

      {/* Type Dropdown */}
      <div className="w-full md:w-1/4">
        <label htmlFor="event-type" className="block text-sm font-medium text-white mb-1">
          Type
        </label>
        <div className="relative">
          <select
            id="event-type"
            className={`appearance-none w-full pl-3 pr-10 py-3 rounded-lg bg-white/90 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 ${selectedCategory ? 'text-gray-800' : 'text-gray-500'}`}
            value={selectedCategory}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedCategory(value);
              if (value) {
                router.push(`/venues?category=${value}`, undefined, { shallow: true });
              } else {
                router.push('/venues', undefined, { shallow: true });
              }
            }}
          >
            <option value="">All Types</option>
            <option value="wedding">Wedding</option>
            <option value="corporate">Corporate</option>
            <option value="birthday">Birthday</option>
            <option value="conference">Conference</option>
            <option value="exhibition">Exhibition</option>
            <option value="anniversary">Anniversary</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Search Button */}
      <button
        type="submit"
        className="w-full md:w-auto bg-white/90 hover:bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg transition duration-300 ease-in-out h-[48px] backdrop-blur-sm"
      >
        Search
      </button>
    </form>
  </div>
)}
            </motion.div>
          </div>
        </motion.section>

        {/* Main Content Area: Venues Grid */}
        <section className="py-16 bokeh-background min-h-[40vh] relative">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white">
                  {showMyVenues ? 'My Venues' : 'Available Venues'}
                </h2>
                {selectedCategory && !showMyVenues && (
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-emerald-100 mr-2">
                      Category: <span className="font-semibold capitalize">{selectedCategory}</span>
                    </span>
                    <button
                      onClick={handleClearCategory}
                      className="text-emerald-200 hover:text-emerald-100 transition-colors"
                      title="Clear category filter"
                    >
                      <FaTimes size={14} />
                    </button>
                  </div>
                )}
              </div>
              {showMyVenues && (
                <span className="text-sm text-emerald-100">
                  Showing {venues.length} venue{venues.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>
           
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            ) : venues.length === 0 ? (
              <div className="glassmorphism-container p-12 text-center relative z-10">
                {/* Discovery Illustration */}
                <div className="mb-8">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-emerald-400/20 to-emerald-600/30 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                    <svg className="w-16 h-16 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {selectedCategory 
                    ? `No venues found for ${selectedCategory}`
                    : showMyVenues 
                      ? 'No venues found' 
                      : 'Discover Your Perfect Venue'
                  }
                </h3>
                <p className="text-emerald-100 mb-8 max-w-md mx-auto">
                  {selectedCategory
                    ? 'Try selecting a different category or clearing filter to explore more options.'
                    : showMyVenues
                      ? 'You have not listed any venues yet. Start by adding your first venue!'
                      : 'No venues match your current search. Let\'s expand your search or set up notifications for new venues.'
                  }
                </p>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {!showMyVenues && (
                    <button
                      onClick={handleWidenSearch}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Widen Search Area
                    </button>
                  )}
                  
                  {!showMyVenues && (
                    <button
                      onClick={() => {
                        alert('We\'ll notify you when new venues open in this area!');
                      }}
                      className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                    >
                      Notify Me
                    </button>
                  )}
                  
                  {selectedCategory && (
                    <button
                      onClick={handleClearCategory}
                      className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                    >
                      Clear Category Filter
                    </button>
                  )}
                  
                  {isHost && !showMyVenues && (
                    <button
                      onClick={() => setShowMyVenues(true)}
                      className="px-6 py-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                    >
                      View Your Venues
                    </button>
                  )}
                  
                  {isHost && showMyVenues && venues.length === 0 && (
                    <Link
                      href="/host/venues/new"
                      className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium inline-block"
                    >
                      Add Your First Venue
                    </Link>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {venues.map((venue) => (
                  <motion.div
                    key={venue._id}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full flex flex-col"
                    whileHover={{ y: -5 }}
                  >
                    {/* Image Section */}
                    <div className="relative flex-shrink-0">
                      <div className="h-48 w-full overflow-hidden">
                        <img
                          src={venue.images?.[0]?.url || 'https://via.placeholder.com/400x300?text=No+Image'}
                          alt={venue.name || 'Venue image'}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                          }}
                        />
                      </div>
                      <div className="absolute top-2 right-2">
                        {renderStatusBadge(venue)}
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Venue Header */}
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
                          {venue.businessName || 'Unnamed Venue'}
                        </h3>
                        <div className="flex items-center bg-blue-50 px-2 py-1 rounded-full ml-2">
                          <FaStar className="text-yellow-400 mr-1" />
                          <span className="text-sm font-medium text-gray-700">
                            {venue.rating ? Number(venue.rating).toFixed(1) : 'New'}
                          </span>
                        </div>
                      </div>
                      
                      {/* Location */}
                      <div className="flex items-center text-gray-600 mb-3">
                        <FaMapMarkerAlt className="mr-2 flex-shrink-0" />
                        <span className="truncate">
                          {venue.city || 'Location not specified'}
                          {venue.state ? `, ${venue.state}` : ''}
                          {venue.country ? `, ${venue.country}` : ''}
                        </span>
                      </div>
                      
                      {/* Description */}
                      <p className="text-gray-700 mb-4 line-clamp-2 flex-grow">
                        {venue.about || 'No description available'}
                      </p>
                      
                      {/* Footer */}
                      <div className="mt-auto">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-bold text-lg text-blue-600">
                            ${(venue.pricing?.basePrice || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}/day
                          </span>
                          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            👥 {venue.maxGuestCapacity || 'N/A'} guests
                          </span>
                        </div>
                        <div className="flex gap-2">
                          {isInItinerary(venue._id) ? (
                            <button
                              onClick={() => removeFromItinerary(venue._id)}
                              className="flex-1 bg-green-100 text-green-700 hover:bg-green-200 font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
                            >
                              <FaCheck className="mr-2" />
                              In Itinerary
                            </button>
                          ) : (
                            <button
                              onClick={() => addToItinerary(venue)}
                              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
                            >
                              <FaPlus className="mr-2" />
                              Add to Itinerary
                            </button>
                          )}
                          <Link
                            href={`/venues/${venue._id}`}
                            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 block text-center"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            </div>          
        </section>
      </div>
    </Layout>
  );
};

export default VenuesPage;
