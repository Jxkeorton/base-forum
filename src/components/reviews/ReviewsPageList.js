import React, { useState, useEffect } from "react";
import { useReviewsContext } from "../../contexts/ReviewsContext";
import Review from "./Review";
import { Link } from "react-router-dom";
import { useModal } from "../../contexts/ReviewModalContext";
import ConfirmationModal from "../ui/ConfirmationModal";

const ReviewsPageList = () => {
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
    fetchReviews({ ordering: '-created_at' });
  }, [fetchReviews]);

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
      <h2 style={{ marginBottom: "20px" }}>Most Recent Reviews</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          {reviews.length === 0 ? (
            <p>No reviews yet!</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="review-card">
                <p>
                  <strong>Location: </strong>
                  <Link
                    to={`/locations/${review.location}`}
                    style={{ color: "blue", cursor: "pointer" }}
                  >
                    {review.location_name}
                  </Link>
                </p>
                <Review
                  review={review}
                  onEdit={() => openEditModal(review)}
                  onDelete={() => openDeleteModal(review.id)}
                />
              </div>
            ))
          )}
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

export default ReviewsPageList;