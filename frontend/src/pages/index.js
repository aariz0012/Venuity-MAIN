import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { 
  FiSearch, 
  FiCalendar, 
  FiUsers, 
  FiMapPin, 
  FiStar, 
  FiCheckCircle, 
  FiArrowRight,
  FiMail,
  FiPhone,
  FiHome,
  FiShield,
  FiDollarSign,
  FiClock,
  FiHeadphones,
  FiGlobe,
  FiAward,
  FiTrendingUp,
  FiLayers,
  FiTarget,
  FiZap,
  FiHeart,
  FiPlus,
  FiBarChart2,
  FiSettings,
  FiCalendar as FiCalendarIcon,
  FiUser,
  FiImage,
  FiX,
  FiEdit,
  FiEye,
  FiNavigation,
  FiChevronRight,
  FiTag,
  FiPlay
} from 'react-icons/fi';
import { 
  FaStar, 
  FaRegStar, 
  FaStarHalfAlt, 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn 
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import Layout from '../components/Layout/Layout';
import VenueCarousel from '../components/VenueCarousel';
import { useAuth } from '../context/AuthContext';

// Add your data structures here (categories, featuredVenues, howItWorks, etc.)// Categories Data
const categories = [
  { id: 1, name: 'Wedding', image: '/images/events/wedding.jpg' },
  { id: 2, name: 'Corporate', image: '/images/events/corporate.jpg' },
  { id: 3, name: 'Birthday', image: '/images/events/birthday.jpg' },
  { id: 4, name: 'Conference', image: '/images/events/conference.jpg' },
  { id: 5, name: 'Exhibition', image: '/images/events/exhibition.jpg' },
  { id: 6, name: 'Anniversary', image: '/images/events/anniversary.jpg' },
];

const featuredVenues = [
  {
    id: 1,
    name: 'Grand Ballroom',
    location: 'Mumbai, India',
    image: '/images/venues/ballroom.jpg',
    capacity: 300,
    pricePerHour: 500,
    hours: 4,
    amenities: ['Stage', 'Sound System', 'Catering', 'Parking', 'WiFi']
  },
  {
    id: 2,
    name: 'Skyline Rooftop',
    location: 'Delhi, India',
    image: '/images/venues/rooftop.jpg',
    capacity: 150,
    pricePerHour: 350,
    hours: 5,
    amenities: ['City View', 'Bar', 'DJ Setup', 'Lighting', 'Restrooms']
  },
  {
    id: 3,
    name: 'Garden Pavilion',
    location: 'Bangalore, India',
    image: '/images/events/wedding.jpg', // Using existing image as placeholder
    capacity: 200,
    pricePerHour: 400,
    hours: 6,
    amenities: ['Outdoor', 'Garden', 'Dance Floor', 'Catering', 'Parking']
  }
];
// How It Works Data
const howItWorks = [
  {
    id: 1,
    title: 'Search & Explore',
    description: 'Browse through our extensive collection of venues and filter by location, capacity, and amenities.',
    icon: <FiSearch size={32} />,
    color: '#4f46e5'
  },
  {
    id: 2,
    title: 'Book Instantly',
    description: 'Check real-time availability and book your perfect venue with just a few clicks.',
    icon: <FiCalendar size={32} />,
    color: '#10b981'
  },
  {
    id: 3,
    title: 'Enjoy Your Event',
    description: 'Have a memorable experience with our dedicated support and top-notch venues.',
    icon: <FiUsers size={32} />,
    color: '#f59e0b'
  }
];
// Testimonials Data
const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Event Planner, Mumbai',
    content: 'Finding the perfect venue used to be a nightmare until we discovered Venuity. The platform is incredibly user-friendly and saved us countless hours of searching!',
    rating: 5,
    image: '/images/testimonial1.jpg'
  },
  {
    id: 2,
    name: 'Rahul Mehta',
    role: 'Corporate HR, Delhi',
    content: 'We organized our annual conference through Venuity and were blown away by the quality of venues available. The booking process was seamless and their support team was exceptional.',
    rating: 4,
    image: '/images/testimonial2.jpg'
  },
  {
    id: 3,
    name: 'Ananya Patel',
    role: 'Wedding Planner, Bangalore',
    content: 'As a wedding planner, I rely on Venuity for all my venue needs. The variety and quality of venues, along with the easy booking process, make it my go-to platform.',
    rating: 5,
    image: '/images/testimonial3.jpg'
  }
];
// Why Choose Us Data
const whyChooseUs = [
  {
    id: 1,
    title: 'Wide Selection',
    description: 'Choose from thousands of verified venues across India for any type of event.',
    icon: <FiLayers size={28} />
  },
  {
    id: 2,
    title: 'Best Prices',
    description: 'Get the best deals and prices with our price match guarantee.',
    icon: <FiTag size={28} />
  },
  {
    id: 3,
    title: 'Easy Booking',
    description: 'Simple and secure booking process with instant confirmation.',
    icon: <FiCheckCircle size={28} />
  },
  {
    id: 4,
    title: '24/7 Support',
    description: 'Our dedicated support team is available round the clock to assist you.',
    icon: <FiHeadphones size={28} />
  }
];
// Blog/News Data
const blogPosts = [
  {
    id: 1,
    title: 'Top 10 Wedding Venues in Mumbai for 2025',
    excerpt: 'Discover the most sought-after wedding venues in Mumbai that will make your special day unforgettable.',
    date: 'May 15, 2025',
    readTime: '5 min read',
    category: 'Wedding',
    image: '/images/blog/wedding-venues.jpg'
  },
  {
    id: 2,
    title: 'How to Choose the Perfect Corporate Event Venue',
    excerpt: 'Essential tips for selecting a venue that will impress your clients and employees alike.',
    date: 'April 28, 2025',
    readTime: '4 min read',
    category: 'Corporate',
    image: '/images/blog/corporate-events.jpg'
  },
  {
    id: 3,
    title: 'Outdoor vs Indoor Venues: Pros and Cons',
    excerpt: 'Weighing the benefits and challenges of outdoor and indoor event spaces for your next gathering.',
    date: 'April 10, 2025',
    readTime: '6 min read',
    category: 'Tips',
    image: '/images/blog/outdoor-indoor.jpg'
  }
];

