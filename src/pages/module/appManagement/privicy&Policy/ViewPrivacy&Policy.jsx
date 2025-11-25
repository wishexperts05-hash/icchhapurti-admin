import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import Button from "../../../../components/uiComponent/Button";

const ViewPrivacyPolicy = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Static dummy data
  const policyDetails = {
    role: "User",
    description: `
      <p>At <strong>[Your Business/Service Name]</strong>, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, store, and protect your data when you use our website, mobile application, or services.</p>
      
      <p><strong>Information We Collect:</strong> We may collect personal information such as your name, email address, phone number, date of birth, address, and financial information when you register, make transactions, or interact with our platform.</p>
      
      <p><strong>How We Use Your Information:</strong> Your information is used to provide and improve our services, process transactions, communicate with you, ensure security, and comply with legal obligations.</p>
      
      <p><strong>Data Security:</strong> We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.</p>
      
      <p><strong>Third-Party Sharing:</strong> We do not sell your personal information. We may share your data with trusted third-party service providers who assist us in operating our platform, subject to confidentiality agreements.</p>
      
      <p><strong>Your Rights:</strong> You have the right to access, correct, or delete your personal information. You may also opt out of marketing communications at any time.</p>
    `,
    createdAt: "2025-01-15",
  };

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
              {policyDetails.role}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-medium text-[#004AAD]">Created Date</span>
            <div className="px-3 py-3 border border-[#e65d00]/80 rounded-lg shadow-sm">
              {new Date(policyDetails.createdAt).toLocaleDateString("en-GB")}
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
              dangerouslySetInnerHTML={{ __html: policyDetails.description }}
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
            onClick={() => navigate(`/app-management/edit-privacy-policy/:id`)}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewPrivacyPolicy;