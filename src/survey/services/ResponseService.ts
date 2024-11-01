import {responsesApiUrl} from "../../shared/services/GlobalAPI.ts";
import axios from "axios";
import {CreateSurveyQuestion} from "../model/CreateSurveyQuestion.ts";


export function fetchResponsesBySurveyId(id: number | string){
    return axios.get(`${responsesApiUrl}/${id}`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(error.response.data.message);
        });
}

export function createNewResponse(id: number | string, createResponseRequest: CreateSurveyQuestion){
    return axios.post(`${responsesApiUrl}/${id}/create`, createResponseRequest)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(error.response.data.message);
        });
}