// Host-specific data structures
const hostFeatures = [
  {
    id: 1,
    title: 'Manage Your Venues',
    description: 'Add, edit, and organize all your event venues in one place with easy-to-use management tools.',
    icon: <FiHome size={32} />,
    color: '#4f46e5',
    link: '/host/venues'
  },
  {
    id: 2,
    title: 'Track Bookings',
    description: 'View all booking requests, manage availability, and track your revenue in real-time.',
    icon: <FiCalendar size={32} />,
    color: '#10b981',
    link: '/host/bookings'
  },
  {
    id: 3,
    title: 'View Analytics',
    description: 'Get insights into your venue performance, occupancy rates, and customer preferences.',
    icon: <FiBarChart2 size={32} />,
    color: '#f59e0b',
    link: '/host/analytics'
  },
  {
    id: 4,
    title: 'Customer Management',
    description: 'Communicate with customers, manage reviews, and build lasting relationships.',
    icon: <FiUsers size={32} />,
    color: '#ef4444',
    link: '/host/customers'
  }
];

const hostStats = [
  { id: 1, label: 'Total Venues', value: '12', icon: <FiHome />, change: '+2 this month' },
  { id: 2, label: 'Active Bookings', value: '28', icon: <FiCalendar />, change: '+8 this week' },
  { id: 3, label: 'Monthly Revenue', value: '₹2.4L', icon: <FiDollarSign />, change: '+15% vs last month' },
  { id: 4, label: 'Customer Rating', value: '4.8', icon: <FiTrendingUp />, change: '+0.2 this month' }
];

const hostTestimonials = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    business: 'Grand Banquet Hall',
    content: 'Venuity has transformed how we manage our venue bookings. We\'ve seen a 40% increase in occupancy since joining!',
    rating: 5,
    revenue: '₹8.5L/month'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    business: 'Green Garden Events',
    content: 'The platform is incredibly intuitive and the support team is always there to help. Best decision for our business!',
    rating: 5,
    revenue: '₹5.2L/month'
  },
  {
    id: 3,
    name: 'Amit Patel',
    business: 'Skyline Rooftop',
    content: 'Managing multiple venues has never been easier. The analytics help us make data-driven decisions.',
    rating: 4,
    revenue: '₹12.3L/month'
  }
];

