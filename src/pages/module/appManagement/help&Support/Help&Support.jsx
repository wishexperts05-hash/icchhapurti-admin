import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import Button from "../../../../components/uiComponent/Button";
import FormField from "../../../../components/uiComponent/FormField";

function HelpSupport() {
  const [isEditing, setIsEditing] = useState(false);
  
  // Use useState to store the contact number so it persists after saving
  const [supportData, setSupportData] = useState({
    contactNumber: "(480) 555-0102",
  });

  const validationSchema = Yup.object({
    contactNumber: Yup.string()
      .required("Contact number is required")
      .matches(/^[\d\s\-\(\)\+]+$/, "Invalid phone number format"),
  });

  const handleSubmit = (values) => {
    console.log("Form submitted:", values);
    // Update the stored data with new values
    setSupportData({
      contactNumber: values.contactNumber,
    });
    setIsEditing(false);
  };

  const handleCancel = (resetForm) => {
    setIsEditing(false);
    resetForm();
  };

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
            contactNumber: supportData.contactNumber,
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
                    />
                    <Button
                      variant={1}
                      text="Save"
                      type="submit"
                    />
                  </>
                ) : (
                  <Button
                    variant={1}
                    text="Edit"
                    type="button"
                    onClick={() => setIsEditing(true)}
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