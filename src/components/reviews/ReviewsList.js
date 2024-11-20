import React, { useState, useEffect } from 'react';
import { axiosReq, axiosRes } from '../../api/axiosDefault';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Review from './Review';
import ConfirmationModal from '../ui/ConfirmationModal';

const ReviewsList = ({ locationId }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);

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
        console.error('Error fetching reviews:', err);
        setError('Failed to fetch reviews');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [locationId, currentUser?.username]);

  const handleDeleteReview = async (reviewId) => {
    try {
      await axiosRes.delete(`/reviews/${reviewId}/`);
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.id !== reviewId)
      );
      setShowModal(false);
    } catch (err) {
      console.error('Error deleting review:', err);
      setError('Failed to delete review');
    }
  };

  const openDeleteModal = (reviewId) => {
    setReviewToDelete(reviewId);
    setShowModal(true);
  };

  const closeDeleteModal = () => {
    setShowModal(false);
    setReviewToDelete(null);
  };

  return (
    <div>
      <h2>Reviews</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          {reviews.map((review) => (
            <Review
              key={review.id}
              review={review}
              onEdit={() => {}}
              onDelete={() => openDeleteModal(review.id)}
            />
          ))}
        </div>
      )}
      {showModal && (
        <ConfirmationModal
          show={showModal}
          handleClose={closeDeleteModal}
          handleDelete={() => handleDeleteReview(reviewToDelete)}
        />
      )}
    </div>
  );
};

export default ReviewsList;