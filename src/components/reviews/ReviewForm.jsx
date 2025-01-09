import React, { useState, useEffect } from 'react';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import Select from 'react-select';

import { axiosReq } from '../../api/axiosDefault';
import { useReviewsContext } from '../../contexts/ReviewsContext.jsx';

const ReviewForm = ({ locationId, review = null, onSuccess }) => {
  const [subject, setSubject] = useState(review?.subject || '');
  const [content, setContent] = useState(review?.content || '');
  const [hazard, setHazard] = useState(review?.hazard || false);
  const [location, setLocation] = useState(review ? { value: review.location, label: review.location_name } : null);
  const [locations, setLocations] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  
  const { loading: isLoading, error, createReview, updateReview, setLoading } = useReviewsContext();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        const { data } = await axiosReq.get('/locations');
        const locationOptions = data.results.map((loc) => ({
          value: loc.id,
          label: loc.name,
        }));
        setLocations(locationOptions);

        if (locationId && !review) {
          const selectedLocation = locationOptions.find((loc) => loc.value === parseInt(locationId));
          setLocation(selectedLocation || null);
        }
      } catch (err) {
        console.error('Unable to fetch locations.');
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, [locationId, review, setLoading]);

  const validateForm = () => {
    const errors = {};
    if (!subject.trim()) errors.subject = 'Subject is required';
    if (!content.trim()) errors.content = 'Content is required';
    if (!location?.value) errors.location = 'Location is required';
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    const reviewData = {
      location: location.value,
      subject,
      content,
      hazard,
    };
  
    try {
      const { success: submitSuccess } = review
        ? await updateReview(review.id, reviewData)
        : await createReview(reviewData);

      if (submitSuccess) {
        setSuccess(true);
        setSubject('');
        setContent('');
        setHazard(false);
        setLocation(null);
        setValidationErrors({});
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (err) {
      console.error('Error submitting review:', err);
    }
  };

  return (
    <div>
      <h2>{review ? 'Edit Review' : 'Submit a Review'}</h2>
      {error && typeof error === 'string' && (
        <Alert variant="danger">{error}</Alert>
      )}
      {error && typeof error === 'object' && Object.entries(error).map(([key, messages]) => (
        Array.isArray(messages) ? 
          messages.map((message, idx) => (
            <Alert variant="danger" key={`${key}-${idx}`}>
              {`${key}: ${message}`}
            </Alert>
          )) :
          <Alert variant="danger" key={key}>
            {`${key}: ${messages}`}
          </Alert>
      ))}
      {success && <Alert variant="success">
        {review ? 'Review updated successfully!' : 'Review submitted successfully!'}
      </Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="subject">Subject</Form.Label>
          <Form.Control
            type="text"
            id="subject"
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            maxLength={100}
            isInvalid={!!validationErrors.subject}
          />
          {validationErrors.subject && (
            <Form.Control.Feedback type="invalid">
              {validationErrors.subject}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="content">Content</Form.Label>
          <Form.Control
            as="textarea"
            id="content"
            rows={4}
            placeholder="Write your review"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            isInvalid={!!validationErrors.content}
          />
          {validationErrors.content && (
            <Form.Control.Feedback type="invalid">
              {validationErrors.content}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="location">Location</Form.Label>
          <Select
            inputId="location"
            options={locations}
            value={location}
            onChange={setLocation}
            placeholder="Search for a location..."
            isClearable
            isSearchable
            className={validationErrors.location ? 'is-invalid' : ''}
          />
          {validationErrors.location && (
            <div className="invalid-feedback d-block">
              {validationErrors.location}
            </div>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="hazard">
          <Form.Check
            type="checkbox"
            label="Hazard Report"
            checked={hazard}
            onChange={(e) => setHazard(e.target.checked)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              {review ? 'Updating...' : 'Submitting...'}
            </>
          ) : (
            review ? 'Update Review' : 'Submit Review'
          )}
        </Button>
      </Form>
    </div>
  );
};

export default ReviewForm;