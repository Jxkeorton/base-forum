import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useCurrentUser } from '../contexts/CurrentUserContext.jsx';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useCurrentUser();
  const location = useLocation();

  if (!currentUser) {
    // Redirect to sign-in page while saving the attempted URL
    return <Navigate to="/sign-in" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;