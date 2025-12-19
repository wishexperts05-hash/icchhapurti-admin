import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../../../../components/uiComponent/FormField";
import Button from "../../../../components/uiComponent/Button";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import useStaffManagement from "../../../../hooks/staffManagement/useStaffManagement";
import useDropdown from "../../../../hooks/dropdown/useDropdown";

const validationSchema = Yup.object().shape({
  staffName: Yup.string().required("Staff name is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Invalid phone number")
    .required("Phone number is required"),
  dob: Yup.date().required("Date of birth is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  // location: Yup.string().required("Location is required"),
  // referralCode: Yup.string().required("Referral code is required"),

  // Bank validation
  accountNumber: Yup.string().required("Account Number is required"),
  ifscCode: Yup.string().required("IFSC code is required"),
  accountType: Yup.string().required("Account Type is required"),
  accountHolderName: Yup.string().required("Account Holder Name is required"),
});

const EditStaff = () => {
  const navigate = useNavigate();
  const { loading, fetchStaffDetails, staffDetail, updateStaff } =
    useStaffManagement();
  const { id } = useParams();
  const [preview, setPreview] = useState(null);

  const {
    fetchBanklist,
    banklist,
    fetchCountryDropdown,
    fetchStatesByCountry,
    countries,
    states,
    loadingStates,
    fetchCitiesByState,
    cities,
    loadingCities,
  } = useDropdown();

  useEffect(() => {
    fetchCountryDropdown();
    fetchBanklist();
  }, []);

  useEffect(() => {
    if (staffDetail?.staff?.country) {
      fetchStatesByCountry(staffDetail.staff.country);
    }
  }, [staffDetail?.staff?.country]);

  useEffect(() => {
    if (staffDetail?.staff?.profileImage) {
      setPreview(staffDetail.staff.profileImage);
    }
  }, [staffDetail]);

  useEffect(() => {
    if (staffDetail?.staff?.country && staffDetail?.staff?.state) {
      fetchCitiesByState(staffDetail.staff.country, staffDetail.staff.state);
    }
  }, [staffDetail?.staff?.state]);

  const countryOptions = (countries || []).map((c) => ({
    value: c.name,
    label: c.name,
  }));

  const stateOptions = (states || []).map((s) => ({
    value: s,
    label: s,
  }));

  const cityOptions = (cities || []).map((c) => ({
    value: c,
    label: c,
  }));

  const bankOptions = (banklist || []).map((b) => ({
    value: b,
    label: b,
  }));

  useEffect(() => {
    if (id) {
      fetchStaffDetails(id);
    }
  }, [id]);

  console.log("staffDetail:", staffDetail);

  const initialValues = {
    staffName: staffDetail?.staff?.name || "",
    phoneNumber: staffDetail?.staff?.phoneNumber || "",
    dob: staffDetail?.staff?.dob || "",
    email: staffDetail?.staff?.email || "",
    country: staffDetail?.staff?.country || "",
    state: staffDetail?.staff?.state || "",
    city: staffDetail?.staff?.city || "",
    address: staffDetail?.staff?.address || "",
    bankName : staffDetail?.staff?.bankDetails?.bankName || "",
    referralCode: staffDetail?.staff?.referralCode || "",
    profileImage: staffDetail?.staff?.profileImage || "",
    accountNumber: staffDetail?.staff?.bankDetails?.accountNumber || "",
    ifscCode: staffDetail?.staff?.bankDetails?.ifscCode || "",
    accountType: staffDetail?.staff?.bankDetails?.accountType || "",
    accountHolderName: staffDetail?.staff?.bankDetails?.accountNumber || "",
  };
  console.log("Initial Values:", initialValues);
  const handleSubmit = async (values) => {
    const fd = new FormData();

    fd.append("name", values.staffName);
    fd.append("email", values.email);
    fd.append("phoneNumber", values.phoneNumber);
    fd.append("dob", values.dob);
    fd.append("country", values.country);
    fd.append("state", values.state);
    fd.append("city", values.city);
    fd.append("referralCode", values.referralCode);
    fd.append("bankName", values.bankName);

    fd.append(
      "bankDetails",
      JSON.stringify({
        accountNumber: values.accountNumber,
        ifscCode: values.ifscCode,
        accountHolderName: values.accountHolderName,
        accountType: values.accountType,
      })
    );

    if (values.profileImage) {
      fd.append("profileImage", values.profileImage);
    }

    await updateStaff(id, fd);

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
          enableReinitialize={true}
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
                      className="w-32 h-32 rounded-full object-cover border-4 border-primary-200 shadow-md"
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
                fieldType="select"
                name="country"
                label="Country"
                options={countryOptions}
                onChange={(e) => {
                  setFieldValue("country", e.target.value);
                  setFieldValue("state", "");
                  setFieldValue("city", "");
                  fetchStatesByCountry(e.target.value);
                }}
              />

              <FormField
                fieldType="select"
                name="state"
                label="State"
                options={stateOptions}
                disabled={!values.country || loadingStates}
                onChange={(e) => {
                  setFieldValue("state", e.target.value);
                  setFieldValue("city", "");
                  fetchCitiesByState(values.country, e.target.value);
                }}
              />

              <FormField
                fieldType="select"
                name="city"
                label="City"
                options={cityOptions}
                disabled={!values.state || loadingCities}
              />

              <FormField
                label="Address"
                name="address"
                placeholder="Enter staff address"
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
                    fieldType="select"
                    name="bankName"
                    label="Bank Name"
                    options={bankOptions}
                  />

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
