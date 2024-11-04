import {Button, Card, Modal, ModalContent, useDisclosure} from "@nextui-org/react";
import {Survey} from "../model/Survey.ts";
import formatDate from "../../shared/services/DateFormatter.ts";
import {Link} from "react-router-dom";
import {ShareSurveyLinkModal} from "./ShareSurveyLinkModal.tsx";


function CompanySurveyCard({ survey }: { survey: Survey }) {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <>
            <Card className={"p-4"}>
                <div className={"flex justify-between items-center"}>
                    <Link to={`/company-surveys/${survey.id}/edit`} className={"flex-1 grid gap-2"}>
                        <div className={"flex gap-1 items-center"}>
                            <div
                                color={
                                    survey.status === "ACTIVE" ? "primary" : survey.status === "DRAFT" ? "default" : "error"
                                }
                            >
                                {
                                    survey.status === "ACTIVE" ?
                                        <i className={"pi pi-check"}/> :
                                        survey.status === "DRAFT" ?
                                            <i className={"pi pi-align-justify"}/> :
                                            <i className={"pi pi-times"}/>
                                }
                            </div>
                            <h1 className={"font-medium text-lg truncate"}>
                                {survey.title}
                            </h1>
                        </div>
                        <div className={"flex gap-1 text-grey items-center"}>
                            <i className={"pi pi-calendar"}/>
                            <div>Created {formatDate(survey.createdAt)}</div>
                        </div>
                    </Link>
                    <div className={"flex gap-1"}>
                        <Button
                            isIconOnly
                            className={"button-tertiary"}
                            isDisabled={survey.status !== "ACTIVE"}
                            onPress={onOpen}
                        >
                            <i className={"pi pi-share-alt"} />
                        </Button>
                    </div>
                </div>
            </Card>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={"outside"}>
                <ModalContent>
                    {
                        (onClose) =>
                            <ShareSurveyLinkModal surveyId={survey.id} onClose={onClose} />
                    }
                </ModalContent>
            </Modal>
        </>
    );
}

export default CompanySurveyCard;
