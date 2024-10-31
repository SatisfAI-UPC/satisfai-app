import {useParams} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";
import {fetchSurveyById, updateSurveyById} from "../services/SurveyService.ts";
import {Button, Card, Input, Textarea} from "@nextui-org/react";
import {CreateSurveyQuestion} from "../model/CreateSurveyQuestion.ts";
import {toast, ToastContainer} from "react-toastify";
import {useEffect, useState} from "react";
import SurveyResponses from "../components/SurveyResponses.tsx";
import SurveySettings from "../components/SurveySettings.tsx";
import EditSurvey from "../components/EditSurvey.tsx";


function CompanySurveysDashboard() {
    const { id } = useParams();

    const [currentPage, setCurrentPage] = useState("edit");

    const [editableSurvey, setEditableSurvey] = useState(null);

    const {
        status,
        error,
        data: survey,
    } = useQuery({
        queryKey: ["survey", id],
        queryFn: () => fetchSurveyById(id),
        enabled: !!id,
    });

    useEffect(() => {
        if (survey) setEditableSurvey(survey);
    }, [survey]);

    {/* Title handle */}
    const handleSurveyTitleChange = (event) => {
        setEditableSurvey((prev) => ({ ...prev, title: event.target.value }));
    };

    {/* Save changes */}
    const saveSurveyMutation = useMutation({
        mutationFn: (updatedSurvey) => updateSurveyById(id, updatedSurvey),
        onSuccess: () => toast("Survey saved successfully", { type: "success" }),
        onError: (error) => toast(`Error saving survey: ${error.message}`, { type: "error" }),
    });

    {/* Preview handle */}
    const showPreview = () => {
        console.log("Preview");
    }

    {/* Reset changes handle */}
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
            organization: editableSurvey.organization
        };
        saveSurveyMutation.mutate(updateRequest);
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
                                <Input
                                    label="Survey Title"
                                    value={editableSurvey?.title || ""}
                                    onChange={handleSurveyTitleChange}
                                    startContent={<i className="pi pi-pencil text-secondary text-sm" />}
                                    fullWidth
                                />
                                <Textarea
                                    label="Survey Description"
                                    value={editableSurvey?.description || ""}
                                    onChange={(e) => setEditableSurvey((prev) => ({ ...prev, description: e.target.value }))}
                                />
                            </div>
                            <div className="flex flex-col gap-1 md:gap-2 w-full md:w-auto">
                                <Button color="primary" className="w-full" onClick={saveChanges}>
                                    <i className="pi pi-save mr-2"/>
                                    Save Changes
                                </Button>
                                <Button color="secondary" className="w-full" onClick={showPreview}>
                                    <i className="pi pi-eye mr-2"/>
                                    Preview
                                </Button>
                                <Button color="danger" className="w-full" onClick={resetChanges}>
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
                        {/* EDIT */}
                        <div className={"flex flex-col items-center gap-4"}>
                            {currentPage === "edit" && (
                                <EditSurvey
                                    editableSurvey={editableSurvey}
                                    setEditableSurvey={setEditableSurvey}
                                    saveChanges={saveChanges}
                                    resetChanges={resetChanges}
                                />
                            )}
                            {currentPage === "responses" &&
                                <SurveyResponses surveyId={id}/>
                            }
                            {currentPage === "settings" &&
                                <SurveySettings survey={editableSurvey}/>
                            }
                            <Button onClick={saveChanges} className="w-full md:w-1/2 button-primary">
                                Save Changes
                            </Button>
                        </div>
                        {/* RESPONSES */}

                        {/* SETTINGS */}
                    </Card>
                </div>
            )}
        </>
    );
}

export default CompanySurveysDashboard;