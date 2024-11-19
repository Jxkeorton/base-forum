// ReviewModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";
import ReviewForm from "./ReviewForm";
import { useModal } from "../../contexts/ReviewModalContext";
import { useParams } from "react-router-dom"; // Import useParams

const ReviewModal = () => {
  const { isModalVisible, hideModal } = useModal();
  const { id } = useParams(); // Get the location ID from the URL

  return (
    <Modal show={isModalVisible} onHide={hideModal} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Submit a Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ReviewForm locationId={id} /> {/* Pass the location ID to ReviewForm */}
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