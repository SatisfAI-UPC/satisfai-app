// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {Card, Textarea, useDisclosure} from '@nextui-org/react';
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
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const getAIInsights = async () => {
        try {
            onOpen();
            setLoadingAIRecommendation(true); // Set loading state to true before the async call.
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
                                    {
                                        loadingAIRecommendation ? (
                                            <p>Loading AI insights...</p>
                                        ) : (
                                            <p>
                                                {insight}
                                            </p>
                                        )
                                    }
                                    {/*{*/}
                                    {/*    insights.map((insight) => (*/}
                                    {/*        <div key={insight.id}>*/}
                                    {/*            <h3>{insight.title}</h3>*/}
                                    {/*            <p>{insight.description}</p>*/}
                                    {/*        </div>*/}
                                    {/*    ))}*/}
                                    {/*<div className={"flex w-full gap-1 items-center"}>*/}
                                    {/*    <Textarea*/}
                                    {/*        disableAnimation*/}
                                    {/*        disableAutosize*/}
                                    {/*        classNames={{*/}
                                    {/*            input: "resize-y min-h-[12px]",*/}
                                    {/*        }}*/}
                                    {/*        color={"warning"}*/}
                                    {/*        disabled={loadingAIRecommendation}*/}
                                    {/*        label="Generate questions with AI ✨"*/}
                                    {/*        value={generateInsightPrompt}*/}
                                    {/*        onChange={(e) => setGenerateInsightPrompt(e.target.value)}*/}
                                    {/*    />*/}
                                    {/*    <Button*/}
                                    {/*        isIconOnly*/}
                                    {/*        color={"secondary"}*/}
                                    {/*        disabled={loadingAIRecommendation}*/}
                                    {/*        onClick={getAIInsights}*/}
                                    {/*    >*/}
                                    {/*        {loadingAIRecommendation ? (*/}
                                    {/*            <i className="pi pi-spinner animate-spin"/>*/}
                                    {/*        ) : (*/}
                                    {/*            <i className="pi pi-arrow-up"/>*/}
                                    {/*        )}*/}
                                    {/*    </Button>*/}
                                    {/*</div>*/}
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
                    if (!question.options || !survey.responses) {
                        return null;
                    }

                    const responseCounts = question.options.map((option) => ({
                        id: option,
                        label: option,
                        value: survey.responses.filter(
                            (response) => response.answers && response.answers[question.id] === option
                        ).length,
                    }));

                    return (
                        <Card key={question.id} className="w-full md:w-1/2 p-1 justify-center items-center">
                            <h3 className={"font-medium"}>{question.text}</h3>
                            <PieChart
                                className={""}
                                series={[
                                    {
                                        data: responseCounts,
                                        innerRadius: 80
                                    },
                                ]}
                                width={400}
                                height={400}
                            />
                        </Card>
                    );
                })
            )}
        </>
    );
}

export default SurveyResponses;
