import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import Avatar from "../ui/avatar/Avatar";

const ProfileCard = ({ username, src }) => {
  return (
    <Container className="d-flex align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="justify-content-center w-100">
        <Col md="auto">
          <Card style={{ width: '18rem', border: '1px solid #ddd', borderRadius: '10px' }}>
            <Card.Body className="text-center">
              <Avatar src={src} height={80} />
              <Card.Title className="mt-3">{username}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileCard;