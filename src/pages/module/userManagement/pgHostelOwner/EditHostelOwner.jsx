import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import FormField from "../../../../components/uiComponent/FormField";
import useUserManagement from "../../../../hooks/userManagement/userUserManagement";
import { Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../../components/uiComponent/Button";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";
import user from "../../../../assets/profile.png";
import * as Yup from "yup";

function EditHostelOwner() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    loading,
    fetchSelectedPGOwner,
    selectedPgOwner,
    updatePGHostelOwner,
  } = useUserManagement();

  const [profilePreview, setProfilePreview] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  // const [aadhaarFront, setAadhaarFront] = useState(null);
  // const [aadhaarBack, setAadhaarBack] = useState(null);
  // const [aadhaarCard, setAadhaarCard] = useState(null);

  useEffect(() => {
    fetchSelectedPGOwner(id);
  }, [id]);

  const data = selectedPgOwner || {};

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
    postCode: Yup.string()
      .matches(/^[0-9]{6}$/, "Postal Code must be 6 digits")
      .required("Postal Code is required"),

    // Optional Bank Fields
    accountNumber: Yup.string().nullable(),
    ifscCode: Yup.string()
      .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code")
      .nullable(),
    accountType: Yup.string()
      .oneOf(["Current", "Savings"], "Invalid account type")
      .nullable(),
    accountHolderName: Yup.string().nullable(),
  });

  return (
    <div className="flex flex-col gap-1 font-inter">
      <BreadCrumb
        linkText={[
          { text: "User Management" },
          { text: "PG/Hostel Owner", href: "/pg-hostel-owner" },
          { text: "Edit PG/Hostel Owner" },
        ]}
      />

      <PagePath2 title="Edit PG/Hostel Owner" />

      {loading ? (
        <div className="w-full flex items-center justify-center">
          <LoaderSpinner />
        </div>
      ) : (
        <div className="w-full min-h-[600px] p-6 rounded-[8px] bg-white shadow flex flex-col gap-6 border border-[#A5A5A5]">
          <Formik
            enableReinitialize
            initialValues={{
              name: data?.fullName || "",
              phone: data?.phoneNumber || "",
              email: data?.email || "",
              password: data?.password ? "*".repeat(10) : "",
              address: data?.addresses?.[0]?.address || "",
              street: data?.addresses?.[0]?.street || "",
              postCode: data?.addresses?.[0]?.postCode || "",
              accountNumber: data?.bankDetails?.accountNumber || "",
              ifscCode: data?.bankDetails?.ifscCode || "",
              accountType: data?.bankDetails?.accountType || "",
              accountHolderName: data?.bankDetails?.accountHolderName || "",

              profile: data?.profilePage || "",
  identityType: data?.aadhaarCardFront || data?.aadhaarCardBack
    ? "aadhaar"
    : data?.panCard
    ? "pan"
    : "aadhaar",

  // Aadhaar & PAN previews
  aadhaarFrontPreview: data?.aadhaarCardFront || null,
  aadhaarBackPreview: data?.aadhaarCardBack || null,
  panCardPreview: data?.panCard || null,

  // Bank proof preview
  passbookOrChequePreview: data?.bankDetails?.passbookOrChequeImage || null,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              const formData = new FormData();

              formData.append("fullName", values.name);
              formData.append("phoneNumber", values.phone);
              formData.append("email", values.email);
              formData.append("password", values.password);
              formData.append("addresses[0][address]", values.address);
              formData.append("addresses[0][street]", values.street);
              formData.append(`addresses[0][postCode]`, values.postCode);
              formData.append("bankDetails[accountNumber]", values.accountNumber || "");
              formData.append("bankDetails[ifscCode]", values.ifscCode || "");
              formData.append("bankDetails[accountType]", values.accountType || "");
              formData.append(
             "bankDetails[accountHolderName]",
                values.accountHolderName || ""
              );
              if (profileImage) formData.append("profileImage", profileImage);
              if (values.aadhaarFront) formData.append("aadhaarFront", values.aadhaarFront);
              if (values.aadhaarBack) formData.append("aadhaarBack", values.aadhaarBack);
              if (values.panCard) formData.append("panCard", values.panCard);
              if (values.passbookOrChequeImage)
                formData.append("passbookOrChequeImage", values.passbookOrChequeImage);

              // Call your update function
              updatePGHostelOwner(id, formData);

              console.log("FormData being sent:", [...formData.entries()]);
            }}
          >
            {({ values, setFieldValue }) => (
              <Form>
                {/* --- Profile Image Upload Section --- */}
                <div className="flex flex-col items-center mb-8">
                  <div className="relative group">
                    <img
                      src={profilePreview || data?.profileImage || user}
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
                        onClick={() => setProfilePreview(null)}
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
                <div className="text-gray-700 text-xl flex items-center gap-3 font-semibold mb-6">
                  <svg
                    width="19"
                    height="18"
                    viewBox="0 0 19 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.5 1.5C7.11807 1.5 7.72225 1.68328 8.23616 2.02666C8.75006 2.37004 9.1506 2.8581 9.38712 3.42911C9.62365 4.00013 9.68553 4.62847 9.56495 5.23466C9.44438 5.84085 9.14675 6.39767 8.70971 6.83471C8.27267 7.27175 7.71585 7.56938 7.10966 7.68995C6.50347 7.81053 5.87513 7.74865 5.30411 7.51212C4.7331 7.2756 4.24504 6.87506 3.90166 6.36116C3.55828 5.84725 3.375 5.24307 3.375 4.625C3.375 3.7962 3.70424 3.00134 4.29029 2.41529C4.87634 1.82924 5.6712 1.5 6.5 1.5ZM6.5 0.25C5.63471 0.25 4.78885 0.506589 4.06938 0.98732C3.34992 1.46805 2.78916 2.15133 2.45803 2.95076C2.12689 3.75019 2.04025 4.62985 2.20906 5.47852C2.37787 6.32719 2.79455 7.10674 3.40641 7.71859C4.01826 8.33045 4.79781 8.74712 5.64648 8.91594C6.49515 9.08475 7.37481 8.99811 8.17424 8.66697C8.97367 8.33584 9.65695 7.77508 10.1377 7.05562C10.6184 6.33615 10.875 5.49029 10.875 4.625C10.875 3.46468 10.4141 2.35188 9.59359 1.53141C8.77312 0.710936 7.66032 0.25 6.5 0.25ZM12.75 17.75H11.5V14.625C11.5 13.7962 11.1708 13.0013 10.5847 12.4153C9.99866 11.8292 9.2038 11.5 8.375 11.5H4.625C3.7962 11.5 3.00134 11.8292 2.41529 12.4153C1.82924 13.0013 1.5 13.7962 1.5 14.625V17.75H0.25V14.625C0.25 13.4647 0.710936 12.3519 1.53141 11.5314C2.35188 10.7109 3.46468 10.25 4.625 10.25H8.375C9.53532 10.25 10.6481 10.7109 11.4686 11.5314C12.2891 12.3519 12.75 13.4647 12.75 14.625V17.75ZM12.75 1.5H19V2.75H12.75V1.5ZM12.75 4.625H19V5.875H12.75V4.625ZM12.75 7.75H17.125V9H12.75V7.75Z"
                      fill="#0A051F"
                    />
                  </svg>
                  <span>Basic Information</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Name" name="name" type="text" />
                  <FormField label="Phone Number" name="phone" type="text" />
                  <FormField label="Email id" name="email" type="email" />
                  <FormField label="Password" name="password" type="text" />
                  <FormField label="Address" name="address" type="text" />
                  <FormField label="Street" name="street" type="text" />
                  <FormField label="Postal Code" name="postCode" type="text" />
                </div>

{/* --- Identity Proof --- */}
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">Identity Proof</h2>
                  {/* <div className="flex items-center gap-6 mb-6">
                    <label>
                      <input
                        type="radio"
                        name="identityType"
                        value="aadhaar"
                        checked={values.identityType === "aadhaar"}
                        onChange={(e) => setFieldValue("identityType", e.target.value)}
                        readOnly
                        disabled
                      />
                      Aadhaar
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="identityType"
                        value="pan"
                        checked={values.identityType === "pan"}
                        onChange={(e) => setFieldValue("identityType", e.target.value)}
                        readOnly
                        disabled
                      />
                      PAN
                    </label>
                  </div> */}

{values.identityType === "aadhaar" && (
  <div className="flex flex-col md:flex-row justify-center gap-8">
    {/* Aadhaar Front */}
    <div className="relative group">
      <p className="text-center">Aadhaar Front</p>
      <img
        src={values.aadhaarFrontPreview || data?.aadhaarCardFront || ""}
        alt="Aadhaar Front"
        className="w-60 h-40 border rounded-lg object-cover"
      />
      <label
        htmlFor="aadhaarFront"
        className="absolute bottom-2 right-2 bg-primary-600 text-black text-xs rounded-full p-2 cursor-pointer"
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
              setFieldValue("aadhaarFrontPreview", reader.result);
            reader.readAsDataURL(file);
          }
        }}
      />
    </div>

    {/* Aadhaar Back */}
    <div className="relative group">
      <p className="text-center">Aadhaar Back</p>
      <img
        src={values.aadhaarBackPreview || data?.aadhaarCardBack || ""}
        alt="Aadhaar Back"
        className="w-60 h-40 border rounded-lg object-cover"
      />
      <label
        htmlFor="aadhaarBack"
        className="absolute bottom-2 right-2 bg-primary-600 text-white text-xs rounded-full p-2 cursor-pointer"
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
              setFieldValue("aadhaarBackPreview", reader.result);
            reader.readAsDataURL(file);
          }
        }}
      />
    </div>
  </div>
)}

