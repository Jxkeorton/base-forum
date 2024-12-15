import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmationModal = ({
  show,
  handleClose,
  handleAction,
  title = "Confirm Action",
  bodyText = "Are you sure you want to proceed with this action? This cannot be undone.",
  actionLabel = "Proceed",
  cancelLabel = "Cancel",
}) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {bodyText}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {cancelLabel}
        </Button>
        <Button variant="danger" onClick={handleAction}>
          {actionLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;