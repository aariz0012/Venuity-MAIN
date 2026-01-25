// src/components/LoadingScreen.js
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTagline(true);
    }, 800); // Show tagline after logo animation starts

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
      >
        {/* Subtle texture */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(#0a5c36 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          />
        </div>

        <motion.div
          className="relative z-10 text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            transition: { 
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1]
            }
          }}
        >
          {/* Logo with animation */}
          <motion.div 
            className="relative mb-8"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Image
              src="/images/logo.png"
              alt="Venuity Logo"
              width={180}
              height={180}
              className="relative z-10"
              priority
            />
            {/* Animated leaf overlay */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0, rotate: -5, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                rotate: 0, 
                scale: 1,
                transition: { 
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.3
                }
              }}
            >
              <Image
                src="/images/logo-leaf.png" // Make sure to have the leaf part as a separate image
                alt=""
                width={180}
                height={180}
                className="absolute inset-0"
              />
            </motion.div>
          </motion.div>

          {/* Tagline with typing effect */}
          <AnimatePresence>
            {showTagline && (
              <motion.p
                className="text-lg text-gray-800 font-medium mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.6,
                    ease: "easeOut",
                    delay: 0.5
                  }
                }}
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  letterSpacing: '0.5px'
                }}
              >
                EVENTS MADE EASY
              </motion.p>
            )}
          </AnimatePresence>

          {/* Loading bar */}
          <motion.div 
            className="w-64 h-0.5 bg-gray-200 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: { delay: 0.8 }
            }}
          >
            <motion.div
              className="h-full bg-[#0a5c36]"
              initial={{ width: 0 }}
              animate={{ 
                width: '100%',
                transition: { 
                  duration: 2,
                  ease: [0.65, 0, 0.35, 1]
                }
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;