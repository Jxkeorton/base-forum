import React, { useState } from 'react';
import { Tabs, Tab, Container, Row, Col } from 'react-bootstrap';

import { useCurrentUser } from '../../auth/context/CurrentUserContext.jsx';
import ReviewsList from '../../reviews/components/ReviewsList.jsx';

import ContactMessageList from './ContactMessageList.jsx';
import SavedLocations from './SavedLocations.jsx';

function ProfileTabs() {
  const [activeTab, setActiveTab] = useState('reviews');

  const { currentUser, isAdmin } = useCurrentUser();

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
            <Tab  eventKey="reviews" title={<strong>Your Reviews</strong>}>
              <ReviewsList filter={{ owner__username: currentUser.username, ordering: '-created_at' }} />
            </Tab>
            <Tab eventKey="locations" title={<strong>Saved Locations</strong>}>
              <SavedLocations />
            </Tab>
            {isAdmin &&
              <Tab eventKey="contactMessages" title={<strong>Contact Form Responses</strong>}>
                <ContactMessageList />
              </Tab>
            }
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfileTabs;