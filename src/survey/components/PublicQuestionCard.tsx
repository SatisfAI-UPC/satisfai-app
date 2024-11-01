import { Card, Textarea } from "@nextui-org/react";
import { useState } from "react";

function PublicQuestionCard({ surveyQuestion, onResponseChange }) {
    const [response, setResponse] = useState("");

    const handleChange = (e) => {
        const { value } = e.target;
        setResponse(value);
        onResponseChange(surveyQuestion.id, value);
    };

    const renderInputField = () => {
        switch (surveyQuestion.type) {
            case "TEXT":
                return (
                    <Textarea
                        label="Answer"
                        className="w-full"
                        value={response}
                        onChange={handleChange}
                    />
                );
            case "MULTIPLE_CHOICE":
                return (
                    <div className="flex flex-col gap-2 mt-2">
                        {surveyQuestion.options?.map((option, index) => (
                            <label key={index} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name={`question-${surveyQuestion.id}`}
                                    value={option}
                                    checked={response === option}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                <span>{option}</span>
                            </label>
                        ))}
                    </div>
                );
            case "RATING":
                return (
                    <div className="flex gap-1 mt-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <label key={rating} className="flex items-center gap-1">
                                <input
                                    type="radio"
                                    name={`question-${surveyQuestion.id}`}
                                    value={rating}
                                    checked={response === rating.toString()}
                                    onChange={handleChange}
                                />
                                <span>{rating}</span>
                            </label>
                        ))}
                    </div>
                );
            default:
                return <div>Error loading question</div>;
        }
    };

    return (
        <Card className="p-4">
            <h1 className="font-medium">
                {surveyQuestion.text.trim() === "" ? "Untitled" : surveyQuestion.text}
                {surveyQuestion.isMandatory && <span className="text-red-500"> *</span>}
            </h1>
            <div className="text-grey mt-2">{renderInputField()}</div>
        </Card>
    );
}

export default PublicQuestionCard;
