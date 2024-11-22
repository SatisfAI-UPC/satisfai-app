import axios from "axios";
import {globalApiUrl, surveyApiUrl} from "../../shared/services/GlobalAPI.ts";

export function generateOpenAISurveyQuestions(userPrompt: string, companyId: number) {
    return axios.get(`${globalApiUrl}/openai/api/generate-survey`, {
        params: {
            companyId: companyId,
            userPrompt: userPrompt,
        }
    })
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(error.response?.data?.message || "Error generating survey questions");
        });
}


export function generateOpenAISurveyResponsesRecommendation(surveyId: string | number) {
    return axios.post(`${surveyApiUrl}/${surveyId}/generate-recommendation`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(error.response?.data?.message || "Error generating survey recommendation");
        });
}