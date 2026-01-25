import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

function Error({ statusCode }) {
 const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    // Set user agent on client side only
    setIsMounted(true);
    
    if (typeof window !== 'undefined') {
      const handleUnhandledRejection = (event) => {
        console.error('Unhandled promise rejection:', event.reason);
        setErrorMessage(event.reason?.message || 'An unknown error occurred');
      };

      const handleError = (event) => {
        console.error('Uncaught error:', event.error);
        setErrorMessage(event.error?.message || 'An unknown error occurred');
        return true;
      };

      window.addEventListener('unhandledrejection', handleUnhandledRejection);
      window.addEventListener('error', handleError);

      return () => {
        window.removeEventListener('unhandledrejection', handleUnhandledRejection);
        window.removeEventListener('error', handleError);
      };
    }
  }, []);

  const errorMessages = {
    404: 'The page you are looking for does not exist.',
    500: 'An internal server error occurred.',
  };

  const statusText = statusCode ? 
    `${statusCode} - ${errorMessages[statusCode] || 'An error occurred'}` : 
    'An error occurred';

  // Only render error details after component is mounted on the client side
  const errorDetails = isMounted ? {
    path: router.asPath,
    timestamp: new Date().toISOString(),
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'navigator not available'
  } : null;


  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    }}>
      <Head>
        <title>{statusText}</title>
      </Head>
      <div style={{
        textAlign: 'center',
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        maxWidth: '600px',
        width: '100%',
      }}>
        <h1 style={{
          fontSize: '72px',
          fontWeight: 'bold',
          color: '#333',
          margin: '0 0 20px',
        }}>
          {statusCode || 'Error'}
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#666',
          marginBottom: '30px',
          lineHeight: '1.6',
        }}>
          {errorMessage || errorMessages[statusCode] || 'An unexpected error occurred'}
        </p>
        {statusCode === 404 && (
          <button 
            onClick={() => router.push('/')}
            style={{
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              fontSize: '16px',
              borderRadius: '4px',
              cursor: 'pointer',
              margin: '0 10px',
              transition: 'background-color 0.2s',
            }}
          >
            Go to Home
          </button>
        )}
        <button 
          onClick={() => window.location.reload()}
          style={{
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            fontSize: '16px',
            borderRadius: '4px',
            cursor: 'pointer',
            margin: '0 10px',
            transition: 'background-color 0.2s',
          }}
        >
          Refresh Page
        </button>
        {process.env.NODE_ENV === 'development' && (
          <details style={{
            marginTop: '30px',
            textAlign: 'left',
          }}>
            <summary>Error Details</summary>
            <pre style={{
              backgroundColor: '#f8f8f8',
              padding: '15px',
              borderRadius: '4px',
              overflowX: 'auto',
              fontSize: '14px',
              marginTop: '10px',
            }}>
              {JSON.stringify(errorDetails, null, 2)}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;