import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { axiosReq } from '../api/axiosDefault';
import { useCurrentUser } from './CurrentUserContext';
import toast from 'react-hot-toast';

const ProfileContext = createContext();
const SetProfileContext = createContext();

export const useProfileContext = () => {
    const context = useContext(ProfileContext);
    if (context === undefined) {
      throw new Error('useProfileContext must be used within a ProfileProvider');
    }
    return context;
};

export const ProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(null);
  const [profileError, setProfileError] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentUser = useCurrentUser();

  const fetchProfileData = useCallback(async (userId) => {
    if (!userId  || isNaN(parseInt(userId))) {
      setProfileData(null);
      setProfileError('Invalid user ID');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setProfileError(null);
      const { data } = await axiosReq.get(`/profile/${userId}/`);
      setProfileData(data);
    } catch (err) {
      const errorMessage = err.response?.data || 'Failed to fetch profile data';
      setProfileError(errorMessage);

      setProfileData(null);
      
      if (err.response?.status === 401) {
        toast.error('Please sign in to view this profile');
      } else {
        toast.error('Unable to load profile data');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (formData, profileId) => {
    if (!profileId || !currentUser) {
      toast.error('Authentication required');
      return { success: false, error: 'Authentication required' };
    }

    const loadingToast = toast.loading('Updating profile...');
    
    try {
      setLoading(true);
      const { data } = await axiosReq.put(`/profile/${profileId}/`, formData);
      setProfileData(data);
      toast.dismiss(loadingToast);
      toast.success('Profile updated successfully');
      return { success: true, data };
    } catch (err) {
      toast.dismiss(loadingToast);
      const errorMessage = err.response?.data?.detail || err.response?.data || 'Failed to update profile';
      toast.error(errorMessage);
      return { 
        success: false, 
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser?.id) {
      fetchProfileData(currentUser.id);
    } else {
      setProfileData(null);
      setLoading(false);
    }
  }, [currentUser, fetchProfileData]);

  const contextValue = {
    profile: profileData,
    setProfile: setProfileData,
    error: profileError,
    loading,
    fetchProfile: fetchProfileData,
    updateProfile
  };

  return (
    <ProfileContext.Provider value={contextValue}>
      <SetProfileContext.Provider value={setProfileData}>
        {children}
      </SetProfileContext.Provider>
    </ProfileContext.Provider>
  );
};