import React, { useState, useRef } from "react";
import { Form, Button, Alert, Image, Container } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefault";
import { useParams } from "react-router-dom";

const ProfileEditForm = ({ username, noOfBaseJumps, closeModal, updateProfile }) => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    username: username || "",
    noOfBaseJumps: noOfBaseJumps || "",
    image: "",
  });

  const [errors, setErrors] = useState({});
  const imageFile = useRef();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formToSend = new FormData();

    // Only append fields that have values
    if (formData.username) {
      formToSend.append("username", formData.username);
    }
    
    if (formData.noOfBaseJumps !== "") {
      formToSend.append("no_of_base_jumps", formData.noOfBaseJumps);
    }

    if (imageFile?.current?.files[0]) {
      formToSend.append("image", imageFile.current.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profile/${id}/`, formToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      updateProfile(data);
      closeModal();
    } catch (err) {
      console.error("Error details:", err.response?.data);
      setErrors(err.response?.data);
    }
  };

  return (
    <Container className="py-3">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 text-center">
          {formData.image && (
            <Image
              src={formData.image}
              roundedCircle
              fluid
              style={{ maxWidth: "150px" }}
            />
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
            className="d-none"
            onChange={(e) => {
              if (e.target.files.length) {
                setFormData({
                  ...formData,
                  image: URL.createObjectURL(e.target.files[0]),
                });
              }
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors?.username?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Base Jumps</Form.Label>
          <Form.Control
            type="number"
            name="noOfBaseJumps"
            value={formData.noOfBaseJumps}
            onChange={handleChange}
          />
          {errors?.no_of_base_jumps?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Form.Group>

        <div className="d-flex justify-content-between">
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Save Changes
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default ProfileEditForm;