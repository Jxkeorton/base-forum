import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { axiosReq } from '../api/axiosDefault';
import { useCurrentUser } from './CurrentUserContext';

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
    if (!userId) {
      setProfileData(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setProfileError(null);
      const { data } = await axiosReq.get(`/profile/${userId}/`);
      setProfileData(data);
    } catch (err) {
      setProfileError(err.response?.data || 'Failed to fetch profile data');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (formData, profileId) => {
    if (!profileId) {
      return { success: false, error: 'Profile ID is required' };
    }
    
    try {
      setLoading(true);
      const { data } = await axiosReq.put(`/profile/${profileId}/`, formData);
      setProfileData(data);
      return { success: true, data };
    } catch (err) {
      console.error('Profile update error:', err);
      return { 
        success: false, 
        error: err.response?.data || 'Failed to update profile' 
      };
    } finally {
      setLoading(false);
    }
  }, []);

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