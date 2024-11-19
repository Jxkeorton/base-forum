import React from "react";
import { Modal, Button } from "react-bootstrap";
import ReviewForm from "./ReviewForm";
import { useModal } from "../../contexts/ReviewModalContext";

const ReviewModal = () => {
  const { isModalVisible, hideModal } = useModal();

  return (
    <Modal show={isModalVisible} onHide={hideModal} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Submit a Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ReviewForm />
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