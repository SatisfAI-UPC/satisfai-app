import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {fetchSurveyById} from "../services/SurveyService.ts";
import {Button, Card, Input} from "@nextui-org/react";
import SurveyQuestionCard from "../components/SurveyQuestionCard.tsx";


function CompanySurveysDashboard() {
    const { id } = useParams();

    const {
        status,
        error,
        data: survey,
    } = useQuery({
        queryKey: ["survey", id],
        queryFn: () => fetchSurveyById(id),
        enabled: !!id
    });


    return (
        <>
            {status === 'loading' ? (
                <p>Loading...</p>
            ) : status === 'error' ? (
                <p>There was an error loading the survey</p>
            ) : (
                <div className={"grid gap-2 my-2"}>
                    <Card className="p-4">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <Input
                                label="Survey Title"
                                value={survey?.title || "Loading"}
                                startContent={<i className="pi pi-pencil text-secondary text-sm"/>}
                                fullWidth
                                className="md:w-2/3"
                            />
                            <div className="flex flex-col gap-2 md:flex-row md:gap-4 w-full md:w-auto">
                                <Button color="primary" className="w-full">
                                    <i className="pi pi-save mr-2"/>
                                    Save Changes
                                </Button>
                                <Button color="secondary" className="w-full">
                                    <i className="pi pi-eye mr-2"/>
                                    Preview
                                </Button>
                                <Button color="danger" className="w-full">
                                    <i className="pi pi-refresh mr-2"/>
                                    Reset Changes
                                </Button>
                            </div>
                        </div>
                    </Card>
                    <Card className={"p-4"}>
                        {survey?.questions?.map((question, index) => (
                            <div>
                                <SurveyQuestionCard
                                    key={index}
                                    surveyQuestion={question}
                                />
                            </div>
                        ))}

                        <Button className="button-primary my-2">
                            Save Changes
                        </Button>
                    </Card>
                </div>
            )}
        </>
    );
}

export default CompanySurveysDashboard;