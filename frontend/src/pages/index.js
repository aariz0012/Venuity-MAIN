import { useState, useEffect } from 'react';
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
  FiPlay,
  FiAlertCircle,
  FiInfo,
  FiVideo
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
  const [currentStep, setCurrentStep] = useState(1);
  const [editStep, setEditStep] = useState(1);
  const [tooltip, setTooltip] = useState('');
  const [venueBookings, setVenueBookings] = useState({});
  const [editMediaFiles, setEditMediaFiles] = useState([]);
  const [editVideos, setEditVideos] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarStartMonth, setCalendarStartMonth] = useState(new Date());
  const [selectedVenue, setSelectedVenue] = useState(null);
  
  // Load venues from localStorage on component mount
  useEffect(() => {
    const savedVenues = localStorage.getItem('hostVenues');
    if (savedVenues) {
      try {
        const parsedVenues = JSON.parse(savedVenues);
        if (Array.isArray(parsedVenues) && parsedVenues.length > 0) {
          setHostVenues(parsedVenues);
        }
      } catch (error) {
        console.error('Error loading venues from localStorage:', error);
      }
    }
  }, []);

  // Save venues to localStorage whenever they change
  useEffect(() => {
    if (hostVenues.length > 0) {
      localStorage.setItem('hostVenues', JSON.stringify(hostVenues));
    }
  }, [hostVenues]);
  
  const [newVenue, setNewVenue] = useState({
    name: '',
    location: '',
    capacity: '',
    description: '',
    amenities: [],
    spaceTypes: [],
    foodAndCatering: {
      foodMenu: {
        veg: false,
        nonVeg: false
      },
      cateringPolicy: {
        inHouseCatering: false,
        outsideCateringAllowed: false,
        cateringMandatory: false,
        barService: false
      }
    },
    decoration: {
      decorType: {
        standard: false,
        themeBased: false,
        premiumFloral: false
      },
      decorPolicy: {
        outsideDecoratorAllowed: false
      }
    },
    pricingModel: {
      rateType: {
        perPlate: false,
        perDay: false
      },
      prices: {
        vegPlatePrice: '',
        nonVegPlatePrice: '',
        perDayPrice: '',
        vegPlateMin: '',
        vegPlateMax: '',
        nonVegPlateMin: '',
        nonVegPlateMax: ''
      }
    },
    mediaAndTrust: {
      highResPhotos: [],
      gstLicense: []
    },
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
    setCurrentStep(1);
  };

  const handleNextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleCloseDialog = () => {
    setShowVenueDialog(false);
    setEditingVenue(null);
    setCurrentStep(1);
    setEditStep(1);
    setEditMediaFiles([]);
    setEditVideos([]);
    setNewVenue({
      name: '',
      location: '',
      capacity: '',
      description: '',
      amenities: [],
      spaceTypes: [],
      images: [],
      foodAndCatering: {
        foodMenu: { items: [] },
        cateringPolicy: {
          inHouseCatering: false,
          outsideCateringAllowed: false,
          cateringMandatory: false,
          barService: false
        }
      },
      decoration: {
        decorType: {
          standard: false,
          themeBased: false,
          premiumFloral: false
        },
        decorPolicy: {
          outsideDecoratorAllowed: false
        }
      },
      pricingModel: {
        rateType: {
          perPlate: false,
          perDay: false
        },
        prices: {
          vegPlatePrice: '',
          nonVegPlatePrice: '',
          perDayPrice: '',
          vegPlateMin: '',
          vegPlateMax: '',
          nonVegPlateMin: '',
          nonVegPlateMax: ''
        }
      },
      mediaAndTrust: {
        highResPhotos: [],
        gstLicense: []
      },
      images: []
    });
  };

  const handleVenueSubmit = (e) => {
    e.preventDefault();
    
    if (editingVenue) {
      // Update existing venue with new media files and save bookings
      const updatedVenue = {
        ...editingVenue,
        images: editMediaFiles,
        videos: editVideos,
        updatedAt: new Date().toISOString()
      };
      
      // Update venue in hostVenues
      setHostVenues(prev => 
        prev.map(venue => 
          venue.id === editingVenue.id ? updatedVenue : venue
        )
      );
      
      // Save bookings to localStorage
      if (venueBookings[editingVenue.id]) {
        localStorage.setItem(`venueBookings_${editingVenue.id}`, JSON.stringify(venueBookings[editingVenue.id]));
      }
    } else {
      // Add new venue
      const venue = {
        ...newVenue,
        id: Date.now().toString(),
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setHostVenues(prev => [...prev, venue]);
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

  const handleSpaceTypeToggle = (spaceType) => {
    setNewVenue(prev => ({
      ...prev,
      spaceTypes: prev.spaceTypes && prev.spaceTypes.includes(spaceType)
        ? prev.spaceTypes.filter(s => s !== spaceType)
        : [...(prev.spaceTypes || []), spaceType]
    }));
  };

  const handleFoodMenuToggle = (menuItem) => {
    setNewVenue(prev => ({
      ...prev,
      foodAndCatering: {
        ...prev.foodAndCatering,
        foodMenu: {
          ...prev.foodAndCatering.foodMenu,
          [menuItem]: !prev.foodAndCatering.foodMenu[menuItem]
        }
      }
    }));
  };

  const handleCateringPolicyToggle = (policy) => {
    setNewVenue(prev => ({
      ...prev,
      foodAndCatering: {
        ...prev.foodAndCatering,
        cateringPolicy: {
          ...prev.foodAndCatering.cateringPolicy,
          [policy]: !prev.foodAndCatering.cateringPolicy[policy]
        }
      }
    }));
  };

  const handleDecorTypeToggle = (decorType) => {
    setNewVenue(prev => ({
      ...prev,
      decoration: {
        ...prev.decoration,
        decorType: {
          ...prev.decoration.decorType,
          [decorType]: !prev.decoration.decorType[decorType]
        }
      }
    }));
  };

  const handleDecorPolicyToggle = (policy) => {
    setNewVenue(prev => ({
      ...prev,
      decoration: {
        ...prev.decoration,
        decorPolicy: {
          ...prev.decoration.decorPolicy,
          [policy]: !prev.decoration.decorPolicy[policy]
        }
      }
    }));
  };

  const handleRateTypeToggle = (rateType) => {
    setNewVenue(prev => ({
      ...prev,
      pricingModel: {
        ...prev.pricingModel,
        rateType: {
          ...prev.pricingModel.rateType,
          [rateType]: !prev.pricingModel.rateType[rateType]
        }
      }
    }));
  };

  const handlePriceChange = (priceField, value) => {
    setNewVenue(prev => ({
      ...prev,
      pricingModel: {
        ...prev.pricingModel,
        prices: {
          ...prev.pricingModel.prices,
          [priceField]: value
        }
      }
    }));
  };

  const handleMediaUpload = (category, files) => {
    const fileArray = Array.from(files);
    setNewVenue(prev => ({
      ...prev,
      mediaAndTrust: {
        ...prev.mediaAndTrust,
        [category]: [...prev.mediaAndTrust[category], ...fileArray]
      }
    }));
  };

  const handleImageUpload = (file) => {
    if (file) {
      setNewVenue(prev => ({
        ...prev,
        images: [file] // Store as single image array
      }));
    }
  };

  const handleEditCalendarToggle = (year, month, day, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!editingVenue) return;
    
    const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const currentBookings = venueBookings[editingVenue.id] || [];
    const existingBooking = currentBookings.find(booking => booking.date === dateStr);
    
    if (existingBooking) {
      // Remove booking (make available)
      const updatedBookings = currentBookings.filter(booking => booking.date !== dateStr);
      setVenueBookings(prev => ({ ...prev, [editingVenue.id]: updatedBookings }));
    } else {
      // Add booking (make unavailable)
      const updatedBookings = [...currentBookings, {
        id: Date.now(),
        date: dateStr,
        customer: 'Blocked by Host',
        status: 'blocked'
      }];
      setVenueBookings(prev => ({ ...prev, [editingVenue.id]: updatedBookings }));
    }
  };

  const handleEditMediaUpload = (files) => {
    const newFiles = Array.from(files);
    setEditMediaFiles(prev => [...prev, ...newFiles]);
  };

  const handleEditVideoUpload = (files) => {
    const newFiles = Array.from(files);
    setEditVideos(prev => [...prev, ...newFiles]);
  };

  const handleEditMediaRemove = (index, type) => {
    if (type === 'image') {
      setEditMediaFiles(prev => prev.filter((_, i) => i !== index));
    } else if (type === 'video') {
      setEditVideos(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleEditPrevStep = () => {
    setEditStep(prev => prev - 1);
  };

  const handleEditNextStep = () => {
    setEditStep(prev => prev + 1);
  };

  // Helper functions for calendar
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getMonthName = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const generateCalendarDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = getDaysInMonth(date);
    const firstDay = getFirstDayOfMonth(date);
    const days = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const isDateBooked = (year, month, day) => {
    if (!editingVenue) return false;
    const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const currentBookings = venueBookings[editingVenue.id] || [];
    return currentBookings.some(booking => booking.date === dateStr);
  };

  const isToday = (year, month, day) => {
    const today = new Date();
    return year === today.getFullYear() && 
           month === today.getMonth() && 
           day === today.getDate();
  };

  const handleMediaRemove = (category, index) => {
    setNewVenue(prev => ({
      ...prev,
      mediaAndTrust: {
        ...prev.mediaAndTrust,
        [category]: prev.mediaAndTrust[category].filter((_, i) => i !== index)
      }
    }));
  };

  const handleEditVenue = (venue) => {
    setEditingVenue(venue);
    setEditStep(1);
    setCalendarStartMonth(new Date()); // Reset calendar to current month
    
    // Load venue bookings from localStorage
    const savedBookings = localStorage.getItem(`venueBookings_${venue.id}`);
    if (savedBookings) {
      try {
        const parsedBookings = JSON.parse(savedBookings);
        setVenueBookings(prev => ({ ...prev, [venue.id]: parsedBookings }));
      } catch (error) {
        console.error('Error loading venue bookings:', error);
        setVenueBookings(prev => ({ ...prev, [venue.id]: [] }));
      }
    } else {
      setVenueBookings(prev => ({ ...prev, [venue.id]: [] }));
    }
    
    // Load existing media files
    setEditMediaFiles(venue.images || []);
    setEditVideos(venue.videos || []);
    
    setNewVenue({
      name: venue.name,
      location: venue.location,
      capacity: venue.capacity,
      description: venue.description,
      amenities: venue.amenities,
      spaceTypes: venue.spaceTypes || [],
      images: venue.images
    });
    setShowVenueDialog(true);
  };

  // Calendar navigation functions
  const handleCalendarPrev = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCalendarStartMonth(prev => {
      const currentDate = new Date();
      const minDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      
      // Don't allow navigation before current month
      if (newDate < minDate) {
        return minDate;
      }
      return newDate;
    });
  };

  const handleCalendarNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCalendarStartMonth(prev => {
      const currentDate = new Date();
      const maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 5, 1);
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      
      // Don't allow navigation beyond 6 months from current
      if (newDate > maxDate) {
        return maxDate;
      }
      return newDate;
    });
  };

  const handleVenueClick = (venue) => {
    setSelectedVenue(venue);
  };

  const handleVenueDetailClose = () => {
    setSelectedVenue(null);
  };

  const handleTerminateVenue = (venueId) => {
    const venue = hostVenues.find(v => v.id === venueId);
    if (!venue) return;

    // Create confirmation dialog with options
    const action = window.confirm(
      'Choose an action:\n\n' +
      'Click "OK" to TERMINATE this venue (will no longer be visible to customers but can be reactivated)\n' +
      'Click "Cancel" to DELETE PERMANENTLY (venue will be completely removed and cannot be recovered)'
    );

    if (action) {
      // Terminate venue
      setHostVenues(prev => 
        prev.map(venue => 
          venue.id === venueId 
            ? { ...venue, status: 'terminated', updatedAt: new Date().toISOString() }
            : venue
        )
      );
    } else {
      // Delete permanently
      setHostVenues(prev => prev.filter(venue => venue.id !== venueId));
      
      // Also remove from localStorage to ensure permanent deletion
      const currentVenues = JSON.parse(localStorage.getItem('hostVenues') || '[]');
      const updatedVenues = currentVenues.filter(v => v.id !== venueId);
      localStorage.setItem('hostVenues', JSON.stringify(updatedVenues));
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

          
          {/* Host Venues Section */}
          <section className={styles.section}>
            <div className={styles.container}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Your Venues</h2>
                <p className={styles.sectionSubtitle}>Manage your venue listings and make them visible to customers</p>
              </div>
              
              {hostVenues.length === 0 ? (
                <div className={`${styles.noVenues} text-center py-12`}>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No venues yet</h3>
                  <p className="text-gray-500 mb-6">Start by adding your first venue to attract customers</p>
                  <button onClick={handleAddVenue} className={styles.primaryButton}>
                    <FiPlus /> Add Your First Venue
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                  {hostVenues.map((venue) => (
                    <motion.div 
                      key={venue.id} 
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer hover:scale-105 hover:border-blue-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      whileHover={{ 
                        y: -5,
                        scale: 1.02,
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                      }}
                      onClick={() => handleVenueClick(venue)}
                    >
                      {/* Venue Image Container */}
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                        {venue.images && venue.images.length > 0 ? (
                          venue.images[0] instanceof File ? (
                            <img 
                              src={URL.createObjectURL(venue.images[0])} 
                              alt={venue.name} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Image 
                              src={venue.images[0]} 
                              alt={venue.name} 
                              width={400} 
                              height={192}
                              className="w-full h-full object-cover"
                            />
                          )
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FiImage size={48} className="text-gray-400" />
                          </div>
                        )}
                        
                        {/* Status Badge */}
                        <div className="absolute top-3 right-3">
                          {venue.status === 'published' && (
                            <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full shadow-lg">
                              Published
                            </span>
                          )}
                          {venue.status === 'draft' && (
                            <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full shadow-lg">
                              Draft
                            </span>
                          )}
                          {venue.status === 'terminated' && (
                            <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full shadow-lg">
                              Terminated
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Venue Content */}
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-lg font-bold text-gray-900 mb-1">{venue.name}</h3>
                          <div className="flex items-center text-sm text-gray-600">
                            <FiMapPin className="mr-2 text-blue-500" />
                            <button
                              onClick={() => {
                                const query = encodeURIComponent(venue.location);
                                window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
                              }}
                              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                              title="View on map"
                            >
                              {venue.location}
                            </button>
                          </div>
                        </div>

                        {/* Venue Details */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center text-gray-700">
                              <FiUsers className="mr-2 text-blue-500" />
                              <span className="font-medium">{venue.capacity}</span>
                              <span className="text-gray-500 ml-1">guests</span>
                            </div>
                            {venue.pricingModel?.prices?.perDayPrice && (
                              <div className="flex items-center text-green-600 font-semibold">
                                <span className="text-sm">₹</span>
                                <span className="ml-1">{venue.pricingModel.prices.perDayPrice}</span>
                                <span className="text-gray-500 text-sm font-normal ml-1">/day</span>
                              </div>
                            )}
                            {venue.pricePerHour && (
                              <div className="flex items-center text-green-600 font-semibold">
                                <span className="text-sm">₹</span>
                                <span className="ml-1">{venue.pricePerHour}</span>
                                <span className="text-gray-500 text-sm font-normal ml-1">/hour</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Amenities */}
                        {venue.amenities && venue.amenities.length > 0 && (
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-1">
                              {venue.amenities.slice(0, 4).map((amenity, index) => (
                                <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                                  {amenity}
                                </span>
                              ))}
                              {venue.amenities.length > 4 && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                                  +{venue.amenities.length - 4} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-3 border-t border-gray-100">
                          {venue.status === 'draft' && (
                            <>
                              <button 
                                onClick={() => handlePublishVenue(venue.id)}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                              >
                                <FiCheckCircle className="mr-2" />
                                Publish
                              </button>
                              <button 
                                onClick={() => handleEditVenue(venue)}
                                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                              >
                                <FiEdit className="mr-2" />
                                Edit
                              </button>
                            </>
                          )}
                          {venue.status === 'published' && (
                            <>
                              <button 
                                onClick={() => handleEditVenue(venue)}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                              >
                                <FiEdit className="mr-2" />
                                Edit
                              </button>
                              <button 
                                onClick={() => handleTerminateVenue(venue.id)}
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                              >
                                <FiX className="mr-2" />
                                Terminate
                              </button>
                            </>
                          )}
                          {venue.status === 'terminated' && (
                            <>
                              <button 
                                onClick={() => handleContinueVenue(venue.id)}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                              >
                                <FiPlay className="mr-2" />
                                Reactivate
                              </button>
                              <button 
                                onClick={() => handleEditVenue(venue)}
                                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                              >
                                <FiEdit className="mr-2" />
                                Edit
                              </button>
                            </>
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

                {!editingVenue && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {currentStep === 1 ? 'Step 1. Basic Details' : 
                       currentStep === 2 ? 'Step 2. Food & Catering' : 
                       currentStep === 3 ? 'Step 3. Decoration' :
                       currentStep === 4 ? 'Step 4. Pricing Model' :
                       'Step 5. Media & Trust'}
                    </h3>
                  </div>
                )}

                <form onSubmit={handleVenueSubmit} className="space-y-6">
                  {/* Step 1: Basic Details */}
                  {currentStep === 1 && !editingVenue && (
                    <>
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
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={newVenue.location}
                          onChange={(e) => handleVenueInputChange('location', e.target.value)}
                          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Mumbai, India"
                        />
                        <button 
                          type="button" 
                          onClick={() => {
                            if (navigator.geolocation) {
                              navigator.geolocation.getCurrentPosition(
                                async (position) => {
                                  try {
                                    const { latitude, longitude } = position.coords;
                                    
                                    // Use OpenStreetMap Nominatim API for reverse geocoding (free)
                                    const response = await fetch(
                                      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
                                      {
                                        headers: {
                                          'User-Agent': 'Venuity Venue App'
                                        }
                                      }
                                    );
                                    
                                    if (response.ok) {
                                      const data = await response.json();
                                      const address = data.display_name || data.address?.city || data.address?.town || 'Unknown Location';
                                      handleVenueInputChange('location', address);
                                    } else {
                                      // Fallback to coordinates if API fails
                                      handleVenueInputChange('location', `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
                                    }
                                  } catch (error) {
                                    console.error('Error getting address:', error);
                                    // Fallback to coordinates
                                    const { latitude, longitude } = position.coords;
                                    handleVenueInputChange('location', `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
                                  }
                                },
                                (error) => {
                                  console.error('Error getting location:', error);
                                  let errorMessage = 'Unable to detect location. Please enter manually.';
                                  
                                  switch(error.code) {
                                    case error.PERMISSION_DENIED:
                                      errorMessage = 'Location access denied. Please enable location permissions.';
                                      break;
                                    case error.POSITION_UNAVAILABLE:
                                      errorMessage = 'Location information unavailable. Please enter manually.';
                                      break;
                                    case error.TIMEOUT:
                                      errorMessage = 'Location request timed out. Please try again.';
                                      break;
                                  }
                                  
                                  alert(errorMessage);
                                }
                              );
                            } else {
                              alert('Geolocation is not supported by this browser.');
                            }
                          }}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
                          title="Use my current location"
                        >
                          <FiNavigation className="h-5 w-5" />
                        </button>
                      </div>
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
                        max="1000"
                        value={newVenue.capacity}
                        onChange={(e) => handleVenueInputChange('capacity', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="300"
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

                  {/* Space Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Space Type
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['Indoor', 'Outdoor', 'Rooftop', 'Poolside'].map((spaceType) => (
                        <label key={spaceType} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newVenue.spaceTypes && newVenue.spaceTypes.includes(spaceType)}
                            onChange={() => handleSpaceTypeToggle(spaceType)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{spaceType}</span>
                        </label>
                      ))}
                    </div>
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
                    <div className="flex items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Venue Profile Image
                      </label>
                      <div className="relative ml-2">
                        <i 
                          className="text-gray-400 cursor-help text-sm"
                          onMouseEnter={() => setTooltip('venueImage')}
                          onMouseLeave={() => setTooltip('')}
                        >
                          (i)
                        </i>
                        {tooltip === 'venueImage' && (
                          <div className="absolute bottom-full left-0 mb-2 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                            Upload a image for profile view of venue
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      {newVenue.images && newVenue.images.length > 0 ? (
                        <div className="mb-4">
                          <img 
                            src={URL.createObjectURL(newVenue.images[0])} 
                            alt="Selected venue image" 
                            className="w-32 h-32 object-cover rounded-lg mx-auto"
                          />
                          <p className="text-sm text-green-600 mt-2">Uploaded</p>
                        </div>
                      ) : (
                        <>
                          <FiImage size={48} className="mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600 mb-2">
                            Click to upload a single venue profile image
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="venue-image"
                        onChange={(e) => handleImageUpload(e.target.files[0])}
                      />
                      <label
                        htmlFor="venue-image"
                        className="mt-4 inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
                      >
                        {newVenue.images && newVenue.images.length > 0 ? 'Change Image' : 'Select Image'}
                      </label>
                    </div>
                  </div>
                    </>
                  )}

                  {/* Step 2: Food & Catering */}
                  {currentStep === 2 && !editingVenue && (
                    <>
                      <div className="space-y-6">
                        {/* Food Menu Section */}
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-semibold text-gray-800">Food Menu</h4>
                            <button
                              type="button"
                              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1"
                            >
                              <FiPlus size={14} />
                              <span>Add Menu</span>
                            </button>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {[
                              { key: 'veg', label: 'Veg' },
                              { key: 'nonVeg', label: 'Non-Veg' }
                            ].map((item) => (
                              <label key={item.key} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={newVenue.foodAndCatering.foodMenu[item.key]}
                                  onChange={() => handleFoodMenuToggle(item.key)}
                                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700">{item.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Catering Policy Section */}
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800 mb-4">Catering Policy</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {[
                              { key: 'inHouseCatering', label: 'In-house catering available' },
                              { key: 'outsideCateringAllowed', label: 'Outside catering allowed' },
                              { key: 'cateringMandatory', label: 'Catering mandatory' },
                              { key: 'barService', label: 'Bar service available' }
                            ].map((policy) => (
                              <label key={policy.key} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={newVenue.foodAndCatering.cateringPolicy[policy.key]}
                                  onChange={() => handleCateringPolicyToggle(policy.key)}
                                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700">{policy.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Step 3: Decoration */}
                  {currentStep === 3 && !editingVenue && (
                    <>
                      <div className="space-y-6">
                        {/* Decor Type Section */}
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800 mb-4">Decor Type</h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {[
                              { 
                                key: 'standard', 
                                label: 'Standard',
                                description: 'Basic seating and lighting'
                              },
                              { 
                                key: 'themeBased', 
                                label: 'Theme Based',
                                description: 'Specific Setups'
                              },
                              { 
                                key: 'premiumFloral', 
                                label: 'Premium Floral',
                                description: 'High-end floral and stage production'
                              }
                            ].map((item) => (
                              <label key={item.key} className="flex items-start space-x-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={newVenue.decoration.decorType[item.key]}
                                  onChange={() => handleDecorTypeToggle(item.key)}
                                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                                />
                                <div>
                                  <span className="text-sm text-gray-700">{item.label}</span>
                                  <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Decor Policy Section */}
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800 mb-4">Decor Policy</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {[
                              { key: 'outsideDecoratorAllowed', label: 'Outside Decorator Allowed' }
                            ].map((policy) => (
                              <label key={policy.key} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={newVenue.decoration.decorPolicy[policy.key]}
                                  onChange={() => handleDecorPolicyToggle(policy.key)}
                                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700">{policy.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Step 4: Pricing Model */}
                  {currentStep === 4 && !editingVenue && (
                    <>
                      <div className="space-y-6">
                        {/* Rate Type Section */}
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800 mb-4">Rate Type</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {[
                              { key: 'perPlate', label: 'Per Plate' },
                              { key: 'perDay', label: 'Per Day' }
                            ].map((item) => (
                              <label key={item.key} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={newVenue.pricingModel.rateType[item.key]}
                                  onChange={() => handleRateTypeToggle(item.key)}
                                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700">{item.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Conditional Price Inputs */}
                        {newVenue.pricingModel.rateType.perPlate && (
                          <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                              <div className="relative">
                                <i 
                                  className="text-gray-400 cursor-help text-sm"
                                  onMouseEnter={() => setTooltip('perPlate')}
                                  onMouseLeave={() => setTooltip('')}
                                >
                                  (i)
                                </i>
                                {tooltip === 'perPlate' && (
                                  <div className="absolute bottom-full left-0 mb-2 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                                    Includes Both Food + Venue<br/>
                                  </div>
                                )}
                              </div>
                              <h4 className="text-lg font-semibold text-gray-800 mb-4">Per Plate Pricing</h4>
                            </div>
                            <div className="space-y-6">
                              {/* Veg Plate Pricing */}
                              <div>
                                <h5 className="text-md font-medium text-gray-700 mb-3">Veg Plate</h5>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Price
                                    </label>
                                    <input
                                      type="number"
                                      min="0"
                                      step="0.01"
                                      value={newVenue.pricingModel.prices.vegPlatePrice}
                                      onChange={(e) => handlePriceChange('vegPlatePrice', e.target.value)}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      placeholder="0.00"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Min
                                    </label>
                                    <input
                                      type="number"
                                      min="0"
                                      step="0.01"
                                      value={newVenue.pricingModel.prices.vegPlateMin}
                                      onChange={(e) => handlePriceChange('vegPlateMin', e.target.value)}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      placeholder="0.00"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Max
                                    </label>
                                    <input
                                      type="number"
                                      min="0"
                                      step="0.01"
                                      value={newVenue.pricingModel.prices.vegPlateMax}
                                      onChange={(e) => handlePriceChange('vegPlateMax', e.target.value)}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      placeholder="0.00"
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Non-Veg Plate Pricing */}
                              <div>
                                <h5 className="text-md font-medium text-gray-700 mb-3">Non-Veg Plate</h5>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Price
                                    </label>
                                    <input
                                      type="number"
                                      min="0"
                                      step="0.01"
                                      value={newVenue.pricingModel.prices.nonVegPlatePrice}
                                      onChange={(e) => handlePriceChange('nonVegPlatePrice', e.target.value)}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      placeholder="0.00"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Min
                                    </label>
                                    <input
                                      type="number"
                                      min="0"
                                      step="0.01"
                                      value={newVenue.pricingModel.prices.nonVegPlateMin}
                                      onChange={(e) => handlePriceChange('nonVegPlateMin', e.target.value)}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      placeholder="0.00"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Max
                                    </label>
                                    <input
                                      type="number"
                                      min="0"
                                      step="0.01"
                                      value={newVenue.pricingModel.prices.nonVegPlateMax}
                                      onChange={(e) => handlePriceChange('nonVegPlateMax', e.target.value)}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      placeholder="0.00"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {newVenue.pricingModel.rateType.perDay && (
                          <div>
                            <div className="flex items-center space-x-2">
                              <div className="relative">
                                <i 
                                  className="text-gray-400 cursor-help text-sm"
                                  onMouseEnter={() => setTooltip('perDay')}
                                  onMouseLeave={() => setTooltip('')}
                                >
                                  (i)
                                </i>
                                {tooltip === 'perDay' && (
                                  <div className="absolute bottom-full left-0 mb-2 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                                    Price is Just for the Space
                                  </div>
                                )}
                              </div>
                              <h4 className="text-lg font-semibold text-gray-800 mb-4">Per Day Pricing</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Price Per Day
                                </label>
                                <input
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  value={newVenue.pricingModel.prices.perDayPrice}
                                  onChange={(e) => handlePriceChange('perDayPrice', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  placeholder="0.00"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {/* Step 5: Media & Trust */}
                  {currentStep === 5 && !editingVenue && (
                    <>
                      <div className="space-y-6">
                        {/* High-res Photos Section */}
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800 mb-4">High-res Photos</h4>
                          <p className="text-sm text-gray-600 mb-4">
                            Upload high-quality photos and videos of your venue. Images and videos help customers visualize your space.
                          </p>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <input
                              type="file"
                              multiple
                              accept="image/*,video/*"
                              className="hidden"
                              id="high-res-photos"
                              onChange={(e) => handleMediaUpload('highResPhotos', e.target.files)}
                            />
                            <label
                              htmlFor="high-res-photos"
                              className="cursor-pointer inline-block"
                            >
                              <div className="flex flex-col items-center">
                                <FiImage size={48} className="text-gray-400 mb-3" />
                                <span className="text-gray-700 font-medium">Upload Photos & Videos</span>
                                <span className="text-gray-500 text-sm mt-1">PNG, JPG, GIF, MP4 up to 50MB</span>
                              </div>
                            </label>
                          </div>
                          {newVenue.mediaAndTrust.highResPhotos.length > 0 && (
                            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                              {newVenue.mediaAndTrust.highResPhotos.map((file, index) => (
                                <div key={index} className="relative group">
                                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                                    {file.type.startsWith('video/') ? (
                                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                        <FiPlay size={24} className="text-gray-600" />
                                      </div>
                                    ) : (
                                      <img
                                        src={URL.createObjectURL(file)}
                                        alt={`Upload ${index + 1}`}
                                        className="w-full h-full object-cover"
                                      />
                                    )}
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => handleMediaRemove('highResPhotos', index)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <FiX size={12} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* GST/License Section */}
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800 mb-4">GST/License</h4>
                          <p className="text-sm text-gray-600 mb-4">
                            Upload your GST certificate and business licenses to build trust with customers.
                          </p>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              className="hidden"
                              id="gst-license"
                              onChange={(e) => handleMediaUpload('gstLicense', e.target.files)}
                            />
                            <label
                              htmlFor="gst-license"
                              className="cursor-pointer inline-block"
                            >
                              <div className="flex flex-col items-center">
                                <FiImage size={48} className="text-gray-400 mb-3" />
                                <span className="text-gray-700 font-medium">Upload GST/License Documents</span>
                                <span className="text-gray-500 text-sm mt-1">PNG, JPG, GIF up to 10MB</span>
                              </div>
                            </label>
                          </div>
                          {newVenue.mediaAndTrust.gstLicense.length > 0 && (
                            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                              {newVenue.mediaAndTrust.gstLicense.map((file, index) => (
                                <div key={index} className="relative group">
                                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                                    <img
                                      src={URL.createObjectURL(file)}
                                      alt={`Document ${index + 1}`}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => handleMediaRemove('gstLicense', index)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <FiX size={12} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Edit Venue (2-step process) */}
                  {editingVenue && (
                    <>
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {editStep === 1 ? 'Step 1. Availability' : 'Step 2. Media'}
                        </h3>
                        <div className="flex space-x-2 mt-2">
                          <div className={`flex-1 h-1 rounded-full ${editStep >= 1 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                          <div className={`flex-1 h-1 rounded-full ${editStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                        </div>
                      </div>

                      {/* Step 1: Availability Calendar */}
                      {editStep === 1 && (
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-md font-semibold text-gray-700 mb-4">Manage Venue Availability</h4>
                            <p className="text-sm text-gray-600 mb-4">Click on dates to mark them as available (green) or booked (red). This will be visible to customers.</p>
                            
                            {/* Calendar with Navigation */}
                            <div className="space-y-4">
                              {/* Navigation Header */}
                              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                                <button
                                  onClick={handleCalendarPrev}
                                  className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                                  title="Previous Month"
                                >
                                  <FiChevronRight className="rotate-180" size={20} />
                                </button>
                                
                                <h3 className="text-lg font-semibold text-gray-800">
                                  {getMonthName(calendarStartMonth)}
                                </h3>
                                
                                <button
                                  onClick={handleCalendarNext}
                                  className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                                  title="Next Month"
                                >
                                  <FiChevronRight size={20} />
                                </button>
                              </div>

                              {/* Current Month Calendar */}
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-600 mb-2">
                                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                    <div key={day} className="py-2">{day}</div>
                                  ))}
                                </div>
                                <div className="grid grid-cols-7 gap-1">
                                  {generateCalendarDays(calendarStartMonth).map((day, dayIndex) => {
                                    if (day === null) {
                                      return <div key={dayIndex} className="p-2 h-10"></div>;
                                    }
                                    
                                    const year = calendarStartMonth.getFullYear();
                                    const month = calendarStartMonth.getMonth();
                                    const booked = isDateBooked(year, month, day);
                                    const today = isToday(year, month, day);
                                    
                                    return (
                                      <button
                                        key={dayIndex}
                                        onClick={(e) => handleEditCalendarToggle(year, month, day, e)}
                                        className={`p-2 h-10 text-sm rounded transition-colors ${
                                          today ? 'bg-blue-600 text-white font-bold' :
                                          booked ? 'bg-red-100 text-red-800 hover:bg-red-200' :
                                          'bg-white hover:bg-green-100 text-gray-900 border border-gray-200'
                                        }`}
                                      >
                                        {day}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Month Quick Navigation */}
                              <div className="flex flex-wrap gap-2 justify-center">
                                {Array.from({ length: 6 }, (_, i) => {
                                  const monthDate = new Date(new Date().getFullYear(), new Date().getMonth() + i, 1);
                                  const isActive = monthDate.getMonth() === calendarStartMonth.getMonth() && 
                                                 monthDate.getFullYear() === calendarStartMonth.getFullYear();
                                  return (
                                    <button
                                      key={i}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setCalendarStartMonth(monthDate);
                                      }}
                                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                                        isActive 
                                          ? 'bg-blue-600 text-white' 
                                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                      }`}
                                    >
                                      {monthDate.toLocaleDateString('en-US', { month: 'short' })}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Booked Dates List */}
                            <div className="mt-6">
                              <h5 className="text-sm font-semibold text-gray-700 mb-3">Booked/Blocked Dates</h5>
                              <div className="space-y-2 max-h-40 overflow-y-auto">
                                {venueBookings[editingVenue.id]?.length > 0 ? (
                                  venueBookings[editingVenue.id].map((booking) => (
                                    <div key={booking.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
                                      <span className="text-sm text-gray-700">{booking.date}</span>
                                      <span className="text-xs text-red-600">{booking.customer}</span>
                                    </div>
                                  ))
                                ) : (
                                  <p className="text-sm text-gray-500 text-center py-4">No booked dates yet</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step 2: Media */}
                      {editStep === 2 && (
                        <div className="space-y-6">
                          {/* Images Section */}
                          <div>
                            <h4 className="text-md font-semibold text-gray-700 mb-4">Venue Images</h4>
                            <p className="text-sm text-gray-600 mb-4">Add high-quality images to showcase your venue to customers.</p>
                            
                            {/* Upload Area */}
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4">
                              <FiImage size={48} className="mx-auto text-gray-400 mb-2" />
                              <p className="text-sm text-gray-600 mb-2">
                                Click to upload venue images
                              </p>
                              <p className="text-xs text-gray-500 mb-4">
                                PNG, JPG, GIF up to 10MB each
                              </p>
                              <input
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                id="edit-venue-images"
                                onChange={(e) => handleEditMediaUpload(e.target.files)}
                              />
                              <label
                                htmlFor="edit-venue-images"
                                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                              >
                                Select Images
                              </label>
                            </div>

                            {/* Existing Images */}
                            {editMediaFiles.length > 0 && (
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {editMediaFiles.map((file, index) => (
                                  <div key={index} className="relative group">
                                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                                      {file instanceof File ? (
                                        <img
                                          src={URL.createObjectURL(file)}
                                          alt={`Venue image ${index + 1}`}
                                          className="w-full h-full object-cover"
                                        />
                                      ) : (
                                        <img
                                          src={file}
                                          alt={`Venue image ${index + 1}`}
                                          className="w-full h-full object-cover"
                                        />
                                      )}
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => handleEditMediaRemove(index, 'image')}
                                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                      <FiX size={12} />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Videos Section */}
                          <div>
                            <h4 className="text-md font-semibold text-gray-700 mb-4">Venue Videos</h4>
                            <p className="text-sm text-gray-600 mb-4">Add video tours to give customers a complete view of your venue.</p>
                            
                            {/* Upload Area */}
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4">
                              <FiVideo size={48} className="mx-auto text-gray-400 mb-2" />
                              <p className="text-sm text-gray-600 mb-2">
                                Click to upload venue videos
                              </p>
                              <p className="text-xs text-gray-500 mb-4">
                                MP4, WebM up to 50MB each
                              </p>
                              <input
                                type="file"
                                accept="video/*"
                                multiple
                                className="hidden"
                                id="edit-venue-videos"
                                onChange={(e) => handleEditVideoUpload(e.target.files)}
                              />
                              <label
                                htmlFor="edit-venue-videos"
                                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                              >
                                Select Videos
                              </label>
                            </div>

                            {/* Existing Videos */}
                            {editVideos.length > 0 && (
                              <div className="space-y-3">
                                {editVideos.map((file, index) => (
                                  <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                                    <div className="flex items-center space-x-3">
                                      <FiVideo className="text-blue-500" />
                                      <span className="text-sm text-gray-700">
                                        {file instanceof File ? file.name : `Video ${index + 1}`}
                                      </span>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => handleEditMediaRemove(index, 'video')}
                                      className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                    >
                                      <FiX size={12} />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Actions */}
                  <div className="flex justify-between space-x-4 pt-6 border-t">
                    <div>
                      {((currentStep === 2 || currentStep === 3 || currentStep === 4 || currentStep === 5) && !editingVenue) && (
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Previous
                        </button>
                      )}
                      {editingVenue && editStep > 1 && (
                        <button
                          type="button"
                          onClick={handleEditPrevStep}
                          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Previous
                        </button>
                      )}
                    </div>
                    <div>
                      {!editingVenue && currentStep < 5 && (
                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Next
                        </button>
                      )}
                      {editingVenue && editStep < 2 && (
                        <button
                          type="button"
                          onClick={handleEditNextStep}
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Next
                        </button>
                      )}
                      {(!editingVenue && currentStep === 5) || (editingVenue && editStep === 2) ? (
                        <button
                          type="submit"
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          {editingVenue ? 'Save Changes' : 'Create Venue'}
                        </button>
                      ) : null}
                    </div>
                  </div>
                </form>
              </motion.div>
            </div>
          )}

        {/* Venue Detail Modal */}
        {selectedVenue && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div 
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              {/* Header */}
              <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200">
                {selectedVenue.images && selectedVenue.images.length > 0 ? (
                  selectedVenue.images[0] instanceof File ? (
                    <img 
                      src={URL.createObjectURL(selectedVenue.images[0])} 
                      alt={selectedVenue.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image 
                      src={selectedVenue.images[0]} 
                      alt={selectedVenue.name} 
                      width={800} 
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FiImage size={64} className="text-gray-400" />
                  </div>
                )}
                
                {/* Close Button */}
                <button
                  onClick={handleVenueDetailClose}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Venue Name */}
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedVenue.name}</h1>
                
                {/* Location */}
                <div className="flex items-center text-gray-600 mb-6">
                  <FiMapPin className="mr-2 text-blue-500" />
                  <span>{selectedVenue.location}</span>
                </div>

                {/* Venue Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center text-gray-700">
                      <FiUsers className="mr-2 text-blue-500" />
                      <span className="font-semibold">{selectedVenue.capacity}</span>
                      <span className="text-gray-500 ml-1">guests</span>
                    </div>
                  </div>
                  
                  {selectedVenue.pricingModel?.prices?.perDayPrice && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex flex-col">
                        <div className="flex items-center text-green-600 font-semibold">
                          <span className="text-xl">₹</span>
                          <span className="ml-1">{selectedVenue.pricingModel.prices.perDayPrice}</span>
                        </div>
                        <span className="text-gray-500 text-sm">per day</span>
                      </div>
                    </div>
                  )}
                  {selectedVenue.pricePerHour && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex flex-col">
                        <div className="flex items-center text-green-600 font-semibold">
                          <span className="text-xl">₹</span>
                          <span className="ml-1">{selectedVenue.pricePerHour}</span>
                        </div>
                        <span className="text-gray-500 text-sm">per hour</span>
                      </div>
                    </div>
                  )}

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center text-gray-700">
                      <FiCalendar className="mr-2 text-blue-500" />
                      <span className="font-semibold">Available</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                {selectedVenue.description && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">About This Venue</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedVenue.description}</p>
                  </div>
                )}

                {/* Amenities */}
                {selectedVenue.amenities && selectedVenue.amenities.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Amenities</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedVenue.amenities.map((amenity, index) => (
                        <span key={index} className="px-3 py-2 bg-blue-50 text-blue-700 font-medium rounded-full">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button 
                    onClick={() => {
                      handleVenueDetailClose();
                      handleEditVenue(selectedVenue);
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    <FiEdit className="mr-2" />
                    Edit Venue
                  </button>
                  <button 
                    onClick={handleVenueDetailClose}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
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
        <title>Venuity - Find Perfect Venues for Events</title>
        <meta name="description" content="Discover and book unique venues for any occasion across India" />
      </Head>

      <main className={`${styles.main} ${styles.homePageBackground}`}>
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
