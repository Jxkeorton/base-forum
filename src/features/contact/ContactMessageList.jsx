import React, {useState, useEffect} from 'react';
import { Col, Row } from 'react-bootstrap';
import toast from 'react-hot-toast';

import { axiosReq } from '../../shared/api/axiosDefault';

import ContactMessageCard from './ContactMessageCard';

const ContactMessageList = () => {
  // state for contacts
  const [contacts, setContacts] = useState([]);

  // load contacts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axiosReq('/contact/?ordering=-created_at');
        setContacts(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchContacts();
  }, []);

  // handle actions 
  const handleMarkAsRead = async (id) => {
    try {
    const loadingToast = toast.loading('Marking as read...');
    await axiosReq.get(`/contact/${id}/`);
    
    setContacts(prevContacts => 
        prevContacts.map(contact => 
        contact.id === id 
            ? {...contact, read: true}
            : contact,
        ),
    );
    
    toast.dismiss(loadingToast);
    toast.success('Message marked as read');
    } catch (error) {
    toast.error('Failed to mark message as read');
    console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
    const loadingToast = toast.loading('Deleting message...');
    await axiosReq.delete(`/contact/${id}/`);
    setContacts(prevContacts => prevContacts.filter(contact => contact.id!== id));
    toast.dismiss(loadingToast);
    toast.success('Message deleted');
    } catch (error) {
    toast.error('Failed to delete message');
    console.error(error);
    }
  };

  return (
    <>
     <Row xs={1} md={2} className="g-4">
      {contacts?.length === 0 ? (
            <p>No contact form responses yet!</p>
          ) : (
            contacts?.map((contact) => (
              <Col key={contact.id}>
                <ContactMessageCard contact={contact} handleMarkAsRead={handleMarkAsRead} handleDelete={handleDelete} />
              </Col>
            ))
          )
        }
      </Row>
    </>
  );
};

export default ContactMessageList;
