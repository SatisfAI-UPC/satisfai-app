import axios from "axios";
import { globalApiUrl } from "../../shared/services/GlobalAPI.ts";

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
