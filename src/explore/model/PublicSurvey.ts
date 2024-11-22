export interface PublicSurvey{
    id: number,
    title: string,
    description: string,
    status: string,
    privacyStatus: string,
    createdAt: Date,
    organizationId: number,
}