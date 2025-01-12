import React from 'react';
import { Container, Card, Alert, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container className="py-4">
      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1 className="display-4 mb-3">Welcome to Base Forum</h1>
        <p className="lead text-muted">
          A community-driven platform for base jumping locations and safety information
        </p>
      </div>

      {/* Safety Alert */}
      <Alert variant="danger" className="mb-5">
        <Alert.Heading>⚠️ Safety First: Essential Notice</Alert.Heading>
        <p>
          Base jumping is an extremely dangerous sport that can result in serious injury or death. 
          This platform is for information sharing only and does not constitute formal instruction 
          or training. Always:
        </p>
        <ul className="mb-0">
          <li>Seek proper training from qualified instructors</li>
          <li>Never jump alone - always have a ground crew</li>
          <li>Check weather conditions thoroughly</li>
          <li>Verify all equipment before every jump</li>
          <li>Have an emergency plan in place</li>
        </ul>
      </Alert>

      {/* Main Features */}
      <Row className="mb-5 g-4">
        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column">
              <div className="text-center mb-3">
                <i className="fa-solid fa-location-dot fa-2x text-primary"></i>
              </div>
              <Card.Title className="text-center">Verified Locations</Card.Title>
              <Card.Text>
                Browse our database of community-verified base jumping locations. 
                Each entry includes essential details like total height, rock drop,
                and access information.
              </Card.Text>
              <Link to="/locations" className="btn btn-outline-primary mt-auto">
                Browse Locations
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column">
              <div className="text-center mb-3">
                <i className="fa-solid fa-comment fa-2x text-primary"></i>
              </div>
              <Card.Title className="text-center">Community Reviews</Card.Title>
              <Card.Text>
                Read and share experiences, current conditions, and critical safety 
                information through our review system. Stay informed about potential 
                hazards and changes.
              </Card.Text>
              <Link to="/reviews" className="btn btn-outline-primary mt-auto">
                View Reviews
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Additional Safety Information */}
      <Card className="bg-light border-0 mb-5">
        <Card.Body className="p-4">
          <h2 className="mb-4">Before You Jump</h2>
          <Row>
            <Col md={6}>
              <h5>Required Experience</h5>
              <ul>
                <li>Minimum 200 skydives</li>
                <li>Extensive canopy control practice</li>
                <li>First jump course completion</li>
                <li>Proper equipment and training</li>
              </ul>
            </Col>
            <Col md={6}>
              <h5>Essential Equipment</h5>
              <ul>
                <li>Base-specific container and canopy</li>
                <li>Helmet and protective gear</li>
                <li>Emergency and communication devices</li>
              </ul>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Community Guidelines */}
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-4">
          <h2 className="mb-4">Community Guidelines</h2>
          <p>
            Base Forum is built on trust and respect within our community. We expect all members to:
          </p>
          <ul>
            <li>Share accurate and current information</li>
            <li>Report any hazards or safety concerns promptly</li>
            <li>Respect access restrictions and local regulations</li>
            <li>Support and mentor newer jumpers responsibly</li>
            <li>Maintain the confidentiality of sensitive locations</li>
          </ul>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Home;