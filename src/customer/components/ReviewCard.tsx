// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useState } from "react";
import { Avatar, Card, Button, Textarea } from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {CustomerReview} from "../model/CustomerReview";

function ReviewCard ({review, onUpdate, onDelete} : { review: CustomerReview, onUpdate: void , onDelete: void}) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editedDescription, setEditedDescription] = useState(review.description);
  const [editedRating, setEditedRating] = useState(review.rating);

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

  const renderModalStars = (currentRating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`pi ${i < currentRating ? "pi-star-fill" : "pi-star"}`}
        style={{
          fontSize: "20px",
          color: i < currentRating ? "#FABC3F" : "#E0E0E0",
          marginRight: "5px",
          cursor: "pointer",
          transition: "color 0.3s ease, transform 0.2s ease",
        }}
        onClick={() => setEditedRating(i + 1)}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      ></i>
    ));
  };

  const handleConfirm = async () => {
    try {
      await onUpdate(review.id, { description: editedDescription, grade: editedRating });
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to update review. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(review.id);
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error("Failed to delete review. Please try again.");
    }
  };

  return (
    <Card className="mb-4 border rounded-lg shadow-sm relative p-8">
      <div className="absolute top-2 right-2">
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly variant="light">
              <i className="pi pi-ellipsis-h" style={{ fontSize: "1.25rem" }}></i>
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Actions">
            <DropdownItem key="edit" onClick={() => setIsModalOpen(true)}>
              Edit review
            </DropdownItem>
            <DropdownItem key="view">
              <Link to={`/company/${review?.companyId}`} >
                View company
              </Link>
            </DropdownItem>
            <DropdownItem
              key="delete"
              color="danger"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Delete review
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <div className="flex items-start">
        <Avatar
          src={review.profilePictureUrl || undefined}
          name={typeof review.companyName === "string" ? review.companyName : "N/A"}
          alt="Company Logo"
          showFallback
          className="w-[72px] h-[72px] rounded-full"
        />
        <div className="ml-4">
          <h2 className="text-lg font-semibold">
            {review.companyName || "No name provided"}
          </h2>
          <div className="flex items-center text-[#FFC107] font-semibold mt-2 text-[16px]">
            <span>{review.rating.toFixed(1)}</span>
            <i
              className="pi pi-star-fill ml-1"
              style={{ fontSize: "16px", color: "#FFC107" }}
            ></i>
          </div>
        </div>
      </div>

      <div className="flex items-center mt-3 text-[#FFC107] text-[16px] font-semibold">
        <span>{review.rating.toFixed(1)}</span>
        <div className="flex ml-2">{renderStars(review.rating)}</div>
      </div>

      {review.title && <h3 className="text-[16px] font-semibold mt-3">{review.title}</h3>}

      <div className="mt-4">
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

      {review.response && (
        <div className="mt-6 border-t pt-4">
          <p className="text-[14px] font-bold">Reply from the owner</p>
          <p className="text-[14px] text-[#000] mt-2">{review.response}</p>
        </div>
      )}

      <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Edit Review</ModalHeader>
              <ModalBody>
                <div className="flex items-start">
                  <Avatar
                    src={review.profilePictureUrl || undefined}
                    name={typeof review.companyName === "string" ? review.companyName : "N/A"}
                    alt="Company Logo"
                    showFallback
                    className="w-[60px] h-[60px] rounded-full"
                  />
                  <div className="ml-4">
                    <h2 className="text-lg font-semibold">
                      {review.companyName || "No name provided"}
                    </h2>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-600">Rating</h3>
                  <div className="flex mt-2">{renderModalStars(editedRating)}</div>
                </div>
                <div className="mt-4">
                  <Textarea
                    label="Description"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    className="w-full"
                  />
                </div>
                <p className="text-center text-[#949CA9] text-[10px] font-medium mt-2">
                  Please be respectful rating companies
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={handleConfirm}>
                  Confirm
                </Button>
                <Button color="danger" onPress={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Are you sure you want to delete this review?</ModalHeader>
              <ModalFooter>
                <Button color="default" onPress={onClose}>
                  Keep
                </Button>
                <Button color="danger" onPress={handleDelete}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default ReviewCard;
