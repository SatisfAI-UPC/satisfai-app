// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import { fetchReviewsByCustomerId, updateReview, deleteReview } from "../services/ReviewService";
import ReviewCard from "../components/ReviewCard";
import { Skeleton } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const CustomerReviews = () => {
  const user = useSelector((state) => state.auth.user);
  const queryClient = useQueryClient();

  const {
    status: reviewsStatus,
    error: reviewsError,
    data: reviews = [],
  } = useQuery({
    queryKey: ["reviews", user.id],
    queryFn: () => fetchReviewsByCustomerId(user.id),
    enabled: !!user.id,
  });

  const handleReviewUpdate = async (reviewId: number, updatedData: { description: string; grade: number }) => {
    try {
      await updateReview(reviewId, updatedData);

      queryClient.setQueryData(["reviews", user.id], (oldReviews: any) =>
          oldReviews.map((review: any) =>
              review.id === reviewId ? { ...review, ...updatedData } : review
          )
      );

      toast.success("Review updated successfully");
    } catch (error) {
      toast.error("Error updating the review");
    }
  };

  const handleReviewDelete = async (reviewId: number) => {
    try {
      await deleteReview(reviewId);

      queryClient.setQueryData(["reviews", user.id], (oldReviews: any) =>
          oldReviews.filter((review: any) => review.id !== reviewId)
      );

      toast.success("Review deleted successfully");
    } catch (error) {
      toast.error("Error deleting the review");
    }
  };

  return (
      <div className="w-full max-w-[800px] mx-auto p-4">
        <ToastContainer position="top-right" autoClose={3000} />
        <h1 className="text-2xl font-bold mb-4">My Reviews</h1>
        {reviewsStatus === "loading" ? (
            <Skeleton className="w-full h-[200px] rounded-lg" />
        ) : reviewsStatus === "error" ? (
            <p className="text-red-500">Error fetching reviews: {reviewsError?.message}</p>
        ) : reviews.length === 0 ? (
            <p>No reviews available</p>
        ) : (
            reviews.map((review) => (
                <ReviewCard
                    key={review.id}
                    review={review}
                    onUpdate={handleReviewUpdate}
                    onDelete={handleReviewDelete}
                />
            ))
        )}
      </div>
  );
};

export default CustomerReviews;
