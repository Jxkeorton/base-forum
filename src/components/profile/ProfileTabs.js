import React, { useState } from 'react';
import { Tabs, Tab, Container, Row, Col } from 'react-bootstrap';
import SavedLocations from './SavedLocations';
import UserReviews from './UserReviews';

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
              <UserReviews />
            </Tab>
            <Tab eventKey="locations" title="Saved Locations">
              <SavedLocations />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfileTabs;