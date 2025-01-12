import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Spinner } from 'react-bootstrap';

import ReviewsList from '../components/ReviewsList.jsx';
import { useReviewsContext } from '../context/ReviewsContext.jsx';

const Reviews = () => {
  const { reviews, loading, error, fetchReviews } = useReviewsContext();
  const [stats, setStats] = useState({ total: 0, hazards: 0, locations: 0 });

  useEffect(() => {
    const filter = { ordering: '-created_at' };
    fetchReviews(filter);
  }, [fetchReviews]);

  useEffect(() => {
    if (!loading && reviews) {
      const locationsSet = new Set();
      const newStats = reviews.reduce((acc, review) => {
        if (review.hazard) acc.hazards++;
        locationsSet.add(review.location);
        return acc;
      }, { 
        total: reviews.length,
        hazards: 0,
        locations: locationsSet,
      });

      setStats({
        total: newStats.total,
        hazards: newStats.hazards,
        locations: newStats.locations.size,
      });
    }
  }, [reviews, loading]);

  const StatCard = ({ title, value, icon }) => (
    <Col md={4}>
      <Card className="text-center mb-4">
        <Card.Body>
          <div className="d-flex align-items-center justify-content-center mb-2">
            <i className={`${icon} me-2 text-primary`} style={{ fontSize: '1.5rem' }}></i>
            <h4 className="mb-0">
              {loading ? (
                <Spinner animation="border" size="sm" role="status" />
              ) : (
                value
              )}
            </h4>
          </div>
          <Card.Text className="text-muted">{title}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-center mb-4">Recent Community Reviews</h1>
        <Row>
          <StatCard 
            title="Total Reviews"
            value={stats.total}
            icon="fa-solid fa-comments"
          />
          <StatCard 
            title="Locations Reviewed"
            value={stats.locations}
            icon="fa-solid fa-location-dot"
          />
          <StatCard 
            title="Hazard Reports"
            value={stats.hazards}
            icon="fa-solid fa-triangle-exclamation"
          />
        </Row>
      </div>

      <ReviewsList filter={{ ordering: '-created_at' }} alreadyFetched={true} />
    </div>
  );
};

export default Reviews;