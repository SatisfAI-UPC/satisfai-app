import {useQuery} from "@tanstack/react-query";
import {fetchReviewsByCompanyId} from "../services/ReviewService.ts";
import {Company} from "../model/PublicCompany.ts";
import {Card} from "@nextui-org/react";


function CompanyReviewsList({ company }: { company: Company }) {
    const {
        status: reviewsStatus,
        error: reviewsError,
        data: reviews,
    } = useQuery({
        queryKey: ["reviews", company.id],
        queryFn: () => fetchReviewsByCompanyId(company.id),
    });

    if (reviewsStatus === "loading") {
        return <p>Loading...</p>;
    }

    if (reviewsStatus === "error") {
        return <p>Error: {reviewsError.message}</p>;
    }

    return (
        <>
            <h1 className={"page-title"}>Reviews</h1>
            <div className={"grid gap-2"}>
                {
                    reviews && reviews.reverse().map((review) => (
                        <Card key={review.id} className={"flex flex-col gap-2 p-4"}>
                            <div className={"flex items-center gap-2"}>
                                <h1 className={"font-bold text-lg"}>{review.customerName}</h1>
                                <div className={"flex gap-2 items-baseline"}>
                                    {Array.from({length: review.grade}, (_, index) => (
                                        <i key={index} className="pi pi-star-fill text-lg text-secondary"/>
                                    ))}
                                    <p className={"font-bold text-secondary"}>
                                        {review.grade}.0
                                    </p>
                                </div>
                            </div>
                            <p>{review.description}</p>
                        </Card>
                    ))
                }
            </div>
        </>
    );
}

export default CompanyReviewsList;