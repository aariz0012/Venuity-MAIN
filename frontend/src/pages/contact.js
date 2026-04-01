import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaCheck, FaPaperPlane } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setShowToast(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Hide toast after 4 seconds
      setTimeout(() => setShowToast(false), 4000);
    }, 1500);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const contactInfo = [
    {
      icon: <FaPhone className="text-2xl" />,
      title: "Phone",
      details: [
        { text: "+16892655819", link: "tel:+16892655819" },
        { text: "+918875195390", link: "tel:+918875195390" }
      ]
    },
    {
      icon: <FaEnvelope className="text-2xl" />,
      title: "Email",
      details: [
        { text: "support@venuity.com", link: "mailto:support@venuity.com" },
        { text: "khanaariz0012@gmail.com", link: "mailto:khanaariz0012@gmail.com" }
      ]
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl" />,
      title: "Location",
      details: [
        { text: "Mumbai, Maharashtra, India", link: null },
        { text: "Available Nationwide", link: null }
      ]
    }
  ];

  const socialLinks = [
    { icon: <FaFacebook />, href: "#", label: "Facebook" },
    { icon: <FaTwitter />, href: "#", label: "Twitter" },
    { icon: <FaInstagram />, href: "#", label: "Instagram" },
    { icon: <FaLinkedin />, href: "#", label: "LinkedIn" }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <>
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -100, x: 300 }}
            animate={{ opacity: 1, y: 20, x: 0 }}
            exit={{ opacity: 0, y: -100, x: 300 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed top-4 right-4 z-50 bg-white rounded-2xl shadow-2xl p-4 flex items-center space-x-3 min-w-[300px] border border-green-100"
          >
            <div className="bg-brand-500 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
              <FaCheck className="text-white text-lg" />
            </div>
            <div className="flex-1">
              <p className="text-gray-900 font-semibold">Message Sent!</p>
              <p className="text-gray-600 text-sm">We'll get back to you soon.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-white flex relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/images/contact-background.jpg')] bg-cover bg-center bg-no-repeat"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90"></div>
        </div>

        {/* Left Column - Contact Info (40%) */}
        <div className="w-2/5 relative z-10 flex items-center justify-center p-12">
          <div className="w-full max-w-md">
            {/* 3D Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8 flex justify-center"
            >
              <div className="relative">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-32 h-32 bg-gradient-to-br from-brand-400 to-brand-600 rounded-3xl flex items-center justify-center shadow-2xl"
                >
                  <FaPaperPlane className="text-white text-4xl" />
                </motion.div>
                <div className="absolute -inset-4 bg-gradient-to-br from-brand-400/20 to-brand-600/20 rounded-3xl blur-xl"></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-white mb-4">Get in Touch</h2>
              <p className="text-lg text-gray-300">
                We're here to help you create the perfect event experience
              </p>
            </motion.div>

            {/* Contact Information */}
            <motion.div 
              className="space-y-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  variants={fadeInUp}
                  className="flex items-start space-x-4"
                >
                  <div className="bg-brand-500 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-white shadow-lg">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{info.title}</h3>
                    {info.details.map((detail, idx) => (
                      detail.link ? (
                        <a
                          key={idx}
                          href={detail.link}
                          className="block text-gray-300 hover:text-brand-400 mb-1 transition-colors duration-200 hover:underline"
                          target={detail.link.startsWith('http') ? "_blank" : "_self"}
                          rel={detail.link.startsWith('http') ? "noopener noreferrer" : ""}
                        >
                          {detail.text}
                        </a>
                      ) : (
                        <p key={idx} className="text-gray-300 mb-1">{detail.text}</p>
                      )
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Social Media Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-16"
            >
              <h3 className="text-lg font-semibold text-white mb-6">Follow Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="bg-brand-500 w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-brand-400 transition-colors duration-200 shadow-lg"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Column - Contact Form (60%) */}
        <div className="w-3/5 relative z-10 flex items-center justify-center p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-10 w-full max-w-lg border border-white/20"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Floating Label Inputs */}
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={handleBlur}
                  required
                  className={`w-full px-4 py-4 border rounded-xl transition-all duration-200 bg-white focus:outline-none focus:ring-0 placeholder-transparent ${
                    focusedField === 'name' 
                      ? 'border-brand-600 shadow-lg shadow-brand-500/20' 
                      : 'border-gray-200 shadow-sm'
                  }`}
                  placeholder="Enter your full name"
                />
                <label
                  htmlFor="name"
                  className={`absolute transition-all duration-200 pointer-events-none ${
                    formData.name || focusedField === 'name'
                      ? 'text-xs text-brand-600 bg-white px-2 -top-2 left-3'
                      : 'text-gray-500 top-4 left-4'
                  }`}
                >
                  Full Name *
                </label>
              </div>
              
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                  required
                  className={`w-full px-4 py-4 border rounded-xl transition-all duration-200 bg-white focus:outline-none focus:ring-0 placeholder-transparent ${
                    focusedField === 'email' 
                      ? 'border-brand-600 shadow-lg shadow-brand-500/20' 
                      : 'border-gray-200 shadow-sm'
                  }`}
                  placeholder="Enter your email"
                />
                <label
                  htmlFor="email"
                  className={`absolute transition-all duration-200 pointer-events-none ${
                    formData.email || focusedField === 'email'
                      ? 'text-xs text-brand-600 bg-white px-2 -top-2 left-3'
                      : 'text-gray-500 top-4 left-4'
                  }`}
                >
                  Email Address *
                </label>
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('subject')}
                  onBlur={handleBlur}
                  required
                  className={`w-full px-4 py-4 border rounded-xl transition-all duration-200 bg-white focus:outline-none focus:ring-0 placeholder-transparent ${
                    focusedField === 'subject' 
                      ? 'border-brand-600 shadow-lg shadow-brand-500/20' 
                      : 'border-gray-200 shadow-sm'
                  }`}
                  placeholder="What is this about?"
                />
                <label
                  htmlFor="subject"
                  className={`absolute transition-all duration-200 pointer-events-none ${
                    formData.subject || focusedField === 'subject'
                      ? 'text-xs text-brand-600 bg-white px-2 -top-2 left-3'
                      : 'text-gray-500 top-4 left-4'
                  }`}
                >
                  Subject *
                </label>
              </div>
              
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={handleBlur}
                  required
                  rows="5"
                  className={`w-full px-4 py-4 border rounded-xl transition-all duration-200 bg-white focus:outline-none focus:ring-0 placeholder-transparent resize-none ${
                    focusedField === 'message' 
                      ? 'border-brand-600 shadow-lg shadow-brand-500/20' 
                      : 'border-gray-200 shadow-sm'
                  }`}
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
                <label
                  htmlFor="message"
                  className={`absolute transition-all duration-200 pointer-events-none ${
                    formData.message || focusedField === 'message'
                      ? 'text-xs text-brand-600 bg-white px-2 -top-2 left-3'
                      : 'text-gray-500 top-4 left-4'
                  }`}
                >
                  Message *
                </label>
              </div>
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-600 hover:bg-brand-700 disabled:bg-brand-400 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/30 disabled:shadow-none"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Contact;
