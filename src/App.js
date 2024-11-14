import styles from './App.module.css';
import {Outlet} from "react-router-dom"
import NavBar from './components/ui/navbar/NavBar';
import Container from 'react-bootstrap/Container'
import "./api/axiosDefault"
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState(null)

  const handleMount = async () => {
    try {
      const {data} = await axios.get('dj-rest-auth/user/')
      setCurrentUser(data)
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    handleMount();
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Outlet />
          </Container>
        </div>
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;