import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Camera } from "lucide-react";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";

const DetailRow = ({ label, value }) => (
  <div className="flex flex-col space-y-1">
    <span className="text-sm font-medium text-gray-600">{label}</span>
    <span className="text-base font-semibold text-gray-900">{value || "N/A"}</span>
  </div>
);

const DetailSection = ({ title, children }) => (
  <div className="mb-8">
    <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
      {title}
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
      {children}
    </div>
  </div>
);

function PromoterDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const promoterData = location.state?.promoterData;

  // Default data 
  const promoter = promoterData || {
    name: "Jane Cooper",
    code: "C001",
    phone: "9876543210",
    email: "janecooper01@gmail.com",
    referral: "HVSGU45789",
    total: 50,
    status: true,
    countryCode: "+91",
    dob: "01/01/1990",
    country: "India",
    state: "Maharashtra",
    city: "Nagpur",
    bankName: "State Bank Of India",
    accountNumber: "654971879431",
    ifsc: "SBIN0001234",
    accountType: "Savings",
    accountHolderName: "Jane Cooper",
    profileImage: null,
  };

  const handleBack = () => {
    navigate("/promotermanagement");
  };

  const handleEdit = () => {
    navigate("/promotermanagementedit", { state: { promoterData: promoter } });
  };

  return (
    <>
      {/* Breadcrumb */}
      <BreadCrumb
        linkText={[
          { text: "Promotor Management", href: "/promotermanagement" },
          { text: "Promotor Details" },
        ]}
      />
      
      <PagePath2 title={"Promotor Details"} />

      <div className="min-h-screen w-full bg-white p-8">
        <div className="w-full max-w-[1200px] mx-auto">
          {/* Profile Section */}
          <div className="mb-8 flex flex-col items-center">
            <div className="w-32 h-32 rounded-full border-2 border-gray-300 overflow-hidden bg-gray-100 flex items-center justify-center mb-4">
              {promoter.profileImage ? (
                <img 
                  src={promoter.profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="text-gray-400">
                  <Camera className="w-12 h-12" />
                </div>
              )}
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{promoter.name}</h2>
            <p className="text-sm text-gray-500">{promoter.code}</p>
            <div className="mt-2">
              <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                promoter.status 
                  ? "bg-green-100 text-green-700" 
                  : "bg-red-100 text-red-700"
              }`}>
                {promoter.status ? "Active" : "Blocked"}
              </span>
            </div>
          </div>

          {/* Personal Information Section */}
          <DetailSection title="Personal Information">
            <DetailRow label="Full Name" value={promoter.name} />
            <DetailRow label="Phone Number" value={`${promoter.countryCode || "+91"} ${promoter.phone}`} />
            <DetailRow label="Email" value={promoter.email} />
            <DetailRow label="Date of Birth" value={promoter.dob} />
            <DetailRow label="Country" value={promoter.country} />
            <DetailRow label="State" value={promoter.state} />
            <DetailRow label="City" value={promoter.city} />
            <DetailRow label="Referral Code" value={promoter.referral} />
          </DetailSection>

          {/* Statistics Section */}
          <DetailSection title="Statistics">
            <DetailRow label="Total Users Registered" value={promoter.total?.toString()} />
            <DetailRow label="Promoter Code" value={promoter.code} />
            <DetailRow label="Status" value={promoter.status ? "Active" : "Blocked"} />
          </DetailSection>

          {/* Bank Details Section */}
          <DetailSection title="Bank Details">
            <DetailRow label="Bank Name" value={promoter.bankName} />
            <DetailRow label="Account Number" value={promoter.accountNumber} />
            <DetailRow label="IFSC Code" value={promoter.ifsc} />
            <DetailRow label="Account Type" value={promoter.accountType} />
            <DetailRow label="Account Holder Name" value={promoter.accountHolderName} />
          </DetailSection>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
            <button
              type="button"
              onClick={handleBack}
              className="w-full sm:w-64 px-12 py-3 border border-[#CCA547] text-[#CCA547] text-base font-medium rounded-lg
                         hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-[#CCA547] transition-all"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleEdit}
              className="w-full sm:w-64 px-12 py-3 bg-[#CCA547] text-white text-base font-medium rounded-lg
                         hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-[#CCA547] transition-all"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PromoterDetails;