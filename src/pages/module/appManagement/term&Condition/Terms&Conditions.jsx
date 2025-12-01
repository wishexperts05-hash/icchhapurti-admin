import React, { useState, useEffect } from "react";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import DataTable from "../../../../components/uiComponent/DataTable";
import { FiEye } from "react-icons/fi";
import Pagination from "../../../../components/uiComponent/Pagination";
import useTermsAndConditions from "../../../../hooks/appManagement/useTermsAndConditions";

function TermsAndConditions() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    loading,
    termsList,
    fetchTermsList,
    resetTermsList,
    deleteTermsById,
  } = useTermsAndConditions();

  // Delete handler that calls the hook and refreshes the list
  const handleDelete = async (id) => {
    try {
      const result = await deleteTermsById(id);

      if (result && result.success) {
        // Compute new page after delete to keep UI consistent
        const totalAfterDelete = (termsList?.totalTerms || 0) - 1;
        const remainingItemsOnPage = totalAfterDelete - (page - 1) * limit;
        const newPage = remainingItemsOnPage <= 0 && page > 1 ? page - 1 : page;

        setPage(newPage);
        fetchTermsList(newPage, limit, searchTerm);
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Fetch terms list on component mount and when page, limit changes
  useEffect(() => {
    fetchTermsList(page, limit, searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  // Handle search with debounce effect
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (page === 1) {
        fetchTermsList(1, limit, searchTerm);
      } else {
        setPage(1); // Reset to page 1 when searching
      }
    }, 500);

    return () => clearTimeout(delaySearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      resetTermsList();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPageChange = (data) => setPage(data);

  const onItemsPerPageChange = (data) => {
    setLimit(data);
    setPage(1); // Reset to first page when changing items per page
  };

  // Transform data for table display
  const tableData =
    termsList?.data?.map((item, index) => ({
      _id: item._id,
      srNo: (page - 1) * limit + index + 1,
      role: item.role || "N/A",
      createdAt: item.createdAt
        ? new Date(item.createdAt).toLocaleDateString("en-GB")
        : "N/A",
      updatedAt: item.updatedAt
        ? new Date(item.updatedAt).toLocaleDateString("en-GB")
        : "N/A",
    })) || [];

  const columns = [
    { header: "Sr.No.", field: "srNo" },
    { header: "Role", field: "role" },
    { header: "Created Date", field: "createdAt" },
    { header: "Updated Date", field: "updatedAt" },
    { header: "Action", field: "action" },
  ];

  const actions = [
    {
      icon: <FiEye className="w-5 h-5 text-[#FF6B00]" />,
      title: "View",
      onClick: (row) =>
        navigate(`/app-management/terms-and-conditions/view/${row._id}`),
    },
    {
      icon: <FaRegEdit className="w-5 h-5 text-[#FF6B00]" />,
      title: "Edit",
      onClick: (row) =>
        navigate(`/app-management/edit-terms-and-conditions/${row._id}`),
    },
    {
      icon: <FaTrashAlt className="w-5 h-5 text-red-500" />,
      title: "Delete",
      onClick: (row) => handleDelete(row._id),
    },
  ];

  return (
    <div className="bg-[#F9F9F9] min-h-screen">
      <BreadCrumb
        linkText={[
          { text: "App Management" },
          { text: "Terms and Conditions" },
        ]}
      />

      <PagePath2
        title="Terms and Conditions"
        showSearch
        showAddButton
        placeholder="Search by Role"
        searchTerm={searchTerm}
        handleSearchTerm={(e) => setSearchTerm(e.target.value)}
        addButtonText="Create Terms & Conditions"
        onClick={() => navigate("/app-management/create-terms-and-conditions")}
      />

      <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 mt-4">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B00]"></div>
          </div>
        ) : tableData.length === 0 ? (
          <div className="flex flex-col justify-center items-center py-20 text-gray-500">
            <p className="text-lg">No Terms and Conditions found</p>
            {searchTerm && (
              <p className="text-sm mt-2">Try adjusting your search criteria</p>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="border border-gray-300 rounded-t-xl shadow-sm overflow-hidden">
              <DataTable
                columns={columns}
                data={tableData}
                currentPage={page}
                usersPerPage={limit}
                actions={actions}
              />
            </div>
            <Pagination
              currentPage={page}
              totalPages={termsList?.totalPages || 1}
              totalItems={termsList?.totalTerms || 0}
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

export default TermsAndConditions;