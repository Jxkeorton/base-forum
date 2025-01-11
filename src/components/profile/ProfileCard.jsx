import { MDBIcon } from 'mdb-react-ui-kit';
import React, { useState } from 'react';
import { Card, Container, Row, Col, Modal } from 'react-bootstrap';

import Avatar from '../ui/avatar/Avatar.jsx';

import styles from './css/ProfileCard.module.css';
import ProfileEditForm from './ProfileEditForm.jsx';

const ProfileCard = ({ username, name, src, noOfBaseJumps, isOwner }) => {
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => setShowModal(false);
  const handleModalOpen = () => setShowModal(true);

  return (
    <Container 
      className="d-flex align-items-center" 
      style={{ minHeight: '40vh' }}
      aria-label="Profile Information"
    >
      <Row className="justify-content-center w-100">
        <Col md="auto">
          <Card style={{ width: '18rem', border: '1px solid #ddd', borderRadius: '10px' }}>
            <Card.Body className="text-center">
              <Avatar 
                src={src} 
                height={80} 
                text={`${username}'s profile picture`}
              />
              <Card.Title className="mt-3">
                <h2 className="h5 mb-0">{username}</h2>
              </Card.Title>
              <Card.Text className="mt-2 text-muted small" aria-label="Username">
                @{name}
              </Card.Text>
              <Card.Text 
                className="mt-2 text-muted small"
                aria-label="Number of base jumps"
              >
                Base Jumps: {noOfBaseJumps !== null ? noOfBaseJumps : 'N/A'}
              </Card.Text>

              {isOwner && (
                <div 
                  className={`d-flex justify-content-center ${styles.iconButtons}`}
                  role="toolbar"
                  aria-label="Profile actions"
                >
                  <button
                    className={`me-2 ${styles.linkMuted} btn btn-link p-0`}
                    onClick={handleModalOpen}
                    aria-label="Edit profile"
                  >
                    <MDBIcon fas icon="pencil-alt" aria-hidden="true" />
                    <span className="visually-hidden">Edit profile</span>
                  </button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal 
        show={showModal} 
        onHide={handleModalClose}
        aria-labelledby="edit-profile-modal-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="edit-profile-modal-title">Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProfileEditForm
            username={name}
            noOfBaseJumps={noOfBaseJumps}
            closeModal={handleModalClose}
            src={src}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ProfileCard;