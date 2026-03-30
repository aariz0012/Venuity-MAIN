import { useRouter } from 'next/router';
import { FiMapPin, FiStar, FiCheck, FiChevronLeft, FiCalendar, FiDollarSign, FiUsers, FiClock } from 'react-icons/fi';
import { FaRegCalendarCheck, FaRegStar, FaStar, FaStarHalfAlt, FaClipboardList, FaHandshake } from 'react-icons/fa';
import { GiPartyPopper, GiSandsOfTime } from 'react-icons/gi';
import { MdOutlineEventAvailable, MdOutlineRateReview } from 'react-icons/md';
import Layout from '../../../components/Layout/Layout';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Mock data for event planners
const eventPlanners = [
  {
    id: 1,
    name: 'Perfect Planners Co.',
    type: 'Event Planner',
    image: '/images/planner1.jpg',
    rating: 4.9,
    reviewCount: 124,
    location: 'Mumbai, India',
    experience: '8+ years',
    eventsCompleted: 450,
    description: 'Full-service event planning company specializing in creating memorable experiences for all occasions. We handle everything from concept to execution with meticulous attention to detail.',
    
    // Service Packages
    servicePackages: [
      {
        name: 'Basic Package',
        price: 50000,
        description: 'Ideal for small, simple events',
        includes: [
          'Initial consultation',
          'Vendor recommendations',
          'Timeline creation',
          'Day-of coordination',
          'Up to 3 vendor meetings'
        ]
      },
      {
        name: 'Premium Package',
        price: 120000,
        description: 'Comprehensive planning for medium events',
        includes: [
          'Everything in Basic',
          'Unlimited vendor meetings',
          'Budget management',
          'Venue selection assistance',
          'Full design concept'
        ]
      },
      {
        name: 'Platinum Package',
        price: 250000,
        description: 'End-to-end luxury event planning',
        includes: [
          'Everything in Premium',
          'Dedicated planner',
          'Unlimited revisions',
          'VIP guest management',
          'Post-event follow up'
        ]
      }
    ],

    // Event Types
    eventTypes: [
      { 
        type: 'Weddings', 
        icon: <GiPartyPopper className="text-pink-500" />,
        description: 'From intimate ceremonies to grand celebrations'
      },
      { 
        type: 'Corporate', 
        icon: <FaHandshake className="text-blue-500" />,
        description: 'Conferences, seminars, and corporate galas'
      },
      { 
        type: 'Birthdays', 
        icon: <FaRegCalendarCheck className="text-yellow-500" />,
        description: 'Milestone celebrations for all ages'
      },
      { 
        type: 'Social', 
        icon: <FiUsers className="text-purple-500" />,
        description: 'Engagements, anniversaries, and more'
      }
    ],

    // Vendor Network
    vendorNetwork: {
      count: 150,
      categories: [
        'Caterers',
        'Decorators',
        'Photographers',
        'Videographers',
        'Entertainment',
        'Venues',
        'Rentals'
      ]
    },

    // Planning Timeline
    planningTimeline: [
      { 
        stage: 'Initial Consultation',
        duration: '1-2 weeks',
        description: 'Discuss your vision, budget, and requirements'
      },
      { 
        stage: 'Vendor Selection',
        duration: '2-4 weeks',
        description: 'Book key vendors and secure dates'
      },
      { 
        stage: 'Design & Planning',
        duration: '4-8 weeks',
        description: 'Finalize design, layout, and details'
      },
      { 
        stage: 'Final Preparations',
        duration: '1-2 weeks',
        description: 'Confirm all arrangements and final walkthrough'
      }
    ],

    // Budget Planning Tools
    budgetTools: [
      'Interactive budget calculator',
      'Cost breakdown by category',
      'Vendor cost comparison',
      'Payment schedule tracker',
      'Budget vs. actual spending'
    ],

    // Venue Selection
    venueAssistance: {
      services: [
        'Venue sourcing and shortlisting',
        'Site visits coordination',
        'Layout planning',
        'Vendor coordination',
        'Logistics management'
      ],
      partnerVenues: 45
    },

    // Testimonials
    testimonials: [
      {
        id: 1,
        userName: 'Priya & Raj',
        rating: 5,
        date: '3 weeks ago',
        event: 'Wedding',
        comment: 'The Perfect Planners team made our wedding day absolutely magical! They handled every detail perfectly and we didn\'t have to worry about a thing.',
        images: ['/images/testimonial-wedding1.jpg']
      },
      {
        id: 2,
        userName: 'TechCorp India',
        rating: 5,
        date: '2 months ago',
        event: 'Annual Conference',
        comment: 'Exceptional service for our corporate event. The team was professional, organized, and delivered beyond our expectations.',
        images: ['/images/testimonial-corporate1.jpg']
      }
    ],

    // Additional Info
    languages: ['English', 'Hindi', 'Marathi'],
    teamSize: 12,
    awards: ['Best Event Planner 2023', 'Couples Choice Award 2022']
  },
  // Add more event planners as needed
];

