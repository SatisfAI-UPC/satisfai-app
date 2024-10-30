export interface SurveyQuestionDetails {
    id: number
    text: string,
    type: string,
    isMandatory: boolean,
    options: string[],
}