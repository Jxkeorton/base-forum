import React, { useState, useEffect } from "react";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import Select from "react-select";
import { axiosReq } from "../../api/axiosDefault";

const ReviewForm = ({ locationId, review = null }) => {
  const [subject, setSubject] = useState(review?.subject || "");
  const [content, setContent] = useState(review?.content || "");
  const [hazard, setHazard] = useState(review?.hazard || false);

  const [location, setLocation] = useState(review ? { value: review.locationId, label: review.location_name } : null);
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoading(true);
      try {
        const { data } = await axiosReq.get("/locations");
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
        setError("Unable to fetch locations.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchLocations();
  }, [locationId, review]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!location || !location.value) {
      setError("Please select a location.");
      return;
    }
  
    const reviewData = {
      location: location.value,
      subject,
      content,
      hazard,
    };
  
    setIsLoading(true);
    setError(null);
    setSuccess(false);
  
    try {
      if (review) {
        const { data } = await axiosReq.put(`/reviews/${review.id}/`, reviewData);
        console.log('Review updated:', data);
      } else {
        const { data } = await axiosReq.post("/reviews/", reviewData);
        console.log('Review created:', data);
      }
      setSuccess(true);
      setSubject("");
      setContent("");
      setHazard(false);
      setLocation(null);
    } catch (err) {
      console.error('Error details:', err.response?.data);
      const errorMessage = err.response?.data?.location?.[0] || 
                          err.response?.data?.detail || 
                          "An error occurred while submitting your review.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <h2>{review ? "Edit Review" : "Submit a Review"}</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{review ? "Review updated successfully!" : "Review submitted successfully!"}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="subject">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="content">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Write your review"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="location">
          <Form.Label>Location</Form.Label>
          <Select
            options={locations}
            value={location}
            onChange={setLocation}
            placeholder="Search for a location..."
            isClearable
            isSearchable
            required
          />
        </Form.Group>

        <Form.Group controlId="hazard">
          <Form.Check
            type="checkbox"
            label="Hazard Report"
            checked={hazard}
            onChange={() => setHazard(!hazard)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? (
            <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
          ) : (
            review ? "Update Review" : "Submit Review"
          )}
        </Button>
      </Form>
    </div>
  );
};

export default ReviewForm;