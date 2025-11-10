import profile from "../../../../assets/profile.png";
import { useNavigate, useParams } from "react-router-dom";
import DetailsField from "../../../../components/uiComponent/DetailsField";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import { useEffect } from "react";
import useUserManagement from "../../../../hooks/userManagement/userUserManagement";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";
import Button from "../../../../components/uiComponent/Button";

function CustomerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    loading,
    fetchSelectedCustomer,
    selectedCustomer,
    updateCustomerStatus,
  } = useUserManagement();

  useEffect(() => {
    fetchSelectedCustomer(id);
  }, [id, fetchSelectedCustomer]);

  const handleStatus = (id) => {
    const currentStatus = selectedCustomer.status;
    const newStatus = currentStatus === "Blocked" ? "Active" : "Blocked";
    updateCustomerStatus(id, newStatus);
  };

  return (
    <div className="flex flex-col gap-1 font-inter">
      <BreadCrumb
        linkText={[
          { text: "User Management" },
          { text: "Customer", href: "/customers" },
          { text: "Customer Details" },
        ]}
      />

      <PagePath2 title="Customer Details" />

      {loading ? (
        <div className="w-full flex items-center justify-center">
          <LoaderSpinner />
        </div>
      ) : (
        <div className="w-full min-h-[600px] p-6 rounded-[8px] bg-white shadow flex flex-col gap-6 border border-[#A5A5A5] ">
          <div className="flex flex-col items-center">
            <img
              src={selectedCustomer?.profileImage || profile}
              alt="profile"
              className="w-[100px] h-[100px] rounded-[10px]"
            />
            <h2 className="font-medium text-[24px]">
              {selectedCustomer?.name}
            </h2>
         
          </div>

          <div className="p-6 flex flex-col gap-6 rounded border">
            <div className="text-gray-700 text-xl font-semibold">
              Profile Information
            </div>

            <div className="flex gap-4">
              <DetailsField
                label="Phone Number"
                value={selectedCustomer?.phoneNumber || "-"}
              />
              <DetailsField
                label=" Email ID:"
                value={selectedCustomer?.email || "-"}
              />
            </div>

            <div className="flex gap-4">
              <DetailsField
                label="Date of Birth:"
                value={selectedCustomer?.dob || "-"}
              />
              <DetailsField
                label="Status:"
                value={selectedCustomer?.status}
                className={
                  selectedCustomer.status === "Active"
                    ? "text-[#1DB435] font-medium"
                    : "text-red-500 font-medium"
                }
              />
            </div>

            <div className="flex gap-4">
              <DetailsField
                label="Address:"
                value={
                  selectedCustomer?.addresses?.length > 0
                    ? selectedCustomer.addresses
                        .map(
                          (addr) =>
                            `${addr?.label}: ${addr?.address} (${addr?.postCode})`
                        )
                        .join(" | ")
                    : "-"
                }
              />
            </div>

            <div className="flex gap-4">
              <DetailsField
                label="Street:"
                value={
                  selectedCustomer?.addresses?.length > 0
                    ? selectedCustomer.addresses
                        .map((addr) => `${addr.label}: (${addr.street})`)
                        .join(" | ")
                    : "-"
                }
              />
              <DetailsField
                label="Postal Code:"
                value={
                  selectedCustomer?.addresses?.length > 0
                    ? selectedCustomer.addresses
                        .map((addr) => `${addr.label}: (${addr.postCode})`)
                        .join(" | ")
                    : "-"
                }
              />
            </div>

            <div className="flex gap-4">
              <div className="w-full">
                <label className="text-sm font-medium text-gray-600">
                  Aadhaar Card:
                </label>
                <div className=" rounded-[8px] border-2 border-[#666060] overflow-hidden">
                  {selectedCustomer?.aadhaarCard ? (
                    <img
                      src={selectedCustomer.aadhaarCard}
                      alt="Aadhaar Card"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex justify-center p-5">
                      Aadhaar card not uploaded
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-5">
            <Button variant={2} text="Cancel" onClick={() => navigate(-1)} />

            <Button
              variant={
                selectedCustomer.isDeleted
                  ? 1
                  : selectedCustomer.status === "Blocked"
                  ? 3
                  : selectedCustomer.status === "Active"
                  ? 4
                  : 2
              }
              text={
                selectedCustomer.isDeleted
                  ? "User is Deleted"
                  : selectedCustomer.status === "Blocked"
                  ? "Activate"
                  : selectedCustomer.status === "Active"
                  ? "Block"
                  : "Unknown Status"
              }
              onClick={() => {
                if (!selectedCustomer.isDeleted) {
                  handleStatus(selectedCustomer._id);
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerDetails;
