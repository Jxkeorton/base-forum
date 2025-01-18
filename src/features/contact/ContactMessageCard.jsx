import React, {useState} from 'react';
import { Card, InputGroup, Button } from 'react-bootstrap';

import ConfirmationModal from '../../shared/components/ConfirmationModal';

const ContactMessageCard = ({contact, handleMarkAsRead, handleDelete}) => {
const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  return (
    <>
    <Card>
        <Card.Body>
        <Card.Title>{contact.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{contact.email}</Card.Subtitle>
        <Card.Text>
            {contact.message}
        </Card.Text>
        <InputGroup className="mb-3">
            <InputGroup.Checkbox 
            checked={contact.read}
            onChange={() => handleMarkAsRead(contact.id)}
            aria-label="Mark as read checkbox"
            disabled={contact.read}
            />
            <InputGroup.Text className='text-muted'>
            {contact.read ? 'Marked as read' : 'Mark as read'}
            </InputGroup.Text>
        </InputGroup>
        <Button onClick={() => setShowDeleteModal(true)} variant="danger">Delete</Button>
        </Card.Body>
    </Card>

    <ConfirmationModal 
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleAction={() => handleDelete(contact.id)}
        title = 'Delete Message'
        bodyText = 'Are you sure you want to delete this contact form response? This cannot be undone.'
        actionLabel = 'Delete'
        cancelLabel = 'Cancel'
    />
    </>
  );
};

export default ContactMessageCard;