{values.identityType === "pan" && (
  <div className="flex flex-col items-center">
    <div className="relative group">
      <p className="text-center">Pan Card</p>
      <img
        src={values.panCardPreview || data?.panCard || ""}
        alt="PAN Card"
        className="w-60 h-40 border rounded-lg object-cover"
      />
      <label
        htmlFor="panCard"
        className="absolute bottom-2 right-2 bg-primary-600 text-black text-xs rounded-full p-2 cursor-pointer"
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
    </div>
  </div>
)}

                </div>

                {/* --- Bank Details --- */}
                <div className="text-gray-700 text-xl mt-5 flex items-center gap-3 font-semibold mb-6">
                  <svg
                    width="17"
                    height="17"
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
                  <span>Bank Details (Optional)</span>
                </div>

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
                    placeholder="Enter account type"
                  />
                  <FormField
                    label="Account Holder Name"
                    name="accountHolderName"
                    type="text"
                  />
                </div>
                {/* --- Bank Proof Upload (Passbook / Cheque Image) --- */}
<div className="mt-6">
  <h2 className="text-xl font-semibold mb-3">Bank Proof (Passbook / Cheque)</h2>

  <div className="flex flex-col items-center">
    <div className="relative group">
      <img
        src={
          values.passbookOrChequePreview ||
          data?.bankDetails?.passbookOrChequeImage ||
          ""
        }
        alt="Passbook or Cheque"
        className="w-60 h-40 border rounded-lg object-cover"
      />

      {/* Upload button */}
      <label
        htmlFor="passbookOrChequeImage"
        className="absolute bottom-2 right-2 bg-primary-600 text-black text-xs rounded-full p-2 cursor-pointer"
        title="Upload new image"
      >
        +
      </label>

      {/* File input */}
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
              setFieldValue("passbookOrChequePreview", reader.result);
            reader.readAsDataURL(file);
          }
        }}
      />

      {/* Remove button */}
      {/* {values.passbookOrChequePreview && (
        <button
          type="button"
          onClick={() => setFieldValue("passbookOrChequePreview", null)}
          className="absolute top-2 right-2 bg-red-600 text-white text-xs rounded-full p-1 shadow-md hover:bg-red-700"
          title="Remove image"
        >
          ✕
        </button>
      )} */}
    </div>
  </div>
</div>


                <div className="flex gap-4 justify-center items-center mt-6">
                  <Button
                    variant={2}
                    text="Cancel"
                    onClick={() => {
                      navigate(-1);
                    }}
                  />
                  <Button variant={1} type="submit" text="Update" />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}

export default EditHostelOwner;
