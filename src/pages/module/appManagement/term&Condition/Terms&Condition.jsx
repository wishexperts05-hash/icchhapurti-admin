import React from "react";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import Button from "../../../../components/uiComponent/Button"; 
import { useNavigate } from "react-router-dom";
const TermsAndConditions = () => {
    const navigate = useNavigate();
  return (
    <div className="bg-[#F9F9F9] min-h-screen ">
      {/* Breadcrumb Section */}
      <BreadCrumb
        linkText={[
          { text: "Terms and Conditions" },
        ]}
      />

      {/* Page Header */}
      <PagePath2 title="Terms and Conditions" />

      {/* Terms Content Card */}
      <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 mt-4 ">
        <div className="space-y-4 text-gray-700 leading-relaxed text-justify">
          <p>
            Welcome to <strong>[Your Business/Service Name]</strong>. By
            accessing or using our website, mobile application, or services, you
            agree to comply with these Terms and Conditions. These terms govern
            your use of our platform and outline the legal obligations and
            responsibilities between you and{" "}
            <strong>[Your Business/Service Name]</strong>. By registering,
            accessing, or using any part of our platform, you acknowledge that
            you have read, understood, and agreed to be bound by these Terms and
            Conditions. If you do not agree to any part of these terms, you must
            refrain from using our services.
          </p>

          <p>
            To use our platform, you must be at least 18 years of age and
            provide accurate and up-to-date information during registration and
            throughout your interactions with us. You are responsible for
            maintaining the confidentiality of your account credentials and for
            all activities carried out under your account. Any misuse,
            fraudulent behavior, or violation of these terms may result in the
            suspension or termination of your account. You are strictly
            prohibited from engaging in any illegal or unauthorized activities,
            including attempts to bypass security measures or interfere with the
            operation of our platform.
          </p>

          <p>
            Our platform provides access to various services, including but not
            limited to financial tools, loans, and other digital offerings. Loan
            applications are subject to verification and eligibility criteria as
            outlined by <strong>[Your Business/Service Name]</strong> and our
            partner institutions. While we strive to ensure that eligibility
            information is clearly communicated, approval of loans is at our
            sole discretion. Meeting eligibility criteria does not guarantee
            loan approval. Details such as interest rates, repayment terms, and
            applicable fees will be disclosed during the loan application
            process. It is your responsibility to review and accept these terms
            before proceeding with any transactions.
          </p>

          <p>
            Using our platform may involve certain fees and charges, which will
            always be transparently communicated to you before completion of any
            service. Processing fees, late payment penalties, or other
            applicable charges may apply, and failure to meet repayment
            obligations could result in additional penalties or negatively
            impact your credit score. We strongly encourage you to review all
            financial terms carefully to ensure they align with your capacity to
            meet repayment deadlines.
          </p>

          <p>
            By using our services, you consent to the collection, storage, and
            processing of your personal data in accordance with our Privacy
            Policy. We are committed to safeguarding your data and ensuring that
            it is not shared with unauthorized third parties. However, certain
            third-party service providers may require access to your information
            to facilitate our services. In such cases, these parties are bound
            by confidentiality agreements to protect your data.
          </p>

          <p>
            All content on our platform, including text, images, graphics,
            designs, and software, is either owned by or licensed to{" "}
            <strong>[Your Business/Service Name]</strong>. Unauthorized
            reproduction, distribution, or modification of any materials on the
            platform is strictly prohibited and may result in legal action.
            While we make reasonable efforts to ensure that all information on
            our platform is accurate, we do not warrant the completeness,
            reliability, or timeliness of the content provided.
          </p>

          <p>
            Our platform may include links to external third-party websites or
            services. These links are provided for your convenience, but{" "}
            <strong>[Your Business/Service Name]</strong> does not control or
            endorse such third-party content and shall not be responsible for
            any damages or losses arising from your use of them.
          </p>
        </div>

        {/* Edit Button using reusable component */}
        <div className="flex justify-center mt-6">
          <Button
            text="Edit"
            variant={1} 
            onClick={() => navigate("/app-management/edittermandcondition")}
          />
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;