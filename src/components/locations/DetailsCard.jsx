import React from "react";
import { Card, Row, Col, Badge, Button } from "react-bootstrap";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useLocationsContext } from "../../contexts/LocationsContext";
import LocationMap from "../map/LocationMap.jsx";
import toast from 'react-hot-toast';
import { useModal } from "../../contexts/ReviewModalContext";

const DetailsCard = ({ location }) => {
  const {
    id,
    image,
    name,
    opened_by,
    date_opened,
    country,
    rock_drop,
    total_height,
    access,
    latitude,
    longitude,
    cliff_aspect
  } = location;

  const { currentUser } = useCurrentUser();
  const {
    isLocationSaved,
    handleSaveToggle,
    loading
  } = useLocationsContext();

  const { showModal } = useModal();

  // Check if this location is saved
  const saved = isLocationSaved(id);

  // Function to handle the copy action
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success('Copied to clipboard');
      })
      .catch((err) => {
        toast.error('Failed to copy coordinates')
        console.error(err);
      });
  };

  return (
    <Card className="mb-4 shadow-sm">
      <Row>
        <Col md={5}>
          <Card.Img
            src={image}
            alt={name}
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
        </Col>
        <Col md={7}>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Opened by: {opened_by}
                </Card.Subtitle>
              </div>
                {currentUser?.pk && (
                  <div className="d-flex flex-column gap-2">
                    <Button
                      variant={saved ? "outline-danger" : "outline-primary"}
                      onClick={() => handleSaveToggle(id)}
                      disabled={loading}
                      className="d-flex align-items-center justify-content-center gap-2"
                    >
                      <i className={`fa${saved ? "s" : "r"} fa-heart`}></i>
                      {loading
                        ? saved
                          ? "Removing..."
                          : "Saving..."
                        : saved
                        ? "Saved"
                        : "Save"}
                    </Button>
                    <Button
                      variant="outline-primary"
                      onClick={showModal}
                      disabled={loading}
                      className="d-flex align-items-center justify-content-center gap-2"
                    >
                      <i className="far fa-comment"></i>
                      Add Review
                    </Button>
                  </div>
              )}
            </div>

            <Card.Text>
              <strong>Date opened:</strong>{" "}
              {new Date(date_opened).toLocaleDateString()}
            </Card.Text>

            <Card.Text>
              <Badge bg="primary" className="me-2">
                {country}
              </Badge>
              <Badge bg="info" className="me-2">
                Rock Drop: {rock_drop} ft
              </Badge>
              <Badge bg="info">Total Height: {total_height} ft</Badge>
            </Card.Text>

            <Card.Text>
              <strong>Access:</strong> {access}
            </Card.Text>

            <Card.Text>
              <strong>Coordinates:</strong>
              <span>
                {" "}
                {latitude}, {longitude}
              </span>
              <i
                className="fa fa-clipboard"
                style={{ cursor: "pointer", marginLeft: "8px" }}
                onClick={() =>
                  copyToClipboard(`${latitude}, ${longitude}`)
                }
                title="Copy coordinates"
              />
            </Card.Text>

            <Card.Text>
              <strong>Cliff Aspect:</strong> {cliff_aspect}
            </Card.Text>

            <LocationMap
              latitude={latitude}
              longitude={longitude}
              zoom={9}
              title={name}
            />
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default DetailsCard;
