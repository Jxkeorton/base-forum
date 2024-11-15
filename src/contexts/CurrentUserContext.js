import axios from 'axios';
import { createContext, useState, useEffect, useContext, useMemo } from 'react';
import { axiosReq, axiosRes } from '../api/axiosDefault';

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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};