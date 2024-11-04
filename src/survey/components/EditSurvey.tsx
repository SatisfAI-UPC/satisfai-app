// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Button, Textarea } from "@nextui-org/react";
import SurveyQuestionCard from "../components/SurveyQuestionCard.tsx";
import { useState } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { toast } from "react-toastify";
import { generateOpenAISurveyQuestions } from "../services/OpenAIService.ts";
import { CreateSurveyQuestion } from "../model/CreateSurveyQuestion.ts";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

function EditSurvey({ editableSurvey, setEditableSurvey }) {
    const [generateQuestionPrompt, setGenerateQuestionPrompt] = useState("");
    const [loadingAIQuestion, setloadingAIQuestion] = useState(false);
    const user = useSelector((state) => state.auth.user);

    const handleAddQuestion = (questionType) => {
        const newQuestion = {
            id: uuidv4(),
            text: "",
            type: questionType,
            options: [""],
            isMandatory: false
        };
        setEditableSurvey((prevSurvey) => ({
            ...prevSurvey,
            questions: [...prevSurvey.questions, newQuestion],
        }));
    };

    const updateQuestion = (updatedQuestion) => {
        setEditableSurvey((prevSurvey) => ({
            ...prevSurvey,
            questions: prevSurvey.questions.map((question) =>
                question.id === updatedQuestion.id ? updatedQuestion : question
            ),
        }));
    };

    const deleteQuestion = (id) => {
        setEditableSurvey((prevSurvey) => ({
            ...prevSurvey,
            questions: prevSurvey.questions.filter((question) => question.id !== id),
        }));
    };

    const deleteOption = (questionId, optionText) => {
        setEditableSurvey((prevSurvey) => ({
            ...prevSurvey,
            questions: prevSurvey.questions.map((question) => {
                if (question.id === questionId) {
                    const updatedOptions = question.options.filter((option) => option !== optionText);
                    return { ...question, options: updatedOptions };
                }
                return question;
            }),
        }));
    };

    const handleOpenAIRecommendation = async () => {
        setloadingAIQuestion(true);
        if (!generateQuestionPrompt || generateQuestionPrompt.length < 10) {
            toast("Please enter at least ten characters", { type: "error" });
            setloadingAIQuestion(false);
            return;
        }

        try {
            const generatedSurvey = await generateOpenAISurveyQuestions(generateQuestionPrompt, user?.id);
            const generatedQuestions = generatedSurvey.questions.map((question: CreateSurveyQuestion) => ({
                id: uuidv4(),
                text: question.text,
                type: question.type,
                options: question.options,
                isMandatory: question.isMandatory,
            }));
            setEditableSurvey((prevSurvey) => ({
                ...prevSurvey,
                questions: [...prevSurvey.questions, ...generatedQuestions],
            }));
        } catch (error) {
            toast(`There was an error generating questions: ${error.message}`, { type: "error" });
        } finally {
            setloadingAIQuestion(false);
        }
    };

    return (
        <div className="w-full md:w-1/2">
            <div className={"grid gap-2"}>
                {editableSurvey?.questions.map((question) => (
                    <SurveyQuestionCard
                        key={question.id}
                        surveyQuestion={question}
                        onUpdate={updateQuestion}
                        onDelete={deleteQuestion}
                        isDisabled={editableSurvey?.status !== "DRAFT"}
                        onDeleteOption={(text) => deleteOption(question.id, text)}
                    />
                ))}
            </div>
            <div className={"flex flex-col items-center gap-2 w-full"}>
                <Dropdown>
                    <DropdownTrigger>
                        <Button className="w-full button-secondary mt-2" isDisabled={editableSurvey?.status !== "DRAFT"}>
                            Add Question
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                        <DropdownItem key="MULTIPLE_CHOICE"
                                      onPress={() => handleAddQuestion("MULTIPLE_CHOICE")}>
                            <i className={"pi pi-circle-off"} /> Multiple choice question
                        </DropdownItem>
                        <DropdownItem key="RATING"
                                      onPress={() => handleAddQuestion("RATING")}>
                            <i className={"pi pi-star"} /> Rating
                        </DropdownItem>
                        <DropdownItem key="TEXT"
                                      onPress={() => handleAddQuestion("TEXT")}>
                            <i className={"pi pi-align-justify"} /> Textbox
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>

                <div className={"flex w-full gap-1 items-center"}>
                    <Textarea
                        disableAnimation
                        disableAutosize
                        classNames={{
                            input: "resize-y min-h-[12px]",
                        }}
                        color={"warning"}
                        disabled={loadingAIQuestion || editableSurvey?.status !== "DRAFT"}
                        label="Generate questions with AI ✨"
                        value={generateQuestionPrompt}
                        onChange={(e) => setGenerateQuestionPrompt(e.target.value)}
                    />
                    <Button
                        isIconOnly
                        color={"secondary"}
                        disabled={loadingAIQuestion || editableSurvey?.status !== "DRAFT"}
                        onClick={handleOpenAIRecommendation}
                    >
                        {loadingAIQuestion ? (
                            <i className="pi pi-spinner animate-spin" />
                        ) : (
                            <i className="pi pi-arrow-up" />
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default EditSurvey;
