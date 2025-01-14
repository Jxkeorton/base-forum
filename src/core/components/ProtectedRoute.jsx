import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Navigate, useLocation } from 'react-router-dom';

import { useCurrentUser } from '../../features/auth/context/CurrentUserContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser, isLoading } = useCurrentUser();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/sign-in" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;