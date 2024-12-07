import React, { useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useSavedLocationsContext } from '../../contexts/SavedLocationsContext';
import { Link } from 'react-router-dom';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

const SavedLocations = () => {
  const { currentUser } = useCurrentUser();
  const { 
    savedLocations, 
    loading, 
    error, 
    removeSavedLocation,
    fetchSavedLocations 
  } = useSavedLocationsContext();

  useEffect(() => {
    if (currentUser) {
      fetchSavedLocations();
    }
  }, [currentUser, fetchSavedLocations]);

  const handleUnsave = async (savedLocationId) => {
    try {
      const result = await removeSavedLocation(savedLocationId);
      if (result.success) {
        fetchSavedLocations();
      } else {
        console.error('Failed to remove location:', result.error);
      }
    } catch (err) {
      console.error('Error removing location:', err);
    }
  };

  if (loading) {
    return (
      <Card className="mb-3">
        <Card.Body>Loading saved locations...</Card.Body>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mb-3">
        <Card.Body className="text-danger">Error: {error}</Card.Body>
      </Card>
    );
  }

  if (!savedLocations?.length) {
    return (
      <Card className="mb-3">
        <Card.Body className="text-center text-muted">
          <p>You haven't saved any locations yet.</p>
          <Link to="/" className="btn btn-primary">
            Browse Locations
          </Link>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      {savedLocations.map((saved) => (
        <Card key={saved.id} className="mb-3">
          <Card.Body>
            <Row className="align-items-center">
              <Col xs={12} md={4}>
                {saved.location_image && (
                  <img
                    src={saved.location_image}
                    alt={saved.location_name}
                    className="img-fluid rounded"
                    style={{ maxHeight: '150px', width: '100%', objectFit: 'cover' }}
                  />
                )}
              </Col>
              <Col xs={12} md={8}>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <Card.Title>{saved.location_name || 'Unnamed Location'}</Card.Title>
                    <Card.Text className="text-muted">
                      Saved on: {new Date(saved.created_at).toLocaleDateString()}
                    </Card.Text>
                  </div>
                  <div>
                    <Link 
                      to={`/locations/${saved.location}`} 
                      className="btn btn-outline-primary me-2"
                    >
                      View
                    </Link>
                    <Button
                      variant="outline-danger"
                      onClick={() => handleUnsave(saved.id)}
                    >
                      Unsave
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default SavedLocations;