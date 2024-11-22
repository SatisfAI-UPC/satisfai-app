// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {Avatar, Card} from "@nextui-org/react";
import {PublicReview} from "../model/PublicReview.ts";

function CompanyReviewsList({ reviews }: { reviews: PublicReview[] }) {

    if (!reviews) {
        return <p>Loading reviews...</p>;
    }

    return (
        <>
            <h1 className={"page-title"}>Reviews</h1>
            <div className={"grid gap-2"}>
                {
                    reviews && reviews?.slice().reverse().map((review) => (
                        <Card key={review.id} className={"flex flex-col gap-2 p-4"}>
                            <div className={"grid items-center gap-2"}>
                                <div className={"flex gap-4 items-center"}>
                                    <Avatar src={""} size={"large"} />
                                    <h1 className={"font-bold text-lg"}>{review.title || "-"}</h1>
                                </div>
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