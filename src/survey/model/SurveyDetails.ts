import {SurveyQuestionDetails} from "./SurveyQuestionDetails.ts";

export interface SurveyDetails {
    id: number,
    title: string,
    description: string,
    questions: SurveyQuestionDetails[],
    responses: [],
    recommendations: [],
    status: string,
    createdAt: Date,
    organizationId: number,
}