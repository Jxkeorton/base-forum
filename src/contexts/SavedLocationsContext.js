import React, { createContext, useContext, useState, useCallback } from 'react';
import { axiosReq } from '../api/axiosDefault';
import { useCurrentUser } from './CurrentUserContext';
import toast from 'react-hot-toast';

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
  const { currentUser } = useCurrentUser();

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
      const errorMessage = err.response?.data || 'Failed to fetch saved locations';
      setError(errorMessage);
      setSavedLocations([]);
      toast.error('Unable to load saved locations');
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

   // Save a new location
   const saveLocation = useCallback(async (locationId) => {
    if (!currentUser) {
      toast.error('Please sign in to save locations');
      return { success: false, error: 'User not authenticated' };
    }

    const loadingToast = toast.loading('Saving location...');

    try {
      setLoading(true);
      const { data } = await axiosReq.post('/saved-locations/', {
        location: locationId
      });
      setSavedLocations(prev => [...prev, data]);
      toast.dismiss(loadingToast);
      toast.success('Location saved successfully');
      return { success: true, data };
    } catch (err) {
      toast.dismiss(loadingToast);
      if (err.response?.status === 400) {
        toast.error('Location is already saved');
        return {
          success: false,
          error: 'Location is already saved'
        };
      }
      const errorMessage = err.response?.data || 'Failed to save location';
      toast.error(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  // Remove a saved location
  const removeSavedLocation = useCallback(async (savedLocationId) => {
    if (!currentUser) {
      toast.error('Please sign in to manage saved locations');
      return { success: false, error: 'User not authenticated' };
    }

    const loadingToast = toast.loading('Removing saved location...');

    try {
      setLoading(true);
      await axiosReq.delete(`/saved-locations/${savedLocationId}/`);
      setSavedLocations(prev => 
        prev.filter(location => location.id !== savedLocationId)
      );
      toast.dismiss(loadingToast);
      toast.success('Location removed from saved list');
      return { success: true };
    } catch (err) {
      toast.dismiss(loadingToast);
      const errorMessage = err.response?.data || 'Failed to remove saved location';
      toast.error(errorMessage);
      return {
        success: false,
        error: errorMessage
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