export default function Home() {
  const { user, host } = useAuth();
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('');
  const [email, setEmail] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  
  // Host venue management states
  const [showVenueDialog, setShowVenueDialog] = useState(false);
  const [hostVenues, setHostVenues] = useState([]);
  const [loadingVenues, setLoadingVenues] = useState(true);
  const [editingVenue, setEditingVenue] = useState(null);
  const [newVenue, setNewVenue] = useState({
    name: '',
    location: '',
    capacity: '',
    pricePerHour: '',
    description: '',
    amenities: [],
    images: []
  });

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle subscription
    setEmail('');
  };

  // Venue management functions
  const handleAddVenue = () => {
    setShowVenueDialog(true);
  };

  const handleCloseDialog = () => {
    setShowVenueDialog(false);
    setEditingVenue(null);
    setNewVenue({
      name: '',
      location: '',
      capacity: '',
      pricePerHour: '',
      description: '',
      amenities: [],
      images: []
    });
  };

  const handleVenueSubmit = (e) => {
    e.preventDefault();
    
    if (editingVenue) {
      // Update existing venue
      setHostVenues(prev => 
        prev.map(venue => 
          venue.id === editingVenue.id 
            ? { 
                ...newVenue, 
                id: editingVenue.id,
                status: editingVenue.status,
                createdAt: editingVenue.createdAt,
                updatedAt: new Date().toISOString()
              }
            : venue
        )
      );
    } else {
      // Add new venue
      const venueToAdd = {
        ...newVenue,
        id: Date.now(),
        status: 'draft', // Initially in draft status
        createdAt: new Date().toISOString()
      };
      setHostVenues([...hostVenues, venueToAdd]);
    }
    
    handleCloseDialog();
  };

  const handleVenueInputChange = (field, value) => {
    setNewVenue(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setNewVenue(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleEditVenue = (venue) => {
    setEditingVenue(venue);
    setNewVenue({
      name: venue.name,
      location: venue.location,
      capacity: venue.capacity,
      pricePerHour: venue.pricePerHour,
      description: venue.description,
      amenities: venue.amenities,
      images: venue.images
    });
    setShowVenueDialog(true);
  };

  const handleTerminateVenue = (venueId) => {
    if (window.confirm('Are you sure you want to terminate this venue? It will no longer be visible to customers but you can continue anytime by publishing again.')) {
      setHostVenues(prev => 
        prev.map(venue => 
          venue.id === venueId 
            ? { ...venue, status: 'terminated', terminatedAt: new Date().toISOString() }
            : venue
        )
      );
    }
  };

  const handleContinueVenue = (venueId) => {
    setHostVenues(prev => 
      prev.map(venue => 
        venue.id === venueId 
          ? { ...venue, status: 'draft', terminatedAt: null }
          : venue
      )
    );
  };

  const handlePublishVenue = (venueId) => {
    setHostVenues(prev => 
      prev.map(venue => 
        venue.id === venueId 
          ? { ...venue, status: 'published', publishedAt: new Date().toISOString() }
          : venue
      )
    );
  };

  const detectLocation = () => {
    if (navigator.geolocation) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Using OpenStreetMap Nominatim for reverse geocoding
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            .then(response => response.json())
            .then(data => {
              const city = data.address.city || data.address.town || data.address.village || '';
              const state = data.address.state || '';
              setLocation(city ? `${city}${state ? `, ${state}` : ''}` : `Nearby (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
              setIsLocating(false);
            })
            .catch(() => {
              setLocation(`Nearby (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
              setIsLocating(false);
            });
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to retrieve your location. Please enter it manually.');
          setIsLocating(false);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
      setIsLocating(false);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      i < Math.floor(rating) ? 
        <FaStar key={i} className={styles.starIcon} /> : 
        i < Math.ceil(rating) ? 
          <FaStarHalfAlt key={i} className={styles.starIcon} /> : 
          <FaRegStar key={i} className={styles.starIcon} />
    ));
  };

  // Render host-specific homepage
  if (host) {
    return (
      <Layout>
        <Head>
          <title>Venuity Host Dashboard - Manage Your Venues</title>
          <meta name="description" content="Manage your venues, track bookings, and grow your event business" />
        </Head>

        <main className={styles.main}>
          {/* Host Hero Section */}
          <section className={`${styles.hero} ${styles.hostHero}`}>
            <div className={styles.heroContent}>
              <h1>Welcome back, {host.businessName || host.fullName}!</h1>
              <p>Manage your venues and grow your event business with Venuity</p>
              
              <div className={styles.hostActions}>
                <button onClick={handleAddVenue} className={styles.primaryButton}>
                  <FiPlus /> Add New Venue
                </button>
                <Link href="/host/dashboard" className={styles.secondaryButton}>
                  <FiBarChart2 /> View Dashboard
                </Link>
              </div>
            </div>
          </section>

          {/* Host Stats Section */}
          <section className={`${styles.section} ${styles.bgLight}`}>
            <div className={styles.container}>
              <div className={styles.hostStatsGrid}>
                {hostStats.map((stat) => (
                  <motion.div 
                    key={stat.id} 
                    className={styles.statCard}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className={styles.statIcon}>
                      {stat.icon}
                    </div>
                    <div className={styles.statContent}>
                      <h3 className={styles.statValue}>{stat.value}</h3>
                      <p className={styles.statLabel}>{stat.label}</p>
                      <span className={styles.statChange}>{stat.change}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Host Venues Section */}
          <section className={styles.section}>
            <div className={styles.container}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Your Venues</h2>
                <p className={styles.sectionSubtitle}>Manage your venue listings and make them visible to customers</p>
              </div>
              
              {hostVenues.length === 0 ? (
                <div className={`${styles.noVenues} text-center py-12`}>
                  <div className="text-gray-400 mb-4">
                    <FiHome size={48} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No venues yet</h3>
                  <p className="text-gray-500 mb-6">Start by adding your first venue to attract customers</p>
                  <button onClick={handleAddVenue} className={styles.primaryButton}>
                    <FiPlus /> Add Your First Venue
                  </button>
                </div>
              ) : (
                <div className={styles.venuesGrid}>
                  {hostVenues.map((venue) => (
                    <motion.div 
                      key={venue.id} 
                      className={`${styles.venueCard} ${
                        venue.status === 'draft' ? 'border-yellow-400 bg-yellow-50' : 
                        venue.status === 'terminated' ? 'border-red-400 bg-red-50 opacity-75' : 
                        venue.status === 'published' ? 'border-green-400 bg-green-50' : 
                        'border-gray-200'
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <div className={styles.venueImage}>
                        {venue.images && venue.images.length > 0 ? (
                          <Image 
                            src={venue.images[0]} 
                            alt={venue.name} 
                            width={300} 
                            height={200}
                            className={styles.venueImg}
                          />
                        ) : (
                          <div className="bg-gray-200 h-48 flex items-center justify-center">
                            <FiImage size={48} className="text-gray-400" />
                          </div>
                        )}
                        {/* Status Badge */}
                        {venue.status === 'draft' && (
                          <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-semibold">
                            Draft
                          </div>
                        )}
                        {venue.status === 'published' && (
                          <div className="absolute top-2 right-2 bg-green-400 text-green-900 px-2 py-1 rounded text-xs font-semibold">
                            Published
                          </div>
                        )}
                        {venue.status === 'terminated' && (
                          <div className="absolute top-2 right-2 bg-red-400 text-red-900 px-2 py-1 rounded text-xs font-semibold">
                            Terminated
                          </div>
                        )}
                      </div>
                      <div className={styles.venueContent}>
                        <h3 className={styles.venueName}>{venue.name}</h3>
                        <p className={styles.venueLocation}>
                          <FiMapPin className="inline mr-1" />
                          {venue.location}
                        </p>
                        <div className={styles.venueDetails}>
                          <span className={styles.venueCapacity}>
                            <FiUsers className="inline mr-1" />
                            {venue.capacity} guests
                          </span>
                          <span className={styles.venuePrice}>
                            <FiDollarSign className="inline mr-1" />
                            {venue.pricePerHour}/hour
                          </span>
                        </div>
                        <div className={styles.venueAmenities}>
                          {venue.amenities.slice(0, 3).map((amenity, index) => (
                            <span key={index} className={styles.amenityTag}>
                              {amenity}
                            </span>
                          ))}
                          {venue.amenities.length > 3 && (
                            <span className={styles.amenityTag}>
                              +{venue.amenities.length - 3} more
                            </span>
                          )}
                        </div>
                        <div className={styles.venueActions}>
                          {venue.status === 'draft' && (
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handlePublishVenue(venue.id)}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                              >
                                <FiCheckCircle className="inline mr-1" />
                                Publish Venue
                              </button>
                              <button 
                                onClick={() => handleEditVenue(venue)}
                                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                              >
                                <FiEdit className="inline mr-1" />
                                Edit
                              </button>
                            </div>
                          )}
                          {venue.status === 'published' && (
                            <div className="flex gap-2">
                              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                <FiEye className="inline mr-1" />
                                View
                              </button>
                              <button 
                                onClick={() => handleEditVenue(venue)}
                                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                              >
                                <FiEdit className="inline mr-1" />
                                Edit
                              </button>
                              <button 
                                onClick={() => handleTerminateVenue(venue.id)}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                              >
                                <FiX className="inline mr-1" />
                                Terminate
                              </button>
                            </div>
                          )}
                          {venue.status === 'terminated' && (
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleContinueVenue(venue.id)}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                              >
                                <FiPlay className="inline mr-1" />
                                Continue
                              </button>
                              <button 
                                onClick={() => handleEditVenue(venue)}
                                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                              >
                                <FiEdit className="inline mr-1" />
                                Edit
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Host Features Section */}
          <section className={styles.section}>
            <div className={styles.container}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Manage Your Business</h2>
                <p className={styles.sectionSubtitle}>Everything you need to run your venue business successfully</p>
              </div>
              <div className={styles.hostFeaturesGrid}>
                {hostFeatures.map((feature) => (
                  <Link href={feature.link} key={feature.id}>
                    <motion.div 
                      className={styles.featureCard}
                      whileHover={{ y: -5 }}
                      style={{ cursor: 'pointer' }}
                    >
                      <div 
                        className={styles.featureIcon} 
                        style={{ backgroundColor: `${feature.color}15`, color: feature.color }}
                      >
                        {feature.icon}
                      </div>
                      <h3 className={styles.featureTitle}>{feature.title}</h3>
                      <p className={styles.featureDescription}>{feature.description}</p>
                      <div className={styles.featureLink}>
                        Learn More <FiArrowRight className={styles.arrowIcon} />
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Host Testimonials Section */}
          <section className={`${styles.section} ${styles.bgLight}`}>
            <div className={styles.container}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Success Stories</h2>
                <p className={styles.sectionSubtitle}>See how other hosts are growing their business with Venuity</p>
              </div>
              <div className={styles.testimonialsGrid}>
                {hostTestimonials.map((testimonial) => (
                  <motion.div 
                    key={testimonial.id} 
                    className={styles.testimonialCard}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className={styles.testimonialContent}>
                      <div className={styles.quoteIcon}>"</div>
                      <p className={styles.testimonialText}>{testimonial.content}</p>
                      <div className={styles.rating}>
                        {[...Array(5)].map((_, i) => (
                          i < testimonial.rating ? 
                            <FaStar key={i} className={styles.starFilled} /> : 
                            <FaRegStar key={i} className={styles.starEmpty} />
                        ))}
                      </div>
                    </div>
                    <div className={styles.testimonialAuthor}>
                      <div className={styles.authorInfo}>
                        <h4>{testimonial.name}</h4>
                        <p>{testimonial.business}</p>
                        <span className={styles.revenue}>{testimonial.revenue}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Host CTA Section */}
          <section className={styles.ctaBanner}>
            <div className={styles.container}>
              <div className={styles.ctaContent}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h2>Ready to Grow Your Business?</h2>
                  <p>Access advanced features and analytics to maximize your venue's potential</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Link href="/host/dashboard" className={styles.ctaButton}>
                    Go to Dashboard <FiArrowRight className={styles.ctaIcon} />
                  </Link>
                </motion.div>
              </div>
            </div>
          </section>
        {/* Add Venue Dialog */}
          {showVenueDialog && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <motion.div 
                className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingVenue ? 'Edit Venue' : 'Add New Venue'}
                  </h2>
                  <button 
                    onClick={handleCloseDialog}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FiX size={24} />
                  </button>
                </div>

                <form onSubmit={handleVenueSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Venue Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={newVenue.name}
                        onChange={(e) => handleVenueInputChange('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Grand Ballroom"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location *
                      </label>
                      <input
                        type="text"
                        required
                        value={newVenue.location}
                        onChange={(e) => handleVenueInputChange('location', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Mumbai, India"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Capacity *
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={newVenue.capacity}
                        onChange={(e) => handleVenueInputChange('capacity', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price per Hour *
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={newVenue.pricePerHour}
                        onChange={(e) => handleVenueInputChange('pricePerHour', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={newVenue.description}
                      onChange={(e) => handleVenueInputChange('description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="4"
                      placeholder="Describe your venue, its features, and what makes it special..."
                    />
                  </div>

                  {/* Amenities */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amenities
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        'WiFi', 'Parking', 'Catering', 'Sound System', 'Stage', 
                        'Air Conditioning', 'Projector', 'Dance Floor', 'Bar', 
                        'Restrooms', 'Outdoor Space', 'Kitchen'
                      ].map((amenity) => (
                        <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newVenue.amenities.includes(amenity)}
                            onChange={() => handleAmenityToggle(amenity)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Images */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Venue Images
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <FiImage size={48} className="mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 mb-2">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        id="venue-images"
                      />
                      <label
                        htmlFor="venue-images"
                        className="mt-4 inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
                      >
                        Select Images
                      </label>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end space-x-4 pt-6 border-t">
                    <button
                      type="button"
                      onClick={handleCloseDialog}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {editingVenue ? 'Update Venue' : 'Add Venue'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Venuity - Book Your Perfect Venue</title>
        <meta name="description" content="Find and book the perfect venue for your next event" />
      </Head>

      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>Find the Perfect Venue for Your Next Event</h1>
            <p>Discover and book unique venues for any occasion across India</p>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className={styles.searchContainer}>
              <div className={`${styles.searchInput} relative`}>
                <FiMapPin className={styles.searchIcon} />
                <input 
                  type="text" 
                  placeholder="Location" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pr-10"
                />
                <button 
                  type="button" 
                  onClick={detectLocation}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
                  disabled={isLocating}
                  title="Use my current location"
                >
                  {isLocating ? (
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <FiNavigation className="h-5 w-5" />
                  )}
                </button>
              </div>
              <div className={styles.searchInput}>
                <FiCalendar className={styles.searchIcon} />
                <input 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className={styles.searchInput}>
                <FiUsers className={styles.searchIcon} />
                <input 
                  type="number" 
                  placeholder="Guests" 
                  min="1"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                />
              </div>
              <button type="submit" className={styles.searchButton}>
                <FiSearch /> Search
              </button>
            </form>
          </div>
        </section>

        {/* Categories Section */}
<section className={`${styles.section} ${styles.bgLight}`}>
  <div className={styles.container}>
    <div className={styles.sectionHeader}>
      <h2 className={styles.sectionTitle}>Browse by Category</h2>
      <p className={styles.sectionSubtitle}>Find the perfect venue for any occasion</p>
    </div>
    <div className={styles.categoriesGrid}>
      {categories.map((category) => (
        <Link href={`/venues?category=${category.name.toLowerCase()}`} key={category.id}>
          <motion.div 
            className={styles.categoryCard}
            whileHover={{ y: -5 }}
            style={{ cursor: 'pointer' }}
          >
            <div className={styles.categoryImage}>
              <Image 
                src={category.image} 
                alt={category.name} 
                width={300} 
                height={200}
                className={styles.categoryImg}
                onError={(e) => {
                  console.error('Failed to load image: ${category.image}');
                  e.target.onerror = null;
                  e.target.src = '/images/events/default.jpg';
                }}
              />
            </div>
            <h3>{category.name}</h3>
          </motion.div>
        </Link>
      ))}
    </div>
  </div>
</section>

{/* Featured Venues Section */}
<section className={`${styles.section} ${styles.bgWhite}`}>
  <div className={styles.container}>
    <VenueCarousel venues={featuredVenues} />
  </div>
</section>

{/* How It Works Section */}
<section className={styles.section}>
  <div className={styles.container}>
    <div className={styles.sectionHeader}>
      <h2 className={styles.sectionTitle}>How It Works</h2>
      <p className={styles.sectionSubtitle}>Get your perfect venue in just 3 simple steps</p>
    </div>
    <div className={styles.howItWorks}>
      {howItWorks.map((step, index) => (
        <motion.div 
          key={step.id} 
          className={styles.stepCard}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          viewport={{ once: true }}
        >
          <div 
            className={styles.stepIcon} 
            style={{ backgroundColor: `${step.color}15`, color: step.color }}
          >
            {step.icon}
            <span className={styles.stepNumber}>0{index + 1}</span>
          </div>
          <h3 className={styles.stepTitle}>{step.title}</h3>
          <p className={styles.stepDescription}>{step.description}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>
{/* Testimonials Section */}
<section className={`${styles.section} ${styles.bgLight}`}>
  <div className={styles.container}>
    <div className={styles.sectionHeader}>
      <h2 className={styles.sectionTitle}>What Our Clients Say</h2>
      <p className={styles.sectionSubtitle}>Hear from people who have experienced our service</p>
    </div>
    <div className={styles.testimonialsGrid}>
      {testimonials.map((testimonial) => (
        <motion.div 
          key={testimonial.id} 
          className={styles.testimonialCard}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className={styles.testimonialContent}>
            <div className={styles.quoteIcon}>"</div>
            <p className={styles.testimonialText}>{testimonial.content}</p>
            <div className={styles.rating}>
              {[...Array(5)].map((_, i) => (
                i < testimonial.rating ? 
                  <FaStar key={i} className={styles.starFilled} /> : 
                  <FaRegStar key={i} className={styles.starEmpty} />
              ))}
            </div>
          </div>
          <div className={styles.testimonialAuthor}>
            <div className={styles.authorImage}>
              <Image 
                src={testimonial.image} 
                alt={testimonial.name} 
                width={60} 
                height={60}
                className={styles.authorImg}
              />
            </div>
            <div className={styles.authorInfo}>
              <h4>{testimonial.name}</h4>
              <p>{testimonial.role}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>
{/* Why Choose Us Section */}
<section className={styles.section}>
  <div className={styles.container}>
    <div className={styles.sectionHeader}>
      <h2 className={styles.sectionTitle}>Why Choose Venuity</h2>
      <p className={styles.sectionSubtitle}>We make event planning simple and stress-free</p>
    </div>
    <div className={styles.whyChooseUsGrid}>
      {whyChooseUs.map((feature, index) => (
        <motion.div 
          key={feature.id} 
          className={styles.featureCard}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <div className={styles.featureIcon}>
            {feature.icon}
          </div>
          <h3 className={styles.featureTitle}>{feature.title}</h3>
          <p className={styles.featureDescription}>{feature.description}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>
{/* CTA Banner Section */}
<section className={styles.ctaBanner}>
  <div className={styles.container}>
    <div className={styles.ctaContent}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2>Ready to Find Your Perfect Venue?</h2>
        <p>Join thousands of satisfied customers who found their dream venue with us</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <a href="/venues" className={styles.ctaButton}>
          Explore Venues <FiArrowRight className={styles.ctaIcon} />
        </a>
      </motion.div>
    </div>
  </div>
</section>

{/* Blog/News Section */}
<section className={`${styles.section} ${styles.bgLight}`}>
  <div className={styles.container}>
    <div className={styles.sectionHeader}>
      <h2 className={styles.sectionTitle}>Latest News & Tips</h2>
      <p className={styles.sectionSubtitle}>Stay updated with the latest trends and insights in event planning</p>
    </div>
    <div className={styles.blogGrid}>
      {blogPosts.map((post) => (
        <motion.article 
          key={post.id} 
          className={styles.blogCard}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className={styles.blogImage}>
            <Image 
              src={post.image} 
              alt={post.title}
              width={400}
              height={250}
              className={styles.blogImg}
            />
            <span className={styles.blogCategory}>{post.category}</span>
          </div>
          <div className={styles.blogContent}>
            <div className={styles.blogMeta}>
              <span className={styles.blogDate}>{post.date}</span>
              <span className={styles.blogReadTime}>{post.readTime}</span>
            </div>
            <h3 className={styles.blogTitle}>{post.title}</h3>
            <p className={styles.blogExcerpt}>{post.excerpt}</p>
            <a href={`/blog/${post.id}`} className={styles.readMore}>
              Read More <FiArrowRight className={styles.arrowIcon} />
            </a>
          </div>
        </motion.article>
      ))}
    </div>
    <div className={styles.seeAllContainer}>
      <a href="/blog" className={styles.seeAllLink}>
        View All Articles <FiArrowRight className={styles.arrowIcon} />
      </a>
    </div>
  </div>
</section>

{/* Newsletter Signup Section */}
<section className={`${styles.newsletter} ${styles.section}`}>
  <div className={styles.container}>
    <motion.div
      className={styles.newsletterContent}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2>Stay Updated</h2>
      <p>Subscribe to our newsletter for the latest venue updates, special offers, and event planning tips.</p>
      <form className={styles.newsletterForm} onSubmit={handleSubscribe}>
        <input
          type="email"
          className={styles.newsletterInput}
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button 
          type="submit" 
          className={styles.newsletterButton}
          disabled={!email}
        >
          <FiMail size={18} /> Subscribe
        </button>
      </form>
      <svg 
        className={`${styles.newsletterPattern} ${styles.newsletterPattern1}`} 
        viewBox="0 0 200 200" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M45,-78.8C58.3,-69.9,69.1,-57.7,74.1,-43.4C79.1,-29.1,78.4,-12.5,78.9,4.5C79.4,21.5,81.2,43,70.9,56.9C60.6,70.8,38.2,77.1,18.1,81.6C-2,86.1,-19.7,88.8,-33.2,80.6C-46.7,72.4,-56,53.3,-65.3,36.9C-74.6,20.5,-83.9,6.8,-85.2,-8.2C-86.5,-23.2,-79.8,-39.6,-66.7,-48.7C-53.5,-57.8,-33.9,-59.6,-19.8,-67.6C-5.7,-75.6,2.9,-89.8,15.8,-91.2C28.7,-92.6,45.8,-81.2,45,-78.8Z" transform="translate(100 100)" />
      </svg>
      <svg 
        className={`${styles.newsletterPattern} ${styles.newsletterPattern2}`} 
        viewBox="0 0 200 200" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M45,-78.8C58.3,-69.9,69.1,-57.7,74.1,-43.4C79.1,-29.1,78.4,-12.5,78.9,4.5C79.4,21.5,81.2,43,70.9,56.9C60.6,70.8,38.2,77.1,18.1,81.6C-2,86.1,-19.7,88.8,-33.2,80.6C-46.7,72.4,-56,53.3,-65.3,36.9C-74.6,20.5,-83.9,6.8,-85.2,-8.2C-86.5,-23.2,-79.8,-39.6,-66.7,-48.7C-53.5,-57.8,-33.9,-59.6,-19.8,-67.6C-5.7,-75.6,2.9,-89.8,15.8,-91.2C28.7,-92.6,45.8,-81.2,45,-78.8Z" transform="translate(100 100)" />
      </svg>
    </motion.div>
  </div>
</section>

        {/* Add other sections here */}
      </main>
    </Layout>
  );
}
