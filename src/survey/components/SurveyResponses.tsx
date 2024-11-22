// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {Card, Divider, useDisclosure} from '@nextui-org/react';
import { PieChart } from '@mui/x-charts/PieChart';
import {Button} from "@nextui-org/button";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "@nextui-org/modal";
import {toast} from "react-toastify";
import {useState} from "react";
import {generateOpenAISurveyResponsesRecommendation} from "../services/OpenAIService.ts";

function SurveyResponses({ survey }) {
    const [insight, setInsight] = useState(null);
    const [loadingAIRecommendation, setLoadingAIRecommendation] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const getAIInsights = async () => {
        try {
            onOpen();
            setLoadingAIRecommendation(true);
            const response = await generateOpenAISurveyResponsesRecommendation(survey.id);
            setInsight(response.content || "No insights available");
        } catch (error) {
            toast(`Error getting AI insights: ${error.message || "Unknown error"}`, { type: "error" });
        } finally {
            setLoadingAIRecommendation(false);
        }
    };

    if (!survey || !survey.questions) {
        return <p>Loading survey data...</p>;
    }

    return (
        <>
            <div className={"w-full md:w-1/2"}>
                <div className={"grid gap-2 items-center text-center"}>
                    <h1 className={"page-title"}>Survey Responses</h1>
                    <p>
                        Number of responses:&nbsp;
                        <span>{survey.responses ? survey.responses.length : 0}</span>
                    </p>
                    <Button onClick={getAIInsights} className={"button-secondary w-full"}>
                        Get AI Insights
                    </Button>
                </div>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"5xl"}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">AI Insights✨</ModalHeader>
                                <ModalBody>
                                    {loadingAIRecommendation ? (
                                        <p>Loading AI insights...</p>
                                    ) : (
                                        <p>{insight}</p>
                                    )}
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" onPress={onClose}>
                                        Close
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>

            {survey.responses && survey.responses.length < 1 ? (
                <p>No responses yet. Check back later.</p>
            ) : (
                survey.questions.map((question) => {
                    const isTextQuestion = question.type === "TEXT";
                    const questionResponses = survey.responses.map(
                        (response) => response.answers && response.answers[question.id]
                    );

                    return (
                        <Card key={question.id} className="w-full md:w-1/2 p-1 justify-center items-center">
                            <div className={"p-2"}>
                                <h1 className={"font-medium page-title text-tertiary"}>{question.text}</h1>
                            </div>
                            <Divider/>
                            {isTextQuestion ? (
                                <div className="text-responses">
                                    {questionResponses.length > 0 ? (
                                        <ul className="max-h-96 overflow-y-auto rounded-md shadow-sm p-3">
                                            {questionResponses.map((textResponse, index) => (
                                                <li
                                                    key={index}
                                                    className="response-item p-4 border-b last:border-b-0 text-gray-700 hover:bg-gray-100"
                                                >
                                                    {textResponse || "No response"}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No responses yet for this question.</p>
                                    )}
                                </div>
                            ) : (
                                <PieChart
                                    series={[
                                        {
                                            data: question.options.map((option) => ({
                                                id: option,
                                                label: option,
                                                value: questionResponses.filter((r) => r === option).length,
                                            })),
                                            innerRadius: 80,
                                        },
                                    ]}
                                    width={400}
                                    height={400}
                                />
                            )}
                        </Card>
                    );
                })
            )}
        </>
    );
}

export default SurveyResponses;
