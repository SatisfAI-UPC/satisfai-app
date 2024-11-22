import axios from "axios";
import {globalApiUrl} from "../../shared/services/GlobalAPI.ts";
import {CreateReviewRequest} from "../model/CreateReviewRequest.ts";
import {PublicReview} from "../model/PublicReview.ts";

export function fetchReviewsByCompanyId(companyId: number | string) {
    return axios.get<PublicReview[]>(`${globalApiUrl}/reviews/company/${companyId}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw new Error(error.response.data.message);
        });
}

export function createNewReview(createReviewRequest: CreateReviewRequest) {
    return axios.post(`${globalApiUrl}/reviews`, {
        companyId: createReviewRequest.companyId,
        title: createReviewRequest.title,
        description: createReviewRequest.description,
        customerId: createReviewRequest.customerId,
        grade: createReviewRequest.grade,
    })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            throw new Error(error.response.data.message);
        });
}