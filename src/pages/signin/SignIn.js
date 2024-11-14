import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = signInData;

  const [errors, setErrors] = useState({})

  const navigate = useNavigate()

  const handleChange = (e) => {
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('dj-rest-auth/login/', signInData)
      navigate("/");
    } catch (error) {
      setErrors(error.response?.data)
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            onChange={handleChange}
            value={username}
            type="text"
            placeholder="Username"
          />
        </Form.Group>
        {errors.username?.map((message, idx) => 
          <Alert variant="warning" key={idx}>{message}</Alert>
        )}
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            onChange={handleChange}
            value={password}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        {errors.password?.map((message, idx) => 
          <Alert variant="warning" key={idx}>{message}</Alert>
        )}
        <Button variant="primary" type="submit">
          Sign In
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

export default SignIn;