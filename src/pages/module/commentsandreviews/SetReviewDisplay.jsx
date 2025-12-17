import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import Button from "../../../components/uiComponent/Button";
import DetailsField from "../../../components/uiComponent/DetailsField";
import useCommentandReviews from "../../../hooks/CommentandReviews/useCommentandReviews";

export default function SetReviewDisplay() {
  const { loading, fetchUserRating, userRating, updatingUserRating } = useCommentandReviews()
  const navigate = useNavigate();

  console.log
  useEffect(() => {
      fetchUserRating()
  }, [])

  console.log("userRating", userRating)
  const handleEdit = () => {
    navigate("/edit-review-display");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <BreadCrumb
        linkText={[
          { text: "Comment & Review", href: "/manage-comments" },
          { text: "Set Review Display" },
        ]}
      />

      {/* Page Title */}
      <PagePath2 title="Set Review Display" />

      {/* Form Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <div className="max-w-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Set Review to Display For User
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Reviews with Rating or Above
          </p>

          {/* Input Field */}

          <div className="flex items-center gap-4 mb-6">
            <DetailsField
              type="number"
              value={userRating}
              onChange={(e) => setReviewRating(e.target.value)}
              min="1"
              max="5"
              placeholder="Enter rating (1-5)"
            />

            {/* Edit Button */}

            <Button
              text="Edit"
              variant={2}
              onClick={handleEdit}
              className="w-full max-w-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
