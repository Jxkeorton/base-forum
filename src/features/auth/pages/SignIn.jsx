import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { useCurrentUser } from '../context/CurrentUserContext';

const SignIn = () => {
  const { signIn } = useCurrentUser();
  const [signInData, setSignInData] = useState({
    username: '',
    password: '',
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
        navigate('/');
      } else {
        setErrors(errors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="h-100">
      <Row className="justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <Col md={6} lg={5}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4">Sign In</h2>
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
                  <Alert variant="warning" key={idx}>{message}</Alert>,
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
                  <Alert variant="warning" key={idx}>{message}</Alert>,
                )}
                <Button 
                  variant="primary" 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-100"
                >
                  {isSubmitting ? 'Signing in...' : 'Sign In'}
                </Button>
                {errors.non_field_errors?.map((message, idx) =>(
                  <Alert key={idx} variant="warning" className="mt-3">
                    {message}
                  </Alert>
                ))}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;