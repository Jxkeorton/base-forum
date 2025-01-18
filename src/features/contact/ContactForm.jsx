import React, {useState} from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';

import { axiosReq } from '../../shared/api/axiosDefault';
import { useCustomToast } from '../../shared/contexts/ToastContext';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const showToast = useCustomToast();

    const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
    };

    const validateForm = () => {
    const newErrors = {};
    // Name validation
    if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
    } else if (formData.name.trim().length > 100) {  // Matches Django model max_length
        newErrors.name = 'Name cannot exceed 100 characters';
    } else if (!/^[a-zA-Z\s'-]+$/.test(formData.name.trim())) {
        newErrors.name = 'Name can only contain letters, spaces, hyphens and apostrophes';
    }

    // Email validation
    if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
    } else if (formData.email.length > 254) {  // Standard email length limit
        newErrors.email = 'Email is too long';
    }

    // Message validation
    if (!formData.message.trim()) {
        newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
        newErrors.message = 'Message must be at least 10 characters long';
    } else if (formData.message.length > 1000) {  // Matches Django model max_length
        newErrors.message = 'Message cannot exceed 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
        await axiosReq.post('/contact/', formData );
        
        showToast.success('Message sent successfully!');
        setFormData({
        name: '',
        email: '',
        message: '',
        });
    } catch (error) {
        showToast.error('Failed to send message. Please try again.');
    } finally {
        setIsSubmitting(false);
    }
    };
    
  return (
    <>
        <h5 className="text-white mb-3">Contact Us</h5>
        <Form onSubmit={handleSubmit}>
            <Row>
            <Col md={6}>
                <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.name}
                </Form.Control.Feedback>
                </Form.Group>
            </Col>
            <Col md={6}>
                <Form.Group className="mb-3">
                <Form.Control
                    type="email"
                    placeholder="Your Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.email}
                </Form.Control.Feedback>
                </Form.Group>
            </Col>
            </Row>
            <Form.Group className="mb-3">
            <Form.Control
                as="textarea"
                rows={3}
                placeholder="Your Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                isInvalid={!!errors.message}
            />
            <Form.Control.Feedback type="invalid">
                {errors.message}
            </Form.Control.Feedback>
            </Form.Group>
            <Button 
            variant="primary" 
            type="submit"
            disabled={isSubmitting}
            >
            {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
        </Form>
    </>
  );
};

export default ContactForm;
