import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import Button from "../../../../components/uiComponent/Button";
import useTermsAndConditions from "../../../../hooks/appManagement/useTermsAndConditions";

const ViewTermsAndConditions = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    loading,
    termsDetail,
    fetchTermsDetailById,
    resetTermsDetails,
  } = useTermsAndConditions();

  // Fetch terms details on component mount
  useEffect(() => {
    if (id) {
      fetchTermsDetailById(id);
    }

    return () => {
      resetTermsDetails();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Format date helper function
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return "N/A";
    }
  };

  // Format time helper function
  const formatTime = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return "N/A";
    }
  };

  // Show loading spinner while fetching data
  if (loading && !termsDetail) {
    return (
      <div className="bg-[#F9F9F9] min-h-screen">
        <BreadCrumb
          linkText={[
            { text: "App Management" },
            {
              text: "Terms and Conditions",
              href: "/app-management/terms-and-conditions",
            },
            { text: "View Details" },
          ]}
        />
        <PagePath2 title="Terms and Conditions Details" />
        <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 mt-4">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B00]"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show error message if no data found
  if (!loading && !termsDetail) {
    return (
      <div className="bg-[#F9F9F9] min-h-screen">
        <BreadCrumb
          linkText={[
            { text: "App Management" },
            {
              text: "Terms and Conditions",
              href: "/app-management/terms-and-conditions",
            },
            { text: "View Details" },
          ]}
        />
        <PagePath2 title="Terms and Conditions Details" />
        <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 mt-4">
          <div className="flex flex-col justify-center items-center py-20 text-gray-500">
            <p className="text-lg">Terms and Conditions not found</p>
            <Button
              variant={2}
              text="Back to List"
              onClick={() => navigate("/app-management/terms-and-conditions")}
              className="mt-4"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9F9F9] min-h-screen">
      {/* Breadcrumb Section */}
      <BreadCrumb
        linkText={[
          { text: "App Management" },
          {
            text: "Terms and Conditions",
            href: "/app-management/terms-and-conditions",
          },
          { text: "View Details" },
        ]}
      />

      {/* Page Header */}
      <PagePath2 title="Terms and Conditions Details" />

      {/* Main Card */}
      <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 mt-4">
        {/* Info Section - Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 mb-6">
          {/* ID */}
          <div className="flex flex-col gap-2">
            <span className="font-medium text-[#004AAD]">ID</span>
            <div className="px-3 py-3 border border-[#e65d00]/80 rounded-lg shadow-sm bg-gray-50">
              {termsDetail?._id || "N/A"}
            </div>
          </div>

          {/* Role */}
          <div className="flex flex-col gap-2">
            <span className="font-medium text-[#004AAD]">Role</span>
            <div className="px-3 py-3 border border-[#e65d00]/80 rounded-lg shadow-sm bg-gray-50">
              {termsDetail?.role || "N/A"}
            </div>
          </div>

          {/* Created At Date */}
          <div className="flex flex-col gap-2">
            <span className="font-medium text-[#004AAD]">Created Date</span>
            <div className="px-3 py-3 border border-[#e65d00]/80 rounded-lg shadow-sm bg-gray-50">
              {formatDate(termsDetail?.createdAt)}
            </div>
          </div>

          {/* Created At Time */}
          <div className="flex flex-col gap-2">
            <span className="font-medium text-[#004AAD]">Created Time</span>
            <div className="px-3 py-3 border border-[#e65d00]/80 rounded-lg shadow-sm bg-gray-50">
              {formatTime(termsDetail?.createdAt)}
            </div>
          </div>

          {/* Updated At Date */}
          <div className="flex flex-col gap-2">
            <span className="font-medium text-[#004AAD]">Updated Date</span>
            <div className="px-3 py-3 border border-[#e65d00]/80 rounded-lg shadow-sm bg-gray-50">
              {formatDate(termsDetail?.updatedAt)}
            </div>
          </div>

          {/* Updated At Time */}
          <div className="flex flex-col gap-2">
            <span className="font-medium text-[#004AAD]">Updated Time</span>
            <div className="px-3 py-3 border border-[#e65d00]/80 rounded-lg shadow-sm bg-gray-50">
              {formatTime(termsDetail?.updatedAt)}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-200"></div>

        {/* Terms Content */}
        <div className="flex flex-col gap-3">
          <span className="font-medium text-[#004AAD] text-lg">
            Terms and Conditions Content
          </span>
          <div className="px-4 py-4 border border-[#e65d00]/80 rounded-lg shadow-sm bg-gray-50">
            <div
              className="prose max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: termsDetail?.content || "<p>No content available</p>",
              }}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-200"></div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-6">
          <Button
            variant={2}
            text="Back"
            onClick={() => navigate("/app-management/terms-and-conditions")}
          />
          <Button
            variant={1}
            text="Edit"
            onClick={() =>
              navigate(`/app-management/edit-terms-and-conditions/${id}`)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ViewTermsAndConditions;