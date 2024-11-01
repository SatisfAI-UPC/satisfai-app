import {globalApiUrl} from "../../shared/services/GlobalAPI.ts";
import axios from "axios";
import {Company} from "../model/PublicCompany.ts";
import {Review} from "../model/PublicReview.ts";

export function fetchPublicCompanies() {
    return axios.get<Company[]>(`${globalApiUrl}/public/companies`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(error.response.data.message);
        });
}

export function fetchPublicCompanyById(id: string | number) {
    return axios.get<Company>(`${globalApiUrl}/public/companies/${id}`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(error.response.data.message);
        });
}

export function fetchPublicCompanyReviewsById(id: string | number) {
    return axios.get<Review[]>(`${globalApiUrl}/public/companies/${id}/reviews`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(error.response.data.message);
        });
}

export function fetchPublicCompaniesBySearch(search: string) {
    return axios.get<Company[]>(`${globalApiUrl}/public/companies/search?name=${search}`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(error.response.data.message);
        });
}