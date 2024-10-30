export interface Survey {
    id: number,
    title: string,
    description: string,
    status: string,
    privacyStatus: string,
    createdAt: Date,
    organization: number,
}