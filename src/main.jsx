// main.jsx - Enterprise Pharmaceutical Intelligence Platform Entry Point
import React from 'react';
import ReactDOM from 'react-dom/client';
import EnterprisePharmaIntelligence from './EnterprisePharmaIntelligence.jsx';
import './index.css';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error('Enterprise Platform Error:', error, errorInfo);
    }
    
    // In production, you would send this to your error reporting service
    if (import.meta.env.PROD) {
      // Example: Sentry.captureException(error);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 25%, #dbeafe 50%, #e0f2fe 75%, #f0fdf4 100%)',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          <div style={{
            maxWidth: '600px',
            padding: '3rem',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
            backdropFilter: 'blur(12px)',
            borderRadius: '1.5rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '4rem',
              height: '4rem',
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 2rem auto'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
            </div>
            
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              Enterprise Platform Error
            </h1>
            
            <p style={{
              fontSize: '1.1rem',
              color: '#6b7280',
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              We encountered an unexpected error in the Enterprise Pharmaceutical Intelligence Platform. 
              Our team has been notified and is working to resolve the issue.
            </p>
            
            {import.meta.env.DEV && (
              <details style={{
                background: '#f3f4f6',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                padding: '1rem',
                marginBottom: '2rem',
                textAlign: 'left',
                fontSize: '0.875rem'
              }}>
                <summary style={{ cursor: 'pointer', fontWeight: '600', color: '#374151' }}>
                  Development Error Details
                </summary>
                <pre style={{
                  marginTop: '1rem',
                  whiteSpace: 'pre-wrap',
                  overflow: 'auto',
                  color: '#dc2626'
                }}>
                  {this.state.error && this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={() => window.location.reload()}
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Reload Platform
              </button>
              
              <button
                onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
                style={{
                  background: 'transparent',
                  color: '#6b7280',
                  border: '1px solid #d1d5db',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = '#9ca3af';
                  e.target.style.color = '#374151';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.color = '#6b7280';
                }}
              >
                Try Again
              </button>
            </div>
            
            <div style={{
              marginTop: '2rem',
              padding: '1rem',
              background: 'rgba(59, 130, 246, 0.05)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              color: '#1e40af'
            }}>
              <strong>Need immediate support?</strong><br />
              Contact our Enterprise Support team at{' '}
              <a href="mailto:support@enterprise-pharma.com" style={{ color: '#2563eb', textDecoration: 'underline' }}>
                support@enterprise-pharma.com
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Performance monitoring (in production, you'd use a real service)
const performanceObserver = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Monitor Core Web Vitals
    try {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(console.log);
        getFID(console.log);
        getFCP(console.log);
        getLCP(console.log);
        getTTFB(console.log);
      });
    } catch (error) {
      console.warn('Web Vitals monitoring not available:', error);
    }
  }
};

// Initialize performance monitoring in production
if (import.meta.env.PROD) {
  performanceObserver();
}

// Service Worker Registration (for PWA capabilities)
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered successfully:', registration);
    } catch (error) {
      console.log('Service Worker registration failed:', error);
    }
  }
};

// App initialization
const initializeApp = () => {
  // Register service worker
  registerServiceWorker();
  
  // Set up global error handlers
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    // In production, send to error reporting service
  });
  
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    // In production, send to error reporting service
  });
  
  // Performance logging
  window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Enterprise Platform loaded in ${loadTime.toFixed(2)}ms`);
  });
};

// React 18 Concurrent Features
const AppWithProviders = () => {
  React.useEffect(() => {
    initializeApp();
  }, []);

  return (
    <React.StrictMode>
      <ErrorBoundary>
        <EnterprisePharmaIntelligence />
      </ErrorBoundary>
    </React.StrictMode>
  );
};

// Create root and render app
const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found. Make sure you have a div with id="root" in your HTML.');
}

const root = ReactDOM.createRoot(container);

// Development mode enhancements
if (import.meta.env.DEV) {
  console.log('🚀 Enterprise Pharmaceutical Intelligence Platform - Development Mode');
  console.log('🔧 React version:', React.version);
  console.log('🏗️ Build info:', {
    mode: import.meta.env.MODE,
    dev: import.meta.env.DEV,
    prod: import.meta.env.PROD,
    baseUrl: import.meta.env.BASE_URL
  });
}

// Render the application
root.render(<AppWithProviders />);

// Hot Module Replacement (HMR) for development
if (import.meta.env.DEV && import.meta.hot) {
  import.meta.hot.accept('./EnterprisePharmaIntelligence.jsx', () => {
    console.log('🔄 Hot reloading Enterprise Platform...');
  });
}

// Export for testing
export default AppWithProviders;