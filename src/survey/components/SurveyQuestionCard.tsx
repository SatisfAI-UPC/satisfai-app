// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Card, Textarea, Input, Button, Switch } from "@nextui-org/react";
import { useState } from "react";

function SurveyQuestionCard({ surveyQuestion, onUpdate, onDelete, onDeleteOption, isDisabled }) {
    const [editableQuestion, setEditableQuestion] = useState(surveyQuestion);

    const handleTextChange = (event) => {
        const updatedQuestion = { ...editableQuestion, text: event.target.value };
        setEditableQuestion(updatedQuestion);
        onUpdate(updatedQuestion);
    };

    const handleOptionChange = (index, newOption) => {
        const updatedOptions = [...editableQuestion.options];
        updatedOptions[index] = newOption;
        const updatedQuestion = { ...editableQuestion, options: updatedOptions };
        setEditableQuestion(updatedQuestion);
        onUpdate(updatedQuestion);
    };

    const handleMandatoryToggle = () => {
        const updatedQuestion = { ...editableQuestion, isMandatory: !editableQuestion.isMandatory };
        setEditableQuestion(updatedQuestion);
        onUpdate(updatedQuestion);
    };

    const addOption = () => {
        const updatedOptions = [...editableQuestion.options, ""];
        const updatedQuestion = { ...editableQuestion, options: updatedOptions };
        setEditableQuestion(updatedQuestion);
        onUpdate(updatedQuestion);
    };

    const handleOptionsDelete = (option:string) => {
        onDeleteOption(option);
        editableQuestion.options = editableQuestion.options.filter((opt) => opt !== option);
    }

    const renderInputField = (options) => {
        switch (editableQuestion.type) {
            case "TEXT":
                return (
                    <Textarea
                        label="Answer"
                        className="w-full"
                        placeholder="Enter your answer"
                        disabled
                    />
                );
            case "MULTIPLE_CHOICE":
                return (
                    <div className="flex flex-col gap-2 mt-2">
                        {options.map((option, index) => (
                            <div key={index} className={"flex gap-1 items-center"}>
                                <Input
                                    value={option}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                    placeholder={`Option ${index + 1}`}
                                    className="w-full"
                                    isDisabled={isDisabled}
                                />
                                <Button isIconOnly onClick={() => handleOptionsDelete(option)} isDisabled={isDisabled}>
                                    <i className="pi pi-trash" />
                                </Button>
                            </div>
                        ))}
                    </div>
                );
            case "RATING":
                return (
                    <div className="flex mt-2 justify-between w-1/2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <label key={rating} className="flex items-center gap-1">
                                <input type="radio" value={rating} disabled />
                                {rating}
                            </label>
                        ))}
                    </div>
                );
            default:
                return <div>Error loading question type</div>;
        }
    };

    return (
        <Card className="p-4 w-full">
            <div className="flex justify-between items-center gap-2">
                <Input
                    label="Question Text"
                    value={editableQuestion.text}
                    onChange={handleTextChange}
                    fullWidth
                    isDisabled={isDisabled}
                />
                <Button isIconOnly color="danger" onClick={() => onDelete(surveyQuestion.id)} isDisabled={isDisabled}>
                    <i className="pi pi-trash" />
                </Button>
            </div>
            <div className="text-grey mt-2">{renderInputField(editableQuestion?.options)}</div>
            <Button isIconOnly onClick={addOption} className={"mt-2"} isDisabled={isDisabled}>
                <i className="pi pi-plus" />
            </Button>
            <div className="mt-4">
                <label className="flex items-center gap-2">
                    <span>Mandatory:</span>
                    <Switch checked={editableQuestion.isMandatory} onChange={handleMandatoryToggle} isDisabled={isDisabled} />
                </label>
            </div>
        </Card>
    );
}

export default SurveyQuestionCard;
