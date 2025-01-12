import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { useCurrentUser } from '../context/CurrentUserContext';

const SignUp = () => {
  const { signUp } = useCurrentUser();
  const [signUpData, setSignUpData] = useState({
    username: '',
    password1: '',
    password2: '',
  });
  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { success, errors } = await signUp(signUpData);
      if (success) {
        navigate('/');
      } else {
        setErrors(errors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    {
      icon: 'fa-solid fa-heart',
      text: 'Save your favorite BASE jumping locations for quick access',
    },
    {
      icon: 'fa-solid fa-comment',
      text: 'Share your experiences by writing reviews for locations',
    },
    {
      icon: 'fa-solid fa-user',
      text: 'Create and customize your profile with jump count and avatar',
    },
    {
      icon: 'fa-solid fa-triangle-exclamation',
      text: 'Report hazards to keep the community safe',
    },
  ];

  return (
    <Container className="h-100">
      <Row className="justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
        <Col md={8} lg={6}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4">Create Account</h2>
              
              <div className="mb-4">
                <h5 className="text-center mb-3">Join our community:</h5>
                <Row xs={1} md={2} className="g-3 mb-4">
                  {features.map((feature, index) => (
                    <Col key={index}>
                      <div className="d-flex align-items-start">
                        <i className={`${feature.icon} me-2 mt-1 text-primary`}></i>
                        <p className="mb-0">{feature.text}</p>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    name="username"
                    onChange={handleChange}
                    value={username}
                    type="text"
                    placeholder="Choose a username"
                  />
                </Form.Group>
                {errors.username?.map((message, idx) => 
                  <Alert variant="warning" key={idx}>{message}</Alert>,
                )}
                <Form.Group className="mb-3" controlId="password1">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password1"
                    onChange={handleChange}
                    value={password1}
                    type="password"
                    placeholder="Choose a password"
                  />
                </Form.Group>
                {errors.password1?.map((message, idx) => 
                  <Alert variant="warning" key={idx}>{message}</Alert>,
                )}
                <Form.Group className="mb-3" controlId="password2">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    name="password2"
                    onChange={handleChange}
                    value={password2}
                    type="password"
                    placeholder="Confirm your password"
                  />
                </Form.Group>
                {errors.password2?.map((message, idx) => 
                  <Alert variant="warning" key={idx}>{message}</Alert>,
                )}
                <Button 
                  variant="primary" 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-100"
                >
                  {isSubmitting ? 'Creating Account...' : 'Sign Up'}
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

export default SignUp;