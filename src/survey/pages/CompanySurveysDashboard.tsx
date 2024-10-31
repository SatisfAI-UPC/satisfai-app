import {useParams} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";
import {fetchSurveyById, updateSurveyById} from "../services/SurveyService.ts";
import {Button, Card, Input, Textarea} from "@nextui-org/react";
import SurveyQuestionCard from "../components/SurveyQuestionCard.tsx";
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/dropdown";
import {CreateSurveyQuestion} from "../model/CreateSurveyQuestion.ts";
import {toast, ToastContainer} from "react-toastify";
import {useEffect, useState} from "react";
import {generateOpenAISurveyQuestions} from "../services/OpenAIService.ts";
import {useSelector} from "react-redux";


function CompanySurveysDashboard() {
    const { id } = useParams();

    const [editableSurvey, setEditableSurvey] = useState(null);

    const [generateQuestionPrompt, setGenerateQuestionPrompt] = useState("");

    const user = useSelector((state) => state.auth.user);

    const [loadingAIQuestion, setloadingAIQuestion] = useState(false);

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

    {/* Question updates */}
    const updateQuestion = (updatedQuestion) => {
        setEditableSurvey((prevSurvey) => ({
            ...prevSurvey,
            questions: prevSurvey.questions.map((question) =>
                question.id === updatedQuestion.id ? updatedQuestion : question
            ),
        }));
    };

    const deleteQuestion = (question) => {
        setEditableSurvey((prevSurvey) => ({
            ...prevSurvey,
            questions: prevSurvey.questions.filter((item) => item.id !== question.id),
        }));
    };

    {/* Add new question handle */}
    const addNewQuestion = (questionType: string) => {
        if (!["MULTIPLE_CHOICE", "RATING", "TEXT"].includes(questionType)) {
            toast("Invalid question type", { type: "error" });
            return;
        }

        const newQuestion: CreateSurveyQuestion = {
            text: "",
            type: questionType,
            options: questionType === "MULTIPLE_CHOICE" ? [""] : [],
            isMandatory: false,
        };

        setEditableSurvey((prevSurvey) => ({
            ...prevSurvey,
            questions: [...prevSurvey.questions, newQuestion],
        }));
    };

    {/* Handle Open AI recommendation */}
    const handleOpenAIRecommendation = async () => {
        setloadingAIQuestion(true);
        if (!generateQuestionPrompt || generateQuestionPrompt.length < 10) {
            toast("Please enter at least ten characters", { type: "error" });
            setloadingAIQuestion(false);
            return;
        }

        try {
            const generatedSurvey = await generateOpenAISurveyQuestions(generateQuestionPrompt, user?.id);
            const generatedQuestions = generatedSurvey.questions.map((question:CreateSurveyQuestion) => ({
                text: question.text,
                type: question.type,
                options: question.options,
                isMandatory: question.isMandatory,
            }));
            console.log(generatedQuestions);
            setEditableSurvey((prevSurvey) => ({
                ...prevSurvey,
                questions: [...prevSurvey.questions, ...generatedQuestions],
            }));
        } catch (error) {
            toast(`There was an error generating questions ${error.message}`, { type: "error" });
        } finally {
            setloadingAIQuestion(false);
        }
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
                        <div className={"flex flex-col items-center gap-4"}>
                            {editableSurvey?.questions?.map((question, index) => (
                                <div className={"w-full md:w-1/2"} key={question.id || index}>
                                    <SurveyQuestionCard
                                        key={question.id}
                                        surveyQuestion={question}
                                        onUpdate={updateQuestion}
                                        onDelete={deleteQuestion}
                                    />
                                </div>
                            ))}

                            <div className={"flex flex-col items-center gap-2 w-full"}>
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button className="w-full md:w-1/2 button-secondary">
                                            Add Question
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="Static Actions">
                                        <DropdownItem key="MULTIPLE_CHOICE"
                                                      onPress={() => addNewQuestion("MULTIPLE_CHOICE")}>
                                            <i className={"pi pi-circle-off"}/> Multiple choice question
                                        </DropdownItem>
                                        <DropdownItem key="RATING"
                                                      onPress={() => addNewQuestion("RATING")}>
                                            <i className={"pi pi-star"}/> Rating
                                        </DropdownItem>
                                        <DropdownItem key="TEXT"
                                                      onPress={() => addNewQuestion("TEXT")}>
                                            <i className={"pi pi-align-justify"}/> Textbox
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>

                                <div className={"flex w-full gap-1 md:w-1/2 items-center"}>
                                    <Textarea
                                        disableAnimation
                                        disableAutosize
                                        classNames={{
                                            input: "resize-y min-h-[12px]",
                                        }}
                                        color={"warning"}
                                        disabled={loadingAIQuestion} // Disable when loading
                                        label="Generate questions with AI ✨"
                                        value={generateQuestionPrompt}
                                        onChange={(e) => setGenerateQuestionPrompt(e.target.value)}
                                    />
                                    <Button
                                        isIconOnly
                                        color={"secondary"}
                                        disabled={loadingAIQuestion}
                                        onClick={handleOpenAIRecommendation}
                                    >
                                        {loadingAIQuestion ? (
                                            <i className="pi pi-spinner animate-spin" />
                                        ) : (
                                            <i className="pi pi-arrow-up"/>
                                        )}
                                    </Button>
                                </div>

                                <Button onClick={saveChanges} className="w-full md:w-1/2 button-primary">
                                    Save Changes
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </>
    );
}

export default CompanySurveysDashboard;