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
    <Container className="d-flex align-items-center" style={{ minHeight: '40vh' }}>
      <Row className="justify-content-center w-100">
        <Col md="auto">
          <Card style={{ width: '18rem', border: '1px solid #ddd', borderRadius: '10px' }}>
            <Card.Body className="text-center">
              <Avatar src={src} height={80} />
              <Card.Title className="mt-3">{username}</Card.Title>
              <Card.Text className="mt-2 text-muted small">
                 @{name}
              </Card.Text>
              <Card.Text className="mt-2 text-muted small">
                Base Jumps: {noOfBaseJumps !== null ? noOfBaseJumps : 'N/A'}
              </Card.Text>

              {isOwner && (
                <div className={`d-flex justify-content-center ${styles.iconButtons}`}>
                  <a
                    href="#!"
                    className={`me-2 ${styles.linkMuted}`}
                    onClick={handleModalOpen}
                  >
                    <MDBIcon fas icon="pencil-alt" />
                  </a>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
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