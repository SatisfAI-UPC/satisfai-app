import { CreateSurveyQuestion } from "../model/CreateSurveyQuestion.ts";
import {Card, Textarea} from "@nextui-org/react";
import {SurveyDetails} from "../model/SurveyDetails.ts";

function SurveyQuestionCard({ surveyQuestion }: { surveyQuestion: SurveyDetails }) {
    const renderInputField = () => {
        switch (surveyQuestion.type) {
            case "TEXT":
                return (
                    <Textarea
                        label="Answer"
                        className="w-full"
                    />
                );
            case "MULTIPLE_CHOICE":
                return (
                    <div className="flex flex-col gap-2 mt-2">
                        {surveyQuestion.options?.map((option, index) => (
                            <label key={index} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    value={option}
                                    className="mr-2"
                                />
                                {option}
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
                                    value={rating}
                                />
                                {rating}
                            </label>
                        ))}
                    </div>
                );
            default:
                return (
                    <div>Error loading questions</div>
                );
        }
    };

    return (
        <Card className="p-4">
            <h1 className="font-medium">
                {surveyQuestion.text}
                <span className="font-bold text-primary">
                    {surveyQuestion.isMandatory ? " *" : ""}
                </span>
            </h1>
            <div className="text-grey mt-2">{renderInputField()}</div>
        </Card>
    );
}

export default SurveyQuestionCard;