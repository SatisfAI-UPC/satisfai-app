import {Link, useParams} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchSurveyById } from "../services/SurveyService.ts";
import PublicQuestionCard from "../components/PublicQuestionCard.tsx";
import {Avatar, Button, Card, Modal, ModalContent, useDisclosure} from "@nextui-org/react";
import {useEffect, useState} from "react";
import {fetchPublicCompanyById} from "../../explore/services/CompanyExploreService.ts";
import {createNewResponse} from "../services/ResponseService.ts";
import {toast, ToastContainer} from "react-toastify";
import {useSelector} from "react-redux";
import {ShareSurveyLinkModal} from "../components/ShareSurveyLinkModal.tsx";
import {CreateSurveyResponse} from "../model/CreateSurveyResponse.ts";

function PublicSurvey() {
    const { id } = useParams();
    const [companyInfo, setCompanyInfo] = useState({
        name: "",
        avatar: "",
    });
    const [responses, setResponses] = useState({});

    const { status, data: survey } = useQuery({
        queryKey: ["survey", id],
        queryFn: () => fetchSurveyById(id),
        enabled: !!id,
    });

    useEffect(() => {
        if (survey) {
            const fetchCompanyInfo = async () => {
                try {
                    const company = await fetchPublicCompanyById(survey.organizationId);
                    setCompanyInfo({
                        name: company?.name || "Unknown Company",
                        avatar: company?.profilePictureUrl || "",
                    });
                } catch (error) {
                    console.error("Error fetching company info:", error);
                }
            };

            fetchCompanyInfo();
        }
    }, [survey]);

    const handleResponseChange = (questionId, answer) => {
        setResponses((prevResponses) => ({
            ...prevResponses,
            [(questionId)]: answer,
        }));
    };

    const user = useSelector((state) => state.auth.user);

    const handleSubmit = async () => {
        try {
            const responsePayload: CreateSurveyResponse = {
                givenRespondent: user?.id || null,
                answers: Object.fromEntries(
                    Object.entries(responses).map(([questionId, answer]) => [String(questionId), String(answer)])
                ),
            };

            if (survey?.id === undefined) {
                toast(`There was an error: No survey id available`, {type: "error"});
                return;
            }

            await createNewResponse(survey?.id, responsePayload)
                .then(() => {
                    setIsSubmitted(true);
                    setResponses({});
                    toast("Responses submitted successfully!", {type: "success"});
                })
                .catch((error) => {
                    toast(`There was an error ${error.message}`, {type: "error"});
                });

        } catch (error) {
            console.error("Error submitting responses:", error);
            alert("Failed to submit responses.");
        }
    };

    const [isSubmitted, setIsSubmitted] = useState(false);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <>
            <ToastContainer />
            <div className="flex items-center justify-center p-2 md:p-4">
                <Card className="p-6 w-full md:w-1/2 grid gap-2">
                    {isSubmitted ? (
                        <div className="text-center grid gap-2">
                            <Avatar
                                src={companyInfo?.avatar}
                                alt={companyInfo?.name}
                                size="lg"
                                className="mx-auto"
                            />
                            <h2 className="text-2xl font-bold text-primary">Thank you for your response!</h2>
                            <p>Your answers have been successfully submitted.</p>
                            <Button
                                color={"secondary"}
                                onPress={onOpen}>
                                Share this survey
                            </Button>
                            <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={"outside"}>
                                <ModalContent>
                                    {
                                        (onClose) =>
                                            <ShareSurveyLinkModal surveyId={survey?.id} onClose={onClose} />
                                    }
                                </ModalContent>
                            </Modal>
                        </div>
                    ) : (
                        <>
                            <div className="grid gap-2">
                                <Avatar
                                    src={companyInfo?.avatar}
                                    alt={companyInfo?.name}
                                    size="lg"
                                    className="mx-auto"
                                />
                                <p className="text-center text-sm">{companyInfo?.name}</p>
                            </div>
                            <h1 className="text-2xl font-bold text-center text-tertiary">
                                {survey?.title}
                            </h1>
                            <p className="text-gray-500">{survey?.description}</p>
                            <div className="grid gap-2 mt-4">
                                {survey?.questions?.map((question) => (
                                    <PublicQuestionCard
                                        key={question.id}
                                        surveyQuestion={question}
                                        onResponseChange={handleResponseChange}
                                    />
                                ))}
                            </div>
                            <Button
                                className="button-primary"
                                onClick={handleSubmit}>
                                Submit
                            </Button>
                            <Link to={"/"} className={"text-center justify-center w-full flex mt-4 gap-2 items-center"}>
                                <p className={"text-primary text-sm font-medium"}>
                                    Made with SatisfAI
                                </p>
                                <img
                                    src={"../src/assets/satisfai-icon.png"}
                                    className={"w-2 md:w-4 h-auto"}
                                    alt={"SatisfAI logo"}
                                />
                            </Link>
                        </>
                    )}
                </Card>
            </div>
        </>
    );
}

export default PublicSurvey;
