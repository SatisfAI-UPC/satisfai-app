import axios from "axios";
import {surveyApiUrl} from "./GlobalAPI.ts";
import {CreateSurveyRequest} from "../../survey/model/CreateSurveyRequest.ts";
import {SurveyDetails} from "../../survey/model/SurveyDetails.ts";
import {CreateSurveyQuestion} from "../../survey/model/CreateSurveyQuestion.ts";

export function fetchAllSurveys(){
    return axios.get(`${surveyApiUrl}/all`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(error.response.data.message);
        });
}

export function createNewSurvey(createSurveyRequest: CreateSurveyRequest){
    return axios.post(`${surveyApiUrl}/create`, createSurveyRequest)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(error.response.data.message);
        });
}

export function fetchSurveyById(id: number | string): Promise<SurveyDetails> {
    return axios.get(`${surveyApiUrl}/${id}`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(error.response.data.message);
        });
}

export function createNewSurveyQuestion(surveyId: string | number, question: CreateSurveyQuestion) {
    return axios.post(`${surveyApiUrl}/${surveyId}/create-question`, question)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(error.response.data.message);
        });
}

export function fetchSurveysByCompanyId(id: string | number){
    return axios.get(`${surveyApiUrl}/organization/${id}`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(error.response.data.message);
        });
}

export function fetchSurveysByCompanyIdAndStatus(id: string | number, status: string){
    return axios.get(`${surveyApiUrl}/organization/${id}/status/${status}`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(error.response.data.message);
        });
}


export function updateSurveyById(id: string | number, updateSurveyRequest: CreateSurveyRequest){
    return axios.put(`${surveyApiUrl}/update/${id}`, updateSurveyRequest)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(error.response.data.message);
        });
}


export function deleteSurveyById(id: string | number){
    return axios.delete(`${surveyApiUrl}/delete/${id}`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(error.response.data.message);
        });
}

export function publishSurveyById(id: string | number){
    return axios.patch(`${surveyApiUrl}/${id}/publish`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(error.response.data.message);
        });
}

export function closeSurveyById(id: string | number){
    return axios.patch(`${surveyApiUrl}/${id}/close`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(error.response.data.message);
        });
}

export function updateSurveyPrivacyById(id: string | number) {
    return axios.patch(`${surveyApiUrl}/${id}/privacy`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(error.response?.data?.message || "Error updating survey privacy");
        });
}


export function fetchSurveysByStatus(status: string) {
    return axios.get(`${surveyApiUrl}/status/${status}`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(error.response.data.message);
        });
}


export function fetchPublicSurveys() {
    return axios.get(`${surveyApiUrl}/public`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(error.response.data.message);
        });
}

export function fetchSurveyUrlById(id: string | number) {
    return axios.get(`${surveyApiUrl}/${id}/link`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(error.response.data.message);
        });
}


export function fetchSurveyQrById(id: string | number) {
    return axios.get(`${surveyApiUrl}/${id}/qr`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(error.response.data.message);
        });
}


export function fetchRecommendationById(id: string | number) {
    return axios.get(`${surveyApiUrl}/${id}/generate-recommendation`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(error.response.data.message);
        });
}
