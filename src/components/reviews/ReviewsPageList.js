import React, { useState, useEffect } from "react";
import { axiosReq, axiosRes } from "../../api/axiosDefault";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Review from "./Review";
import { Link } from "react-router-dom";
import { useModal } from "../../contexts/ReviewModalContext";
import ConfirmationModal from "../ui/ConfirmationModal";

const ReviewsPageList = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  const currentUser = useCurrentUser();

  const { openEditModal } = useModal();

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const { data } = await axiosReq.get("/reviews/?ordering=-created_at"); // Fetch most recent reviews
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
  }, [currentUser?.username]);

  const handleDeleteReview = async (reviewId) => {
    try {
      await axiosRes.delete(`/reviews/${reviewId}/`);
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.id !== reviewId)
      );
      setShowModal(false);
    } catch (err) {
      console.error("Error deleting review:", err);
      setError("Failed to delete review");
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
      {isLoading ? (
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