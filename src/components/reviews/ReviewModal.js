// ReviewModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";
import ReviewForm from "./ReviewForm";
import { useModal } from "../../contexts/ReviewModalContext";
import { useParams } from "react-router-dom";

const ReviewModal = () => {
  const { isModalVisible, hideModal, review } = useModal();
  const { id } = useParams();

  return (
    <Modal show={isModalVisible} onHide={hideModal} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>{review ? "Edit Review" : "Submit a Review"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ReviewForm locationId={id} review={review}/>
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