export interface CompanyUpdateRequest {
    name: string;
    phoneNumber: string;
    country: string;
    description: string;
    address: string;
    website: string;
    profilePictureUrl: string;
    industry: string;
    isProfilePublic: boolean;
}