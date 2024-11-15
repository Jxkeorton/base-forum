import axios from 'axios';
import {createContext, useState, useEffect, useContext, useMemo} from 'react';
import { axiosReq, axiosRes } from '../api/axiosDefault';
import { useNavigate } from 'react-router-dom';

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useState(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

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
        } catch (error) {
          setCurrentUser((prevCurrentUser) => {
            if(prevCurrentUser){
              navigate('/sign-in')
            }
            return null;
          })
          return config
        }
        return config;
      },
      (err) => {
        Promise.reject(err)
      }
    )

    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if(err.response?.status === 401){
          try {
            await axios.post('/dj-rest-auth/token/refresh/')
          } catch (error) {
            setCurrentUser(prevCurrentUser => {
              if(prevCurrentUser){
                navigate('/sign-in')
              }
              return null;
            })
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    )
  }, [navigate]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </ CurrentUserContext.Provider>
    );
};