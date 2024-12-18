import React, { useState, useEffect } from "react";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import Select from "react-select";
import { axiosReq } from "../../api/axiosDefault";
import { useReviewsContext } from "../../contexts/ReviewsContext.jsx";

const ReviewForm = ({ locationId, review = null, onSuccess }) => {
  const [subject, setSubject] = useState(review?.subject || "");
  const [content, setContent] = useState(review?.content || "");
  const [hazard, setHazard] = useState(review?.hazard || false);
  const [location, setLocation] = useState(review ? { value: review.location, label: review.location_name } : null);
  const [locations, setLocations] = useState([]);
  
  const { loading: isLoading, error, createReview, updateReview, setLoading } = useReviewsContext();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
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
        console.error("Unable to fetch locations.");
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, [locationId, review, setLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!location?.value) {
      return;
    }
  
    const reviewData = {
      location: location.value,
      subject,
      content,
      hazard,
    };
  
    const { success: submitSuccess } = review 
      ? await updateReview(review.id, reviewData)
      : await createReview(reviewData);
    
    if (submitSuccess) {
      setSuccess(true);
      setSubject("");
      setContent("");
      setHazard(false);
      setLocation(null);
      if (onSuccess) {
        onSuccess();
      }
    }
  };

  return (
    <div>
      <h2>{review ? "Edit Review" : "Submit a Review"}</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">
        {review ? "Review updated successfully!" : "Review submitted successfully!"}
      </Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="subject">Subject</Form.Label>
          <Form.Control
            type="text"
            id="subject"
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            maxLength={100}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="content">Content</Form.Label>
          <Form.Control
            as="textarea"
            id="content"
            rows={4}
            placeholder="Write your review"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="location">Location</Form.Label>
          <Select
            aria-label="location"
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