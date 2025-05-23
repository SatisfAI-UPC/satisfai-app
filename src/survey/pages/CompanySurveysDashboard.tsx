// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";
import {
    closeSurveyById,
    deleteSurveyById,
    fetchSurveyById,
    publishSurveyById,
    updateSurveyById,
    updateSurveyPrivacyById
} from "../../shared/services/SurveyService.ts";
import {Button, Card, Input, Modal, ModalContent, Textarea, useDisclosure} from "@nextui-org/react";
import {toast, ToastContainer} from "react-toastify";
import {useEffect, useState} from "react";
import SurveyResponses from "../components/SurveyResponses.tsx";
import SurveySettings from "../components/SurveySettings.tsx";
import EditSurvey from "../components/EditSurvey.tsx";
import {ShareSurveyLinkModal} from "../components/ShareSurveyLinkModal.tsx";
import {SurveyPreviewModal} from "../components/SurveyPreviewModal.tsx";

function CompanySurveysDashboard() {
    const { id } = useParams();
    const [currentPage, setCurrentPage] = useState("edit");
    const [editableSurvey, setEditableSurvey] = useState(null);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isOpen: isOpenPreview, onOpen: onOpenPreview, onOpenChange: onOpenChangePreview } = useDisclosure();

    const { status, data: survey } = useQuery({
        queryKey: ["survey", id],
        queryFn: () => fetchSurveyById(id),
        enabled: !!id,
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (survey) setEditableSurvey(survey);
    }, [survey]);

    const handleSurveyTitleChange = (event) => {
        setEditableSurvey((prev) => ({ ...prev, title: event.target.value }));
    };

    const handleSurveyDescriptionChange = (event) => {
        setEditableSurvey((prev) => ({ ...prev, description: event.target.value }));
    };

    const saveSurveyMutation = useMutation({
        mutationFn: (updatedSurvey) => {
            if (survey?.id) {
                return updateSurveyById(survey.id, updatedSurvey);
            }
        },
        onSuccess: () => {
            toast("Survey saved successfully", { type: "success" });
        },
        onError: (error) => {
            toast(`Error saving survey: ${error.message}`, { type: "error" });
        },
    });

    const resetChanges = () => {
        setEditableSurvey(survey);
    };

    const saveChanges = () => {
        const updateRequest = {
            title: editableSurvey.title,
            description: editableSurvey.description,
            questions: editableSurvey.questions,
            status: editableSurvey.status,
            privacyStatus: editableSurvey.privacyStatus,
            organization: editableSurvey.organizationId,
        };
        saveSurveyMutation.mutate(updateRequest);
    };

    const publishSurvey = () => {
        publishSurveyById(editableSurvey?.id).then(() => {
            setEditableSurvey((prev) => ({ ...prev, status: "ACTIVE" }));
            toast("Survey published successfully", {type: "success"})
        }).catch(e => {
            toast(`Error publishing survey ${e.message}`, {type: "error"});
        });
    }

    const closeSurvey = () => {
        closeSurveyById(survey?.id).then(() => {
            setEditableSurvey((prev) => ({ ...prev, status: "CLOSED" }));
            toast("Survey closed successfully", {type: "success"});
        }).catch(e => {
            toast(`Error closing survey ${e.message}`, {type: "error"});
        });
    }

    const deleteSurvey = async () => {
        try {
            await deleteSurveyById(survey.id);
            toast("Survey deleted successfully", { type: "success" });
            navigate("/company-surveys");
        } catch (error) {
            toast(`There was an error deleting the survey ${error.message}`, { type: "error" });
        }
    }

    const switchPrivacy = async () => {
        await updateSurveyPrivacyById(survey.id).then(() => {
            setEditableSurvey((prev) => ({ ...prev, privacyStatus: !prev.privacyStatus }));
            toast("Survey privacy updated successfully", { type: "success" });
        }).catch((error) => {
            toast(`Error updating survey privacy ${error.message}`, { type: "error" });
        });
    };

    return (
        <>
            <ToastContainer />
            {status === 'loading' ? (
                <p>Loading...</p>
            ) : status === 'error' ? (
                <p>There was an error loading the survey</p>
            ) : (
                <div className={"grid gap-2 my-2"}>
                    <Card className="p-4">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className={"flex flex-col w-full gap-2"}>
                                <div className={"flex gap-2 items-center"}>
                                    {editableSurvey?.status === "DRAFT" ? (
                                        <Button className={"w-32"} startContent={<i className={"pi pi-align-justify"}/>}>
                                            Draft
                                        </Button>
                                    ) : editableSurvey?.status === "ACTIVE" ? (
                                        <Button color={"primary"} className={"w-32"} startContent={<i className={"pi pi-check"}/>}>
                                            Published
                                        </Button>
                                    ) : editableSurvey?.status === "CLOSED" ? (
                                        <Button color={"warning"} className={"w-32"} startContent={<i className={"pi pi-times"}/>}>
                                            Private
                                        </Button>
                                    ) : (
                                        <Button color={"danger"} className={"w-32"} startContent={<i className={"pi pi-times"}/>}>
                                            Error
                                        </Button>
                                    )}
                                    <Button
                                        isIconOnly
                                        className={"button-tertiary w-full md:w-1/4"}
                                        isDisabled={editableSurvey?.status !== "ACTIVE"}
                                        endContent={<i className={"pi pi-share-alt"} />}
                                        onPress={onOpen}
                                    >
                                        {editableSurvey?.privacyStatus === "ACTIVE" ? (
                                            <p>Publish the survey to get the link</p>
                                        ) : (
                                            <p>Share survey</p>
                                        )}
                                    </Button>
                                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={"outside"}>
                                        <ModalContent>
                                            {onClose => <ShareSurveyLinkModal surveyId={editableSurvey.id} onClose={onClose} />}
                                        </ModalContent>
                                    </Modal>
                                </div>

                                <Input
                                    label="Survey Title"
                                    value={editableSurvey?.title || ""}
                                    onChange={handleSurveyTitleChange}
                                    startContent={<i className="pi pi-pencil text-secondary text-sm"/>}
                                    fullWidth
                                    isDisabled={editableSurvey?.status !== "DRAFT"}
                                />
                                <Textarea
                                    label="Survey Description"
                                    value={editableSurvey?.description || ""}
                                    onChange={handleSurveyDescriptionChange}
                                    isDisabled={editableSurvey?.status !== "DRAFT"}
                                />
                            </div>
                            <div className="flex flex-col gap-1 md:gap-2 w-full md:w-auto">
                                <Button color="primary" className="w-full" onClick={saveChanges} isDisabled={editableSurvey?.status !== "DRAFT"}>
                                    <i className="pi pi-save mr-2"/>
                                    Save Changes
                                </Button>
                                <Button color="secondary" className="w-full" onClick={onOpenPreview}>
                                    <i className="pi pi-eye mr-2"/>
                                    Preview
                                </Button>
                                <Modal isOpen={isOpenPreview} onOpenChange={onOpenChangePreview} scrollBehavior={"outside"} size={"5xl"}>
                                    <ModalContent>
                                        {onClose => <SurveyPreviewModal survey={editableSurvey} onClose={onClose} />}
                                    </ModalContent>
                                </Modal>
                                {editableSurvey?.status === "DRAFT" ? (
                                    <Button onClick={publishSurvey} className={"w-full button-tertiary"} startContent={<i className={"pi pi-share-alt"}/>}>
                                        Publish
                                    </Button>
                                ) : editableSurvey?.status === "ACTIVE" ? (
                                    <Button onClick={closeSurvey} color={"danger"} className={"w-full"} startContent={<i className={"pi pi-times"}/>}>
                                        Close survey
                                    </Button>
                                ) : editableSurvey?.status === "CLOSED" ? (
                                    <Button onClick={publishSurvey} color={"warning"} className={"w-full"} startContent={<i className={"pi pi-share"}/>}>
                                        Reopen survey
                                    </Button>
                                ) : (
                                    <Button color={"danger"} className={"w-full"} startContent={<i className={"pi pi-times"}/>}>
                                        Error
                                    </Button>
                                )}
                                <Button color="danger" className="w-full" onClick={resetChanges} isDisabled={editableSurvey?.status !== "DRAFT"}>
                                    <i className="pi pi-refresh mr-2"/>
                                    Reset Changes
                                </Button>
                            </div>
                        </div>
                    </Card>
                    <Card className={"p-4"}>
                        <div className={"flex gap-8 text-center justify-center py-4"}>
                            <h1 className={"link-primary"} onClick={() => setCurrentPage("edit")}>Edit</h1>
                            <h1 className={"link-primary"} onClick={() => setCurrentPage("responses")}>Responses</h1>
                            <h1 className={"link-primary"} onClick={() => setCurrentPage("settings")}>Settings</h1>
                        </div>
                        <div className={"text-center font-medium py-2 text-lg"}>
                            {
                                editableSurvey?.status === "DRAFT" ? (
                                    <p className={"text-warning"}>The survey is in draft mode. You can edit and save changes.</p>
                                ) : editableSurvey?.status === "ACTIVE" ? (
                                    <p className={"text-primary"}>The survey has been published. You can no longer edit the survey.</p>
                                ) : editableSurvey?.status === "CLOSED" ? (
                                    <p className={"text-warning"}>The survey is closed.</p>
                                ) : (
                                    <p className={"text-danger"}>There was an error loading the survey status.</p>
                                )
                            }
                        </div>
                        <div className={"flex flex-col items-center gap-4"}>
                            {currentPage === "edit" && (
                                <EditSurvey
                                    editableSurvey={editableSurvey}
                                    setEditableSurvey={setEditableSurvey}
                                />
                            )}
                            {currentPage === "responses" &&
                                <SurveyResponses survey={editableSurvey}/>
                            }
                            {currentPage === "settings" &&
                                <SurveySettings
                                    survey={editableSurvey}
                                    deleteSurvey={deleteSurvey}
                                    switchPrivacy={switchPrivacy}
                                />
                            }
                            <Button onClick={saveChanges} className="w-full md:w-1/2 button-primary"
                                    isDisabled={editableSurvey?.status !== "DRAFT"}>
                                Save Changes
                            </Button>
                        </div>
                    </Card>
                </div>
            )}
        </>
    );
}

export default CompanySurveysDashboard;
