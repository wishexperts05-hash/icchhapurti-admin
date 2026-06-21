import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import DetailsField from "../../../components/uiComponent/DetailsField";
import { LuWallet } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa6";
import { MdAccountBalance, MdLocationOn } from "react-icons/md";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import Button from "../../../components/uiComponent/Button";
import useUserManagement from "../../../hooks/userManagement/useUserManagement";
import CustomSelect from "../../../components/uiComponent/CustomSelect";
import LoaderSpinner from "../../../components/uiComponent/LoaderSpinner";
import DataTable from "../../../components/uiComponent/DataTable";
import Pagination from "../../../components/uiComponent/Pagination";

export default function UserDetails() {
  const { loading, userDetail, fetchUserDetails } = useUserManagement();
  const navigate = useNavigate();
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const addressParts = [
    userDetail?.user?.city,
    userDetail?.user?.state,
    userDetail?.user?.country
  ].filter(Boolean);
  const formattedAddress = addressParts.length > 0
    ? `${addressParts.join(", ")}${userDetail?.user?.region ? ` (${userDetail.user.region} Region)` : ""}`
    : "-";

  const directReferralFilterOptions = [
    { value: "today", label: "Today" },
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" },
    { value: "year-wise", label: "Year Wise" },
  ];

  const [directReferralFilter, setDirectReferralFilter] = useState("monthly");

  console.log("userDetail:", userDetail?.directReferrals?.data);

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (id) {
      fetchUserDetails(id, directReferralFilter, page, limit);
    }
  }, [id, directReferralFilter, page, limit]);

  const directReferralColumns = [
    { header: "Sr.No.", field: "srNo" },
    { header: "Refer To", field: "referToTheUserName" },
    { header: "Product Name", field: "productName" },
    { header: "Quantity", field: "quantity" },
    { header: "Direct Sales", field: "directSaleAmount" },
    { header: "Referral Earnings", field: "referralEarning" },
    { header: "Total Revenue", field: "totalRevenue" },
  ];
  const onPageChange = (newPage) => {
    setPage(newPage);
  };

  const onItemsPerPageChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };

  const getFormattedReferralData = () => {
    const tableData = [];
    const referrals = userDetail?.directReferrals?.data || [];
    referrals.forEach((ref) => {
      if (!ref.purchases || ref.purchases.length === 0) {
        tableData.push({
          id: ref._id,
          referToTheUserName: ref.name || ref.email || ref.phoneNumber || "-",
          productName: "-",
          quantity: "-",
          directSaleAmount: "₹ 0",
          referralEarning: `${ref.totalCoinsEarned || 0} Coins`,
          totalRevenue: "₹ 0",
        });
      } else {
        ref.purchases.forEach((purchase) => {
          if (!purchase.products || purchase.products.length === 0) {
            tableData.push({
              id: `${ref._id}-${purchase._id}`,
              referToTheUserName: ref.name || ref.email || ref.phoneNumber || "-",
              productName: "-",
              quantity: "-",
              directSaleAmount: `₹ ${purchase.grandTotal || 0}`,
              referralEarning: `${ref.totalCoinsEarned || 0} Coins`,
              totalRevenue: `₹ ${purchase.grandTotal || 0}`,
            });
          } else {
            purchase.products.forEach((prod, idx) => {
              tableData.push({
                id: `${ref._id}-${purchase._id}-${prod.productId || idx}`,
                referToTheUserName: ref.name || ref.email || ref.phoneNumber || "-",
                productName: prod.name || "-",
                quantity: prod.quantity || 1,
                directSaleAmount: `₹ ${prod.subtotal || (prod.price * prod.quantity)}`,
                referralEarning: idx === 0 ? `${ref.totalCoinsEarned || 0} Coins` : "-",
                totalRevenue: `₹ ${prod.subtotal || (prod.price * prod.quantity)}`,
              });
            });
          }
        });
      }
    });
    return tableData;
  };

  const getReferralSummary = () => {
    const referrals = userDetail?.directReferrals?.data || [];
    const totalPurchaseAmount = referrals.reduce((sum, ref) => sum + (ref.totalPurchasesAmount || 0), 0);
    const totalCoinsEarned = referrals.reduce((sum, ref) => sum + (ref.totalCoinsEarned || 0), 0);
    return { totalPurchaseAmount, totalCoinsEarned };
  };

  return (
    <div className="bg-[#F9F9F9] min-h-screen">
      {/* Breadcrumb */}
      <BreadCrumb
        linkText={[
          { text: "User Management", href: "/user-management" },
          { text: "View User" },
        ]}
      />

      {/* Page Title */}
      <PagePath2 title="User Details" />
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <LoaderSpinner />
        </div>
      ) : (
        <>
          {/* User Profile Card */}
          <div className="bg-white rounded-lg p-8 mb-4">
            <div className="flex items-center gap-6">
              <img
                src={userDetail?.user?.profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {userDetail?.user?.name}
                </h2>
                <p className="text-gray-600 text-base">
                  {formattedAddress}
                </p>
              </div>
            </div>
          </div>

          {/* User Information Card */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            <div className="bg-white px-6 py-4 border-b border-gray-300">
              <div className="flex items-center gap-3">
                <FaRegUser className="w-5 h-5 text-gray-800" />
                <h3 className="text-lg font-bold text-gray-900">
                  User Information
                </h3>
              </div>
            </div>

            <div className="p-8 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DetailsField label="Name" value={userDetail?.user?.name} />

                <DetailsField
                  label="E-Mail Id"
                  value={userDetail?.user?.email}
                  type="email"
                />

                <DetailsField
                  label="Phone Number"
                  value={userDetail?.user?.phoneNumber}
                  type="tel"
                />

                <DetailsField label="DOB" value={userDetail?.user?.dob} />

                <DetailsField label="City" value={userDetail?.user?.city || "-"} />
                <DetailsField label="State" value={userDetail?.user?.state || "-"} />
                <DetailsField label="Country" value={userDetail?.user?.country || "-"} />
                <DetailsField label="Region" value={userDetail?.user?.region || "-"} />

                <DetailsField
                  label="Referral Code"
                  value={userDetail?.user?.referralCodeUsed || "-"}
                />
              </div>
            </div>
          </div>

          {/* Shipping Addresses Card */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 mt-4">
            <div className="bg-white px-6 py-4 border-b border-gray-300">
              <div className="flex items-center gap-3">
                <MdLocationOn className="w-5 h-5 text-gray-800" />
                <h3 className="text-lg font-bold text-gray-900">
                  Shipping Addresses
                </h3>
              </div>
            </div>
            <div className="p-8 bg-white">
              {userDetail?.user?.shippingAddress?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userDetail.user.shippingAddress.map((addr, idx) => (
                    <div
                      key={addr._id || idx}
                      className="border border-gray-200 rounded-xl p-4 bg-gray-50 hover:bg-orange-50 hover:border-[#CCA547] transition-colors duration-200"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#CCA547]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <MdLocationOn className="w-4 h-4 text-[#CCA547]" />
                        </div>
                        <div className="flex-1">
                          {addr.label && (
                            <span className="inline-block bg-[#CCA547] text-white text-xs font-semibold px-2 py-0.5 rounded-full mb-2">
                              {addr.label}
                            </span>
                          )}
                          {addr.name && (
                            <p className="text-sm font-semibold text-gray-800 mb-0.5">{addr.name}</p>
                          )}
                          {addr.phoneNumber && (
                            <p className="text-sm text-gray-500 mb-1">{addr.phoneNumber}</p>
                          )}
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {[
                              addr.street,
                              addr.city,
                              addr.state,
                              addr.pinCode,
                              addr.country,
                            ]
                              .filter(Boolean)
                              .join(", ") || "-"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                  <MdLocationOn className="w-12 h-12 mb-2 opacity-40" />
                  <p className="text-sm">No shipping addresses saved</p>
                </div>
              )}
            </div>
          </div>

          {/* Account Information Card */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-300 mt-4">
            <div className="bg-white px-6 py-4 border-b border-gray-300">
              <div className="flex items-center gap-3">
                <MdAccountBalance className="w-5 h-5 text-gray-800" />
                <h3 className="text-lg font-bold text-gray-900">
                  Account Information
                </h3>
              </div>
            </div>

            <div className="p-8 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DetailsField
                  label="Bank Name"
                  value={userDetail?.user?.bankDetails?.bankName || "-"}
                />

                <DetailsField
                  label="Bank Account Number"
                  value={userDetail?.user?.bankDetails?.accountNumber || "-"}
                />

                <DetailsField
                  label="IFSC Code"
                  value={userDetail?.user?.bankDetails?.ifscCode || "-"}
                />

                <DetailsField
                  label="Account Holder Name"
                  value={userDetail?.user?.bankDetails?.accountHolderName || "-"}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 mt-4">
            <div className="bg-white px-6 py-4 border-b border-gray-300">
              <div className="flex items-center gap-3">
                <LuWallet className="w-5 h-5 text-gray-800" />
                <h3 className="text-lg font-bold text-gray-900">Wallet</h3>
              </div>
            </div>

            <div className="p-8 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DetailsField
                  label="Current Wallet Balance"
                  value={userDetail?.wallet?.balance}
                  type="number"
                />

                <DetailsField
                  label="Coins"
                  value={userDetail?.wallet?.coins}
                // type="number"
                />
              </div>
            </div>
          </div>

          <div className=" bg-white rounded-lg shadow-sm border border-gray-200 mt-4">
            <div className="p-6">
              <div className="flex flex-row items-center justify-between mb-4">
                <h3 className="text-[24px] font-medium">Direct Referral</h3>
                <CustomSelect
                  options={directReferralFilterOptions}
                  value={directReferralFilter}
                  onChange={(option) => {
                    setDirectReferralFilter(option.target.value);
                    setPage(1);
                  }}
                />
              </div>

              {/* Referral Summary Stats */}
              {!loading && (() => {
                const { totalPurchaseAmount, totalCoinsEarned } = getReferralSummary();
                return (
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4">
                      <div className="w-10 h-10 rounded-full bg-[#CCA547] flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">₹</span>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Total Purchase Amount</p>
                        <p className="text-lg font-bold text-gray-800">₹ {totalPurchaseAmount.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-5 py-4">
                      <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">🪙</span>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Total Coins Earned</p>
                        <p className="text-lg font-bold text-gray-800">{totalCoinsEarned.toLocaleString()} Coins</p>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {loading ? (
                <div className="flex w-full items-center justify-center py-10">
                  <LoaderSpinner />
                </div>
              ) : (
                <div className="mt-4 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                  <DataTable
                    columns={directReferralColumns}
                    data={getFormattedReferralData()}
                    usersPerPage={limit}
                    currentPage={
                      userDetail?.directReferrals?.pagination?.currentPage
                    }
                  />

                  <Pagination
                    currentPage={
                      userDetail?.directReferrals?.pagination?.currentPage
                    }
                    totalPages={
                      userDetail?.directReferrals?.pagination?.totalPages
                    }
                    totalItems={userDetail?.directReferrals?.pagination?.total}
                    itemsPerPage={
                      userDetail?.directReferrals?.pagination?.perPage
                    }
                    onPageChange={onPageChange}
                    onItemsPerPageChange={onItemsPerPageChange}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-8 mt-8 mb-8 ">
            <Button text="Back" variant={2} onClick={handleBack} />
          </div>
        </>
      )}
    </div>
  );
}
