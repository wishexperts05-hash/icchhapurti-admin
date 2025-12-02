import React, { useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import JoditEditor from "jodit-pro-react";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import Button from "../../../../components/uiComponent/Button";
import FormField from "../../../../components/uiComponent/FormField";
import useTermsAndConditions from "../../../../hooks/appManagement/useTermsAndConditions";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";
import useDropdown from "../../../../hooks/dropdown/useDropdown";

function CreateTermsAndConditions() {
  const navigate = useNavigate();
  const { id } = useParams();
  const editor = useRef(null);

  const {
    loading: termsLoading,
    termsDetail,
    addTerms,
    updateTerms,
    fetchTermsDetailById,
    resetTermsDetails,
  } = useTermsAndConditions();

  // Use dropdown hook for user types
  const {
    userType,
    loadingUser,
    fetchUserType,
  } = useDropdown();

  // Fetch terms details if editing
  useEffect(() => {
    if (id) {
      fetchTermsDetailById(id);
    }

    return () => {
      resetTermsDetails();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Fetch user types on mount
  useEffect(() => {
    fetchUserType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Convert userType from dropdown hook to options format with fallback
  const roleOptions = Array.isArray(userType) 
    ? userType.map((type) => ({
        label: type.name || type.label || type,
        value: type.value || type.name || type,
      }))
    : [
        { label: "User", value: "User" },
        { label: "Staff", value: "Staff" },
        { label: "Promoter", value: "Promoter" },
        { label: "Staff Vendor", value: "StaffVendor" },
      ];

  // Validation schema
  const validationSchema = Yup.object({
    role: Yup.string().required("Role is required"),
    content: Yup.string()
      .required("Terms and Conditions content is required")
      .test("not-empty", "Terms and Conditions content is required", (value) => {
        // Remove HTML tags and check if content is empty
        const strippedContent = value?.replace(/<[^>]*>/g, "").trim();
        return strippedContent && strippedContent.length > 0;
      }),
  });

  const handleSubmit = async (values) => {
    // Prepare form data according to API documentation
    const formData = {
      role: values.role,
      content: values.content,
      requestType: id ? "Update" : "Create",
    };

    let result;
    if (id) {
      // Update existing terms
      result = await updateTerms(id, formData);
    } else {
      // Create new terms
      result = await addTerms(formData);
    }

    // Navigate after successful operation
    if (result && result.success) {
      navigate("/app-management/terms-and-conditions");
    }
  };

  // Jodit editor configuration
  const config = {
    readonly: false,
    placeholder: "Start typing your terms and conditions content...",
    minHeight: 400,
    buttons: [
      "bold",
      "italic",
      "underline",
      "|",
      "ul",
      "ol",
      "|",
      "font",
      "fontsize",
      "brush",
      "|",
      "align",
      "undo",
      "redo",
      "|",
      "link",
      "table",
      "|",
      "hr",
      "symbol",
      "fullsize",
    ],
    removeButtons: ["file", "video", "ai-assistant"],
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    toolbarAdaptive: false,
  };

  // Show loading state while fetching data for edit mode
  if (id && termsLoading && !termsDetail) {
    return (
      <div className="bg-[#F9F9F9] min-h-screen">
        <BreadCrumb
          linkText={[
            { text: "App Management" },
            {
              text: "Terms and Conditions",
              href: "/app-management/terms-and-conditions",
            },
            { text: "Edit Terms and Conditions" },
          ]}
        />
        <PagePath2 title="Edit Terms and Conditions" />
        <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 mt-4">
          <div className="flex justify-center items-center py-20">
            <LoaderSpinner />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9F9F9] min-h-screen">
      {/* Breadcrumb Section */}
      {id ? (
        <BreadCrumb
          linkText={[
            { text: "App Management" },
            {
              text: "Terms and Conditions",
              href: "/app-management/terms-and-conditions",
            },
            {
              text: "View Details",
              href: `/app-management/terms-and-conditions/view/${id}`,
            },
            { text: "Edit Terms and Conditions" },
          ]}
        />
      ) : (
        <BreadCrumb
          linkText={[
            { text: "App Management" },
            {
              text: "Terms and Conditions",
              href: "/app-management/terms-and-conditions",
            },
            { text: "Create Terms and Conditions" },
          ]}
        />
      )}

      {/* Page Header */}
      <PagePath2
        title={id ? "Edit Terms and Conditions" : "Create Terms and Conditions"}
      />

      {/* Form Card */}
      <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 mt-4">
        <Formik
          initialValues={{
            role: termsDetail?.role || "",
            content: termsDetail?.content || "",
          }}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, isSubmitting, errors, touched }) => (
            <Form className="flex flex-col gap-6">
              {/* Role Dropdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
                <FormField
                  label="Select Role"
                  name="role"
                  fieldType="select"
                  options={roleOptions}
                  placeholder="Select Role"
                  loading={loadingUser}
                  disabled={loadingUser}
                  required
                />
              </div>

              {/* Terms and Conditions Editor */}
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium text-gray-700">
                  Terms and Conditions Content{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div
                  className={`border rounded-lg overflow-hidden ${
                    errors.content && touched.content
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <JoditEditor
                    ref={editor}
                    value={values.content}
                    config={config}
                    tabIndex={1}
                    onBlur={(newContent) => setFieldValue("content", newContent)}
                    onChange={() => {}}
                  />
                </div>
                <ErrorMessage
                  name="content"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center mt-6 gap-6">
                <Button
                  variant={2}
                  text="Cancel"
                  onClick={() =>
                    navigate("/app-management/terms-and-conditions")
                  }
                  disabled={termsLoading || isSubmitting}
                />
                <Button
                  variant={1}
                  text={
                    termsLoading || isSubmitting
                      ? id
                        ? "Updating..."
                        : "Creating..."
                      : id
                      ? "Update"
                      : "Create"
                  }
                  type="submit"
                  disabled={termsLoading || isSubmitting}
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