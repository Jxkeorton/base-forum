import React, { useState, useEffect } from 'react';
import { Col, Row, ButtonGroup, Button } from 'react-bootstrap';
import toast from 'react-hot-toast';

import { axiosReq } from '../../shared/api/axiosDefault';

import ContactMessageCard from './ContactMessageCard';

const ContactMessageList = () => {
  // State for contacts
  const [contacts, setContacts] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'read', or 'unread'
  const [loading, setLoading] = useState(true);

  // Load contacts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const response = await axiosReq('/contact/?ordering=-created_at');
        setContacts(response.data.results);
      } catch (error) {
        toast.error('Failed to load messages');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  // Filter contacts based on read status
  const filteredContacts = contacts.filter(contact => {
    switch (filterStatus) {
      case 'read':
        return contact.read;
      case 'unread':
        return !contact.read;
      default:
        return true;
    }
  });

  // Handle actions 
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
      setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
      toast.dismiss(loadingToast);
      toast.success('Message deleted');
    } catch (error) {
      toast.error('Failed to delete message');
      console.error(error);
    }
  };

  // Count messages by status
  const readCount = contacts.filter(contact => contact.read).length;
  const unreadCount = contacts.filter(contact => !contact.read).length;

  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Contact Messages</h2>
        <ButtonGroup>
          <Button
            variant={filterStatus === 'all' ? 'primary' : 'outline-primary'}
            onClick={() => setFilterStatus('all')}
          >
            All ({contacts.length})
          </Button>
          <Button
            variant={filterStatus === 'unread' ? 'primary' : 'outline-primary'}
            onClick={() => setFilterStatus('unread')}
          >
            Unread ({unreadCount})
          </Button>
          <Button
            variant={filterStatus === 'read' ? 'primary' : 'outline-primary'}
            onClick={() => setFilterStatus('read')}
          >
            Read ({readCount})
          </Button>
        </ButtonGroup>
      </div>

      {loading ? (
        <p>Loading messages...</p>
      ) : (
        <Row xs={1} md={2} className="g-4">
          {filteredContacts.length === 0 ? (
            <Col>
              <p>
                {filterStatus === 'unread' 
                  ? 'No unread messages' 
                  : filterStatus === 'read'
                    ? 'No read messages'
                    : 'No messages available'}
              </p>
            </Col>
          ) : (
            filteredContacts.map((contact) => (
              <Col key={contact.id}>
                <ContactMessageCard 
                  contact={contact} 
                  handleMarkAsRead={handleMarkAsRead} 
                  handleDelete={handleDelete} 
                />
              </Col>
            ))
          )}
        </Row>
      )}
    </div>
  );
};

export default ContactMessageList;