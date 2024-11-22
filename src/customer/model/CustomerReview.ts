export interface CustomerReview {
    id: number;
    companyId: number;
    companyName: string;
    title: string | null;
    description: string;
    grade: number;
    response: [];
    profilePictureUrl: string;
}