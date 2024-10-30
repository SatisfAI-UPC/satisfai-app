export enum Role {
    COMPANY = "COMPANY",
    CUSTOMER = "CUSTOMER"
}

export interface SignupRequest {
    email: string;
    name: string;
    password: string;
    role: Role;
}