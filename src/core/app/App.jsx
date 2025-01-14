import Container from 'react-bootstrap/Container';
import {Outlet} from 'react-router-dom';

import ReviewModal from '../../features/reviews/components/ReviewModal.jsx';
import Footer from '../../shared/components/footer/Footer.jsx';
import NavBar from '../../shared/components/navbar/Navbar.jsx';

import styles from './App.module.css';

import '../../shared/api/axiosDefault.js';

function App() {
  
  return (
    <div className={styles.App}>
      <NavBar />
      <ReviewModal />
      <Container className={styles.Main}>
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
}

export default App;