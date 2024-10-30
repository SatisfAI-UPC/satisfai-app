import {CreateSurveyQuestion} from "./CreateSurveyQuestion.ts";

export interface CreateSurveyRequest {
    title: string;
    description: string;
    questions: CreateSurveyQuestion[];
    status: string;
    privacyStatus: string;
    organization: number;
}