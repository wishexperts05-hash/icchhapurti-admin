import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import JoditEditor from "jodit-pro-react";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import Button from "../../../../components/uiComponent/Button";
import FormField from "../../../../components/uiComponent/FormField";

function CreateTermsAndConditions() {
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
  const termsDetails = id
    ? {
        role: "User",
        description: `<p>Welcome to <strong>[Your Business/Service Name]</strong>. By accessing or using our website, mobile application, or services, you agree to comply with these Terms and Conditions. These terms govern your use of our platform and outline the legal obligations and responsibilities between you and <strong>[Your Business/Service Name]</strong>.</p>
        <p>To use our platform, you must be at least 18 years of age and provide accurate and up-to-date information during registration and throughout your interactions with us.</p>`,
      }
    : null;

  // Validation schema
  const validationSchema = Yup.object({
    role: Yup.string().required("Role is required"),
    description: Yup.string().required("Terms and Conditions content is required"),
  });

  const handleSubmit = (values) => {
    console.log("Form submitted:", values);
    navigate("/app-management/terms-and-conditions");
  };

  return (
    <div className="bg-[#F9F9F9] min-h-screen">
      {/* Breadcrumb Section */}
      {id ? (
        <BreadCrumb
          linkText={[
            { text: "Terms and Conditions", href: "/app-management/terms-and-conditions" },
            { text: "View Details", href: `/app-management/terms-and-conditions/view/${id}` },
            { text: "Edit Terms and Conditions" },
          ]}
        />
      ) : (
        <BreadCrumb
          linkText={[
            { text: "Terms and Conditions", href: "/app-management/terms-and-conditions" },
            { text: "Create Terms and Conditions" },
          ]}
        />
      )}

      {/* Page Header */}
      <PagePath2 title={id ? "Edit Terms and Conditions" : "Create Terms and Conditions"} />

      {/* Form Card */}
      <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 mt-4">
        <Formik
          initialValues={{
            role: termsDetails?.role || "",
            description: termsDetails?.description || "",
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

              {/* Terms and Conditions Editor */}
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium">
                  Terms and Conditions Content <span className="text-red-500">*</span>
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
                  onClick={() => navigate("/app-management/terms-and-conditions")}
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

export default CreateTermsAndConditions;