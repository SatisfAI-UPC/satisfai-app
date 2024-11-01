import {Card, Switch} from "@nextui-org/react";

function SurveyResponses({ survey }) {
    return (
        <>
            <div>Survey Responses {survey.id}</div>
            <Card className={"w-full md:w-1/2"}>
                <div>
                    <Switch aria-label="Automatic updates"/>
                </div>
            </Card>
        </>
    );
}

export default SurveyResponses;
