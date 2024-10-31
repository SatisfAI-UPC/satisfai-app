import {Button, Card} from "@nextui-org/react";
import {Survey} from "../model/Survey.ts";
import formatDate from "../../shared/services/DateFormatter.ts";
import {Link} from "react-router-dom";


function CompanySurveyCard({ survey }: { survey: Survey }) {

    return (
        <Card className={"p-4"}>
            <Link to={`/company-surveys/${survey.id}/edit`}>
                <div className={"flex justify-between items-center"}>
                    <div className={"grid gap-2"}>
                        <div className={"font-medium text-lg truncate"}>
                            {survey.title}
                        </div>
                        <div className={"flex gap-1 text-grey items-center"}>
                            <i className={"pi pi-calendar"}/>
                            <div>Created {formatDate(survey.createdAt)}</div>
                        </div>
                    </div>
                    <div>
                        <Button isIconOnly className={"button-tertiary"}>
                            <i className={"pi pi-share-alt"}/>
                        </Button>
                    </div>
                </div>
            </Link>
        </Card>
    );
}

export default CompanySurveyCard;
