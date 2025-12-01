import React, { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import DataTable from "../../../../components/uiComponent/DataTable";
import { FiEye } from "react-icons/fi";
import Pagination from "../../../../components/uiComponent/Pagination";
import usePrivacyPolicy from "../../../../hooks/appManagement/usePrivacyAndPolicy";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";

function PrivacyPolicy() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    LoaderSpinner,
    privacyPolicyList,
    fetchPrivacyPolicyList,
    deletePrivacyPolicyById,
    resetPrivacyPolicyList,
  } = usePrivacyPolicy();

  // Fetch privacy policies on component mount and when page or limit changes
  useEffect(() => {
    fetchPrivacyPolicyList(page, limit, searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  // Debounce search to avoid excessive API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== undefined) {
        setPage(1); // Reset to first page on search
        fetchPrivacyPolicyList(1, limit, searchTerm);
      }
    }, 500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      resetPrivacyPolicyList();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPageChange = (newPage) => setPage(newPage);
  
  const onItemsPerPageChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1); // Reset to first page when changing items per page
  };

  const handleDelete = async (id) => {
    const result = await deletePrivacyPolicyById(id);
    if (result) {
      // Refresh the list after successful deletion
      fetchPrivacyPolicyList(page, limit, searchTerm);
    }
  };

  const columns = [
    { header: "Sr.No.", field: "srNo" },
    { header: "Role", field: "role" },
    { header: "Action", field: "action" },
  ];

  const actions = [
    {
      icon: <FiEye className="w-5 h-5 text-[#FF6B00]" />,
      title: "View",
      onClick: (row) => navigate(`/app-management/privacy-policy/view/${row._id}`),
    },
    {
      icon: <FaRegEdit className="w-5 h-5 text-[#FF6B00]" />,
      title: "Edit",
      onClick: (row) => navigate(`/app-management/edit-privacy-policy/${row._id}`),
    },
    {
      icon: <MdDelete className="w-5 h-5 text-red-600" />,
      title: "Delete",
      onClick: (row) => handleDelete(row._id),
    },
  ];

  // Extract data from the API response structure
  const policies = privacyPolicyList?.data || [];
  const currentPage = privacyPolicyList?.currentPage || page;
  const totalPages = privacyPolicyList?.totalPages || 1;
  const totalPolicies = privacyPolicyList?.totalPolicies || policies.length;

  // Map policies to include serial number based on pagination
  const mappedPolicies = policies.map((policy, index) => ({
    ...policy,
    srNo: (currentPage - 1) * limit + index + 1,
  }));

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
        {LoaderSpinner? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B00]"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="border border-gray-300 rounded-t-xl shadow-sm overflow-hidden">
              <DataTable
                columns={columns}
                data={mappedPolicies}
                currentPage={currentPage}
                usersPerPage={limit}
                actions={actions}
              />
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalPolicies}
              itemsPerPage={limit}
              onPageChange={onPageChange}
              onItemsPerPageChange={onItemsPerPageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default PrivacyPolicy;