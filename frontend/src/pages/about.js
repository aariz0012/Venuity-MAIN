import React from "react";
import { motion } from "framer-motion";
import { FiSearch, FiShield, FiMessageCircle, FiStar, FiClipboard, FiHeadphones, FiMapPin, FiCalendar, FiAward, FiUsers } from 'react-icons/fi';
import Link from 'next/link';

// Static export - no server-side rendering needed

// Mission & Vision sections for zig-zag layout
const missionSections = [
  {
    title: "Our Mission",
    content: `To democratize access to the world's most inspiring spaces, empowering every individual to host unforgettable moments through seamless technology and curated hospitality.`,
    imageAlt: "Beautiful venue space with elegant decor",
    image: "/images/About/mission-venue.jpg",
    reverse: false
  },
  {
    title: "Our Vision",
    content: `To redefine the global standard of event planning, creating a future where finding the perfect stage for life's milestones is as effortless as the celebration itself.`,
    imageAlt: "Professional event manager coordinating",
    image: "/images/About/vision-host.jpg",
    reverse: true
  }
];

// Stats for the numbers grid
const statsData = [
  { icon: <FiMapPin className="w-8 h-8" />, number: "500+", label: "Partnered Venues" },
  { icon: <FiCalendar className="w-8 h-8" />, number: "10k+", label: "Successful Events" },
  { icon: <FiStar className="w-8 h-8" />, number: "4.9★", label: "Average Rating" },
  { icon: <FiHeadphones className="w-8 h-8" />, number: "24/7", label: "Expert Support" }
];

// Core values for pill layout
const coreValues = [
  { title: "Transparency", description: "Clear pricing, honest reviews, and open communication" },
  { title: "Innovation", description: "Cutting-edge technology to simplify event planning" },
  { title: "Excellence", description: "Uncompromising quality in every venue and service" }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
};

const About = () => (
  <div className="min-h-screen">
    {/* Hero Section - Atmospheric Imagery */}
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Blur */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/90 via-emerald-800/80 to-teal-700/70"></div>
        <img 
          src="/images/About/hero-event.jpg" 
          alt="Warm bustling event" 
          className="w-full h-full object-cover"
          style={{ filter: 'blur(2px)' }}
        />
      </div>
      
      {/* Gradient Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      
      {/* Hero Content */}
      <div className="relative z-10 text-center px-4">
        <motion.h1 
          className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          About Venuity
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          Where extraordinary events meet perfect venues
        </motion.p>
      </div>
    </section>

    {/* Zig-Zag Storytelling - Mission & Vision */}
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {missionSections.map((section, idx) => (
          <motion.div
            key={section.title}
            className={`flex flex-col ${section.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 mb-24 last:mb-0`}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Text Content */}
            <div className="flex-1">
              <h2 className="text-4xl font-bold mb-6 text-emerald-700">{section.title}</h2>
              <p className="text-lg text-gray-700 leading-relaxed">{section.content}</p>
            </div>
            
            {/* Image */}
            <div className="flex-1">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={section.image} 
                  alt={section.imageAlt} 
                  className="w-full h-96 object-cover"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Venuity by the Numbers Grid */}
    <section className="py-20 bg-emerald-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Venuity by the Numbers</h2>
          <p className="text-xl text-gray-600">Proven excellence in venue management</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, idx) => (
            <motion.div
              key={idx}
              className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex justify-center mb-4 text-emerald-600">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Core Values - Pill Layout */}
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Core Values</h2>
          <p className="text-xl text-gray-600">The principles that guide everything we do</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {coreValues.map((value, idx) => (
            <motion.div
              key={idx}
              className="p-8 bg-gray-50 rounded-2xl border-2 border-transparent hover:border-emerald-500 transition-all duration-300 cursor-pointer"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: idx * 0.1 }}
            >
              <h3 className="text-2xl font-bold text-emerald-700 mb-4">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Founder's Vision */}
    <section className="py-20 bg-emerald-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Founder Image */}
            <div className="flex-1">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/About/founder-headshot.jpg" 
                  alt="Founder of Venuity" 
                  className="w-full h-96 object-cover"
                />
              </div>
            </div>
            
            {/* Founder Quote */}
            <div className="flex-1">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">The Founder's Vision</h2>
              <blockquote className="text-lg text-gray-700 leading-relaxed mb-8 italic">
                "I started Venuity because I believe every celebration deserves the perfect setting. After planning countless events and seeing the frustration people face finding venues, I knew there had to be a better way. We're not just building software—we're creating connections, enabling memories, and making dreams come true, one venue at a time."
              </blockquote>
              <div className="text-emerald-700 font-semibold text-x2">
                - Aariz Khan, Founder 
              </div>
              <div className="mt-4 text-emerald-500 font-signature text-2xl">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Secondary Call to Action */}
    <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Inspired by our vision?</h2>
        <p className="text-xl mb-10 max-w-3xl mx-auto">
          Find your venue or Become a host today
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/venues" 
            className="inline-block bg-white text-emerald-700 hover:bg-gray-100 py-4 px-8 rounded-full font-semibold transition duration-300 ease-in-out text-lg"
          >
            Find Your Venue
          </Link>
          <Link 
            href="/host/register" 
            className="inline-block bg-transparent border-2 border-white text-white hover:bg-white hover:text-emerald-700 py-4 px-8 rounded-full font-semibold transition duration-300 ease-in-out text-lg"
          >
            Become a Host
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default About; 
