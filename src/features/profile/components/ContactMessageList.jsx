import React from 'react';
import { Card, InputGroup, Button } from 'react-bootstrap';

const ContactMessageList = () => {
  // state for contacts

  // load contacts

  // handle actions 

  return (
    <>
      
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Name</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Email</Card.Subtitle>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card content.
          </Card.Text>
          <InputGroup className="mb-3">
            <InputGroup.Checkbox aria-label="Checkbox for following text input" />
            <InputGroup.Text className='text-muted'>Mark as read</InputGroup.Text>
          </InputGroup>
          <Button variant="danger">Delete</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default ContactMessageList;
