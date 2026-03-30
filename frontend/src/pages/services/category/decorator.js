import { useRouter } from 'next/router';
import { FiMapPin, FiStar, FiCheck, FiChevronLeft, FiImage, FiSun, FiDroplet, FiLayers } from 'react-icons/fi';
import { FaPaintBrush, FaRegCalendarCheck, FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { GiFlowerPot, GiLamp, GiSofa } from 'react-icons/gi';
import { MdOutlineDesignServices, MdOutlineLight, MdOutlineRateReview } from 'react-icons/md';
import Layout from '../../../components/Layout/Layout';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Mock data for decorators
const decorators = [
  {
    id: 1,
    name: 'Elegant Events Decor',
    type: 'Decorator',
    image: '/images/decorator1.jpg',
    rating: 4.8,
    reviewCount: 96,
    location: 'Mumbai, India',
    priceRange: '₹₹₹₹',
    minBudget: 50000,
    description: 'Transforming spaces into dream venues with creative and elegant decorations for weddings, corporate events, and private parties.',
    
    // New fields
    portfolio: {
      beforeAfter: [
        { before: '/images/decor-before1.jpg', after: '/images/decor-after1.jpg', title: 'Wedding Mandap Transformation' },
        { before: '/images/decor-before2.jpg', after: '/images/decor-after2.jpg', title: 'Stage Decoration' }
      ]
    },
    themeOptions: [
      'Royal', 'Rustic', 'Bohemian', 'Modern Minimalist', 
      'Vintage', 'Garden Party', 'Beach Theme', 'Floral Fantasy'
    ],
    customDesign: {
      available: true,
      description: 'Custom design services to match your unique vision',
      process: [
        'Initial consultation',
        'Concept development',
        '3D visualization',
        'Material selection',
        'Final execution'
      ]
    },
    rentalItems: [
      { 
        category: 'Furniture',
        items: [
          { name: 'Chiavari Chairs', price: 500, image: '/images/chair.jpg' },
          { name: 'Luxury Sofa Set', price: 3000, image: '/images/sofa.jpg' },
          { name: 'Dining Tables', price: 2000, image: '/images/table.jpg' }
        ]
      },
      {
        category: 'Lighting',
        items: [
          { name: 'Chandeliers', price: 1500, image: '/images/chandelier.jpg' },
          { name: 'Fairy Lights', price: 800, image: '/images/fairy-lights.jpg' },
          { name: 'Uplighters', price: 1000, image: '/images/uplighter.jpg' }
        ]
      },
      {
        category: 'Decorative',
        items: [
          { name: 'Centerpieces', price: 800, image: '/images/centerpiece.jpg' },
          { name: 'Backdrop', price: 5000, image: '/images/backdrop.jpg' },
          { name: 'Table Runners', price: 300, image: '/images/table-runner.jpg' }
        ]
      }
    ],
    lightingOptions: [
      {
        type: 'Ambient Lighting',
        description: 'Soft, overall lighting for the venue',
        price: 5000,
        image: '/images/ambient-lighting.jpg'
      },
      {
        type: 'Spot Lighting',
        description: 'Highlight specific areas or decor elements',
        price: 3000,
        image: '/images/spot-lighting.jpg'
      },
      {
        type: 'LED Uplighting',
        description: 'Color-changing lights to set the mood',
        price: 4000,
        image: '/images/led-uplighting.jpg'
      }
    ],
    floralArrangements: [
      {
        type: 'Centerpieces',
        description: 'Elegant floral arrangements for tables',
        price: 2500,
        image: '/images/floral-centerpiece.jpg'
      },
      {
        type: 'Ceiling Installation',
        description: 'Hanging floral arrangements',
        price: 15000,
        image: '/images/ceiling-floral.jpg'
      },
      {
        type: 'Stage Backdrop',
        description: 'Floral backdrop for stage',
        price: 20000,
        image: '/images/floral-backdrop.jpg'
      }
    ],
    testimonials: [
      {
        id: 1,
        userName: 'Priya Mehta',
        rating: 5,
        date: '2 weeks ago',
        event: 'Wedding Reception',
        comment: 'The decor was absolutely stunning! They brought our vision to life and everything was perfect. The team was very professional and attentive to all our requests.',
        images: ['/images/testimonial1-1.jpg', '/images/testimonial1-2.jpg']
      },
      {
        id: 2,
        userName: 'Rahul Sharma',
        rating: 4,
        date: '1 month ago',
        event: 'Corporate Gala',
        comment: 'Great service and attention to detail. The lighting and floral arrangements transformed our venue completely. Will definitely work with them again!',
        images: ['/images/testimonial2-1.jpg']
      }
    ]
  },
  // Add more decorators as needed
];

const DecoratorCategory = () => {
  const router = useRouter();
  const { categoryId } = router.query;

  if (categoryId !== 'decorator') {
    return (
      <Layout title="Service Not Found | Venuity">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
            <p className="text-xl mb-6">The service you're looking for doesn't exist or has been moved.</p>
            <p
              onClick={() => router.push('/services')}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Change Location
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  return (
    <Layout title="Event Decorators | Venuity">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-4">
            <Link href="/services" className="flex items-center text-white/80 hover:text-white transition">
              <FiChevronLeft className="mr-1" /> Back to Services
            </Link>
          </div>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Event Decorators</h1>
              <p className="text-xl mb-6 max-w-2xl">
                Transform your venue into a magical space with our professional decorators.
                Thematic designs, elegant lighting, and stunning floral arrangements for any occasion.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Custom Themes', 'Lighting Solutions', 'Floral Arrangements', 'Rental Items', '3D Visualization'].map((feature, index) => (
                  <span key={index} className="bg-white/20 px-3 py-1 rounded-full text-sm flex items-center">
                    <FiCheck className="mr-1" /> {feature}
                  </span>
                ))}
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
              <div className="bg-white/20 p-8 rounded-2xl backdrop-blur-sm">
                <FaPaintBrush className="text-6xl text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Filters</h3>
              
              <div className="mb-6">
                <h4 className="font-medium mb-2">Price Range</h4>
                <div className="space-y-2">
                  {['₹', '₹₹', '₹₹₹', '₹₹₹₹', '₹₹₹₹₹'].map((price, i) => (
                    <label key={i} className="flex items-center">
                      <input type="checkbox" className="rounded text-primary-600" />
                      <span className="ml-2">{price.repeat(i + 1)}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-2">Event Type</h4>
                <div className="space-y-2">
                  {['Wedding', 'Corporate', 'Birthday', 'Engagement', 'Anniversary', 'Baby Shower', 'Other'].map((type) => (
                    <label key={type} className="flex items-center">
                      <input type="checkbox" className="rounded text-primary-600" />
                      <span className="ml-2">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-2">Specialties</h4>
                <div className="space-y-2">
                  {['Floral Decor', 'Lighting', 'Thematic Design', 'Stage Setup', 'Entrance Decor', 'Ceiling Decor'].map((specialty) => (
                    <label key={specialty} className="flex items-center">
                      <input type="checkbox" className="rounded text-primary-600" />
                      <span className="ml-2">{specialty}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button className="w-full bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700 transition">
                Apply Filters
              </button>
            </div>
          </div>

          {/* Decorators List */}
          <div className="lg:col-span-3">
            {/* Search and Sort */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div className="relative w-full md:w-96">
                <input
                  type="text"
                  placeholder="Search decorators by name or specialty..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">Sort by:</span>
                <select className="border rounded-md px-3 py-2 text-sm">
                  <option>Recommended</option>
                  <option>Rating: High to Low</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Decorators Grid */}
            <div className="space-y-6">
              {decorators.map((decorator) => (
                <motion.div
                  key={decorator.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="md:flex">
                    {/* Decorator Image */}
                    <div className="md:w-1/3 h-48 md:h-auto">
                      <img
                        src={decorator.image}
                        alt={decorator.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Decorator Info */}
                    <div className="p-6 md:w-2/3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-1">{decorator.name}</h2>
                          <div className="flex items-center text-gray-600 mb-2">
                            <FiMapPin className="mr-1" />
                            <span>{decorator.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                          <FiStar className="text-yellow-500 mr-1" />
                          <span className="font-medium">{decorator.rating}</span>
                          <span className="text-sm ml-1">({decorator.reviewCount})</span>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">{decorator.description}</p>

                      {/* Portfolio: Before/After */}
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Portfolio</h4>
                        <div className="grid grid-cols-2 gap-4">
                          {decorator.portfolio.beforeAfter.slice(0, 2).map((item, idx) => (
                            <div key={idx} className="border rounded-lg overflow-hidden">
                              <div className="relative h-24 bg-gray-100">
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <FiImage className="text-gray-300 text-2xl" />
                                </div>
                                <img
                                  src={item.before}
                                  alt={`Before: ${item.title}`}
                                  className="w-1/2 h-full object-cover border-r"
                                />
                                <img
                                  src={item.after}
                                  alt={`After: ${item.title}`}
                                  className="w-1/2 h-full object-cover absolute right-0 top-0"
                                />
                              </div>
                              <div className="p-2 text-xs text-center bg-gray-50">
                                {item.title}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Theme Options */}
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Popular Themes</h4>
                        <div className="flex flex-wrap gap-2">
                          {decorator.themeOptions.slice(0, 5).map((theme, idx) => (
                            <span key={idx} className="bg-purple-100 text-purple-800 text-xs px-2.5 py-1 rounded">
                              {theme}
                            </span>
                          ))}
                          {decorator.themeOptions.length > 5 && (
                            <span className="text-xs text-gray-500">+{decorator.themeOptions.length - 5} more</span>
                          )}
                        </div>
                      </div>

                      {/* Services */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-4">
                        <div className="flex items-center">
                          <MdOutlineDesignServices className="text-blue-500 mr-1" />
                          <span>Custom Designs</span>
                        </div>
                        <div className="flex items-center">
                          <FiLayers className="text-green-500 mr-1" />
                          <span>Rental Items</span>
                        </div>
                        <div className="flex items-center">
                          <FiSun className="text-yellow-500 mr-1" />
                          <span>Lighting</span>
                        </div>
                        <div className="flex items-center">
                          <GiFlowerPot className="text-pink-500 mr-1" />
                          <span>Floral</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t">
                        <div>
                          <div className="text-sm text-gray-600">Starting from</div>
                          <div className="text-xl font-bold text-gray-900">₹{decorator.minBudget?.toLocaleString() || '50,000'}</div>
                        </div>
                        <Link 
                          href={`/services/decorator/${decorator.id}`}
                          className="btn-primary"
                        >
                          View Portfolio
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DecoratorCategory;
