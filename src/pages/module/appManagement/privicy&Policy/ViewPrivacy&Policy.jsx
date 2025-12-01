import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import Button from "../../../../components/uiComponent/Button";
import usePrivacyPolicy from "../../../../hooks/appManagement/usePrivacyAndPolicy";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";

const ViewPrivacyPolicy = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    LoaderSpinner,
    privacyPolicyDetail,
    fetchPrivacyPolicyById,
    resetPrivacyPolicyDetails,
  } = usePrivacyPolicy();

  
  useEffect(() => {
    if (id) {
      fetchPrivacyPolicyById(id);
    }

    return () => {
      resetPrivacyPolicyDetails();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-GB");
    } catch {
      return "N/A";
    }
  };

  // Show loading spinner while fetching data
  if (LoaderSpinner&& !privacyPolicyDetail) {
    return (
      <div className="bg-[#F9F9F9] min-h-screen">
        <BreadCrumb
          linkText={[
            { text: "Privacy Policy", href: "/app-management/privacy-policy" },
            { text: "View Details" },
          ]}
        />
        <PagePath2 title="Privacy Policy Details" />
        <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 mt-4">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B00]"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show error message if no data found
  if (!LoaderSpinner && !privacyPolicyDetail) {
    return (
      <div className="bg-[#F9F9F9] min-h-screen">
        <BreadCrumb
          linkText={[
            { text: "Privacy Policy", href: "/app-management/privacy-policy" },
            { text: "View Details" },
          ]}
        />
        <PagePath2 title="Privacy Policy Details" />
        <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 mt-4">
          <div className="flex flex-col justify-center items-center py-20 text-gray-500">
            <p className="text-lg">Privacy Policy not found</p>
            <Button
              variant={2}
              text="Back to List"
              onClick={() => navigate("/app-management/privacy-policy")}
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
          { text: "Privacy Policy", href: "/app-management/privacy-policy" },
          { text: "View Details" },
        ]}
      />

      {/* Page Header */}
      <PagePath2 title="Privacy Policy Details" />

      {/* Main Card */}
      <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 mt-4">
        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 mb-6">
          <div className="flex flex-col gap-2">
            <span className="font-medium text-[#004AAD]">Role</span>
            <div className="px-3 py-3 border border-[#e65d00]/80 rounded-lg shadow-sm">
              {privacyPolicyDetail?.role || "N/A"}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-medium text-[#004AAD]">Created Date</span>
            <div className="px-3 py-3 border border-[#e65d00]/80 rounded-lg shadow-sm">
              {formatDate(privacyPolicyDetail?.createdAt)}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-200"></div>

        {/* Policy Content */}
        <div className="flex flex-col gap-2">
          <span className="font-medium text-[#004AAD]">Privacy Policy Content</span>
          <div className="px-4 py-4 border border-[#e65d00]/80 rounded-lg shadow-sm">
            <div
              className="prose max-w-none text-gray-700 leading-relaxed text-justify"
              dangerouslySetInnerHTML={{ 
                __html: privacyPolicyDetail?.content || "No content available" 
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
            onClick={() => navigate("/app-management/privacy-policy")}
          />
          <Button
            variant={1}
            text="Edit"
            onClick={() => navigate(`/app-management/edit-privacy-policy/${id}`)}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewPrivacyPolicy;