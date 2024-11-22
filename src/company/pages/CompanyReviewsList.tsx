import {Company} from "../../explore/model/PublicCompany.ts";
import {useQuery} from "@tanstack/react-query";
import {fetchReviewsByCompanyId} from "../../explore/services/ReviewService.ts";
import {Avatar, Card} from "@nextui-org/react";
import {useState} from "react";

function CompanyReviewsList({ company }: { company: Company }) {
    const [showFullDescription, setShowFullDescription] = useState(false);

    const {
        status: reviewsStatus,
        error: reviewsError,
        data: reviews,
    } = useQuery({
        queryKey: ["reviews"],
        queryFn: () => fetchReviewsByCompanyId(company?.id),
    });

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <i
                key={i}
                className={`pi ${i < rating ? "pi-star-fill" : "pi-star"}`}
                style={{
                    fontSize: "20px",
                    color: i < rating ? "#FFC107" : "#E0E0E0",
                    marginRight: "5px",
                }}
            ></i>
        ));
    };

    return (
        <div>
            <h1 className={"page-title"}>Reviews</h1>
            {
                reviewsStatus === "loading" && <p>Loading reviews...</p> ||
                reviewsStatus === "error" && <p>Error loading reviews: {reviewsError.message}</p> ||
                reviewsStatus === "success" && reviews && reviews.length === 0 && <p>No reviews found</p> ||
                reviewsStatus === "success" && reviews && reviews.map(review => (
                    <Card key={review.id} className={"p-2 md:p-4 m-2"}>
                        <div className={"flex flex-col gap-1"}>
                            <h1 className={"page-title"}>
                                {review.title || "-"}
                            </h1>
                            <div className="flex items-baseline text-secondary font-semibold">
                                {review.grade}.0
                                <div className="flex ml-2">{renderStars(review.grade)}</div>
                            </div>
                            <div className="">
                                <p className="text-[14px]">
                                    {showFullDescription
                                        ? review.description
                                        : review.description.length > 100
                                            ? `${review.description.substring(0, 100)}...`
                                            : review.description}
                                </p>
                                {review.description.length > 100 && (
                                    <span
                                        onClick={() => setShowFullDescription(!showFullDescription)}
                                        className="text-[10px] text-[#79747E] cursor-pointer mt-2 block"
                                    >
                                    {showFullDescription ? "Show less" : "Read more"}
                                </span>
                                )}
                            </div>
                        </div>
                    </Card>
                ))
            }
        </div>
    );
}

export default CompanyReviewsList;