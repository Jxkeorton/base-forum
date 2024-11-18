import React from "react";
import { Modal, Button } from "react-bootstrap";
import ReviewForm from "./ReviewForm";

const ReviewModal = ({ showModal, handleClose }) => {
  return (
    <Modal show={showModal} onHide={handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Submit a Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ReviewForm />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReviewModal;