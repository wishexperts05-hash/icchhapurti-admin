import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import FormField from "../../../../components/uiComponent/FormField";
import Button from "../../../../components/uiComponent/Button";
import useUserManagement from "../../../../hooks/userManagement/userUserManagement";
import { FaRegUser } from "react-icons/fa6";
import { useState } from "react";
import user from "../../../../assets/profile.png";

function CreateHostelOwner() {
  const { createHostelowner } = useUserManagement();
  const navigate = useNavigate();

  const [profilePreview, setProfilePreview] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  // const [aadhaarCard, setAadhaarCard] = useState(null);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    address: Yup.string().required("Address is required"),
    street: Yup.string().required("Street is required"),
    postalCode: Yup.string()
      .matches(/^[0-9]{6}$/, "Postal Code must be 6 digits")
      .required("Postal Code is required"),
    // Optional Bank Fields
    accountNumber: Yup.string().required("Account number must be 11 digits"),
    ifscCode: Yup.string()
      .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code")
      .required("IFSC code is required"),
    accountType: Yup.string()
      .oneOf(["Current", "Savings"], "Invalid account type")
      .required("account type required"),
    accountHolderName: Yup.string().required("Account holder name required"),
  });

  return (
    <div className="flex flex-col font-inter">
      {/* Breadcrumb */}
      <BreadCrumb
        linkText={[
          { text: "User Management" },
          { text: "PG/Hostel Owner", href: "/pg-hostel-owner" },
          { text: "Create New PG/Hostel Owner" },
        ]}
      />

      <PagePath2 title="Create New PG/Hostel Owner" />

      <div className="bg-white border border-gray-200 shadow-sm mt-4 rounded-2xl p-4">
        <Formik
          initialValues={{
            name: "",
            phone: "",
            email: "",
            password: "",
            address: "",
            street: "",
            postalCode: "",
            accountNumber: "",
            ifscCode: "",
            accountType: "",
            accountHolderName: "",
            identityType: "aadhaar", // default selection
            aadhaarFront: null,
            aadhaarFrontPreview: null,
            aadhaarBack: null,
            aadhaarBackPreview: null,
            panCard: null,
            panCardPreview: null,
            passbookOrChequeImage: null,
            passbookOrChequePreview: null,
            supportiveDocuments: [],
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            const formData = new FormData();

            formData.append("fullName", values.name);
            formData.append("phoneNumber", values.phone);
            formData.append("email", values.email);
            formData.append("password", values.password);
            formData.append("addresses[0][address]", values.address);
            formData.append("addresses[0][street]", values.street);
            formData.append("addresses[0][postCode]", values.postalCode);
            formData.append(
              "bankDetails[accountNumber]",
              values.accountNumber || ""
            );
            formData.append("bankDetails[ifscCode]", values.ifscCode || "");
            formData.append(
              "bankDetails[accountType]",
              values.accountType || ""
            );
            formData.append(
              "bankDetails[accountHolderName]",
              values.accountHolderName || ""
            );

            if (profileImage) formData.append("profileImage", profileImage);
            // if (aadhaarCard) formData.append("aadhaarCard", aadhaarCard);

            if (values.passbookOrChequeImage)
              formData.append(
                "passbookOrChequeImage",
                values.passbookOrChequeImage
              );

            // formData.append("identityType", values.identityType);

            if (values.identityType === "aadhaar") {
              if (values.aadhaarFront)
                formData.append("aadhaarFront", values.aadhaarFront);
              if (values.aadhaarBack)
                formData.append("aadhaarBack", values.aadhaarBack);
            }

            if (values.identityType === "pan") {
              if (values.panCard) formData.append("panCard", values.panCard);
            }

            if (
              values.supportiveDocuments &&
              values.supportiveDocuments.length > 0
            ) {
              values.supportiveDocuments.forEach((doc, index) => {
                if (doc.file) {
                  formData.append(`supportingDocuments[${index}]`, doc.file || "");
                  formData.append(
                    `supportingDocumentsName[${index}]`,
                    doc.name || ""
                  );
                }
              });
            }
            console.log("✅ FormData:", [...formData.entries()]);
            await createHostelowner(formData);
          }}
        >
          {({ resetForm, values, setFieldValue }) => (
            <Form className="space-y-6">
              {/* --- Profile Image Upload --- */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative group">
                  <img
                    src={profilePreview || user}
                    alt="Profile Preview"
                    className="w-32 h-32 rounded-full object-cover border-4 border-primary-200 shadow-md transition-transform group-hover:scale-105"
                  />
                  <label
                    htmlFor="profileImage"
                    className="absolute bottom-0 right-0 bg-primary-600 text-black text-sm rounded-full p-2 cursor-pointer shadow-lg hover:bg-primary-700 transition-colors"
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
                  <input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setProfileImage(file);
                        const reader = new FileReader();
                        reader.onloadend = () =>
                          setProfilePreview(reader.result);
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  {profilePreview && (
                    <button
                      type="button"
                      onClick={() => {
                        setProfilePreview(null);
                        setProfileImage(null);
                      }}
                      className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-2xl p-1 shadow-md hover:bg-red-700 transition-colors"
                      title="Remove photo"
                    >
                      ✕
                    </button>
                  )}
                </div>
                <p className="text-gray-600 text-sm mt-2">
                  {profilePreview
                    ? "Click to update photo"
                    : "Upload Profile Photo"}
                </p>
              </div>

              {/* --- Basic Info --- */}
              <div>
                <div className="text-gray-800 text-2xl flex items-center gap-3 font-semibold mb-4">
                  <FaRegUser className="text-primary-600" />
                  <span>Basic Information</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Name" name="name" type="text" />
                  <FormField label="Phone Number" name="phone" type="text" />
                  <FormField label="Email" name="email" type="email" />
                  <FormField label="Password" name="password" type="password" />
                  <FormField label="Address" name="address" type="text" />
                  <FormField label="Street" name="street" type="text" />
                  <FormField
                    label="Postal Code"
                    name="postalCode"
                    type="text"
                  />
                </div>
              </div>
              {/* --- Bank Details --- */}
              {/* --- Bank Details --- */}
              <div className="mt-6">
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
                  <span>Bank Details </span>
                </div>

                {/* Basic Bank Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="Account Number"
                    name="accountNumber"
                    type="text"
                  />
                  <FormField label="IFSC Code" name="ifscCode" type="text" />
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
                  />
                </div>

                {/* --- Single Bank Proof Upload --- */}
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
                      <label
                        htmlFor="passbookOrChequeImage"
                        className="absolute bottom-2 right-2 bg-primary-600 text-black text-xs rounded-full p-2 cursor-pointer shadow-md hover:bg-primary-700 transition"
                      >
                        +
                      </label>
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
              {/* --- Identity Proof Section --- */}
              <div className="mt-8">
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
                  <span>Identity Proof</span>
                </div>

                {/* Select Identity Type */}
                <div className="flex items-center gap-6 mb-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="identityType"
                      value="aadhaar"
                      checked={values.identityType === "aadhaar"}
                      onChange={(e) =>
                        setFieldValue("identityType", e.target.value)
                      }
                    />
                    Aadhaar Card
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="identityType"
                      value="pan"
                      checked={values.identityType === "pan"}
                      onChange={(e) =>
                        setFieldValue("identityType", e.target.value)
                      }
                    />
                    PAN Card
                  </label>
                </div>

                {/* Aadhaar Upload Fields */}
                {values.identityType === "aadhaar" && (
                  <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                    {/* Aadhaar Front */}
                    <div className="flex flex-col items-center">
                      <label className="text-sm text-gray-700 font-medium mb-2">
                        Aadhaar Front
                      </label>
                      <div className="relative group">
                        <img
                          src={values.aadhaarFrontPreview || " "}
                          alt="Aadhaar Front"
                          className="w-60 h-40 rounded-lg object-cover border border-gray-300 shadow-sm group-hover:shadow-md transition-all"
                        />
                        <label
                          htmlFor="aadhaarFront"
                          className="absolute bottom-2 right-2 bg-primary-600 text-black text-xs rounded-full p-2 cursor-pointer shadow-md hover:bg-primary-700 transition"
                        >
                          +
                        </label>
                        <input
                          id="aadhaarFront"
                          type="file"
                          accept="image/*,application/pdf"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setFieldValue("aadhaarFront", file);
                              const reader = new FileReader();
                              reader.onloadend = () =>
                                setFieldValue(
                                  "aadhaarFrontPreview",
                                  reader.result
                                );
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        {values.aadhaarFrontPreview && (
                          <button
                            type="button"
                            onClick={() => {
                              setFieldValue("aadhaarFront", null);
                              setFieldValue("aadhaarFrontPreview", null);
                            }}
                            className="absolute top-2 right-2 bg-red-600 text-white text-xs rounded-full p-1 shadow-md hover:bg-red-700"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Aadhaar Back */}
                    <div className="flex flex-col items-center">
                      <label className="text-sm text-gray-700 font-medium mb-2">
                        Aadhaar Back
                      </label>
                      <div className="relative group">
                        <img
                          src={values.aadhaarBackPreview || " "}
                          alt="Aadhaar Back"
                          className="w-60 h-40 rounded-lg object-cover border border-gray-300 shadow-sm group-hover:shadow-md transition-all"
                        />
                        <label
                          htmlFor="aadhaarBack"
                          className="absolute bottom-2 right-2 bg-primary-600 text-black text-xs rounded-full p-2 cursor-pointer shadow-md hover:bg-primary-700 transition"
                        >
                          +
                        </label>
                        <input
                          id="aadhaarBack"
                          type="file"
                          accept="image/*,application/pdf"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setFieldValue("aadhaarBack", file);
                              const reader = new FileReader();
                              reader.onloadend = () =>
                                setFieldValue(
                                  "aadhaarBackPreview",
                                  reader.result
                                );
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        {values.aadhaarBackPreview && (
                          <button
                            type="button"
                            onClick={() => {
                              setFieldValue("aadhaarBack", null);
                              setFieldValue("aadhaarBackPreview", null);
                            }}
                            className="absolute top-2 right-2 bg-red-600 text-white text-xs rounded-full p-1 shadow-md hover:bg-red-700"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* PAN Upload Field */}
                {values.identityType === "pan" && (
                  <div className="flex flex-col items-center">
                    <label className="text-sm text-gray-700 font-medium mb-2">
                      PAN Card Upload
                    </label>
                    <div className="relative group">
                      <img
                        src={
                          values.panCardPreview ||
                          " "
                        }
                        alt="PAN Card"
                        className="w-60 h-40 rounded-lg object-cover border border-gray-300 shadow-sm group-hover:shadow-md transition-all"
                      />
                      <label
                        htmlFor="panCard"
                        className="absolute bottom-2 right-2 bg-primary-600 text-black text-xs rounded-full p-2 cursor-pointer shadow-md hover:bg-primary-700 transition"
                      >
                        +
                      </label>
                      <input
                        id="panCard"
                        type="file"
                        accept="image/*,application/pdf"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setFieldValue("panCard", file);
                            const reader = new FileReader();
                            reader.onloadend = () =>
                              setFieldValue("panCardPreview", reader.result);
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      {values.panCardPreview && (
                        <button
                          type="button"
                          onClick={() => {
                            setFieldValue("panCard", null);
                            setFieldValue("panCardPreview", null);
                          }}
                          className="absolute top-2 right-2 bg-red-600 text-white text-xs rounded-full p-1 shadow-md hover:bg-red-700"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* --- Supportive Documents (Optional) --- */}
              <div className="mt-12">
                {/* Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-primary-50 rounded-md">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-primary-600"
                    >
                      <path
                        d="M1 16H16M1 6.83333H16M2.66667 3.5L8.5 1L14.3333 3.5M1.83333 6.83333V16M15.1667 6.83333V16M5.16667 10.1667V12.6667M8.5 10.1667V12.6667M11.8333 10.1667V12.6667"
                        stroke="currentColor"
                        strokeWidth="1.67"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Supportive Documents{" "}
                      <span className="text-gray-400 text-base">
                        (Optional)
                      </span>
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Upload up to <b>10 files</b> such as property proof,
                      agreements, etc.
                    </p>
                  </div>
                </div>

                {/* Document Rows */}
                <div className="space-y-4">
                  {values.supportiveDocuments.map((doc, index) => (
                    <div
                      key={index}
                      className="flex flex-col md:flex-row items-center justify-between gap-6 border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
                    >
                      {/* Left: Preview */}
                      <div className="w-20 h-20 flex items-center justify-center bg-gray-50 border border-dashed border-gray-300 rounded-md overflow-hidden">
                        {doc.preview ? (
                          <img
                            src={doc.preview}
                            alt="preview"
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-7 h-7 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 4.5v15m7.5-7.5h-15"
                            />
                          </svg>
                        )}
                      </div>

                      {/* Center: Document info (Label + Input + File name) */}
                      <div className="flex flex-col items-center justify-center text-center flex-1">
                        <label
                          htmlFor={`docName-${index}`}
                          className="text-xs font-semibold text-gray-600 mb-1"
                        >
                          Uploading Document Name
                        </label>
                        <input
                          id={`docName-${index}`}
                          type="text"
                          placeholder="Enter document name"
                          value={doc.name || ""}
                          onChange={(e) => {
                            const updated = [...values.supportiveDocuments];
                            updated[index].name = e.target.value;
                            setFieldValue("supportiveDocuments", updated);
                          }}
                          className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400 text-center w-56 transition"
                        />
                        <span className="text-xs text-gray-500 mt-1">
                          {doc.file?.name || "No file selected"}
                        </span>
                      </div>

                      {/* Right: Buttons */}
                      <div className="flex items-center justify-center gap-2">
                        {/* Upload */}
                        <label
                          htmlFor={`supportiveFile-${index}`}
                          className="flex items-center gap-2 bg-primary-50 text-primary-700 text-xs px-4 py-2 rounded-md border border-primary-200 cursor-pointer hover:bg-blue-100 transition"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 4.5v15m7.5-7.5h-15"
                            />
                          </svg>
                          Upload
                        </label>
                        <input
                          id={`supportiveFile-${index}`}
                          type="file"
                          accept="image/*,application/pdf"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                const updated = [...values.supportiveDocuments];
                                updated[index].file = file;
                                updated[index].preview = reader.result;
                                setFieldValue("supportiveDocuments", updated);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />

                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() =>
                            setFieldValue(
                              "supportiveDocuments",
                              values.supportiveDocuments.filter(
                                (_, i) => i !== index
                              )
                            )
                          }
                          className="text-red-600 border border-red-200 text-xs px-3 py-2 rounded-md hover:bg-red-50 transition"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add More Button */}
                <div className="flex justify-center mt-6">
                  <button
                    type="button"
                    disabled={values.supportiveDocuments.length >= 10}
                    onClick={() =>
                      setFieldValue("supportiveDocuments", [
                        ...values.supportiveDocuments,
                        { name: "", file: null, preview: null },
                      ])
                    }
                    className="flex items-center gap-2 text-primary-700 text-sm font-medium border border-primary-500 px-4 py-2 rounded-md hover:bg-primary-50 disabled:opacity-50"
                  >
                    <span className="text-lg">＋</span> Add Document
                  </button>
                </div>
              </div>

              {/* --- Buttons --- */}
              <div className="flex justify-center gap-4 mt-6">
                <Button
                  variant={2}
                  text="Cancel"
                  onClick={() => {
                    resetForm();
                    setTimeout(() => navigate("/pg-hostel-owner"), 0);
                  }}
                />
                <Button variant={1} type="submit" text="Create" />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default CreateHostelOwner;
