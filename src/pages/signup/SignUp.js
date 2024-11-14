import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import axios from 'axios'

const SignUp = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({})

  const navigate = useNavigate()

  const handleChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('dj-rest-auth/registration/', signUpData)
      navigate("/sign-in");
    } catch (error) {
      setErrors(error.response?.data)
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name = "username"
            onChange={handleChange}
            value={username}
            type="text"
            placeholder="Username"
          />
        </Form.Group>
        {errors.username?.map((message, idx) => 
          <Alert variant="warning" key={idx}>{message}</Alert>
        )}
        <Form.Group className="mb-3" controlId="password1">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name = "password1"
            onChange={handleChange}
            value={password1}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        {errors.password1?.map((message, idx) => 
          <Alert variant="warning" key={idx}>{message}</Alert>
        )}
        <Form.Group className="mb-3" controlId="password2">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            name = "password2"
            onChange={handleChange}
            value={password2}
            type="password"
            placeholder="Password (again)"
          />
        </Form.Group>
        {errors.password2?.map((message, idx) => 
          <Alert variant="warning" key={idx}>{message}</Alert>
        )}
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
        {errors.non_field_errors?.map((message, idx) =>(
          <Alert key={idx} variant="warning" className="mt-3">
            {message}
          </Alert>
        ))}
      </Form>
    </Container>
  );
};

export default SignUp;