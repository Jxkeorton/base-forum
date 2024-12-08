import React, { useState, useEffect } from "react";
import { Card, Row, Col, Badge, Alert, Button } from "react-bootstrap";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useSavedLocationsContext } from "../../contexts/SavedLocationsContext";
import LocationMap from "../map/LocationMap";
import { useModal } from "../../contexts/ReviewModalContext";

const DetailsCard = ({ location }) => {
  const { currentUser } = useCurrentUser();
  const {
    saveLocation,
    removeSavedLocation,
    isLocationSaved,
    getSavedLocationId,
    fetchSavedLocations,
  } = useSavedLocationsContext();

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { showModal } = useModal();

  useEffect(() => {
    if (currentUser?.pk) {
      fetchSavedLocations();
    }
  }, [currentUser, fetchSavedLocations]);

  // Check if this location is saved
  const saved = isLocationSaved(location.id);

  // Function to show alert
  const showAlert = (message, variant) => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 3000);
  };

  // Function to handle the copy action
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showAlert("Coordinates copied to clipboard!", "success");
      })
      .catch((err) => {
        showAlert("Failed to copy coordinates", "danger");
        console.error(err);
      });
  };

  // Function to handle save/unsave
  const handleSaveToggle = async () => {
    if (isSaving) return;

    setIsSaving(true);
    try {
      if (saved) {
        const savedLocationId = getSavedLocationId(location.id);
        const result = await removeSavedLocation(savedLocationId);
        if (result.success) {
          showAlert("Location removed from saved locations", "success");
        } else {
          showAlert(result.error || "Failed to remove location", "danger");
        }
      } else {
        const result = await saveLocation(location.id);
        if (result.success) {
          showAlert("Location saved successfully", "success");
        } else {
          showAlert(result.error || "Failed to save location", "danger");
        }
      }
    } catch (error) {
      showAlert("An error occurred", "danger");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="mb-4 shadow-sm">
      <Row>
        <Col md={5}>
          <Card.Img
            src={location.image}
            alt={location.name}
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
        </Col>
        <Col md={7}>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <Card.Title>{location.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Opened by: {location.opened_by}
                </Card.Subtitle>
              </div>
                {currentUser?.pk && (
                  <div className="d-flex flex-column gap-2">
                    <Button
                      variant={saved ? "outline-danger" : "outline-primary"}
                      onClick={handleSaveToggle}
                      disabled={isSaving}
                      className="d-flex align-items-center justify-content-center gap-2"
                    >
                      <i className={`fa${saved ? "s" : "r"} fa-heart`}></i>
                      {isSaving
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
                      disabled={isSaving}
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
              {new Date(location.date_opened).toLocaleDateString()}
            </Card.Text>

            <Card.Text>
              <Badge bg="primary" className="me-2">
                {location.country}
              </Badge>
              <Badge bg="info" className="me-2">
                Rock Drop: {location.rock_drop} ft
              </Badge>
              <Badge bg="info">Total Height: {location.total_height} ft</Badge>
            </Card.Text>

            <Card.Text>
              <strong>Access:</strong> {location.access}
            </Card.Text>

            <Card.Text>
              <strong>Coordinates:</strong>
              <span>
                {" "}
                {location.latitude}, {location.longitude}
              </span>
              <i
                className="fa fa-clipboard"
                style={{ cursor: "pointer", marginLeft: "8px" }}
                onClick={() =>
                  copyToClipboard(`${location.latitude}, ${location.longitude}`)
                }
                title="Copy coordinates"
              />
            </Card.Text>

            <Card.Text>
              <strong>Cliff Aspect:</strong> {location.cliff_aspect}
            </Card.Text>

            <LocationMap
              latitude={location.latitude}
              longitude={location.longitude}
              zoom={9}
              title={location.name}
            />
          </Card.Body>
        </Col>
      </Row>

      {alertVisible && (
        <Alert variant={alertVariant} className="mt-3">
          {alertMessage}
        </Alert>
      )}
    </Card>
  );
};

export default DetailsCard;
