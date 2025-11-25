import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import JoditEditor from "jodit-pro-react";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import Button from "../../../../components/uiComponent/Button";
import FormField from "../../../../components/uiComponent/FormField";

function CreatePrivacyPolicy() {
  const navigate = useNavigate();
  const { id } = useParams();
  const editor = useRef(null);

  // Static dropdown options for roles
  const roleOptions = [
    { label: "User", value: "User" },
    { label: "Staff", value: "Staff" },
    { label: "Promoter", value: "Promoter" },
    { label: "Admin", value: "Admin" },
  ];

  // Static data for edit mode
  const policyDetails = id
    ? {
        role: "User",
        description: `<p>At <strong>[Your Business/Service Name]</strong>, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, store, and protect your data when you use our website, mobile application, or services.</p>
        <p><strong>Information We Collect:</strong> We may collect personal information such as your name, email address, phone number, date of birth, address, and financial information when you register, make transactions, or interact with our platform.</p>`,
      }
    : null;

  // Validation schema
  const validationSchema = Yup.object({
    role: Yup.string().required("Role is required"),
    description: Yup.string().required("Privacy Policy content is required"),
  });

  const handleSubmit = (values) => {
    console.log("Form submitted:", values);
    navigate("/app-management/privacy-policy");
  };

  return (
    <div className="bg-[#F9F9F9] min-h-screen">
      {/* Breadcrumb Section */}
      {id ? (
        <BreadCrumb
          linkText={[
            { text: "Privacy Policy", href: "/app-management/privacy-policy" },
            { text: "View Details", href: `/app-management/privacy-policy/view/${id}` },
            { text: "Edit Privacy Policy" },
          ]}
        />
      ) : (
        <BreadCrumb
          linkText={[
            { text: "Privacy Policy", href: "/app-management/privacy-policy" },
            { text: "Create Privacy Policy" },
          ]}
        />
      )}

      {/* Page Header */}
      <PagePath2 title={id ? "Edit Privacy Policy" : "Create Privacy Policy"} />

      {/* Form Card */}
      <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 mt-4">
        <Formik
          initialValues={{
            role: policyDetails?.role || "",
            description: policyDetails?.description || "",
          }}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className="flex flex-col gap-6">
              {/* Role Dropdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
                <FormField
                  label="Select Role"
                  name="role"
                  fieldType="select"
                  options={roleOptions}
                  placeholder="Select Role"
                />
              </div>

              {/* Privacy Policy Editor */}
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium">
                  Privacy Policy Content <span className="text-red-500">*</span>
                </label>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <JoditEditor
                    ref={editor}
                    value={values.description}
                    onBlur={(newContent) => setFieldValue("description", newContent)}
                  />
                </div>
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center mt-5 gap-6">
                <Button
                  variant={2}
                  text="Cancel"
                  onClick={() => navigate("/app-management/privacy-policy")}
                />
                <Button
                  variant={1}
                  text={id ? "Update" : "Create"}
                  type="submit"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default CreatePrivacyPolicy;
