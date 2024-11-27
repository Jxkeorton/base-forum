import React, { createContext, useContext, useState, useCallback } from 'react';
import { axiosReq } from '../api/axiosDefault';
import { useCurrentUser } from './CurrentUserContext';

const SavedLocationsContext = createContext();

export const useSavedLocationsContext = () => {
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

   // Save a new location
   const saveLocation = useCallback(async (locationId) => {
    if (!currentUser) {
      return { success: false, error: 'User not authenticated' };
    }

    try {
      setLoading(true);
      const { data } = await axiosReq.post('/saved-locations/', {
        location: locationId  // Send the location ID to the backend
      });
      setSavedLocations(prev => [...prev, data]);
      return { success: true, data };
    } catch (err) {
      console.error('Error saving location:', err);
      return {
        success: false,
        error: err.response?.data || 'Failed to save location'
      };
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  // Remove a saved location
  const removeSavedLocation = useCallback(async (savedLocationId) => {
    if (!currentUser) {
      return { success: false, error: 'User not authenticated' };
    }

    try {
      setLoading(true);
      await axiosReq.delete(`/saved-locations/${savedLocationId}/`);
      setSavedLocations(prev => 
        prev.filter(location => location.id !== savedLocationId)
      );
      return { success: true };
    } catch (err) {
      console.error('Error removing saved location:', err);
      return {
        success: false,
        error: err.response?.data || 'Failed to remove saved location'
      };
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  // Check if a location is saved
  const isLocationSaved = useCallback((locationId) => {
    if (!Array.isArray(savedLocations)) return false;
    // Check if the location exists in saved locations
    return savedLocations.some(saved => parseInt(saved.location) === parseInt(locationId));
  }, [savedLocations]);

  // Get saved location ID by location ID
  const getSavedLocationId = useCallback((locationId) => {
    if (!Array.isArray(savedLocations)) return null;
    // Find the SavedLocation record ID by matching the location ID
    const savedLocation = savedLocations.find(
      saved => parseInt(saved.location) === parseInt(locationId)
    );
    return savedLocation?.id;
  }, [savedLocations]);

  const contextValue = {
    savedLocations,
    setSavedLocations,
    error,
    loading,
    fetchSavedLocations,
    saveLocation,
    removeSavedLocation,
    isLocationSaved,
    getSavedLocationId
  };

  return (
    <SavedLocationsContext.Provider value={contextValue}>
      {children}
    </SavedLocationsContext.Provider>
  );
};
