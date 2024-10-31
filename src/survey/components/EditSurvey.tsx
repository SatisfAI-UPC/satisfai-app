import { Button, Card, Textarea } from "@nextui-org/react";
import SurveyQuestionCard from "../components/SurveyQuestionCard.tsx";
import { useState } from "react";
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/dropdown";
import {toast} from "react-toastify";
import {generateOpenAISurveyQuestions} from "../services/OpenAIService.ts";
import {CreateSurveyQuestion} from "../model/CreateSurveyQuestion.ts";
import {useSelector} from "react-redux";

function EditSurvey({ editableSurvey, setEditableSurvey }) {
    const [generateQuestionPrompt, setGenerateQuestionPrompt] = useState("");

    const [loadingAIQuestion, setloadingAIQuestion] = useState(false);

    const user = useSelector((state) => state.auth.user);

    const handleAddQuestion = (questionType) => {
        const newQuestion = { text: "", type: questionType, options: [""], isMandatory: false };
        setEditableSurvey((prevSurvey) => ({
            ...prevSurvey,
            questions: [...prevSurvey.questions, newQuestion],
        }));
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
            toast(`There was an error generating questions ${error.message}, { type: "error" }`);
        } finally {
            setloadingAIQuestion(false);
        }
    };

    return (
        <div className="w-full md:w-1/2">
            {editableSurvey?.questions.map((question, index) => (
                <SurveyQuestionCard
                    key={question.id || index}
                    surveyQuestion={question}
                    onUpdate={updateQuestion}
                    onDelete={deleteQuestion}
                />
            ))}
            <div className={"flex flex-col items-center gap-2 w-full"}>
                <Dropdown>
                    <DropdownTrigger>
                        <Button className="w-full button-secondary mt-2">
                            Add Question
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                        <DropdownItem key="MULTIPLE_CHOICE"
                                      onPress={() => handleAddQuestion("MULTIPLE_CHOICE")}>
                            <i className={"pi pi-circle-off"}/> Multiple choice question
                        </DropdownItem>
                        <DropdownItem key="RATING"
                                      onPress={() => handleAddQuestion("RATING")}>
                            <i className={"pi pi-star"}/> Rating
                        </DropdownItem>
                        <DropdownItem key="TEXT"
                                      onPress={() => handleAddQuestion("TEXT")}>
                            <i className={"pi pi-align-justify"}/> Textbox
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
                            <i className="pi pi-spinner animate-spin"/>
                        ) : (
                            <i className="pi pi-arrow-up"/>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default EditSurvey;
