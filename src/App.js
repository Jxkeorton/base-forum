import styles from './App.module.css';
import {Outlet} from "react-router-dom"
import NavBar from './components/ui/navbar/Navbar';
import Container from 'react-bootstrap/Container'
import "./api/axiosDefault"

function App() {
  

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Outlet />
      </Container>
    </div>
  );
}

export default App;