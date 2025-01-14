import axios from 'axios';
import { createContext, useState, useEffect, useContext, useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { axiosRes, axiosReq } from '../../../shared/api/axiosDefault';
import { removeTokenTimestamp, setTokenTimestamp, shouldRefreshToken } from '../../../shared/utils/utils';

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => {
  const context = useContext(CurrentUserContext);
  if (context === undefined) {
    throw new Error('useCurrentUser must be used within a CurrentUserProvider');
  }
  return context;
};

export const useSetCurrentUser = () => {
  const context = useContext(SetCurrentUserContext);
  if (context === undefined) {
    throw new Error('useSetCurrentUser must be used within a CurrentUserProvider');
  }
  return context;
};

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get('dj-rest-auth/user/');
      setCurrentUser(data);
    } catch (error) {
      console.warn('User not authenticated or failed to load user data');
      setCurrentUser(null);
    }
  };

  const signIn = useCallback(async (signInData) => {
    try {
      const loadingToast = toast.loading('Signing in...');
      const { data } = await axios.post('dj-rest-auth/login/', signInData);
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      toast.dismiss(loadingToast);
      toast.success('Signed in successfully');
      return { success: true, data };
    } catch (err) {
      toast.error(err.response?.data?.non_field_errors?.[0] || 'Failed to sign in');
      return { 
        success: false, 
        errors: err.response?.data,
      };
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      const loadingToast = toast.loading('Signing out...');
      await axios.post('dj-rest-auth/logout/');
      setCurrentUser(null);
      removeTokenTimestamp();
      toast.dismiss(loadingToast);
      toast.success('Signed out successfully');
      return { success: true };
    } catch (err) {
      toast.error('Failed to sign out');
      return { success: false };
    }
  }, []);

  const signUp = useCallback(async (signUpData) => {
    try {
      const loadingToast = toast.loading('Creating account...');
      await axios.post('dj-rest-auth/registration/', signUpData);
      
      const signInData = {
        username: signUpData.username,
        password: signUpData.password1,
      };
      
      const { data } = await axios.post('dj-rest-auth/login/', signInData);
      setCurrentUser(data.user);
      
      toast.dismiss(loadingToast);
      toast.success('Account created and signed in successfully!');
      return { success: true, data };
    } catch (err) {
      toast.dismiss();
      toast.error(err.response?.data?.non_field_errors?.[0] || 'Failed to create account');
      return { 
        success: false, 
        errors: err.response?.data,
      };
    }
  }, []);
  
  useEffect(() => {
    handleMount();
  }, []);

  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        if(shouldRefreshToken()){
          try {
            await axios.post('/dj-rest-auth/token/refresh/');
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                navigate('/signin');
              }
              return null;
            });
            removeTokenTimestamp();
            return config;
          }
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      },
    );

    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            await axios.post('/dj-rest-auth/token/refresh/');
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                navigate('/signin');
              }
              return null;
            });
            removeTokenTimestamp();
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      },
    );
  }, [navigate]);

  const contextValue = {
    currentUser,
    signIn,
    signOut,
    signUp,
  };

  return (
    <CurrentUserContext.Provider value={contextValue}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};