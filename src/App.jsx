import Container from 'react-bootstrap/Container';
import {Outlet} from 'react-router-dom';

import styles from './App.module.css';
import ReviewModal from './components/reviews/ReviewModal.jsx';
import NavBar from './components/ui/navbar/Navbar.jsx';


import './api/axiosDefault';

function App() {
  
  return (
    <div className={styles.App}>
      <NavBar />
      <ReviewModal />
      <Container className={styles.Main}>
        <Outlet />
      </Container>
    </div>
  );
}

export default App;