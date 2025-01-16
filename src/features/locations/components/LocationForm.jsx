import React, { useState, useEffect } from 'react';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';

const LocationForm = ({ location = null, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    opened_by: '',
    country: '',
    access: '',
    rock_drop: '',
    total_height: '',
    cliff_aspect: '',
    date_opened: '',
    latitude: '',
    longitude: '',
    image: '',
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const isEditMode = !!location;

  useEffect(() => {
    if (location) {
      setFormData({
        name: location.name || '',
        opened_by: location.opened_by || '',
        country: location.country || '',
        access: location.access || '',
        rock_drop: location.rock_drop?.toString() || '',
        total_height: location.total_height?.toString() || '',
        cliff_aspect: location.cliff_aspect || '',
        date_opened: location.date_opened || '',
        latitude: location.latitude?.toString() || '',
        longitude: location.longitude?.toString() || '',
        image: location.image || '',
      });
    }
  }, [location]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));

    if (validationErrors[id]) {
      setValidationErrors(prev => ({
        ...prev,
        [id]: '',
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name) errors.name = 'Location name is required';
    if (!formData.country) errors.country = 'Country is required';
    if (!formData.opened_by) errors.opened_by = 'First ascent by is required';
    
    if (formData.rock_drop) {
      const rockDrop = Number(formData.rock_drop);
      if (isNaN(rockDrop)) {
        errors.rock_drop = 'Rock drop must be a number';
      } else if (rockDrop < 0) {
        errors.rock_drop = 'Rock drop cannot be negative';
      }
    }
    if (formData.total_height) {
      const totalHeight = Number(formData.total_height);
      if (isNaN(totalHeight)) {
        errors.total_height = 'Total height must be a number';
      } else if (totalHeight < 0) {
        errors.total_height = 'Total height cannot be negative';
      }
    }
    if (formData.latitude && isNaN(Number(formData.latitude))) {
      errors.latitude = 'Latitude must be a number';
    }
    if (formData.longitude && isNaN(Number(formData.longitude))) {
      errors.longitude = 'Longitude must be a number';
    }

    // Date validation
    if (formData.date_opened && isNaN(Date.parse(formData.date_opened))) {
      errors.date_opened = 'Invalid date format';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    // Validate form
    if (!validateForm()) {
      return;
    }

    const submitData = {
      ...formData,
      rock_drop: formData.rock_drop ? Number(formData.rock_drop) : null,
      total_height: formData.total_height ? Number(formData.total_height) : null,
      latitude: formData.latitude ? Number(formData.latitude) : null,
      longitude: formData.longitude ? Number(formData.longitude) : null,
    };

    try {
      setIsSubmitting(true);
      await onSubmit(submitData);
    } catch (error) {
      setSubmitError(error.message || 'An error occurred while submitting the form');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>{isEditMode ? 'Edit Location' : 'Add New Location'}</h2>
      {submitError && (
        <Alert variant="danger" onClose={() => setSubmitError(null)} dismissible>
          {submitError}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="name">Location Name</Form.Label>
          <Form.Control
            type="text"
            id="name"
            placeholder="Enter Location Name"
            value={formData.name}
            onChange={handleChange}
            maxLength={255}
            isInvalid={!!validationErrors.name}
          />
          <Form.Control.Feedback type="invalid">
            {validationErrors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="opened_by">Opened by</Form.Label>
          <Form.Control
            type="text"
            id="opened_by"
            placeholder="Who first discovered/climbed this location?"
            value={formData.opened_by}
            onChange={handleChange}
            maxLength={100}
            isInvalid={!!validationErrors.opened_by}
          />
          <Form.Control.Feedback type="invalid">
            {validationErrors.opened_by}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="country">Country</Form.Label>
          <Form.Control
            type="text"
            id="country"
            placeholder="Enter Country"
            value={formData.country}
            onChange={handleChange}
            maxLength={100}
            isInvalid={!!validationErrors.country}
          />
          <Form.Control.Feedback type="invalid">
            {validationErrors.country}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="access">Access Details</Form.Label>
          <Form.Control
            type="text"
            id="access"
            placeholder="How to reach this location"
            value={formData.access}
            onChange={handleChange}
            maxLength={250}
            isInvalid={!!validationErrors.access}
          />
          <Form.Control.Feedback type="invalid">
            {validationErrors.access}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="date_opened">Date First Opened</Form.Label>
          <Form.Control
            type="date"
            id="date_opened"
            value={formData.date_opened}
            onChange={handleChange}
            isInvalid={!!validationErrors.date_opened}
          />
          <Form.Control.Feedback type="invalid">
            {validationErrors.date_opened}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="rock_drop">Rock Drop (feet)</Form.Label>
          <Form.Control
            type="number"
            id="rock_drop"
            placeholder="Height of the rock drop"
            value={formData.rock_drop}
            onChange={handleChange}
            isInvalid={!!validationErrors.rock_drop}
          />
          <Form.Control.Feedback type="invalid">
            {validationErrors.rock_drop}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="total_height">Total Height (feet)</Form.Label>
          <Form.Control
            type="number"
            id="total_height"
            placeholder="Total height of the location"
            value={formData.total_height}
            onChange={handleChange}
            isInvalid={!!validationErrors.total_height}
          />
          <Form.Control.Feedback type="invalid">
            {validationErrors.total_height}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="cliff_aspect">Cliff Aspect</Form.Label>
          <Form.Control
            type="text"
            id="cliff_aspect"
            placeholder="Compass direction of the cliff"
            value={formData.cliff_aspect}
            onChange={handleChange}
            maxLength={2}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="latitude">Latitude</Form.Label>
          <Form.Control
            type="number"
            id="latitude"
            placeholder="Latitude coordinate"
            step="any"
            value={formData.latitude}
            onChange={handleChange}
            isInvalid={!!validationErrors.latitude}
          />
          <Form.Control.Feedback type="invalid">
            {validationErrors.latitude}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="longitude">Longitude</Form.Label>
          <Form.Control
            type="number"
            id="longitude"
            placeholder="Longitude coordinate"
            step="any"
            value={formData.longitude}
            onChange={handleChange}
            isInvalid={!!validationErrors.longitude}
          />
          <Form.Control.Feedback type="invalid">
            {validationErrors.longitude}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="image">Image URL</Form.Label>
          <Form.Control
            type="url"
            id="image"
            placeholder="URL of location image"
            value={formData.image}
            onChange={handleChange}
          />
        </Form.Group>

        <Button 
          variant="primary" 
          type="submit" 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            isEditMode ? 'Update Location' : 'Add Location'
          )}
        </Button>
      </Form>
    </div>
  );
};

export default LocationForm;