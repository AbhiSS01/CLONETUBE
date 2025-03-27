import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import * as Sentry from "@sentry/react";
import '../../styles/components/errorboundary.css';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="error-fallback" role="alert">
      <div className="error-container">
        <h2 className="error-title">Oops! Something went wrong</h2>
        <pre className="error-message">{error.message}</pre>
        
        <div className="error-actions">
          <button 
            className="error-retry-btn"
            onClick={resetErrorBoundary}
          >
            Try Again
          </button>
          
          <button 
            className="error-home-btn"
            onClick={() => window.location.href = '/'}
          >
            Go to Home
          </button>
        </div>

        <div className="error-details">
          <details>
            <summary>Error Details</summary>
            <pre>{error.stack}</pre>
          </details>
        </div>
      </div>
    </div>
  );
};

const ErrorBoundary = ({ children }) => {
  const logError = (error, errorInfo) => {
    Sentry.captureException(error, { extra: errorInfo });

    console.error('Caught an error:', error, errorInfo);
    

    fetch('/api/log-error', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: error.toString(),
        stack: error.stack,
        component: errorInfo.componentStack
      })
    }).catch(console.error);
  };

  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={logError}
      onReset={() => {
        // Reset the state of your app here
        window.location.reload();
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};

// HOC for adding error boundary to specific components
export const withErrorBoundary = (WrappedComponent) => {
  return (props) => (
    <ErrorBoundary>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );
};

export default ErrorBoundary;