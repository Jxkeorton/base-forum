import React, { createContext, useContext, useState } from 'react';

const ReviewsContext = createContext();

export const useReviews = () => {
    const context = useContext(ReviewsContext);
    if (context === undefined) {
      throw new Error('useReviews must be used within a ReviewsProvider');
    }
    return context;
};

export const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const contextValue = {
    reviews,
    setReviews,
    error,
    loading,
  };

  return (
    <ReviewsContext.Provider value={contextValue}>
      {children}
    </ReviewsContext.Provider>
  );
};