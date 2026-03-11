import React, { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import useStaffManagement from "../../../../hooks/staffManagement/useStaffManagement";
import useDropdown from "../../../../hooks/dropdown/useDropdown";

const CalendarIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
    className={className}
  >
    <path d="M8 2v4"></path>
    <path d="M16 2v4"></path>
    <rect width="18" height="18" x="3" y="4" rx="2"></rect>
    <path d="M3 10h18"></path>
  </svg>
);

const FormInput = ({ label, id, icon: Icon, ...props }) => (
  <div className="w-full">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {label}
    </label>
    <div className="relative">
      <input
        id={id}
        className="block w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-[#CCA547] focus:border-transparent transition duration-200"
        {...props}
      />
      {Icon && (
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
      )}
    </div>
  </div>
);

const FormSelect = ({ label, id, options, value, onChange }) => (
  <div className="w-full">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {label}
    </label>
    <select
      id={id}
      // name={id} 
      value={value}
      onChange={onChange}
      className="block w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg
                 focus:outline-none focus:ring-2 focus:ring-[#CCA547] focus:border-transparent transition duration-200
                 bg-white appearance-none cursor-pointer"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
        backgroundPosition: "right 0.5rem center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "1.5em 1.5em",
        paddingRight: "2.5rem",
      }}
    >
      {/* <option value="">Select {label}</option> */}
      <option value="">Select </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const PhoneInput = ({
  label,
  id,
  countryCode,
  phoneNumber,
  options,
  onCountryCodeChange,
  onPhoneChange,
  error,
  required,
}) => (
  <div className="w-full">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="flex gap-2">
      <select
        value={countryCode}
        onChange={onCountryCodeChange}
        className="w-24 px-3 py-2.5 text-sm border border-gray-300 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-[#CCA547] focus:border-transparent
                   bg-white appearance-none cursor-pointer"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
          backgroundPosition: "right 0.3rem center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "1.2em 1.2em",
          paddingRight: "1.8rem",
        }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <input
        id={id}
        type="tel"
        value={phoneNumber}
        onChange={onPhoneChange}
        placeholder="9876543210"
        className={`flex-1 px-4 py-2.5 text-sm border rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-[#CCA547] focus:border-transparent transition duration-200
                   ${error ? "border-red-500" : "border-gray-300"}`}
      />
    </div>
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

