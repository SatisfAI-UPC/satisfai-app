// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useQuery } from "@tanstack/react-query";
import { fetchPublicCompanyById } from "../services/CompanyExploreService.ts";
import {Link, useParams} from "react-router-dom";
import PublicCompanyCard from "../components/PublicCompanyCard.tsx";
import {Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure} from "@nextui-org/react";
import ReviewCompanyForm from "../components/ReviewCompanyForm.tsx";
import {useSelector} from "react-redux";
import CompanyReviewsList from "../components/CompanyReviewsList.tsx";

const ExploreCompanyDetails = () => {
    const { id } = useParams();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const user = useSelector((state) => state.auth.user);

    const {
        status: companyStatus,
        error: companyError,
        data: company,
    } = useQuery({
        queryKey: ["company", id],
        queryFn: () => fetchPublicCompanyById(id),
    });

    if (companyStatus === "loading") {
        return <p>Loading...</p>;
    }

    if (companyStatus === "error") {
        return <p>Error: {companyError.message}</p>;
    }

    const onPublish = () => {
        onOpenChange(false);
    }

    return (
        <div>
            <h1 className={"page-title"}>Company Details</h1>
            {company && (
                <div>
                    <PublicCompanyCard
                        company={company} isDetails={true}/>
                    {
                        user?.role !== "COMPANY" && (
                            <div className={"flex gap-2 w-full my-4"}>
                                <Button className={"button-tertiary w-full"} variant="contained"
                                        isDisabled={!user}
                                        onPress={onOpen}>
                                    {
                                        user ? "Review" : "Login to Review"
                                    }
                                </Button>
                                <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
                                    {
                                        <ModalContent>
                                            <ModalHeader className="flex flex-col gap-1">Review</ModalHeader>
                                            <ModalBody>
                                                <ReviewCompanyForm company={company} onPublish={onPublish}/>
                                            </ModalBody>
                                        </ModalContent>
                                    }
                                </Modal>
                                <div className={"w-full"}>
                                    <Link to={`/company/surveys/${company?.id}`}>
                                        <Button
                                            className={"button-primary w-full"}
                                            variant="contained"
                                            color={"secondary"}
                                            rounded
                                            shadow>
                                            Surveys
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        )
                    }
                    <CompanyReviewsList
                        company={company}/>
                </div>
            )}
        </div>
    );
};

export default ExploreCompanyDetails;
