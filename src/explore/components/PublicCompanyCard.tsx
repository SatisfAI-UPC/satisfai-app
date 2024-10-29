import {Company} from "../model/PublicCompany.ts";
import {Button, Card, Image} from "@nextui-org/react";
import {Link} from "react-router-dom";

const PublicCompanyCard = ({ company }: { company: Company }, isDetails: boolean) => {
    return (
            <Card className="p-4 md:p-6 hover:cursor-pointer">
                <Link to={`/company/${company.id}`}>
                    <div className={"flex justify-between items-center"}>
                        <div className={"flex items-center gap-2 md:gap-4"}>
                            <Image src={company.profilePictureUrl}
                                   alt={company.name + " logo"}
                                   className={"w-12 md:w-24 h-auto rounded-full"}
                            />
                            <div className={"flex flex-col"}>
                                <h1 className={"font-bold text-lg md:text-xl"}>{company.name}</h1>
                                <p className={"font-medium"}>5.0 <i
                                    className={"pi pi-star-fill text-lg text-secondary"}/></p>
                            </div>
                        </div>
                        {
                            !isDetails &&
                            <div className={"flex gap-2"}>
                                <Button className={"button-tertiary"} variant="contained"
                                        onClick={() => {
                                            console.log("Building")
                                        }}>
                                    Review
                                </Button>
                                <Link to={`/`}>
                                    <Button
                                        className={"button-primary"}
                                        variant="contained"
                                        color={"secondary"}
                                        rounded
                                        shadow>
                                        Surveys
                                    </Button>
                                </Link>
                            </div>
                        }
                    </div>
                    <div className={"flex md:justify-between gap-2"}>
                        <div>
                            <h2 className={"font-bold text-primary"}>
                                Location
                            </h2>
                            <p className={"truncate"}>{company.country}</p>
                        </div>
                        <div>
                            <h2 className={"font-bold text-primary"}>
                                Industry
                            </h2>
                            <p className={"truncate"}>{company.industry}</p>
                        </div>
                        <div>
                            <h2 className={"font-bold text-primary"}>
                                Reviews
                            </h2>
                            <p className={"truncate"}>1.0K</p>
                        </div>
                    </div>
                    <div>
                        <h2 className={"font-bold text-primary"}>
                            Description
                        </h2>
                        <p className={"truncate"}>{company.description}</p>
                    </div>
                </Link>
            </Card>
    );
}

export default PublicCompanyCard;