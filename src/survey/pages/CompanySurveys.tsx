// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {useState} from "react";
import {Button, Pagination} from "@nextui-org/react";
import {useQuery} from "@tanstack/react-query";
import {createNewSurvey, fetchSurveysByCompanyId} from "../../shared/services/SurveyService.ts";
import {toast, ToastContainer} from "react-toastify";
import {CreateSurveyQuestion} from "../model/CreateSurveyQuestion.ts";
import CompanySurveyCard from "../components/CompanySurveyCard.tsx";
import {Survey} from "../model/Survey.ts";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

function CompanySurveys() {
    const [page, setPage] = useState(1);
    const limit = 10;

    const user = useSelector((state) => state.auth.user);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const {
        status,
        data: surveys
    } = useQuery({
        queryKey: ["surveys", page, user?.id],
        queryFn: () => fetchSurveysByCompanyId(user?.id),
        enabled: !!user?.id,
    });

    const navigate = useNavigate();

    const createSurvey = async () => {
        if (!user || !user.id || user.role!== "COMPANY") {
            toast(`You must be logged in as company to create a survey`, { type: "error" });
            return;
        }
        try {
            const defaultQuestion: CreateSurveyQuestion = {
                text: "How was your experience?",
                type: "MULTIPLE_CHOICE",  // TEXT MULTIPLE_CHOICE RATING
                options: ["Good", "Bad", "Neutral"],
                isMandatory: false
            }

            const createSurveyRequest = {
                title: "New Survey",
                description: "",
                questions: [defaultQuestion],
                status: "ACTIVE", // ACTIVE CLOSED DRAFT
                privacyStatus: "PRIVATE", // PRIVATE PUBLIC
                organization: parseInt(user?.id),
            }
            const newSurvey = await createNewSurvey(createSurveyRequest);

            if (newSurvey?.id) {
                toast("Survey created successfully", { type: "success" });
                navigate(`/company-surveys/${newSurvey.id}/edit`);
            } else {
                throw new Error("Survey ID not found in response");
            }
        } catch (error) {
            toast(`There was an error creating a survey: ${error.message}`, { type: "error" });
        }
    };

    return (
        <div className="grid gap-4">
            <ToastContainer />
            <div className={"flex justify-between items-center"}>
                <h1 className="page-title">Surveys</h1>
                <Button
                    className={"button-primary"}
                    onPress={createSurvey}
                >
                    Create survey
                </Button>
            </div>
            <div>
                {status === 'loading' ? (
                    <p>Loading...</p>
                ) : status === 'error' ? (
                    <p>There was an error loading surveys</p>
                ) : (
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                        {surveys && surveys.length > 0 ? (
                            surveys.map((survey: Survey) => (
                                <CompanySurveyCard
                                    key={survey.id} survey={survey}/>
                            ))
                        ) : (
                            <p className="text-lg">No surveys found</p>
                        )}
                    </div>
                )}
            </div>
            <div className="flex justify-center mt-4">
                <Pagination
                    total={Math.ceil((surveys?.length || 0) / limit)}
                    initialPage={page}
                    onChange={handlePageChange}
                    color="primary"
                    size="lg"
                />
            </div>
        </div>
    );
}

export default CompanySurveys;
