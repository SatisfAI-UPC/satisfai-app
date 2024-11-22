// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {Company} from "../model/PublicCompany.ts";
import {Avatar, Card} from "@nextui-org/react";
import {Link} from "react-router-dom";

const PublicCompanyCard = ({ company }: { company: Company }) => {
    return (
            <Card className="p-4 md:p-6 hover:cursor-pointer">
                <Link to={`/company/${company.id}`}>
                    <div className={"flex justify-between items-center mb-4"}>
                        <div className={"flex items-center gap-2 md:gap-4"}>
                            <Avatar className={"w-12 h-12 md:w-20 md:h-20 text-large"}
                                    alt={company?.name}
                                    src={company?.profilePictureUrl}
                            />
                            <div className={"flex flex-col"}>
                                <h1 className={"font-bold text-lg md:text-xl"}>{company.name || "-" }</h1>
                                <p className={"font-medium"}>5.0
                                    <i className={"pi pi-star-fill text-lg text-secondary"}/>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={"flex md:justify-between gap-2"}>
                        <div>
                            <h2 className={"font-bold text-primary"}>
                                Location
                            </h2>
                            <p className={"truncate"}>{company.country || "-"}</p>
                        </div>
                        <div>
                            <h2 className={"font-bold text-primary"}>
                                Industry
                            </h2>
                            <p className={"truncate"}>{company.industry || "-"}</p>
                        </div>
                        <div>
                            <h2 className={"font-bold text-primary"}>
                                Reviews
                            </h2>
                            <p className={"truncate"}>-</p>
                        </div>
                    </div>
                    <div>
                        <h2 className={"font-bold text-primary"}>
                            Description
                        </h2>
                        <p className={"truncate"}>{company.description || "-"}</p>
                    </div>
                </Link>
            </Card>
    );
}

export default PublicCompanyCard;