import React, { useState } from "react";
import { Camera } from "lucide-react";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";

const CalendarIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className={className}>
    <path d="M8 2v4"></path>
    <path d="M16 2v4"></path>
    <rect width="18" height="18" x="3" y="4" rx="2"></rect>
    <path d="M3 10h18"></path>
  </svg>
);

const FormInput = ({ label, id, icon: Icon, ...props }) => (
  <div className="w-full">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
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
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="block w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg
                 focus:outline-none focus:ring-2 focus:ring-[#CCA547] focus:border-transparent transition duration-200
                 bg-white appearance-none cursor-pointer"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
        backgroundPosition: 'right 0.5rem center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '1.5em 1.5em',
        paddingRight: '2.5rem'
      }}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const PhoneInput = ({ label, id, countryCode, phoneNumber, onCountryCodeChange, onPhoneChange }) => (
  <div className="w-full">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
      {label}
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
          backgroundPosition: 'right 0.3rem center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1.2em 1.2em',
          paddingRight: '1.8rem'
        }}
      >
        <option value="+91">+91</option>
        <option value="+1">+1</option>
        <option value="+44">+44</option>
      </select>
      <input
        id={id}
        type="tel"
        value={phoneNumber}
        onChange={onPhoneChange}
        placeholder="9876543210"
        className="flex-1 px-4 py-2.5 text-sm border border-gray-300 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-[#CCA547] focus:border-transparent transition duration-200"
      />
    </div>
  </div>
);

function PromoterManagementAdd({ onCancel, onAdd }) {
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "Jane Cooper",
    countryCode: "+91",
    phoneNumber: "9876543210",
    email: "janecooper01@gmail.com",
    dob: "01/01/2025",
    country: "India",
    state: "Maharashtra",
    city: "Nagpur",
    bankName: "State Bank Of India",
    accountNumber: "654971879431",
    ifsc: "SBIN0001234",
    accountType: "Savings",
    accountHolderName: "Jane Cooper",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Adding new promoter:", formData);
    if (onAdd) onAdd();
  };

  const countryOptions = [
    { value: "India", label: "India" },
    { value: "USA", label: "USA" },
    { value: "UK", label: "UK" },
  ];

  const stateOptions = [
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Delhi", label: "Delhi" },
    { value: "Karnataka", label: "Karnataka" },
  ];

  const bankOptions = [
    { value: "State Bank Of India", label: "State Bank Of India" },
    { value: "HDFC Bank", label: "HDFC Bank" },
    { value: "ICICI Bank", label: "ICICI Bank" },
  ];

  const accountTypeOptions = [
    { value: "Savings", label: "Savings" },
    { value: "Current", label: "Current" },
  ];

  return (
    <>
      {/* Breadcrumb */}
      <BreadCrumb
        linkText={[
          { text: "Promotor Management", href: "/promoter-management" },
          { text: "Add Promotor" },
        ]}
      />
      <PagePath2 title={"Add Promotor"} />

      <div className="min-h-screen w-full rounded-2xl shadow-xl bg-white p-8">
        <form onSubmit={handleSubmit} className="w-full max-w-[1200px]">
          {/* Profile Image Upload */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-2 border-gray-300 overflow-hidden bg-gray-100 flex items-center justify-center">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
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
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <FormInput
              label="Full Name :"
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Jane Cooper"
            />
            
            <PhoneInput
              label="Phone Number :"
              id="phoneNumber"
              countryCode={formData.countryCode}
              phoneNumber={formData.phoneNumber}
              onCountryCodeChange={(e) => setFormData(prev => ({ ...prev, countryCode: e.target.value }))}
              onPhoneChange={handleChange}
            />

            <FormInput
              label="Email :"
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="janecooper01@gmail.com"
            />

            <FormInput
              label="Date of Birth :"
              id="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              icon={CalendarIcon}
            />

            <FormSelect
              label="Country :"
              id="country"
              options={countryOptions}
              value={formData.country}
              onChange={handleChange}
            />

            <FormSelect
              label="State :"
              id="state"
              options={stateOptions}
              value={formData.state}
              onChange={handleChange}
            />

            <FormInput
              label="City :"
              id="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              placeholder="Nagpur"
            />
          </div>

          {/* Bank Details Section */}
          <div className="mt-8 mb-6">
            <h3 className="text-base font-semibold text-gray-900">Bank Details :</h3>
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
              placeholder="654971879431"
            />

            <FormInput
              label="IFSC :"
              id="ifsc"
              type="text"
              value={formData.ifsc}
              onChange={handleChange}
              placeholder="SBIN0001234"
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
              placeholder="Jane Cooper"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
            <button
              type="button"
              onClick={onCancel}
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
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default PromoterManagementAdd;
