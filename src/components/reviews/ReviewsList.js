import React, { useState, useEffect } from "react";
import { axiosReq } from "../../api/axiosDefault";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Review from "./Review";
import { Col, Spinner, Alert } from "react-bootstrap";

const ReviewsList = ({ locationId }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const { data } = await axiosReq.get(`/reviews/?location=${locationId}`);
        const reviewsWithIsOwner = data.results.map((review) => ({
          ...review,
          is_owner: review.owner === currentUser?.username,
        }));
        setReviews(reviewsWithIsOwner);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to fetch reviews");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [locationId, currentUser?.username]);

  const handleEditReview = async (review) => {
    // edit the review
  };

  const handleDeleteReview = async (reviewId) => {
    // delete the review
  };

  return (
    <>
      <h2 className="my-4">Reviews</h2>

      {/* Loading  */}
      {isLoading ? (
        <div className="d-flex justify-content-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <Alert variant="danger" className="my-4">
          {error}
        </Alert>
      ) : (
        <>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <Review
                review={review}
                onEdit={handleEditReview}
                onDelete={handleDeleteReview}
              />
            ))
          ) : (
            <Col className="text-center">
              <Alert variant="info">No reviews yet for this location.</Alert>
            </Col>
          )}
        </>
      )}
    </>
  );
};

export default ReviewsList;