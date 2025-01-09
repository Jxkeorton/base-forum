import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const NotFound = () => {
  return (
    <Container fluid className="vh-100">
      <Row className="h-100 align-items-center justify-content-center">
        <Col xs={12} md={6} className="text-center">
          <h1 style={{ fontSize: '6rem', fontWeight: 'bold' }}>404</h1>
          
          <div className="mb-4">
            <h2 className="h3 mb-3">Page Not Found</h2>
            <p className="text-muted">Sorry, we couldn&apos;t find the page you&apos;re looking for.</p>
          </div>

          <Link to="/">
            <Button variant="primary" size="lg" className="d-flex align-items-center mx-auto">
              Back to Homepage
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;