import React, { useEffect } from 'react';
import { Spinner, Container, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { useCurrentUser } from '../../auth/context/CurrentUserContext.jsx';
import ProfileCard from '../components/ProfileCard.jsx';
import ProfileTabs from '../components/ProfileTabs.jsx';
import { useProfileContext } from '../context/ProfileContext.jsx';

const Profile = () => {
  const { id } = useParams();
  const { currentUser } = useCurrentUser();
  const { profile, loading, error, fetchProfile } = useProfileContext();

  useEffect(() => {
    if (id) {
      fetchProfile(id);
    }
  }, [id, fetchProfile]);

  const isOwner = currentUser?.username === profile?.owner;

  if (error) {
    return (
      <Container className="mt-3">
        <Alert variant="danger">
          Error loading profile: {error}
        </Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100px' }}>
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (!profile) {
    return (
      <Container className="mt-3">
        <Alert variant="warning">
          Profile not found
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      <ProfileCard
        username={profile.name}
        name={profile.owner}
        src={profile.image}
        noOfBaseJumps={profile.no_of_base_jumps}
        isOwner={isOwner}
      />
      <ProfileTabs/>
    </Container>
  );
};

export default Profile;