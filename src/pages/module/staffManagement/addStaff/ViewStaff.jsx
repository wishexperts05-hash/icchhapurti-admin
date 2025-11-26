import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import DetailsField from "../../../../components/uiComponent/DetailsField";
import { LuWallet } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa6";
import { MdAccountBalance } from "react-icons/md";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import Button from "../../../../components/uiComponent/Button";
import useStaffManagement from "../../../../hooks/staffManagement/useStaffManagement";
import DataTable from "../../../../components/uiComponent/DataTable";
import Pagination from "../../../../components/uiComponent/Pagination";
import CustomSelect from "../../../../components/uiComponent/CustomSelect";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";

const ViewStaff = () => {
  const {
    loading,
    staffDetail,
    fetchStaffDetails,
    fetchDirectSalesById,
    directSales,
    fetchIndirectSalesById,
    indirectSales,
    dloading,
    iloading,
  } = useStaffManagement();
  const navigate = useNavigate();
  // const [status, setStatus] = useState("");
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const salesFilterOptions = [
    { value: "today", label: "Today" },
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" },
    { value: "year-wise", label: "Year Wise" },
  ];
  const [directSalesFilter, setDirectSalesFilter] = useState("monthly");
  const [indirectSalesFilter, setIndirectSalesFilter] = useState("monthly");

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (id) {
      fetchStaffDetails(id);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchDirectSalesById(id, directSalesFilter, page, limit);
    }
  }, [id, directSalesFilter, page, limit]);

  useEffect(() => {
    if (id) {
      fetchIndirectSalesById(id, indirectSalesFilter, page, limit);
    }
  }, [id, indirectSalesFilter, page, limit]);

  const directSalesColumns = [
    { header: "Sr.No.", field: "srNo" },
    { header: "Staff Name ", field: "referToTheUserName" },
    { header: "Product Name ", field: "productName" },
    { header: "Direct Sales", field: "salesAmount" },
    { header: "Quantity", field: "quantityOfOrder" },
    { header: "Referral Earnings", field: "referralEarning" },
    { header: "Total Revenue", field: "totalRevenue" },
  ];

  const indirectSalesColumns = [
    { header: "Sr.No.", field: "srNo" },
    { header: "Staff Name", field: "referToTheUserName" },
    { header: "Product Name ", field: "productName" },
    { header: "Indirect Sales ", field: "salesAmount" },
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

  return (
    <div className="">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <BreadCrumb
          linkText={[
            { text: "Staff Management", href: "/staff-management" },
            { text: "View Staff" },
          ]}
        />

        {/* Page Title */}
        <PagePath2 title="Staff Details" />

        {/* Staff Profile Card */}
        <div className="bg-white rounded-lg p-8 mb-8">
          <div className="flex items-center gap-6">
            <img
              src={staffDetail?.staff?.profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {staffDetail?.staff?.name}
              </h2>
              <p className="text-gray-600 text-base">
                {staffDetail?.staff?.address || "-"}
              </p>
            </div>
            <div>
              <p
                className={`px-3 py-1 rounded-full text-white font-semibold ${
                  staffDetail?.staff?.isActive ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {staffDetail?.staff?.isActive ? "Active" : "Inactive"}
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
              <DetailsField label="Name" value={staffDetail?.staff?.name} />

              <DetailsField
                label="E-Mail Id"
                value={staffDetail?.staff?.email}
                type="email"
              />

              <DetailsField
                label="Phone Number"
                value={staffDetail?.staff?.phoneNumber}
                type="tel"
              />

              <DetailsField label="DOB" value={staffDetail?.staff?.dob} />

              <DetailsField
                label="Address"
                value={staffDetail?.staff?.address || "-"}
                className="md:col-span-2"
              />

              <DetailsField
                label="Referral Name"
                value={staffDetail?.staff?.referralCodeUsed || "-"}
              />
            </div>
          </div>
        </div>

        {/* Account Information Card */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-300 mt-8">
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
                value={staffDetail?.staff?.bankDetails?.bankName || "-"}
              />

              <DetailsField
                label="Bank Account Number"
                value={staffDetail?.staff?.bankDetails?.accountNumber || "-"}
              />

              <DetailsField
                label="IFSC Code"
                value={staffDetail?.staff?.bankDetails?.ifscCode || "-"}
              />

              <DetailsField
                label="Account Holder Name"
                value={
                  staffDetail?.staff?.bankDetails?.accountHolderName || "-"
                }
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 mt-8">
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
                value={staffDetail?.wallet?.balance }
                type="number"
              />

              <DetailsField label="Coins" value={staffDetail?.wallet?.coins} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-8">
          <div className="p-6">
            <div className="flex flex-row items-center justify-between mb-4">
              <h3 className="text-[24px] font-medium">Direct Sales</h3>
              <CustomSelect
                options={salesFilterOptions}
                value={directSalesFilter}
                onChange={(option) => {
                  setDirectSalesFilter(option.target.value);
                  setPage(1);
                }}
              />
            </div>

            {dloading ? (
              <div className="flex w-full items-center justify-center py-10">
                <LoaderSpinner />
              </div>
            ) : (
              <div className="mt-4 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                <DataTable
                  columns={directSalesColumns}
                  data={directSales?.directSales?.data || []}
                  usersPerPage={limit}
                  currentPage={
                    directSales?.directSales?.pagination?.currentPage
                  }
                />

                <Pagination
                  currentPage={
                    directSales?.directSales?.pagination?.currentPage
                  }
                  totalPages={directSales?.directSales?.pagination?.totalPages}
                  totalItems={
                    directSales?.directSales?.pagination?.totalRecords
                  }
                  itemsPerPage={directSales?.directSales?.pagination?.limit}
                  onPageChange={onPageChange}
                  onItemsPerPageChange={onItemsPerPageChange}
                />
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-8">
          <div className="p-6">
            <div className="flex flex-row items-center justify-between mb-4">
              <h3 className="text-[24px] font-medium">Indirect Sales</h3>
              <CustomSelect
                label="Filter Sales"
                options={salesFilterOptions}
                value={indirectSalesFilter}
                onChange={(option) => {
                  setIndirectSalesFilter(option.target.value);
                  setPage(1);
                }}
              />
            </div>

            {iloading ? (
              <div className="flex w-full items-center justify-center py-10">
                <LoaderSpinner />
              </div>
            ) : (
              <div className="mt-4 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                <DataTable
                  columns={indirectSalesColumns}
                  data={indirectSales?.indirectSales?.data || []}
                  usersPerPage={limit}
                  currentPage={
                    indirectSales?.indirectSales?.pagination?.currentPage
                  }
                />

                <Pagination
                  currentPage={
                    indirectSales?.indirectSales?.pagination?.currentPage
                  }
                  totalPages={
                    indirectSales?.indirectSales?.pagination?.totalPages
                  }
                  totalItems={
                    indirectSales?.indirectSales?.pagination?.totalRecords
                  }
                  itemsPerPage={indirectSales?.indirectSales?.pagination?.limit}
                  onPageChange={onPageChange}
                  onItemsPerPageChange={onItemsPerPageChange}
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-8 mt-8 mb-8 ">
          <Button text="Back" variant={1} onClick={handleBack} />
        </div>
      </div>
    </div>
  );
};

export default ViewStaff;
