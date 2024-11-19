import React from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';

const DetailsCard = ({ location }) => {
  return (
    <Card className="mb-4 shadow-sm">
      <Row noGutters>
        <Col md={5}>
          <Card.Img
            src={location.image}
            alt={location.name}
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
        </Col>
        <Col md={7}>
          <Card.Body>
            <Card.Title>{location.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Opened by: {location.opened_by}
            </Card.Subtitle>
            <Card.Text>
              <strong>Date opened:</strong> {new Date(location.date_opened).toLocaleDateString()}
            </Card.Text>

            <Card.Text>
              <Badge bg="primary" className="me-2">{location.country}</Badge>
              <Badge bg="info" className="me-2">Rock Drop: {location.rock_drop} ft</Badge>
              <Badge bg="info">Total Height: {location.total_height} ft</Badge>
            </Card.Text>

            <Card.Text>
              <strong>Access:</strong> {location.access}
            </Card.Text>
            
            <Card.Text>
              <strong>Coordinates:</strong> {location.latitude}, {location.longitude}
            </Card.Text>
            
            <Card.Text>
              <strong>Cliff Aspect:</strong> {location.cliff_aspect}
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default DetailsCard;