import React, { useEffect, createContext, useContext, useState, useCallback } from 'react';
import { axiosReq } from '../api/axiosDefault';
import { useCurrentUser } from './CurrentUserContext';

const SavedLocationsContext = createContext();

export const useSavedLocations = () => {
    const context = useContext(SavedLocationsContext);
    if (context === undefined) {
      throw new Error('useSavedLocations must be used within a SavedLocationsProvider');
    }
    return context;
};

export const SavedLocationsProvider = ({ children }) => {
  const [savedLocations, setSavedLocations] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentUser = useCurrentUser();

  const fetchSavedLocations = useCallback(async () => {
    if (!currentUser) {
      setSavedLocations([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const { data } = await axiosReq.get('/saved-locations/');
      setSavedLocations(data.results || []);
      console.log('Fetched saved locations:', data.results);
    } catch (err) {
      console.error('Error fetching saved locations:', err);
      setError(err.response?.data || 'Failed to fetch saved locations');
      setSavedLocations([]);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchSavedLocations();
  }, [currentUser, fetchSavedLocations]);

  const contextValue = {
    savedLocations,
    setSavedLocations,
    error,
    loading,
    fetchSavedLocations
  };

  return (
    <SavedLocationsContext.Provider value={contextValue}>
      {children}
    </SavedLocationsContext.Provider>
  );
};
