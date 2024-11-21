import {PublicSurvey} from "../model/PublicSurvey.ts";
import {Avatar, Card} from "@nextui-org/react";
import {Company} from "../model/PublicCompany.ts";
import formatDate from "../../shared/services/DateFormatter.ts";
import {Link} from "react-router-dom";
import {Button} from "@nextui-org/button";

function CompanyActiveSurveyCard({ survey,company }: { survey: PublicSurvey, company: Company }) {
    if (!survey || !company) {
        return null;
    }

    return (
        <Card className="p-8">
            <div className={"flex justify-between items-center"}>
                <div>
                    <div className={"flex justify-between items-center mb-4"}>
                        <div className={"flex items-center gap-2 md:gap-4"}>
                            <Avatar className={"w-4 h-4 md:w-20 md:h-20 text-large"}
                                    alt={company?.name}
                                    src={company?.profilePictureUrl}
                            />
                            <div className={"flex flex-col"}>
                                <h1 className={"font-bold text-lg md:text-xl"}>{company.name || "-"}</h1>
                                <Link to={`/company/${company.id}`}>
                                    <p className={"text-primary font-bold"}>
                                        See company <i className={"pi pi-chevron-right"}/>
                                    </p>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <h2 className={"font-bold"}>{survey?.title}</h2>
                        <small className={"text-grey"}>Created {formatDate(survey?.createdAt)}</small>
                    </div>
                </div>
                <Link to={`/public-survey/${survey.id}`}>
                    <Button className={"button-primary"}>
                        Start survey
                    </Button>
                </Link>
            </div>
        </Card>
    );
}

export default CompanyActiveSurveyCard;