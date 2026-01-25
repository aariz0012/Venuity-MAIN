import { useRouter } from 'next/router';
import { FiMapPin, FiUsers, FiStar, FiCheck, FiChevronLeft, FiClock, FiDollarSign, FiUser, FiShield } from 'react-icons/fi';
import { FaUtensils, FaPaintBrush, FaRegCalendarCheck, FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { GiMeal, GiChefToque, GiMeat, GiCarrot, GiIndianPalace } from 'react-icons/gi';
import { MdFoodBank, MdOutlineFoodBank, MdOutlineRestaurantMenu } from 'react-icons/md';
import Layout from '../../../components/Layout/Layout';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Mock data for caterers
const caterers = [
  {
    id: 1,
    name: 'Royal Feast Caterers',
    type: 'Caterer',
    image: '/images/caterer1.jpg',
    rating: 4.9,
    reviewCount: 128,
    location: 'Mumbai, India',
    priceRange: '₹₹₹₹',
    minOrder: 50,
    description: 'Premium catering service specializing in Indian, Chinese, and Continental cuisines. We provide exquisite dining experiences for weddings, corporate events, and private parties.',
    
    // New fields
    cuisines: ['Indian', 'Chinese', 'Continental', 'Mughlai', 'South Indian'],
    foodTypes: ['Veg', 'Non-Veg', 'Jain', 'Egg'],
    menuOptions: [
      {
        name: 'Basic Package',
        price: 500,
        per: 'plate',
        includes: [
          '3 Starters (Veg & Non-Veg)',
          '3 Main Course (2 Veg, 1 Non-Veg)',
          'Dal, Rice, Roti',
          '1 Dessert',
          'Soft Drinks'
        ]
      },
      {
        name: 'Premium Package',
        price: 800,
        per: 'plate',
        includes: [
          '5 Starters (Veg & Non-Veg)',
          '5 Main Course (3 Veg, 2 Non-Veg)',
          'Dal, Rice, Biryani, Roti',
          '2 Desserts',
          'Ice Cream, Soft Drinks'
        ]
      }
    ],
    tastingSession: {
      available: true,
      price: 2000,
      includes: 'Tasting for 2 people, 5 dishes of your choice'
    },
    staffingOptions: [
      { type: 'Basic', description: 'Chef + 2 servers per 50 guests', price: 5000 },
      { type: 'Premium', description: 'Chef + 4 servers per 50 guests + 1 manager', price: 8000 }
    ],
    customMenu: true,
    foodSafety: [
      'FSSAI Certified',
      'ISO 22000:2018 Certified',
      'HACCP Certified',
      'Regular kitchen hygiene audits'
    ],
    reviews: [
      {
        id: 1,
        userName: 'Priya Sharma',
        rating: 5,
        date: '2 weeks ago',
        comment: 'The food was absolutely delicious! Everyone at our wedding loved it. The presentation was excellent and the staff was very professional.',
        images: ['/images/food1.jpg', '/images/food2.jpg']
      },
      {
        id: 2,
        userName: 'Rahul Mehta',
        rating: 4,
        date: '1 month ago',
        comment: 'Great service and food quality. The biryani was a hit at our corporate event!',
        images: ['/images/food3.jpg']
      }
    ],
    gallery: [
      '/images/catering1.jpg',
      '/images/catering2.jpg',
      '/images/catering3.jpg'
    ]
  },
  // Add more caterers as needed
];

const CategoryPage = () => {
  const router = useRouter();
  const { categoryId } = router.query;

  if (categoryId !== 'caterer') {
    return (
      <Layout title="Category Not Found | Venuity">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
            <p className="text-xl mb-6">The category you're looking for doesn't exist or has been moved.</p>
            <Link href="/services" className="btn-primary inline-flex items-center">
              <FiChevronLeft className="mr-1" /> Back to Services
            </Link>
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
    <Layout title="Catering Services | Venuity">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-4">
            <Link href="/services" className="flex items-center text-white/80 hover:text-white transition">
              <FiChevronLeft className="mr-1" /> Back to Services
            </Link>
          </div>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Catering Services</h1>
              <p className="text-xl mb-6 max-w-2xl">
                Delight your guests with exquisite cuisine from our top-rated caterers. 
                Custom menus, professional staff, and impeccable service for any occasion.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Custom Menus', 'Live Counters', 'Veg & Non-Veg', 'Jain Options', 'Staffing'].map((feature, index) => (
                  <span key={index} className="bg-white/20 px-3 py-1 rounded-full text-sm flex items-center">
                    <FiCheck className="mr-1" /> {feature}
                  </span>
                ))}
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
              <div className="bg-white/20 p-8 rounded-2xl backdrop-blur-sm">
                <FaUtensils className="text-6xl text-white" />
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
                <h4 className="font-medium mb-2">Cuisine Type</h4>
                <div className="space-y-2">
                  {['Indian', 'Chinese', 'Continental', 'Italian', 'South Indian', 'North Indian', 'Mughlai', 'Asian'].map((cuisine) => (
                    <label key={cuisine} className="flex items-center">
                      <input type="checkbox" className="rounded text-primary-600" />
                      <span className="ml-2">{cuisine}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-2">Food Type</h4>
                <div className="space-y-2">
                  {['Veg', 'Non-Veg', 'Jain', 'Egg', 'Vegan'].map((type) => (
                    <label key={type} className="flex items-center">
                      <input type="checkbox" className="rounded text-primary-600" />
                      <span className="ml-2">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-2">Certifications</h4>
                <div className="space-y-2">
                  {['FSSAI Certified', 'ISO Certified', 'HACCP Certified'].map((cert) => (
                    <label key={cert} className="flex items-center">
                      <input type="checkbox" className="rounded text-primary-600" />
                      <span className="ml-2">{cert}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button className="w-full bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700 transition">
                Apply Filters
              </button>
            </div>
          </div>

          {/* Caterers List */}
          <div className="lg:col-span-3">
            {/* Search and Sort */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div className="relative w-full md:w-96">
                <input
                  type="text"
                  placeholder="Search caterers by name or cuisine..."
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

            {/* Caterers Grid */}
            <div className="space-y-6">
              {caterers.map((caterer) => (
                <motion.div
                  key={caterer.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="md:flex">
                    {/* Caterer Image */}
                    <div className="md:w-1/3 h-48 md:h-auto">
                      <img
                        src={caterer.image}
                        alt={caterer.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Caterer Info */}
                    <div className="p-6 md:w-2/3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-1">{caterer.name}</h2>
                          <div className="flex items-center text-gray-600 mb-2">
                            <FiMapPin className="mr-1" />
                            <span>{caterer.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                          <FiStar className="text-yellow-500 mr-1" />
                          <span className="font-medium">{caterer.rating}</span>
                          <span className="text-sm ml-1">({caterer.reviewCount})</span>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">{caterer.description}</p>

                      {/* Cuisine & Food Types */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {caterer.cuisines.slice(0, 3).map((cuisine, idx) => (
                          <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded">
                            {cuisine}
                          </span>
                        ))}
                        {caterer.foodTypes.map((type, idx) => (
                          <span key={`type-${idx}`} className="bg-green-100 text-green-800 text-xs px-2.5 py-1 rounded">
                            {type}
                          </span>
                        ))}
                      </div>

                      {/* Menu Options */}
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Menu Options</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {caterer.menuOptions.map((menu, idx) => (
                            <div key={idx} className="border rounded-lg p-3">
                              <div className="flex justify-between items-center mb-2">
                                <h5 className="font-medium">{menu.name}</h5>
                                <span className="text-primary-600 font-semibold">₹{menu.price} <span className="text-xs text-gray-500">/ {menu.per}</span></span>
                              </div>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {menu.includes.slice(0, 3).map((item, i) => (
                                  <li key={i} className="flex items-center">
                                    <FiCheck className="text-green-500 mr-1" /> {item}
                                  </li>
                                ))}
                                {menu.includes.length > 3 && (
                                  <li className="text-primary-600 text-sm">+{menu.includes.length - 3} more items</li>
                                )}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Additional Features */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-4">
                        {caterer.tastingSession.available && (
                          <div className="flex items-center">
                            <MdOutlineRestaurantMenu className="text-blue-500 mr-1" />
                            <span>Tasting Available</span>
                          </div>
                        )}
                        {caterer.customMenu && (
                          <div className="flex items-center">
                            <MdOutlineFoodBank className="text-green-500 mr-1" />
                            <span>Custom Menu</span>
                          </div>
                        )}
                        <div className="flex items-center">
                          <GiChefToque className="text-purple-500 mr-1" />
                          <span>Staffing Options</span>
                        </div>
                        <div className="flex items-center">
                          <FiShield className="text-yellow-500 mr-1" />
                          <span>Certified</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t">
                        <div>
                          <div className="text-sm text-gray-600">Starting from</div>
                          <div className="text-xl font-bold text-gray-900">₹{caterer.menuOptions[0].price} <span className="text-sm font-normal text-gray-500">/ {caterer.menuOptions[0].per}</span></div>
                        </div>
                        <Link 
                          href={`/services/caterer/${caterer.id}`}
                          className="btn-primary"
                        >
                          View Details
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

export default CategoryPage;