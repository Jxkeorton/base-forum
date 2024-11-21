import React, { useState } from 'react';
import { Card, Row, Col, Badge, Alert } from 'react-bootstrap';

const DetailsCard = ({ location }) => {
  // State to manage alert visibility
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('');

  // Function to handle the copy action
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setAlertMessage('Coordinates copied to clipboard!');
        setAlertVariant('success');
        setAlertVisible(true);
      })
      .catch((err) => {
        setAlertMessage('Failed to copy coordinates');
        setAlertVariant('danger');
        setAlertVisible(true);
        console.error(err);
      });

    // Hide the alert after 3 seconds
    setTimeout(() => setAlertVisible(false), 3000);
  };

  return (
    <Card className="mb-4 shadow-sm">
      <Row>
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
              <strong>Coordinates:</strong> 
              <span>{location.latitude}, {location.longitude}</span>
              <i
                className="fa fa-clipboard"
                style={{ cursor: 'pointer', marginLeft: '8px' }}
                onClick={() => copyToClipboard(`${location.latitude}, ${location.longitude}`)}
                title="Copy coordinates"
              />
            </Card.Text>

            <Card.Text>
              <strong>Cliff Aspect:</strong> {location.cliff_aspect}
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>

      {/* Bootstrap Alert for notification */}
      {alertVisible && (
        <Alert variant={alertVariant} className="mt-3">
          {alertMessage}
        </Alert>
      )}
    </Card>
  );
};

export default DetailsCard;