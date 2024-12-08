// ReviewModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";
import ReviewForm from "./ReviewForm";
import { useModal } from "../../contexts/ReviewModalContext";
import { useParams } from "react-router-dom";
import { useMatch } from 'react-router-dom';

const ReviewModal = () => {
  const { isModalVisible, hideModal, review } = useModal();
  const match = useMatch('/profile/:id');
  const params = useParams();
  
  const locationId = !match ? params.id : null;

  return (
    <Modal show={isModalVisible} onHide={hideModal} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>{review ? "Edit Review" : "Submit a Review"}</Modal.Title>
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