import React, { useState, useEffect } from 'react';
import { Spinner, Container } from 'react-bootstrap';
import { useParams } from 'react-router';

import { axiosReq } from '../../../shared/api/axiosDefault.js';
import ReviewsList from '../../reviews/components/ReviewsList.jsx';
import DetailsCard from '../components/DetailsCard.jsx';


const LocationDetails = () => {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleMount = async () => {
      try {
        setIsLoading(true);
        const [{ data: location }] = await Promise.all([
          axiosReq.get(`/locations/${id}/`),
        ]);
        setLocation(location);
      } catch (err) {
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    handleMount();
  }, [id]);

  if (!location && !isLoading) {
    return <p>Location not found!</p>;
  }

  return (
    <>
      {isLoading ? (
        <Container
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: '100px' }}
        >
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Container>
      ) : (
        <div>
          <DetailsCard location={location} />
          <ReviewsList filter={{ location__name: location.name, ordering: '-created_at' }} />
        </div>
      )}
    </>
  );
};

export default LocationDetails;
