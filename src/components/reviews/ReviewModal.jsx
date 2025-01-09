// ReviewModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useParams , useMatch } from 'react-router-dom';

import { useModal } from '../../contexts/ReviewModalContext';

import ReviewForm from './ReviewForm.jsx';

const ReviewModal = () => {
  const { isModalVisible, hideModal, review } = useModal();
  const match = useMatch('/profile/:id');
  const params = useParams();
  
  const locationId = !match ? params.id : null;

  return (
    <Modal show={isModalVisible} onHide={hideModal} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>{review ? 'Edit Review' : 'Submit a Review'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ReviewForm locationId={locationId} review={review}/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReviewModal;