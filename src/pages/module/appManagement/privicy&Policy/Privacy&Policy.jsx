import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import DataTable from "../../../../components/uiComponent/DataTable";
import { FiEye } from "react-icons/fi";
import Pagination from "../../../../components/uiComponent/Pagination";

function PrivacyPolicy() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Static dummy data
  const policyData = [
    {
      _id: "1",
      srNo: 1,
      role: "User",
    },
    {
      _id: "2",
      srNo: 2,
      role: "Staff",
    },
    {
      _id: "3",
      srNo: 3,
      role: "Promoter",
    },
    {
      _id: "4",
      srNo: 4,
      role: "Admin",
    },
  ];

  const onPageChange = (data) => setPage(data);
  const onItemsPerPageChange = (data) => setLimit(data);

  const columns = [
    { header: "Sr.No.", field: "srNo" },
    { header: "Role", field: "role" },
    { header: "Action", field: "action" },
  ];

  const actions = [
    {
      icon: <FiEye className="w-5 h-5 text-[#FF6B00]" />,
      title: "View",
      onClick: (row) => navigate(`/app-management/privacy-policy/view/`),
    },
    {
      icon: <FaRegEdit className="w-5 h-5 text-[#FF6B00]" />,
      title: "Edit",
      onClick: (row) => navigate(`/app-management/edit-privacy-policy/:id`),
    },
  ];

  return (
    <div className="bg-[#F9F9F9] min-h-screen">
      <BreadCrumb
        linkText={[
          { text: "App Management" },
          { text: "Privacy Policy" },
        ]}
      />

      <PagePath2
        title="Privacy Policy"
        showSearch
        showAddButton
        placeholder="Search by Role"
        searchTerm={searchTerm}
        handleSearchTerm={(e) => setSearchTerm(e.target.value)}
        addButtonText="Create Privacy Policy"
        onClick={() => navigate("/app-management/create-privacy-policy")}
      />

      <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 mt-4">
        <div className="overflow-x-auto">
          <div className="border border-gray-300 rounded-t-xl shadow-sm overflow-hidden">
            <DataTable
              columns={columns}
              data={policyData}
              currentPage={page}
              usersPerPage={limit}
              actions={actions}
            />
          </div>
          <Pagination
            currentPage={page}
            totalPages={1}
            totalItems={4}
            itemsPerPage={limit}
            onPageChange={onPageChange}
            onItemsPerPageChange={onItemsPerPageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;