const PlannerCategory = () => {
  const router = useRouter();
  const { categoryId } = router.query;

  if (categoryId !== 'planner') {
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
    <Layout title="Event Planners | Venuity">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-4">
            <Link href="/services" className="flex items-center text-white/80 hover:text-white transition">
              <FiChevronLeft className="mr-1" /> Back to Services
            </Link>
          </div>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Professional Event Planners</h1>
              <p className="text-xl mb-6 max-w-2xl">
                Stress-free event planning with our expert coordinators. From intimate gatherings to grand celebrations, we bring your vision to life.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Full Coordination', 'Vendor Management', 'Budget Planning', 'Venue Selection', 'Day-Of Coordination'].map((feature, index) => (
                  <span key={index} className="bg-white/20 px-3 py-1 rounded-full text-sm flex items-center">
                    <FiCheck className="mr-1" /> {feature}
                  </span>
                ))}
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
              <div className="bg-white/20 p-8 rounded-2xl backdrop-blur-sm">
                <FaRegCalendarCheck className="text-6xl text-white" />
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
                  {['Wedding', 'Corporate', 'Birthday', 'Engagement', 'Anniversary', 'Conference', 'Exhibition'].map((type) => (
                    <label key={type} className="flex items-center">
                      <input type="checkbox" className="rounded text-primary-600" />
                      <span className="ml-2">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-2">Services</h4>
                <div className="space-y-2">
                  {['Full Planning', 'Partial Planning', 'Day-Of Coordination', 'Vendor Management', 'Budget Planning'].map((service) => (
                    <label key={service} className="flex items-center">
                      <input type="checkbox" className="rounded text-primary-600" />
                      <span className="ml-2">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button className="w-full bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700 transition">
                Apply Filters
              </button>
            </div>
          </div>

          {/* Planners List */}
          <div className="lg:col-span-3">
            {/* Search and Sort */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div className="relative w-full md:w-96">
                <input
                  type="text"
                  placeholder="Search event planners by name or specialty..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">Sort by:</span>
                <select className="border rounded-md px-3 py-2 text-sm">
                  <option>Recommended</option>
                  <option>Rating: High to Low</option>
                  <option>Experience: High to Low</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Planners Grid */}
            <div className="space-y-6">
              {eventPlanners.map((planner) => (
                <motion.div
                  key={planner.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="md:flex">
                    {/* Planner Image */}
                    <div className="md:w-1/3 h-48 md:h-auto">
                      <img
                        src={planner.image}
                        alt={planner.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Planner Info */}
                    <div className="p-6 md:w-2/3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-1">{planner.name}</h2>
                          <div className="flex items-center text-gray-600 mb-2">
                            <FiMapPin className="mr-1" />
                            <span>{planner.location}</span>
                            <span className="mx-2">•</span>
                            <FiClock className="mr-1" />
                            <span>{planner.experience} experience</span>
                          </div>
                        </div>
                        <div className="flex items-center bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                          <FiStar className="text-yellow-500 mr-1" />
                          <span className="font-medium">{planner.rating}</span>
                          <span className="text-sm ml-1">({planner.reviewCount})</span>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">{planner.description}</p>

                      {/* Event Types */}
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Specializes In</h4>
                        <div className="flex flex-wrap gap-2">
                          {planner.eventTypes.slice(0, 4).map((event, idx) => (
                            <span key={idx} className="bg-pink-100 text-pink-800 text-xs px-2.5 py-1 rounded flex items-center">
                              {event.icon && <span className="mr-1">{event.icon}</span>}
                              {event.type}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Service Packages */}
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Service Packages</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {planner.servicePackages.map((pkg, idx) => (
                            <div key={idx} className="border rounded-lg p-3 hover:border-pink-300 transition">
                              <div className="flex justify-between items-start mb-2">
                                <h5 className="font-medium">{pkg.name}</h5>
                                <span className="text-primary-600 font-semibold">₹{pkg.price.toLocaleString()}</span>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{pkg.description}</p>
                              <ul className="text-xs text-gray-600 space-y-1">
                                {pkg.includes.slice(0, 3).map((item, i) => (
                                  <li key={i} className="flex items-start">
                                    <FiCheck className="text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                                {pkg.includes.length > 3 && (
                                  <li className="text-primary-600 text-xs">+{pkg.includes.length - 3} more</li>
                                )}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Vendor Network */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-4">
                        <div className="flex items-center">
                          <FaHandshake className="text-blue-500 mr-1" />
                          <span>{planner.vendorNetwork.count}+ Vendors</span>
                        </div>
                        <div className="flex items-center">
                          <FiUsers className="text-purple-500 mr-1" />
                          <span>Team of {planner.teamSize}</span>
                        </div>
                        <div className="flex items-center">
                          <FiCalendar className="text-green-500 mr-1" />
                          <span>{planner.eventsCompleted}+ Events</span>
                        </div>
                        <div className="flex items-center">
                          <FaClipboardList className="text-yellow-500 mr-1" />
                          <span>Budget Tools</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t">
                        <div>
                          <div className="text-sm text-gray-600">Starting from</div>
                          <div className="text-xl font-bold text-gray-900">
                            ₹{planner.servicePackages[0].price.toLocaleString()}
                          </div>
                        </div>
                        <Link 
                          href={`/services/planner/${planner.id}`}
                          className="btn-primary"
                        >
                          View Profile
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

export default PlannerCategory;
