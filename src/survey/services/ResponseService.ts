import {responsesApiUrl} from "../../shared/services/GlobalAPI.ts";
import axios from "axios";
import {CreateSurveyResponse} from "../model/CreateSurveyResponse.ts";


export function fetchResponsesBySurveyId(id: number | string){
    return axios.get(`${responsesApiUrl}/${id}`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(error.response.data.message);
        });
}

export function createNewResponse(id: number | string, createResponseRequest: CreateSurveyResponse){
    console.log(createResponseRequest);

    return axios.post(`${responsesApiUrl}/${id}/create`, createResponseRequest)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(error.response.data.message);
        });
}