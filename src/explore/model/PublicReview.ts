export interface PublicReview {
    id: number;
    companyId: number;
    title: string;
    description: string;
    customerId: number;
    grade: number;
    response: [];
    profilePictureUrl: string;
}