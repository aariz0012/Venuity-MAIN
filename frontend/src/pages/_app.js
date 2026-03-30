import { ThemeProvider } from 'next-themes';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { AnimatePresence } from 'framer-motion'; // Add this import
import ErrorBoundary from '../components/ErrorBoundary';
import { AuthProvider } from '../context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import axios from 'axios';
import LoadingScreen from '@/components/LoadingScreen';
import api from '../utils/axios'; 

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Check for token in localStorage on initial load
    const token = localStorage.getItem('token');
    if (token) {
      // Set axios default headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    // Simulate loading time for initial load only
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsInitialLoad(false);
    }, 3000);

    // Note: We're NOT adding route change listeners for loading screen
    // This prevents the loading screen from appearing on navigation

    return () => {
      clearTimeout(timer);
    };

    const responseInterceptor = api.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) {
          // Redirect to login if not already there
          if (router.pathname !== '/login') {
            router.push('/login');
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      // Clean up the interceptor
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [router]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={false}
      disableTransitionOnChange
    >
      <AuthProvider>
        <ErrorBoundary>
          <Head>
            <link 
              href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
              rel="stylesheet"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <AnimatePresence mode="wait">
            {isLoading && isInitialLoad ? (
              <LoadingScreen key="loading-screen" />
            ) : (
              <Component {...pageProps} key="app-content" />
            )}
          </AnimatePresence>
          <ToastContainer position="bottom-right" />
        </ErrorBoundary>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
