import React, { useEffect, useState } from 'react';
import { useReviewsContext } from '../../contexts/ReviewsContext';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useModal } from '../../contexts/ReviewModalContext';
import Review from '../reviews/Review';
import { Spinner, Alert } from 'react-bootstrap';
import ConfirmationModal from '../ui/ConfirmationModal';

const UserReviews = () => {
  const [showModal, setShowModal] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  
  const { reviews, loading, error, fetchReviews, deleteReview } = useReviewsContext();
  const { openEditModal } = useModal();
  const currentUser = useCurrentUser();

  useEffect(() => {
    if (currentUser?.username) {
      fetchReviews({
        username: currentUser.username,
        ordering: '-created_at'
      });
    }
  }, [currentUser?.username, fetchReviews]);

  const handleDeleteReview = async (reviewId) => {
    const { success } = await deleteReview(reviewId);
    if (success) {
      setShowModal(false);
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

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        Error loading reviews: {error}
      </Alert>
    );
  }

  if (!reviews?.length) {
    return (
      <Alert variant="info">
        You haven't written any reviews yet.
      </Alert>
    );
  }

  return (
    <>
      <div className="reviews-container">
        {reviews.map((review) => (
          <Review
            key={review.id}
            review={review}
            onEdit={() => openEditModal(review)}
            onDelete={() => openDeleteModal(review.id)}
          />
        ))}
      </div>

      <ConfirmationModal
        show={showModal}
        handleClose={closeDeleteModal}
        handleAction={() => handleDeleteReview(reviewToDelete)}
        title="Delete Review"
        bodyText="Are you sure you want to delete this review? This action cannot be undone."
        actionLabel="Delete"
        cancelLabel="Cancel"
      />
    </>
  );
};

export default UserReviews;