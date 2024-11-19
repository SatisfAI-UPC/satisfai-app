import React, { useEffect, useState } from "react";
import { fetchReviewsByCustomerId } from "../services/ReviewService";
import { Review } from "../model/Review";
import ReviewCard from "../components/ReviewCard";
import { Skeleton } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";

const CustomerReviews = () => {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const customerId = 4; // Id harcodeado

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await fetchReviewsByCustomerId(customerId);
        setReviews(data);
      } catch (error) {
        toast.error("Error fetching reviews");
      }
    };
    loadReviews();
  }, [customerId]);

  const handleReviewUpdate = (reviewId: number, updatedData: { description: string; grade: number }) => {
    if (!reviews) return;

    setReviews((prevReviews) =>
      prevReviews?.map((review) =>
        review.id === reviewId
          ? { ...review, description: updatedData.description, rating: updatedData.grade }
          : review
      )
    );
  };

  const handleReviewDelete = (reviewId: number) => {
    if (!reviews) return;

    setReviews((prevReviews) =>
      prevReviews?.filter((review) => review.id !== reviewId)
    );
  };

  return (
    <div className="w-full max-w-[800px] mx-auto p-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-2xl font-bold mb-4">My Reviews</h1>
      {reviews === null ? (
        <Skeleton className="w-full h-[200px] rounded-lg" />
      ) : reviews.length === 0 ? (
        <p>No reviews available</p>
      ) : (
        reviews.map((review) => (
          <ReviewCard
            key={review.id}
            reviewId={review.id}
            companyName={review.companyName}
            rating={review.rating}
            title={review.title}
            description={review.description}
            response={review.response}
            companyLogo={review.profilePictureUrl}
            onUpdate={handleReviewUpdate}
            onDelete={handleReviewDelete}
          />
        ))
      )}
    </div>
  );
};

export default CustomerReviews;
