import React, { useRef } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import JoditEditor from "jodit-pro-react";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import Button from "../../../../components/uiComponent/Button"; // ✅ Your custom Button

const EditTermsAndConditions = () => {
  const navigate = useNavigate();
  const editor = useRef(null);

  // Initial content (this will be editable)
  const initialContent = `
  Welcome to [Your Business/Service Name]. By accessing or using our website, mobile application, or services, you agree to comply with these Terms and Conditions. These terms govern your use of our platform and outline the legal obligations and responsibilities between you and [Your Business/Service Name]. By registering, accessing, or using any part of our platform, you acknowledge that you have read, understood, and agreed to be bound by these Terms and Conditions. If you do not agree to any part of these terms, you must refrain from using our services.
  
  To use our platform, you must be at least 18 years of age and provide accurate and up-to-date information during registration and throughout your interactions with us. You are responsible for maintaining the confidentiality of your account credentials and for all activities carried out under your account. Any misuse, fraudulent behavior, or violation of these terms may result in the suspension or termination of your account. You are strictly prohibited from engaging in any illegal or unauthorized activities, including attempts to bypass security measures or interfere with the operation of our platform.
  
  Our platform provides access to various services, including but not limited to financial tools, loans, and other digital offerings...
  `;

  // Validation schema
  const validationSchema = Yup.object({
    description: Yup.string().required("Terms and Conditions content is required."),
  });

  return (
    <div className="bg-[#F9F9F9] min-h-screen ">
      {/* Breadcrumb Section */}
      <BreadCrumb
        linkText={[
          { text: "Terms and Conditions", href: "/app-management/termandcondition" },
          { text: "Edit Terms and Conditions" },
        ]}
      />

      {/* Page Header */}
      <PagePath2 title="Edit Terms and Conditions" />

      {/* Main Card */}
      <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 mt-4 ">
        <Formik
          initialValues={{
            description: initialContent,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Updated Terms & Conditions:", values);
            navigate("/app-management/termandcondition"); 
          }}
        >
          {({ values, setFieldValue, handleSubmit }) => (
            <Form onSubmit={handleSubmit} className="space-y-6">
              {/* Editor */}
              <div>
                
                <JoditEditor
                  ref={editor}
                  value={values.description}
                  onBlur={(newContent) => setFieldValue("description", newContent)}
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-center gap-4 pt-6">
                <Button
                  text="Cancel"
                  variant={2}
                  onClick={() => navigate("/app-management/termandcondition")}
                />
                <Button text="Update" type="submit" variant={1} />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditTermsAndConditions;
