import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { FiMapPin, FiChevronRight, FiUsers, FiStar, FiSearch, FiNavigation } from 'react-icons/fi';
import { FaUtensils, FaPaintBrush, FaRegCalendarCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { getUserLocation } from '../api/services';

// Static export - no server-side rendering needed

const serviceCategories = [
  {
    key: 'caterer',
    name: 'Caterer',
    icon: <FaUtensils className="text-3xl text-white" />,
    backgroundImage: '/images/caterer.jpg',
    href: '/services/category/caterer',
    description: 'Find the best catering services for your event with a variety of cuisines and packages.',
    features: [
      'Custom menu planning',
      'Live food counters',
      'Veg & non-veg options',
      'Beverage services',
      'Staffing & serving'
    ]
  },
  {
    key: 'decorator',
    name: 'Decorator',
    icon: <FaPaintBrush className="text-3xl text-white" />,
    backgroundImage: '/images/decorator.jpg',
    href: '/services/category/decorator',
    description: 'Transform your venue with stunning decorations and thematic designs.',
    features: [
      'Theme-based decoration',
      'Stage setup',
      'Lighting arrangements',
      'Floral decorations',
      'Entrance designs'
    ]
  },
  {
    key: 'planner',
    name: 'Event Planner',
    icon: <FaRegCalendarCheck className="text-3xl text-white" />,
    backgroundImage: '/images/event%20planner.jpg',
    href: '/services/category/planner',
    description: 'Professional event planning services to make your occasion seamless and memorable.',
    features: [
      'Full event coordination',
      'Vendor management',
      'Budget planning',
      'Timeline management',
      'On-site coordination'
    ]
  }
];

// Mock service providers data
const mockServices = [
  {
    id: 1,
    name: 'Delicious Delights Catering',
    type: 'Caterer',
    image: '/images/service1.jpg',
    rating: 4.9,
    location: 'Mumbai, India',
    description: 'Premium catering for weddings, parties, and corporate events. Custom menus and live counters available.',
  },
  {
    id: 2,
    name: 'Dream Decorators',
    type: 'Decorator',
    image: '/images/service2.jpg',
    rating: 4.8,
    location: 'Delhi, India',
    description: 'Creative event decoration for all occasions. Floral, theme, and lighting specialists.',
  },
  {
    id: 3,
    name: 'Perfect Planners',
    type: 'Event Planner',
    image: '/images/service3.jpg',
    rating: 4.7,
    location: 'Goa, India',
    description: 'End-to-end event planning and management. Stress-free experience for your big day.',
  },
];

const ServicesPage = () => {
  const [location, setLocation] = useState('');
  const [filteredServices, setFilteredServices] = useState(mockServices);
  const [isDetecting, setIsDetecting] = useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    if (type) {
      const filtered = mockServices.filter(service => service.type.toLowerCase().replace(' ', '') === type);
      setFilteredServices(filtered);
    } else {
      setFilteredServices(mockServices);
    }
  }, []);

  const handleServiceCategoryClick = async (category) => {
    try {
      // Get user location
      let userLocation = location;
      
      if (!userLocation) {
        // Try to detect location if not already set
        try {
          userLocation = await getUserLocation();
          setLocation(userLocation);
          toast.success('Location detected successfully!');
        } catch (error) {
          toast.info('Using nationwide results. Enable location for better results.');
        }
      }
      
      // Navigate to category page with location filter
      const query = userLocation ? { city: userLocation } : {};
      router.push({
        pathname: category.href,
        query
      });
    } catch (error) {
      console.error('Error navigating to category:', error);
      // Fallback to basic navigation
      router.push(category.href);
    }
  };

  const detectLocation = () => {
  if (!navigator.geolocation) {
    toast.error('Geolocation is not supported by your browser');
    return;
  }

  setIsDetecting(true);
  
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        const { latitude, longitude } = position.coords;
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await response.json();
        
        if (data.address) {
          const city = data.address.city || data.address.town || data.address.village || '';
          const state = data.address.state || '';
          setLocation(city + (state ? `, ${state}` : ''));
          toast.success('Location detected successfully!');
        } else {
          throw new Error('Could not determine location');
        }
      } catch (error) {
        console.error('Error detecting location:', error);
        toast.error('Could not detect your location. Please try again or enter manually.');
        } finally {
        setIsDetecting(false);
      }
    },
    (error) => {
      console.error('Geolocation error:', error);
      toast.error('Please enable location access to use this feature');
      setIsDetecting(false);
    }
  );
};

  return (
        <Layout title="Services | Venuity">
      <div className="min-h-screen bg-gray-50">
        {/* Header/Hero Section */}
        <motion.section
          className="relative text-white py-20 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/images/services.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '400px'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Discover Services for Your Perfect Event</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Your event, our experts. Find the best caterers, decorators, and planners to make your occasion unforgettable.
            </p>
          </div>
        </motion.section>

        {/* Service Categories */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Browse by Service Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {serviceCategories.map((cat) => (
                <div
                  key={cat.key}
                  onClick={() => handleServiceCategoryClick(cat)}
                  className="group block rounded-xl shadow-md hover:shadow-lg transition overflow-hidden cursor-pointer relative h-64"
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${cat.backgroundImage})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80" />
                  <div className="relative h-full flex flex-col items-center justify-center text-white p-8">
                    <div className="mb-4">{cat.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition">{cat.name}</h3>
                    <span className="inline-flex items-center text-white font-medium group-hover:underline">
                      Explore <FiChevronRight className="ml-1" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location-Based Search */}
        <section className="pb-8">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto">
              <form className="flex items-center bg-white rounded-lg shadow p-4 gap-2">
                <FiMapPin className="text-xl text-primary-600" />
                <input
                  type="text"
      placeholder="Search services by city or state"
      className="flex-1 border-none outline-none text-gray-800 text-lg bg-transparent"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
    />
    <button
      type="button"
      onClick={detectLocation}
      disabled={isDetecting}
      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
      title="Detect my location"
    >
      {isDetecting ? (
        <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      ) : (
        <FiNavigation className="text-primary-600 text-xl" />
      )}
    </button>
    <button
      type="submit"
      className="btn-primary flex items-center gap-1"
      onClick={(e) => e.preventDefault()}
    >
      <FiSearch />
                  Search
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Service Listings */}
        <section className="pb-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Available Service Providers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
                <motion.div
                  key={service.id}
                  className="card overflow-hidden hover:shadow-lg flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative h-48 bg-gray-200">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                    <div className="absolute top-0 right-0 bg-white px-3 py-1 m-2 rounded-full text-sm font-medium text-secondary-600 shadow">
                      {service.type}
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{service.name}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <FiMapPin className="mr-1" />
                      <span>{service.location}</span>
                    </div>
                    <p className="text-gray-700 mb-3 flex-1">{service.description}</p>
                    <div className="flex items-center mb-3">
                      <span className="text-yellow-500 text-lg">★</span>
                      <span className="ml-1 font-medium">{service.rating}</span>
                    </div>
                    <button className="btn-primary w-full mt-auto">Book Now</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ServicesPage; 
