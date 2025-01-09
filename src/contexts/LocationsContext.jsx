import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';

import { axiosReq } from '../api/axiosDefault';

import { useCurrentUser } from './CurrentUserContext.jsx';

const LocationsContext = createContext();

export const useLocationsContext = () => {
    const context = useContext(LocationsContext);
    if (context === undefined) {
      throw new Error('useLocations must be used within a LocationsProvider');
    }
    return context;
};
export const LocationsProvider = ({ children }) => {
  const [locations, setLocations] = useState([]);
  const [savedLocations, setSavedLocations] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useCurrentUser();

  // Fetch all locations, Search term optional
  const fetchAllLocations = useCallback(async (searchTerm = '') => {
    try {
      setLoading(true);
      const { data } = await axiosReq.get(`/locations/?search=${searchTerm}`);
      setLocations(data.results);
      return data.results;
    } catch (err) {
      toast.error('Unable to load locations');
      setError('Failed to fetch locations');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllLocations();
  }, [fetchAllLocations]);

  // Fetch saved locations for currentUser
  const fetchSavedLocations = useCallback(async () => {
    if (!currentUser.pk) {
      setSavedLocations([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const { data } = await axiosReq.get('/saved-locations/');
      setSavedLocations(data.results || []);
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
    if (!currentUser.pk) {
      toast.error('Please sign in to save locations');
      return { success: false, error: 'User not authenticated' };
    }

    const loadingToast = toast.loading('Saving location...');

    try {
      setLoading(true);
      const { data } = await axiosReq.post('/saved-locations/', {
        location: locationId,
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
          error: 'Location is already saved',
        };
      }
      const errorMessage = err.response?.data || 'Failed to save location';
      toast.error(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  // Remove a saved location
  const removeSavedLocation = useCallback(async (savedLocationId) => {
    if (!currentUser.pk) {
      toast.error('Please sign in to manage saved locations');
      return { success: false, error: 'User not authenticated' };
    }

    const loadingToast = toast.loading('Removing saved location...');

    try {
      setLoading(true);
      await axiosReq.delete(`/saved-locations/${savedLocationId}/`);
      setSavedLocations(prev => 
        prev.filter(location => location.id !== savedLocationId),
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
        error: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  // Check if a location is saved
  const isLocationSaved = useCallback((locationId) => {
    if (!Array.isArray(savedLocations)) return false;
    
    return savedLocations.some(saved => parseInt(saved.location) === parseInt(locationId));
  }, [savedLocations]);

  // Get saved location ID by location ID
  const getSavedLocationId = useCallback((locationId) => {
    if (!Array.isArray(savedLocations)) return null;
    const savedLocation = savedLocations.find(
      saved => parseInt(saved.location) === parseInt(locationId),
    );
    return savedLocation?.id;
  }, [savedLocations]);

  // Toggles save/Un-save
  const handleSaveToggle = useCallback(async (locationId) => {
    const saved = isLocationSaved(locationId);
    try {
      if (saved) {
        const savedLocationId = getSavedLocationId(locationId);
        await removeSavedLocation(savedLocationId);
      } else {
        await saveLocation(locationId);
      }
      return { success: true };
    } catch (error) {
      toast.error('An error occurred while saving');
      return { success: false, error };
    }
  }, [isLocationSaved, getSavedLocationId, removeSavedLocation, saveLocation]);

  const contextValue = {
    locations,
    savedLocations,
    error,
    loading,
    fetchAllLocations,
    handleSaveToggle,
    fetchSavedLocations,
    saveLocation,
    removeSavedLocation,
    isLocationSaved,
    getSavedLocationId,
  };

  return (
    <LocationsContext.Provider value={contextValue}>
      {children}
    </LocationsContext.Provider>
  );
};
