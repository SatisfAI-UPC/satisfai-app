import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import {fetchSurveysByCompanyIdAndStatus} from "../../shared/services/SurveyService.ts";
import {fetchPublicCompanyById} from "../services/CompanyExploreService.ts";
import CompanyActiveSurveyCard from "../components/CompanyActiveSurveyCard.tsx";
import {PublicSurvey} from "../model/PublicSurvey.ts";

function CompanyActiveSurveys(){
    const { id } = useParams();

    const {
        status: companyStatus,
        error: companyError,
        data: company,
    } = useQuery({
        queryKey: ["company", id],
        queryFn: () => fetchPublicCompanyById(id),
    });

    const {
        status: surveysStatus,
        error: surveysError,
        data: surveys,
    } = useQuery({
        queryKey: ["surveys", id],
        queryFn: () => fetchSurveysByCompanyIdAndStatus(id, "ACTIVE"),
    });

    if (companyStatus === "loading" || surveysStatus === "loading") {
        return <p>Loading...</p>;
    }

    if (companyStatus === "error" || surveysStatus === "error") {
        return <p>Error: {companyError.message || surveysError.message}</p>;
    }

    return (
        <>
            <div className={"flex flex-col py-4"}>
                <h1 className={"page-title"}>{company?.name} surveys</h1>
                <small>{surveys?.length || "0"} active surveys</small>
            </div>
            {
                surveys && surveys.map((survey: PublicSurvey) => {
                    return (
                        <>
                            <CompanyActiveSurveyCard
                                key={survey?.id}
                                survey={survey}
                                company={company}
                            />
                        </>
                    );
                })
            }
        </>
    );
}

export default CompanyActiveSurveys;