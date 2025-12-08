import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import Button from "../../../../components/uiComponent/Button";
import FormField from "../../../../components/uiComponent/FormField";
import useHelpSupport from "../../../../hooks/appManagement/useHelpAndSupport";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";

function HelpSupport() {
  const [isEditing, setIsEditing] = useState(false);
  const {
    loading,
    contactNumber,
    getHelpSupportContact,
    updateHelpSupportContact,
  } = useHelpSupport();

  // Fetch contact number on component mount
  useEffect(() => {
    getHelpSupportContact();
  }, []);

  const validationSchema = Yup.object({
    contactNumber: Yup.string()
      .required("Contact number is required")
      .matches(/^[\d\s\-\(\)\+]+$/, "Invalid phone number format"),
  });

  const handleSubmit = async (values) => {
    const result = await updateHelpSupportContact(values.contactNumber);
    if (result && result.success) {
      setIsEditing(false);
    }
  };

  const handleCancel = (resetForm) => {
    setIsEditing(false);
    resetForm();
  };

  // Show loader while fetching initial data
  if (loading && !contactNumber) {
    return (
      <div className="bg-[#F9F9F9] min-h-screen">
        <BreadCrumb
          linkText={[
            { text: "App Management" },
            { text: "Help & Support Number" },
          ]}
        />
        <PagePath2 title="Help & Support Number" />
        <div className="flex items-center justify-center min-h-[400px]">
          <LoaderSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9F9F9] min-h-screen">
      <BreadCrumb
        linkText={[
          { text: "App Management" },
          { text: "Help & Support Number" },
        ]}
      />

      <PagePath2 title="Help & Support Number" />

      {/* Form Card */}
      <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 mt-4">
        <Formik
          initialValues={{
            contactNumber: contactNumber || "",
          }}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ resetForm }) => (
            <Form className="flex flex-col gap-6">
              <div className="w-full max-w-md">
                <FormField
                  label="Contact Number"
                  name="contactNumber"
                  fieldType="input"
                  type="text"
                  placeholder="Enter contact number"
                  disabled={!isEditing}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center mt-5 gap-6">
                {isEditing ? (
                  <>
                    <Button
                      variant={2}
                      text="Cancel"
                      type="button"
                      onClick={() => handleCancel(resetForm)}
                      disabled={loading}
                    />
                    <Button
                      variant={1}
                      text={loading ? "Saving..." : "Save"}
                      type="submit"
                      disabled={loading}
                    />
                  </>
                ) : (
                  <Button
                    variant={1}
                    text="Edit"
                    type="button"
                    onClick={() => setIsEditing(true)}
                    disabled={loading}
                  />
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default HelpSupport;