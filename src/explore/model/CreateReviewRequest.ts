export interface CreateReviewRequest {
    companyId: number;
    title: string;
    description: string;
    customerId: string;
    grade: number;
}