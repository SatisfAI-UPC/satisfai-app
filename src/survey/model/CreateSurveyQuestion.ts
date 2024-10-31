export interface CreateSurveyQuestion {
    text: string,
    type: string,
    options: string[],
    isMandatory: boolean,
}