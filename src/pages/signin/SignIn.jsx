import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext.jsx";

const SignIn = () => {
  const { signIn } = useCurrentUser();
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = signInData;

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { success, errors } = await signIn(signInData);
      if (success) {
        navigate("/");
      } else {
        setErrors(errors);
      }
    } finally {
      setIsSubmitting(false);
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
            maxLength={50}
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
        <Button 
          variant="primary" 
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing in...' : 'Sign In'}
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