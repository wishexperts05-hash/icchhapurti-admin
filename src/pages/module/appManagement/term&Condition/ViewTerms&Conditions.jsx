import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import Button from "../../../../components/uiComponent/Button";

const ViewTermsAndConditions = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Static dummy data
  const termsDetails = {
    role: "User",
    description: `
      <p>Welcome to <strong>[Your Business/Service Name]</strong>. By accessing or using our website, mobile application, or services, you agree to comply with these Terms and Conditions. These terms govern your use of our platform and outline the legal obligations and responsibilities between you and <strong>[Your Business/Service Name]</strong>. By registering, accessing, or using any part of our platform, you acknowledge that you have read, understood, and agreed to be bound by these Terms and Conditions. If you do not agree to any part of these terms, you must refrain from using our services.</p>
      
      <p>To use our platform, you must be at least 18 years of age and provide accurate and up-to-date information during registration and throughout your interactions with us. You are responsible for maintaining the confidentiality of your account credentials and for all activities carried out under your account. Any misuse, fraudulent behavior, or violation of these terms may result in the suspension or termination of your account. You are strictly prohibited from engaging in any illegal or unauthorized activities, including attempts to bypass security measures or interfere with the operation of our platform.</p>
      
      <p>Our platform provides access to various services, including but not limited to financial tools, loans, and other digital offerings. Loan applications are subject to verification and eligibility criteria as outlined by <strong>[Your Business/Service Name]</strong> and our partner institutions. While we strive to ensure that eligibility information is clearly communicated, approval of loans is at our sole discretion. Meeting eligibility criteria does not guarantee loan approval.</p>
      
      <p>Using our platform may involve certain fees and charges, which will always be transparently communicated to you before completion of any service. Processing fees, late payment penalties, or other applicable charges may apply, and failure to meet repayment obligations could result in additional penalties or negatively impact your credit score.</p>
      
      <p>By using our services, you consent to the collection, storage, and processing of your personal data in accordance with our Privacy Policy. We are committed to safeguarding your data and ensuring that it is not shared with unauthorized third parties.</p>
    `,
    createdAt: "2025-01-15",
  };

  return (
    <div className="bg-[#F9F9F9] min-h-screen">
      {/* Breadcrumb Section */}
      <BreadCrumb
        linkText={[
          { text: "Terms and Conditions", href: "/app-management/terms-and-conditions" },
          { text: "View Details" },
        ]}
      />

      {/* Page Header */}
      <PagePath2 title="Terms and Conditions Details" />

      {/* Main Card */}
      <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 mt-4">
        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 mb-6">
          <div className="flex flex-col gap-2">
            <span className="font-medium text-[#004AAD]">Role</span>
            <div className="px-3 py-3 border border-[#e65d00]/80 rounded-lg shadow-sm">
              {termsDetails.role}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-medium text-[#004AAD]">Created Date</span>
            <div className="px-3 py-3 border border-[#e65d00]/80 rounded-lg shadow-sm">
              {new Date(termsDetails.createdAt).toLocaleDateString("en-GB")}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-200"></div>

        {/* Terms Content */}
        <div className="flex flex-col gap-2">
          <span className="font-medium text-[#004AAD]">Terms and Conditions Content</span>
          <div className="px-4 py-4 border border-[#e65d00]/80 rounded-lg shadow-sm">
            <div
              className="prose max-w-none text-gray-700 leading-relaxed text-justify"
              dangerouslySetInnerHTML={{ __html: termsDetails.description }}
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
            onClick={() => navigate(`/app-management/edit-terms-and-conditions/:id/`)}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewTermsAndConditions;