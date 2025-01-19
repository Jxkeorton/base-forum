import React from 'react';
import { Container, Row, Col, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import ContactForm from '../../../features/contact/ContactForm';

import styles from './Footer.module.css';

const Footer = () => {
  
  return (
    <footer className={styles.footer}>
      <Container>
        <Row className="py-4">
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="text-white mb-3">Navigation</h5>
            <Stack gap={2}>
              <Link to="/" className={styles.footerLink}>Home</Link>
              <Link to="/locations" className={styles.footerLink}>Locations</Link>
              <Link to="/reviews" className={styles.footerLink}>Reviews</Link>
            </Stack>
          </Col>

          <Col md={8}>
            <ContactForm />
          </Col>
        </Row>

        <Row>
          <Col>
            <hr className="bg-secondary" />
            <p className={styles.copyright}>
                &copy; {new Date().getFullYear()} Base Forum. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;