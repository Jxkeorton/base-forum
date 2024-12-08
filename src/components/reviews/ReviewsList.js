import React, { useState, useEffect } from 'react';
import { useReviewsContext } from '../../contexts/ReviewsContext';
import Review from './Review';
import ConfirmationModal from '../ui/ConfirmationModal';
import { useModal } from '../../contexts/ReviewModalContext';

const ReviewsList = ({ filter = {} }) => {
  const { 
    reviews,
    loading, 
    error, 
    fetchReviews, 
    deleteReview 
  } = useReviewsContext();
  
  const [showModal, setShowModal] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  const { openEditModal } = useModal();

  useEffect(() => {
      fetchReviews(filter);
  }, [fetchReviews, filter]);

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

  return (
    <div>
      <h2>Reviews</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          {reviews?.length === 0 ? (
            <p>No reviews yet!</p>
          ) : (
            reviews?.map((review) => (
              <Review
                key={review.id}
                review={review}
                onEdit={() => openEditModal(review)}
                onDelete={() => openDeleteModal(review.id)}
              />
            ))
          )}
        </div>
      )}
      {showModal && (
        <ConfirmationModal
          show={showModal}
          handleClose={closeDeleteModal}
          handleAction={() => handleDeleteReview(reviewToDelete)}
          title="Confirm Delete"
          bodyText="Are you sure you want to delete this review? This action cannot be undone."
          actionLabel="Delete"
          cancelLabel="Cancel"
        />
      )}
    </div>
  );
};

export default ReviewsList;