const AddStaff = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [bankProofImage, setBankProofImage] = useState(null);
  const { addStaff } = useStaffManagement();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    staffName: "",
    countryCode: "+91",
    phoneNumber: "",
    email: "",
    dob: "",
    country: "",
    state: "",
    city: "",
    referralCode: "",
    bankName: "",
    accountNumber: "",
    ifsc: "",
    accountType: "",
    accountHolderName: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    // Phone number validation
    if (id === "phoneNumber") {
      const numericValue = value.replace(/[^0-9]/g, "");
      if (numericValue.length <= 10) {
        setFormData((prev) => ({ ...prev, [id]: numericValue }));
        // Clear error when user types
        if (errors.phoneNumber) {
          setErrors((prev) => ({ ...prev, phoneNumber: "" }));
        }
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImage(file);
  };

  const handleBankProofUpload = (e) => {
    const file = e.target.files[0];
    if (file) setBankProofImage(file);
  };

  const validateForm = () => {
    const newErrors = {};

    // Phone Number validation
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (formData.phoneNumber.length !== 10) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits";
    } else if (!/^[6-9][0-9]{9}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid Indian phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    const fd = new FormData();
    fd.append("name", formData.staffName);
    fd.append("email", formData.email);
    fd.append("countryCode", formData.countryCode);
    fd.append("phoneNumber", formData.phoneNumber);
    fd.append("city", formData.city);
    fd.append("state", formData.state);
    fd.append("country", formData.country);
    fd.append("dob", formData.dob);

   const hasBankDetails =
    formData.bankName ||
    formData.ifsc ||
    formData.accountNumber ||
    formData.accountHolderName ||
    formData.accountType;

  if (hasBankDetails) {
    fd.append(
      "bankDetails",
      JSON.stringify({
        bankName: formData.bankName,
        ifscCode: formData.ifsc,
        accountNumber: Number(formData.accountNumber),
        accountHolderName: formData.accountHolderName,
        accountType: formData.accountType,
      })
    );
  }
    if (profileImage) fd.append("profileImage", profileImage);
    // if (bankProofImage) fd.append("bankProof", bankProofImage);

    console.log("sending data", ...fd);

    await addStaff(fd);
  };

  const handleCancel = () => {
    navigate("/staff-management");
  };
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
    fetchAlCountriescallingcodes,
    countryCode,
    loadingCode,
  } = useDropdown();

  useEffect(() => {
    if (formData.country && formData.state) {
      fetchCitiesByState(formData.country, formData.state);
    }
  }, [formData.country, formData.state]);

  console.log("cities", cities);
  // City options for the dropdown
  const cityOptions = (cities || []).map((city) => ({
    value: city,
    label: city,
  }));
  useEffect(() => {
    fetchAlCountriescallingcodes();
  }, []);
  console.log("callingcode", countryCode);

  const callingCodeOptions = (countryCode || []).map((item) => {
    const countryName = Object.keys(item)[0];
    const code = item[countryName];

    return {
      label: `(${code})`,
      value: code,
    };
  });

  // useEffect(() => {
  //   if (!formData.accountType) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       accountType: "Savings",
  //     }));
  //   }
  // }, []);

  useEffect(() => {
    fetchBanklist();
  }, []);

  useEffect(() => {
    fetchCountryDropdown();
  }, []);

  useEffect(() => {
    if (states?.length) {
      setFormData((prev) => ({
        ...prev,
        state: states[0], // ✅ THIS WAS MISSING
      }));
    }
  }, [states]);

  useEffect(() => {
    if (cities?.length && !formData.bankName) {
      setFormData((prev) => ({
        ...prev,
        city: cities[0], // first City auto-selected
      }));
    }
  }, [cities]);

  // useEffect(() => {
  //   if (banklist?.length && !formData.bankName) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       bankName: banklist[0], // first bank auto-selected
  //     }));
  //   }
  // }, [banklist]);

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;

    setFormData((prev) => ({
      ...prev,
      country: selectedCountry,
      state: "", // reset state when country changes
    }));

    fetchStatesByCountry(selectedCountry);
  };

  console.log("fetch bank", banklist);
  console.log("fetch banfffk", countries);

  const countryOptions = (countries || []).map((country) => ({
    value: country.name,
    label: country.name,
  }));

  const stateOptions = (states || []).map((state) => ({
    value: state,
    label: state,
  }));

  const bankOptions = banklist.map((bank) => ({
    value: bank,
    label: bank,
  }));

  const accountTypeOptions = [
    { value: "Savings", label: "Savings" },
    { value: "Current", label: "Current" },
  ];

  return (
    <>
      <BreadCrumb
        linkText={[
          { text: "Staff Management", href: "/staff-management" },
          { text: "Add New Staff" },
        ]}
      />

      <PagePath2 title={"Add New Staff"} />

      <div className="min-h-screen w-full rounded-2xl bg-white p-8">
        <form onSubmit={handleSubmit} className="w-full max-w-[1200px]">
          {/* Profile Image Upload */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-2 border-gray-300 overflow-hidden bg-gray-100 flex items-center justify-center">
                {profileImage ? (
                  <img
                    src={URL.createObjectURL(profileImage)}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400">
                    <Camera className="w-12 h-12" />
                  </div>
                )}
              </div>
              <label
                htmlFor="profileImage"
                className="absolute bottom-0 right-0 bg-[#CCA547] text-white p-2 rounded-full cursor-pointer hover:bg-yellow-700 transition"
              >
                <Camera className="w-5 h-5" />
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  onChange={handleProfileImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <FormInput
              label="Staff Name :"
              id="staffName"
              type="text"
              value={formData.staffName}
              onChange={handleChange}
              placeholder="Enter staff name"
              required
            />

            <PhoneInput
              label="Phone Number"
              id="phoneNumber"
              countryCode={formData.countryCode}
              phoneNumber={formData.phoneNumber}
              options={callingCodeOptions}
              onCountryCodeChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  countryCode: e.target.value,
                }))
              }
              onPhoneChange={handleChange}
              error={errors.phoneNumber}
              required
            />

            <FormInput
              label="Email :"
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
             
            />

            <FormInput
              label="Date of Birth :"
              id="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              icon={CalendarIcon}
              required
            />

            <FormSelect
              label="Country :"
              id="country"
              options={countryOptions}
              value={formData.country}
              onChange={handleCountryChange}
            />

            <FormSelect
              label="State :"
              id="state"
              options={stateOptions}
              value={formData.state}
              onChange={handleChange}
              disabled={!formData.country || loadingStates}
            />

            <FormSelect
              label="City :"
              id="city"
              options={cityOptions}
              value={formData.city}
              onChange={handleChange}
              disabled={!formData.state || loadingCities}
            />

            {/* <FormInput
              label="Assign Referral Code :"
              id="referralCode"
              type="text"
              value={formData.referralCode}
              onChange={handleChange}
              placeholder="Enter referral code"
            /> */}
          </div>

          {/* Bank Details Section */}
          <div className="mt-8 mb-6">
            <h3 className="text-base font-semibold text-gray-900">
              Bank Details :
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <FormSelect
              label="Bank Name :"
              
              id="bankName"
              options={bankOptions}
              value={formData.bankName}
              onChange={handleChange}
            />

            <FormInput
              label="Account Number :"
              id="accountNumber"
              type="text"
              value={formData.accountNumber}
              onChange={handleChange}
              placeholder="Enter account number"
            />

            <FormInput
              label="IFSC :"
              id="ifsc"
              type="text"
              value={formData.ifsc}
              onChange={handleChange}
              placeholder="Enter IFSC code"
            />

            <FormSelect
              label="Account Type :"
              id="accountType"
              options={accountTypeOptions}
              value={formData.accountType}
              onChange={handleChange}
            />

            <FormInput
              label="Account Holder Name :"
              id="accountHolderName"
              type="text"
              value={formData.accountHolderName}
              onChange={handleChange}
              placeholder="Enter account holder name"
            />
          </div>

          {/* Bank Proof Upload Section */}
          {/* <div className="mt-8 mb-6">
            <h3 className="text-base font-semibold text-gray-900 mb-2">
              Upload Bank Proof :
            </h3>
            <p className="text-sm text-gray-600">
              Upload either your Bank Passbook or a Cancelled Cheque image.
            </p>
          </div> */}

          {/* <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-64 h-40 border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                {bankProofImage ? (
                  <img
                    src={bankProofImage}
                    alt="Bank Proof"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400 text-center">
                    <Camera className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-sm">No Image</p>
                  </div>
                )}
              </div>
              <label
                htmlFor="bankProofImage"
                className="absolute bottom-2 right-2 bg-[#CCA547] text-white p-2 rounded-full cursor-pointer hover:bg-yellow-700 transition"
              >
                <Camera className="w-5 h-5" />
                <input
                  type="file"
                  id="bankProofImage"
                  accept="image/*"
                  onChange={handleBankProofUpload}
                  className="hidden"
                />
              </label>
              {bankProofImage && (
                <button
                  type="button"
                  onClick={() => setBankProofImage(null)}
                  className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-md hover:bg-red-600"
                  title="Remove image"
                >
                  ×
                </button>
              )}
            </div>
          </div> */}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
            <button
              type="button"
              onClick={handleCancel}
              className="w-full sm:w-64 px-12 py-3 border border-[#CCA547] text-[#CCA547] text-base font-medium rounded-lg
                         hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-[#CCA547] transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-64 px-12 py-3 bg-[#CCA547] text-white text-base font-medium rounded-lg
                         hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-[#CCA547] transition-all"
            >
              Add Staff
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddStaff;
