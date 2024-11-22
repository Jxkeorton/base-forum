import React, { useState } from 'react';
import { Tabs, Tab, Container, Row, Col, Card } from 'react-bootstrap';

function ProfileTabs() {
  const [activeTab, setActiveTab] = useState('reviews');

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Tabs
            id="reviews-locations-tabs"
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-3"
          >
            <Tab eventKey="reviews" title="Your Reviews">
              <Card className="mb-3">
                <Card.Body>Your review content goes here.</Card.Body>
              </Card>
              <Card className="mb-3">
                <Card.Body>Another review content.</Card.Body>
              </Card>
              <Card className="mb-3">
                <Card.Body>More reviews...</Card.Body>
              </Card>
            </Tab>
            <Tab eventKey="locations" title="Saved Locations">
              <Card className="mb-3">
                <Card.Body>Saved location content goes here.</Card.Body>
              </Card>
              <Card className="mb-3">
                <Card.Body>Another saved location content.</Card.Body>
              </Card>
              <Card className="mb-3">
                <Card.Body>More saved locations...</Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfileTabs;