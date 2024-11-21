import { Company } from "../model/PublicCompany.ts";
import { Avatar, Textarea } from "@nextui-org/react";
import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import {toast, ToastContainer} from "react-toastify";
import {useSelector} from "react-redux";
import {CreateReviewRequest} from "../model/CreateReviewRequest.ts";
import {createNewReview} from "../services/ReviewService.ts";

function ReviewCompanyForm({ company, onPublish }: { company: Company, onPublish: () => void }) {
    const [rating, setRating] = useState(5);
    const [reviewText, setReviewText] = useState("");
    const user = useSelector((state) => state.auth.user);

    const handleRatingClick = (star: number) => {
        setRating(star);
    };

    const publishReview = async(e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !user.id) {
            toast("You must be logged in to review", { type: "error" });
            return;
        }
        if (!company.id) {
            toast("Error with company", { type: "error" });
            return;
        }

        try {
            const createReviewRequest = {
                companyId: company.id,
                description: reviewText,
                customerId: user.id,
                grade: rating,
            } as CreateReviewRequest;

            console.log(createReviewRequest);

            const newReview = await createNewReview(createReviewRequest)
                .then(() => {
                    toast("Review created successfully", { type: "success" });
                    onPublish();
                })
                .catch((error) => {throw new Error(`Error creating review: ${error.message}`);});
        } catch (error) {
            toast(`There was an error creating a survey: ${error.message}`, { type: "error" });
        }


        console.log("Publishing review...");
        onPublish();
    };

    return (
        <>
            <ToastContainer/>
            <div className="flex flex-col w-full items-center p-4">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2 md:gap-4">
                        <Avatar
                            className="w-12 h-12 md:w-20 md:h-20 text-large"
                            alt={company?.name || "Company Avatar"}
                            src={company?.profilePictureUrl}
                        />
                        <div className="flex flex-col">
                            <h1 className="font-bold text-lg md:text-xl">{company.name || "-"}</h1>
                            <p className="font-medium">
                                5.0
                                <i className="pi pi-star-fill text-lg text-secondary"/>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full mb-4">
                    <h1 className="font-bold text-primary">Rating</h1>
                    <div className="flex gap-1">
                        {Array.from({length: 5}, (_, index) => (
                            <div
                                key={index}
                                className={`text-2xl cursor-pointer ${
                                    index < rating ? "text-yellow-500" : "text-gray-400"
                                }`}
                                onClick={() => handleRatingClick(index + 1)}
                            >
                                ★
                            </div>
                        ))}
                    </div>
                </div>
                <form className="w-full flex flex-col gap-2" onSubmit={publishReview}>
                    <h1 className="font-bold text-primary">Review</h1>
                    <Textarea
                        label="Review"
                        placeholder="Write your review here..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        className="mt-2"
                    />
                    <small className="text-grey text-center">Your review will be public</small>
                    <Button className="button-primary w-full" type="submit">
                        Submit
                    </Button>
                </form>
            </div>
        </>
    );
}

export default ReviewCompanyForm;
