// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useQuery } from "@tanstack/react-query";
import { fetchPublicCompanyById } from "../services/CompanyExploreService.ts";
import { useParams } from "react-router-dom";

const ExploreCompanyDetails = () => {
    const { id } = useParams();

    const {
        status: companyStatus,
        error: companyError,
        data: company,
    } = useQuery({
        queryKey: ["company", id],
        queryFn: () => fetchPublicCompanyById(id),
    });

    if (companyStatus === "loading") {
        return <p>Loading...</p>;
    }

    if (companyStatus === "error") {
        return <p>Error: {companyError.message}</p>;
    }

    return (
        <div>
            <h1>Company Details</h1>
            {company && (
                <div>
                    <h2>{company.name}</h2>
                    <p>Industry: {company.industry}</p>
                    <p>Location: {company.country}</p>
                    <p>Description: {company.description}</p>
                </div>
            )}
        </div>
    );
};

export default ExploreCompanyDetails;
