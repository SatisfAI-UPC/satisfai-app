import axios from "axios";
import { globalApiUrl } from "../../shared/services/GlobalAPI.ts";
import { Review } from "../model/Review";
import { ReviewUpdateRequest } from "../model/ReviewUpdateRequest";

export const fetchReviewsByCustomerId = (
  customerId: number
): Promise<Review[]> => {
  return axios
    .get(`${globalApiUrl}/reviews/customer/${customerId}`)
    .then((res) =>
      res.data.map((review: any) => ({
        id: review.companyId,
        companyName: review.companyName,
        title: review.title,
        description: review.description,
        rating: review.grade,
        response: review.response,
        profilePictureUrl: review.profilePictureUrl,
      }))
    );
};

export const updateReview = async (
  reviewId: number,
  reviewData: ReviewUpdateRequest
): Promise<void> => {
  return axios
    .put(`${globalApiUrl}/reviews/${reviewId}`, reviewData)
    .then(() => {
      console.log("Review updated successfully");
    })
    .catch((error) => {
      console.error("Error updating review:", error);
      throw error;
    });
};

export const deleteReview = async (reviewId: number): Promise<void> => {
  return axios
    .delete(`${globalApiUrl}/reviews/${reviewId}`)
    .then(() => {
      console.log("Review deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting review:", error);
      throw error;
    });
};
