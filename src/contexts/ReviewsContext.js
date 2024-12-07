import React, { createContext, useContext, useState, useCallback } from "react";
import { axiosReq } from "../api/axiosDefault";
import { useCurrentUser } from "./CurrentUserContext";
import toast from "react-hot-toast";

const ReviewsContext = createContext();

export const useReviewsContext = () => {
  const context = useContext(ReviewsContext);
  if (context === undefined) {
    throw new Error("useReviews must be used within a ReviewsProvider");
  }
  return context;
};

export const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState({
    results: [],
    count: 0,
    next: null,
    previous: null,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useCurrentUser();

  const fetchReviews = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams();
      if (filters.locationName) {
        queryParams.append("location__name", filters.locationName);
      }
      if (filters.username) {
        queryParams.append("owner__username", filters.username);
      }
      if (filters.ordering) {
        queryParams.append("ordering", filters.ordering);
      }
      if (filters.search) {
        queryParams.append("search", filters.search);
      }

      const { data } = await axiosReq.get(
        `/reviews/${queryParams.toString() ? `?${queryParams.toString()}` : ""}`
      );
      setReviews(data);
      return { success: true, data };
    } catch (err) {
      const errorMessage = err.response?.data || "Failed to fetch reviews";
      setError(errorMessage);
      toast.error("Unable to load reviews");
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const createReview = useCallback(
    async (reviewData) => {
      if (!currentUser) {
        toast.error("Please sign in to post a review");
        return { success: false, error: "User not authenticated" };
      }

      const loadingToast = toast.loading("Posting review...");

      try {
        setLoading(true);
        const { data } = await axiosReq.post("/reviews/", reviewData);
        setReviews((prevState) => ({
          ...prevState,
          results: [data, ...prevState.results],
          count: prevState.count + 1,
        }));
        toast.dismiss(loadingToast);
        toast.success("Review posted successfully");
        return { success: true, data };
      } catch (err) {
        toast.dismiss(loadingToast);
        const errorMessage = err.response?.data || "Failed to post review";
        toast.error(errorMessage);
        return {
          success: false,
          error: errorMessage,
        };
      } finally {
        setLoading(false);
      }
    },
    [currentUser]
  );

  const updateReview = useCallback(
    async (reviewId, reviewData) => {
      if (!currentUser) {
        toast.error("Please sign in to update this review");
        return { success: false, error: "User not authenticated" };
      }

      const loadingToast = toast.loading("Updating review...");

      try {
        setLoading(true);
        const { data } = await axiosReq.put(
          `/reviews/${reviewId}/`,
          reviewData
        );
        setReviews((prevState) => ({
          ...prevState,
          results: prevState.results.map((review) =>
            review.id === reviewId ? data : review
          ),
        }));
        toast.dismiss(loadingToast);
        toast.success("Review updated successfully");
        return { success: true, data };
      } catch (err) {
        toast.dismiss(loadingToast);
        const errorMessage = err.response?.data || "Failed to update review";
        toast.error(errorMessage);
        return {
          success: false,
          error: errorMessage,
        };
      } finally {
        setLoading(false);
      }
    },
    [currentUser]
  );

  const deleteReview = useCallback(
    async (reviewId) => {
      if (!currentUser) {
        toast.error("Please sign in to delete this review");
        return { success: false, error: "User not authenticated" };
      }

      const loadingToast = toast.loading("Deleting review...");

      try {
        setLoading(true);
        await axiosReq.delete(`/reviews/${reviewId}/`);
        setReviews((prevState) => ({
          ...prevState,
          results: prevState.results.filter((review) => review.id !== reviewId),
          count: prevState.count - 1,
        }));
        toast.dismiss(loadingToast);
        toast.success("Review deleted successfully");
        return { success: true };
      } catch (err) {
        toast.dismiss(loadingToast);
        const errorMessage = err.response?.data || "Failed to delete review";
        toast.error(errorMessage);
        return {
          success: false,
          error: errorMessage
        };
      } finally {
        setLoading(false);
      }
    },
    [currentUser]
  );

  const contextValue = {
    reviews: reviews.results,
    setReviews,
    error,
    loading,
    fetchReviews,
    createReview,
    updateReview,
    deleteReview,
  };

  return (
    <ReviewsContext.Provider value={contextValue}>
      {children}
    </ReviewsContext.Provider>
  );
};
