import React, { useState } from "react";

// --- ICONS ---
const HomeIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className={className}>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const ChevronRightIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className={className}>
    <path d="m9 18 6-6-6-6"></path>
  </svg>
);

const CalendarIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className={className}>
    <path d="M8 2v4"></path>
    <path d="M16 2v4"></path>
    <rect width="18" height="18" x="3" y="4" rx="2"></rect>
    <path d="M3 10h18"></path>
  </svg>
);

// --- FORM INPUT ---
const FormInput = ({ label, id, icon: Icon, ...props }) => (
  <div className="w-full">
    <label htmlFor={id} className="block text-base font-medium text-gray-700 mb-2">
      {label}
    </label>
    <div className="relative">
      <input
        id={id}
        className="block w-full px-4 py-3 text-base border border-gray-300 rounded-lg shadow-sm
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

// --- MAIN COMPONENT ---
function PromoterManagementEdit({ onCancel, onSave }) {
  const [formData, setFormData] = useState({
    promoterName: "Jane Cooper",
    phone: "(+91) 6246 198 874",
    dob: "01/01/2025",
    email: "janecooper01@gmail.com",
    location: "Nagpur",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving promoter changes:", formData);
    if (onSave) onSave();
  };

  return (
    // Full Page Layout
    <div className="min-h-screen w-full bg-[#FFFFFF] p-8 font-['Inter',_sans-serif]">
      
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-gray-500 mb-8">
        <HomeIcon className="h-4 w-4 mr-2 text-gray-400" />
        <span
          className="hover:text-gray-700 cursor-pointer"
          onClick={onCancel}
        >
          Promoter Management
        </span>
        <ChevronRightIcon className="h-5 w-5 mx-1.5 text-gray-400" />
        <span className="font-medium text-[#CCA547]">Edit Promoter</span>
      </nav>

      {/* Title */}
      <h1 className="text-3xl font-semibold text-gray-900 mb-10">
        Edit Promoter
      </h1>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 max-w-[1200px]">
          <FormInput
            label="Edit Promoter Name :"
            id="promoterName"
            type="text"
            value={formData.promoterName}
            onChange={handleChange}
            required
          />
          <FormInput
            label="Change Phone Number :"
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <FormInput
            label="Date of Birth :"
            id="dob"
            type="text"
            placeholder="DD/MM/YYYY"
            value={formData.dob}
            onChange={handleChange}
            icon={CalendarIcon}
            required
          />
          <FormInput
            label="Email :"
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <FormInput
            label="Change Promoter Location :"
            id="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-12">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto px-12 py-3.5 border border-[#CCA547] text-[#CCA547]
                       text-base font-medium rounded-lg shadow-sm hover:bg-yellow-50
                       focus:outline-none focus:ring-2 focus:ring-[#CCA547] focus:ring-offset-2 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto px-12 py-3.5 bg-[#CCA547] text-white text-base font-medium
                       rounded-lg shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2
                       focus:ring-[#CCA547] focus:ring-offset-2 transition-all"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default PromoterManagementEdit;
