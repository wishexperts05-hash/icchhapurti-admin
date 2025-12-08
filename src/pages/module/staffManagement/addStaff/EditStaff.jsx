import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../../../../components/uiComponent/FormField";
import Button from "../../../../components/uiComponent/Button";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";

const validationSchema = Yup.object().shape({
  staffName: Yup.string().required("Staff name is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Invalid phone number")
    .required("Phone number is required"),
  dob: Yup.date().required("Date of birth is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  location: Yup.string().required("Location is required"),
  referralCode: Yup.string().required("Referral code is required"),

  // Bank validation
  accountNumber: Yup.string().required("Account Number is required"),
  ifscCode: Yup.string().required("IFSC code is required"),
  accountType: Yup.string().required("Account Type is required"),
  accountHolderName: Yup.string().required("Account Holder Name is required"),
});

const EditStaff = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const initialValues = {
    staffName: "",
    phoneNumber: "",
    dob: "",
    email: "",
    location: "",
    referralCode: "",
    profileImage: null,
    accountNumber: "",
    ifscCode: "",
    accountType: "",
    accountHolderName: "",
    passbookOrChequeImage: null,
    passbookOrChequePreview: null,
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log("Staff Added:", values);
    alert("Staff added successfully!");
    resetForm();
    navigate("/staff-management");
  };

  const handleCancel = () => {
    navigate("/staff-management");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <BreadCrumb
        linkText={[
          { text: "Staff Management", href: "/staff-management" },
          { text: "Edit Staff" },
        ]}
      />

      <PagePath2
        title="Edit Staff"
        description="Fill in the staff details below to add new staff information."
      />

      <div className="bg-white shadow-md rounded-2xl p-6">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* ------------------ Profile Image Upload ------------------ */}
              <div className="col-span-1 sm:col-span-2 flex flex-col items-center">
                <div className="relative group">
                  {/* Remove Image Button */}
                  {preview && (
                    <button
                      type="button"
                      onClick={() => {
                        setPreview(null);
                        setFieldValue("profileImage", null);
                      }}
                      className="absolute -top-0 -right-0 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-md hover:bg-red-600"
                      title="Remove image"
                    >
                      ×
                    </button>
                  )}
                  {/* Image Display */}
                  {preview ? (
                    <img
                      src={preview}
                      alt="Profile Preview"
                      className="w-32 h-32 rounded-full object-cover border-4 border-primary-200 shadow-md transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full border-4 border-primary-200 flex items-center justify-center text-gray-500 bg-gray-100">
                      No Image
                    </div>
                  )}
                  {/* Upload Button */}
                  <label
                    htmlFor="profileImage"
                    className="absolute bottom-1 right-3 bg-primary-600 text-black text-sm rounded-full p-2 cursor-pointer shadow-lg hover:bg-primary-700 transition-colors"
                    title="Upload or change photo"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 5c.621 0 1.227.158 1.757.46l.598-.598A1 1 0 0115 4h2a1 1 0 01.928.629l.447 1.118A2 2 0 0020 7v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 011.625-1.96l.447-1.118A1 1 0 016 4h2a1 1 0 01.646.238l.598.598A3.985 3.985 0 0112 5z"
                      />
                      <circle cx="12" cy="13" r="3" />
                    </svg>
                  </label>

                  {/* File Input */}
                  <input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setFieldValue("profileImage", file);

                        const reader = new FileReader();
                        reader.onloadend = () => setPreview(reader.result);
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </div>
              </div>

              {/* ------------------ Form Fields ------------------ */}
              <FormField
                label="Staff Name"
                name="staffName"
                placeholder="Enter staff name"
              />

              <FormField
                label="Staff Phone Number"
                name="phoneNumber"
                placeholder="Enter phone number"
              />

              <FormField
                label="Date of Birth"
                name="dob"
                type="date"
                placeholder="Select date of birth"
              />

              <FormField
                label="Email ID"
                name="email"
                type="email"
                placeholder="Enter email address"
              />

              <FormField
                label="Staff Location"
                name="location"
                placeholder="Enter staff location"
              />

              <FormField
                label="Assign Referral Code"
                name="referralCode"
                placeholder="Enter referral code"
              />

              {/* ------------------ BANK DETAILS SECTION ------------------ */}
              <div className="mt-6 col-span-1 sm:col-span-2">
                {/* Title */}
                <div className="text-gray-800 text-2xl flex items-center gap-3 font-semibold mb-4">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 16H16M1 6.83333H16M2.66667 3.5L8.5 1L14.3333 3.5M1.83333 6.83333V16M15.1667 6.83333V16M5.16667 10.1667V12.6667M8.5 10.1667V12.6667M11.8333 10.1667V12.6667"
                      stroke="#0A051F"
                      strokeWidth="1.67"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Bank Details</span>
                </div>

                {/* Basic Bank Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="Account Number"
                    name="accountNumber"
                    type="text"
                    placeholder="Enter Account Number"
                  />
                  <FormField
                    label="IFSC Code"
                    name="ifscCode"
                    type="text"
                    placeholder="Enter IFSC Code"
                  />
                  <FormField
                    fieldType="select"
                    options={["Current", "Savings"]}
                    label="Account Type"
                    name="accountType"
                  />
                  <FormField
                    label="Account Holder Name"
                    name="accountHolderName"
                    type="text"
                    placeholder="Enter Account Holder Name"
                  />
                </div>

                {/* Bank Proof Upload */}
                <div className="mt-8">
                  <div className="text-gray-800 text-xl font-semibold mb-4">
                    Upload Bank Proof
                  </div>
                  <p className="text-gray-500 text-sm mb-4">
                    Upload either your <b>Bank Passbook</b> or a{" "}
                    <b>Cancelled Cheque</b> image.
                  </p>

                  <div className="flex flex-col items-center">
                    <div className="relative group">
                      <img
                        src={values.passbookOrChequePreview || " "}
                        alt="Bank Proof"
                        className="w-60 h-40 rounded-lg object-cover border border-gray-300 shadow-sm group-hover:shadow-md transition-all"
                      />

                      {/* Upload Button */}
                      <label
                        htmlFor="passbookOrChequeImage"
                        className="absolute bottom-2 right-2 bg-primary-600 text-black text-xs rounded-full p-2 cursor-pointer shadow-md hover:bg-primary-700 transition"
                      >
                        +
                      </label>

                      {/* File Input */}
                      <input
                        id="passbookOrChequeImage"
                        type="file"
                        accept="image/*,application/pdf"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setFieldValue("passbookOrChequeImage", file);

                            const reader = new FileReader();
                            reader.onloadend = () =>
                              setFieldValue(
                                "passbookOrChequePreview",
                                reader.result
                              );

                            reader.readAsDataURL(file);
                          }
                        }}
                      />

                      {/* Remove */}
                      {values.passbookOrChequePreview && (
                        <button
                          type="button"
                          onClick={() => {
                            setFieldValue("passbookOrChequeImage", null);
                            setFieldValue("passbookOrChequePreview", null);
                          }}
                          className="absolute top-2 right-2 bg-red-600 text-white text-xs rounded-full p-1 shadow-md hover:bg-red-700"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* ------------------ Buttons ------------------ */}
              <div className="col-span-1 sm:col-span-2 flex justify-center gap-4 mt-4">
                <Button
                  text="Cancel"
                  variant={2}
                  type="button"
                  onClick={handleCancel}
                />
                <Button text="Add Staff" type="submit" variant={1} />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default EditStaff;
