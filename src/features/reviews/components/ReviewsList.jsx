import React, { useState, useEffect } from 'react';

import ConfirmationModal from '../../../shared/components/ConfirmationModal.jsx';
import { useModal } from '../context/ReviewModalContext.jsx';
import { useReviewsContext } from '../context/ReviewsContext.jsx';

import Review from './Review.jsx';

const ReviewsList = ({ filter = {}, alreadyFetched = false }) => {
  const { 
    reviews,
    loading, 
    error, 
    fetchReviews, 
    deleteReview, 
  } = useReviewsContext();
  
  const [showModal, setShowModal] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  const { openEditModal } = useModal();

  useEffect(() => {
    // Only fetch if not already fetched by parent
    if (!alreadyFetched) {
      fetchReviews(filter);
    }
  }, [fetchReviews, filter, alreadyFetched]);

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