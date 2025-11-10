import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import DetailsField from "../../../../components/uiComponent/DetailsField";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import useUserManagement from "../../../../hooks/userManagement/userUserManagement";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";
import Button from "../../../../components/uiComponent/Button";
import user from "../../../../assets/profile.png";

function HostelOwnerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    loading,
    fetchSelectedPGOwner,
    selectedPgOwner,
    updatePGHostelOwnerStatus,
  } = useUserManagement();

  useEffect(() => {
    if (id) fetchSelectedPGOwner(id);
  }, [id, fetchSelectedPGOwner]);

  const handleStatus = (id) => {
    const currentStatus = selectedPgOwner?.status;
    const newStatus = currentStatus === "Blocked" ? "Active" : "Blocked";
    updatePGHostelOwnerStatus(id, newStatus);
  };

  return (
    <div className="flex flex-col gap-1 font-inter">
      <BreadCrumb
        linkText={[
          { text: "User Management" },
          { text: "PG/Hostel Owner ", href: "/pg-hostel-owner" },
          { text: "PG/Hostel Owner Details" },
        ]}
      />

      <PagePath2 title="PG/Hostel Owner Details" />
      {loading ? (
        <div className="w-full flex items-center justify-center">
          <LoaderSpinner />
        </div>
      ) : (
        <div className="w-full min-h-[600px] p-6 rounded-[8px] bg-white shadow flex flex-col gap-6 border border-[#A5A5A5] ">
          <div className="flex justify-center items-center">
            <img
              src={selectedPgOwner.profileImage || user}
              alt="Owner Profile"
              className="w-36 h-36 rounded-full object-cover border"
            />
          </div>
          <div className="text-gray-700 text-xl flex items-center gap-3 font-semibold mb-4">
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

          <div className="flex gap-4">
            <DetailsField
              label="Name:"
              value={selectedPgOwner?.fullName || "-"}
            />
            <DetailsField
              label="Contact:"
              value={selectedPgOwner?.phoneNumber || "-"}
            />
          </div>
          <div className="flex gap-4">
            <DetailsField
              label=" Email ID:"
              value={selectedPgOwner?.email || "-"}
            />
            <DetailsField
              label="Password:"
              value={selectedPgOwner?.password ?"*".repeat(10)  : "-"}
            />
          </div>

          <div className="flex gap-4">
            <DetailsField
              label="Status:"
              value={selectedPgOwner?.status || "-"}
              className={
                selectedPgOwner?.status === "Active"
                  ? "text-[#1DB435] font-medium"
                  : "text-red-500 font-medium"
              }
            />

            <DetailsField
              label="Address"
              value={
                selectedPgOwner?.addresses?.length
                  ? selectedPgOwner.addresses
                      .map((addr) => addr.address)
                      .join(", ")
                  : "-"
              }
            />
          </div>
          <div className="flex gap-4">
            <DetailsField
              label="Street:"
              value={
                selectedPgOwner?.addresses?.length
                  ? selectedPgOwner.addresses
                      .map((addr) => addr.street)
                      .join(", ")
                  : "-"
              }
            />

            <DetailsField
              label="Postal Code:"
              value={
                selectedPgOwner?.addresses?.length
                  ? selectedPgOwner.addresses
                      .map((addr) => addr.postCode)
                      .join(", ")
                  : "-"
              }
            />
          </div>

{/* --- Identification Documents --- */}
<div className="text-gray-700 text-xl flex items-center gap-3 font-semibold mb-4 mt-2">
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
  <span>Identification Documents</span>
</div>

<div className="flex flex-wrap justify-center gap-8 mb-8">

  {/* Aadhaar Card (Front & Back) */}
  {selectedPgOwner?.aadhaarCardFront && selectedPgOwner?.aadhaarCardBack ? (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          <img
            src={selectedPgOwner?.aadhaarCardFront}
            alt="Aadhaar Card Front"
            className="w-64 h-40 object-cover border rounded-lg shadow-md"
          />
          <span className="text-sm mt-2 text-gray-600 font-medium">Aadhaar Front</span>
        </div>
        <div className="flex flex-col items-center">
          <img
            src={selectedPgOwner?.aadhaarCardBack}
            alt="Aadhaar Card Back"
            className="w-64 h-40 object-cover border rounded-lg shadow-md"
          />
          <span className="text-sm mt-2 text-gray-600 font-medium">Aadhaar Back</span>
        </div>
      </div>
    </div>
  ) : selectedPgOwner?.aadhaarCardFront ? (
    // In case only one side available
    <div className="flex flex-col items-center">
      <img
        src={selectedPgOwner?.aadhaarCardFront}
        alt="Aadhaar Card"
        className="w-64 h-40 object-cover border rounded-lg shadow-md"
      />
      <span className="text-sm mt-2 text-gray-600 font-medium">Aadhaar Card</span>
    </div>
  ) : null}

  {/* PAN Card */}
  {selectedPgOwner?.panCard && (
    <div className="flex flex-col items-center">
      <img
        src={selectedPgOwner?.panCard}
        alt="PAN Card"
        className="w-64 h-40 object-cover border rounded-lg shadow-md"
      />
      <span className="text-sm mt-2 text-gray-600 font-medium">PAN Card</span>
    </div>
  )}
  </div>



          <div className="text-gray-700 text-xl flex items-center gap-3 font-semibold mb-4">
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

          <div className="flex gap-4">
            <DetailsField
              label="Account Number"
              value={selectedPgOwner?.bankDetails?.accountNumber || "-"}
            />
            <DetailsField
              label="IFSC Code:"
              value={selectedPgOwner?.bankDetails?.ifscCode || "-"}
            />
          </div>

          <div className="flex gap-4">
            <DetailsField
              label="Account Type"
              value={selectedPgOwner?.bankDetails?.accountType || "-"}
            />
            <DetailsField
              label="Account Holder Name"
              value={selectedPgOwner?.bankDetails?.accountHolderName || "-"}
            />
          </div>
                      {/* Bank Proof (Passbook / Cheque) */}
    <div className="flex flex-col items-center">
      <img
        src={selectedPgOwner?.bankDetails?.passbookOrChequeImage}
        alt="Passbook or Cheque"
        className="w-64 h-40 object-cover border rounded-lg shadow-md"
      />
      <span className="text-sm mt-2 text-gray-600 font-medium">Bank Proof</span>
    </div>


    {/* --- Supporting Documents --- */}
{selectedPgOwner?.supportingDocuments?.length > 0 && (
  <>
    <div className="text-gray-700 text-xl flex items-center gap-3 font-semibold mb-4 mt-4">
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
      <span>Supporting Documents</span>
    </div>

    <div className="flex flex-wrap justify-center gap-8 mb-8">
      {selectedPgOwner.supportingDocuments.map((doc) => {
        const isImage = /\.(jpg|jpeg|png|gif)$/i.test(doc.documentFile);
        return (
          <div key={doc._id} className="flex flex-col items-center">
            {isImage ? (
              <img
                src={doc.documentFile}
                alt={doc.documentName}
                className="w-64 h-40 object-cover border rounded-lg shadow-md hover:scale-105 transition-transform cursor-pointer"
                onClick={() => window.open(doc.documentFile, "_blank")}
              />
            ) : (
              <a
                href={doc.documentFile}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline font-medium"
              >
                View {doc.documentName}
              </a>
            )}
            <span className="text-sm mt-2 text-gray-600 font-medium">
              {doc.documentName}
            </span>
          </div>
        );
      })}
    </div>
  </>
)}


          <div className="flex justify-center gap-5">
            <Button
              variant={2}
              text="Cancel"
              onClick={() => {
                navigate("/pg-hostel-owner");
              }}
            />
            <Button
              variant={
                selectedPgOwner?.isDeleted
                  ? 1 // Deleted = Red
                  : selectedPgOwner?.status === "Blocked"
                  ? 3 // Unblock
                  : selectedPgOwner?.status === "Active"
                  ? 4 // Block
                  : 2
              }
              text={
                selectedPgOwner?.isDeleted
                  ? "Owner Deleted"
                  : selectedPgOwner?.status === "Blocked"
                  ? "Activate"
                  : selectedPgOwner?.status === "Active"
                  ? "Block"
                  : "Unknown"
              }
              onClick={() => {
                if (!selectedPgOwner?.isDeleted) {
                  handleStatus(selectedPgOwner?._id);
                }
              }}
            />

            {!selectedPgOwner?.isDeleted && (
              <Button
                variant={1}
                text="Edit"
                onClick={() => {
                  navigate(
                    `/pg-hostel-owner/edit-hostel-owner/${selectedPgOwner?._id}`
                  );
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default HostelOwnerDetails;
