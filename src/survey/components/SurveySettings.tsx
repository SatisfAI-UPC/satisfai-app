// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {Button, Card, Switch} from "@nextui-org/react";
import {useEffect, useState} from "react";

function SurveySettings({ survey, deleteSurvey, switchPrivacy }) {

    const [isPublic, setIsPublic] = useState(survey?.isPublic);

    useEffect(() => {
        setIsPublic(survey?.isPublic);
    }, [survey?.isPublic]);

    const handleTogglePrivacy = () => {
        setIsPublic(!isPublic);
        switchPrivacy();
    };

    return (
        <>
            <Card className={"w-full md:w-1/2 p-4 grid gap-4"}>
                <div className={"flex gap-2 items-center"}>
                    <p>The status of your survey is </p>
                    {survey?.status === "DRAFT" ? (
                        <Button className={"w-32"}
                                startContent={<i className={"pi pi-align-justify"}/>}>
                            Draft
                        </Button>
                    ) : survey?.status === "ACTIVE" ? (
                        <Button color={"primary"} className={"w-32"} startContent={<i className={"pi pi-check"}/>}>
                            Published
                        </Button>
                    ) : survey?.status === "CLOSED" ? (
                        <Button color={"danger"} className={"w-32"} startContent={<i className={"pi pi-times"}/>}>
                            Closed
                        </Button>
                    ) : (
                        <Button color={"danger"} className={"w-32"} startContent={<i className={"pi pi-times"}/>}>
                            Error
                        </Button>
                    )}
                </div>
                <div className={"flex items-center"}>
                    <Switch
                        aria-label="show-in-public-profile"
                        checked={isPublic}
                        onChange={handleTogglePrivacy}
                    />
                    <span className={"text-lg"}>Show survey in public profile</span>
                </div>
            </Card>
            <Card color={"danger"}
                  className={"w-full md:w-1/2 p-4 grid gap-4"}
                  isBlurred
            >
                <h1 className={"text-lg font-medium text-red-700"}>Danger zone</h1>
                <p>Delete your survey. This action cannot be undone</p>
                <Button color={"danger"} onClick={deleteSurvey}>
                    Delete survey
                </Button>
            </Card>
        </>
    );
}

export default SurveySettings;
