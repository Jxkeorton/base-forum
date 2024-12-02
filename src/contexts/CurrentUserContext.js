import axios from 'axios';
import { createContext, useState, useEffect, useContext, useMemo, useCallback } from 'react';
import { axiosReq, axiosRes } from '../api/axiosDefault';
import toast from 'react-hot-toast';

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  
  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get("dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = useCallback(async (signInData) => {
    try {
      const loadingToast = toast.loading('Signing in...');
      const { data } = await axios.post('dj-rest-auth/login/', signInData);
      setCurrentUser(data.user);
      toast.dismiss(loadingToast);
      toast.success('Signed in successfully');
      return { success: true, data };
    } catch (err) {
      toast.error(err.response?.data?.non_field_errors?.[0] || 'Failed to sign in');
      return { 
        success: false, 
        errors: err.response?.data
      };
    }
  }, []);
  const signOut = useCallback(async () => {
    try {
      const loadingToast = toast.loading('Signing out...');
      await axios.post('dj-rest-auth/logout/');
      setCurrentUser(null);
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
      // First, create the account
      await axios.post('dj-rest-auth/registration/', signUpData);
      
      // Then immediately sign in with the new credentials
      const signInData = {
        username: signUpData.username,
        password: signUpData.password1
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
        errors: err.response?.data
      };
    }
  },[]);

  useEffect(() => {
    handleMount();
  }, []);

  useMemo(() => {
    axiosReq.interceptors.response.use(
      async (config) => {
        try {
          await axiosRes.post('dj-rest-auth/token/refresh/')
          return config;
        } catch (error) {
          setCurrentUser((prevCurrentUser) => {
            if (prevCurrentUser) {
              toast.error('Session expired. Please sign in again');
              window.location.replace('/sign-in');
            }
            return null;
          });
          return config;
        }
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            await axios.post('/dj-rest-auth/token/refresh/');
          } catch (error) {
            setCurrentUser(prevCurrentUser => {
              if (prevCurrentUser) {
                toast.error('Session expired. Please sign in again');
                window.location.replace('/sign-in');
              }
              return null;
            });
            return axios(err.config);
          }
        }
        return Promise.reject(err);
      }
    );
  }, []); 

  const contextValue = {
    currentUser,
    signIn,
    signOut,
    signUp
  };

  return (
    <CurrentUserContext.Provider  value={contextValue}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};