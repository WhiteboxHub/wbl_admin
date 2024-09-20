import React from 'react';
import { Navigate } from 'react-router-dom';

// Define a type for the props that your wrapped component will receive
type WithAuthProps = {
  // Define any props that your WrappedComponent might receive here
};

// Create a type for the WrappedComponent itself
type WrappedComponentProps = WithAuthProps & React.ComponentPropsWithoutRef<'div'>;

const withAuth = <P extends WithAuthProps>(WrappedComponent: React.ComponentType<P>) => {
  return (props: P) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    } else {
      return <Navigate to="/error" />;
    }
  };
};

export default withAuth;
