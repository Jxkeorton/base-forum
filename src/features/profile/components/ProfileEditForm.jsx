import React, { useState, useRef, useEffect } from 'react';
import { Form, Button, Alert, Image, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { useProfileContext } from '../context/ProfileContext';

const ProfileEditForm = ({ username, noOfBaseJumps, closeModal, src }) => {
  const { id } = useParams();
  const { updateProfile, profile } = useProfileContext();
  const [profileData, setProfileData] = useState({
    name: username || '',
    no_of_base_jumps: noOfBaseJumps || '',
    image: src || '',
  });
  const { name, no_of_base_jumps, image } = profileData;

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const imageFile = useRef();

  useEffect(() => {
    if (profile) {
      setProfileData({
        name: profile.name || '',
        no_of_base_jumps: profile.no_of_base_jumps || '',
        image: profile.image || '',
      });
    }
  }, [profile]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setProfileData({
        ...profileData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const formData = new FormData();
      
      if (profileData.name !== profile?.owner) {
        formData.append('name', profileData.name);
      }
      
      if (profileData.no_of_base_jumps !== profile?.no_of_base_jumps) {
        formData.append('no_of_base_jumps', profileData.no_of_base_jumps);
      }

      if (imageFile?.current?.files[0]) {
        formData.append('image', imageFile.current.files[0]);
      }

      const { success, error } = await updateProfile(formData, id);
      
      if (success) {
        closeModal();
      } else {
        setErrors(error || { general: 'Update failed' });
      }
    } catch (err) {
      console.error('Error details:', err);
      setErrors({ general: 'An error occurred while updating the profile' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="py-3">
      <Form onSubmit={handleSubmit}>
        {errors.general && (
          <Alert variant="warning">
            {errors.general}
          </Alert>
        )}

        <Form.Group className="mb-3 text-center">
          {image && (
            <figure className="d-flex justify-content-center">
              <Image
                className="mb-3"
                src={image}
                roundedCircle
                fluid
                style={{ maxWidth: '150px', height: '150px', objectFit: 'cover' }}
              />
            </figure>
          )}
          {errors?.image?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
          <Form.Label htmlFor="image-upload" className="btn btn-secondary mt-2">
            Change Image
          </Form.Label>
          <Form.Control
            id="image-upload"
            type="file"
            ref={imageFile}
            accept="image/*"
            onChange={handleImageChange}
            className="d-none"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="name">Name</Form.Label>
          <Form.Control
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            maxLength={50}
          />
          {errors?.name?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="no_of_base_jumps">Base Jumps</Form.Label>
          <Form.Control
            id="no_of_base_jumps"
            type="number"
            name="no_of_base_jumps"
            value={no_of_base_jumps}
            onChange={handleChange}
            min={0}
          />
          {errors?.no_of_base_jumps?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Form.Group>

        <div className="d-flex justify-content-between">
          <Button 
            variant="secondary" 
            onClick={closeModal}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default ProfileEditForm;