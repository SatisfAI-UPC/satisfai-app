// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {Avatar, Button, Card} from "@nextui-org/react";
import PublicQuestionCard from "./PublicQuestionCard.tsx";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchPublicCompanyById} from "../../explore/services/CompanyExploreService.ts";

export function SurveyPreviewModal({ survey }) {
    const [companyInfo, setCompanyInfo] = useState({
        name: "",
        avatar: "",
    });

    useEffect(() => {
        if (survey) {
            const fetchCompanyInfo = async () => {
                try {
                    const company = await fetchPublicCompanyById(survey.organizationId);
                    setCompanyInfo({
                        name: company?.name || "Unknown Company",
                        avatar: company?.profilePictureUrl || "",
                    });
                } catch (error) {
                    console.error("Error fetching company info:", error);
                }
            };

            fetchCompanyInfo();
        }
    }, [survey]);

    return (
        <div className="flex items-center justify-center p-2 md:p-8">
            <Card className="p-6 w-full grid gap-2">
                <>
                    <div className="grid gap-2">
                        <Avatar
                            src={companyInfo?.avatar}
                            alt={companyInfo?.name}
                            size="lg"
                            className="mx-auto"
                        />
                        <p className="text-center text-sm">{companyInfo?.name}</p>
                    </div>
                    <h1 className="text-2xl font-bold text-center text-tertiary">
                        {survey?.title}
                    </h1>
                    <p className="text-gray-500">{survey?.description}</p>
                    <div className="grid gap-2 mt-4">
                        {survey?.questions?.map((question) => (
                            <PublicQuestionCard
                                key={question.id}
                                surveyQuestion={question}
                                onResponseChange={()=>{}}
                            />
                        ))}
                    </div>
                    <Button
                        className="button-primary"
                        onClick={()=>{}}>
                        Submit
                    </Button>
                    <Link to={"/"} className={"text-center justify-center w-full flex mt-4 gap-2 items-center"}>
                        <p className={"text-primary text-sm font-medium"}>
                            Made with SatisfAI
                        </p>
                        <img
                            src={"../../src/assets/satisfai-icon.png"}
                            className={"w-2 md:w-4 h-auto"}
                            alt={"SatisfAI logo"}
                        />
                    </Link>
                </>
            </Card>
        </div>
    );
}