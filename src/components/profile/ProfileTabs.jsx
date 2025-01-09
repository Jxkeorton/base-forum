import React, { useState } from 'react';
import { Tabs, Tab, Container, Row, Col } from 'react-bootstrap';

import { useCurrentUser } from '../../contexts/CurrentUserContext';
import ReviewsList from '../reviews/ReviewsList.jsx';

import SavedLocations from './SavedLocations.jsx';

function ProfileTabs() {
  const [activeTab, setActiveTab] = useState('reviews');

  const { currentUser } = useCurrentUser();

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
              <ReviewsList filter={{ owner__username: currentUser.username, ordering: '-created_at' }} />
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