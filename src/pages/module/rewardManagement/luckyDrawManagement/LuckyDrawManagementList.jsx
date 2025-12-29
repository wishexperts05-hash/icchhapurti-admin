import React, { useState, useMemo, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { FaRegEdit } from "react-icons/fa";

import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import DataTable from "../../../../components/uiComponent/DataTable";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import Pagination from "../../../../components/uiComponent/Pagination";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";
import useLuckyDrawManagement from "../../../../hooks/rewardManagement/useLuckyDrawManagement";
import useDebounce from "../../../../hooks/debounce/useDebounce";
import usePermissions from "../../../../hooks/auth/usePermissions";
import useLogin from "../../../../hooks/auth/useLogin";

export default function LuckyDrawManagementList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const debouncedSearch = useDebounce(searchTerm, 500);
  const { luckyDrawList, loading, fetchLuckyDrawList, deleteLuckyDrawById } = useLuckyDrawManagement();

  const { subAdminAccess } = useLogin();
  const { canCreate, canRead, canUpdate, canDelete } = usePermissions(
    subAdminAccess,
    "Lucky Draw Management"
  );

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleAddLuckyDraw = () => {
    navigate("/lucky-draw-management/add-lucky-draw");
  };

  const handleViewLuckyDraw = (row) => {
    navigate(`/lucky-draw-management/view-lucky-draw/${row._id}`);
  };

  const handleEdit = (row) => {
    navigate(`/lucky-draw-management/edit-lucky-draw/${row._id}`);
  };

  const handleDelete = async (row) => {
    await deleteLuckyDrawById(row._id);
    fetchLuckyDrawList(page, limit, debouncedSearch);
  };

  const onPageChange = (newPage) => {
    setPage(newPage);
  };

  const onItemsPerPageChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };

  useEffect(() => {
    fetchLuckyDrawList(page, limit, debouncedSearch);
  }, [page, limit, debouncedSearch]);

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const columns = [
    { header: "Sr. No.", field: "srNo" },
    { header: "Lucky Draw ID", field: "eventId" },
    { header: "Draw Name", field: "eventName" },
    {
      header: "Start - End Date",
      field: "dateRange",
      render: (row) => `${formatDate(row.startDate)} - ${formatDate(row.endDate)}`
    },
    { header: "Status", field: "status" },
    { header: "Action", field: "action" },
  ];

  const actions = [
    {
      icon: () => (
        <FaEye
          className="w-4 h-4 text-yellow-600 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
          title="View"
        />
      ),
      onClick: handleViewLuckyDraw,
      disableCondition: () => !canRead,
    },
    {
      icon: () => (
        <FaRegEdit
          className="w-5 h-5 text-yellow-600 hover:text-green-600 transition-colors duration-200 cursor-pointer"
          title="Edit"
        />
      ),
      onClick: handleEdit,
      disableCondition: () => !canUpdate,
    },
    {
      icon: <Trash2 className="w-5 h-5 text-red-600" />,
      onClick: handleDelete,
      title: "Delete",
      disableCondition: () => !canDelete,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <BreadCrumb linkText={[{ text: "Reward Management" },{ text: "Lucky Draw Management" }]} />

      {/* Page Title & Search */}
      <PagePath2
        title="Lucky Draw Management"
        showSearch={true}
        searchTerm={searchTerm}
        handleSearchTerm={handleSearchTerm}
        showAddButton={true}
        addButtonText="Add Lucky Draw Event"
        onClick={canCreate ? handleAddLuckyDraw : undefined}
        canCreate={canCreate}
      />

      {/* Data Table */}

      {loading ? (
        <div className="flex w-full items-center justify-center py-10">
          <LoaderSpinner />
        </div>
      ) : (
        <div className="rounded-t-2xl overflow-hidden shadow-lg border border-gray-200">
          <DataTable
            columns={columns}
            data={luckyDrawList?.data || []}
            currentPage={page}
            usersPerPage={limit}
            actions={actions}
          />

          <Pagination
            currentPage={luckyDrawList?.pagination?.currentPage}
            totalPages={luckyDrawList?.pagination?.totalPages}
            totalItems={luckyDrawList?.pagination?.totalRecords}
            itemsPerPage={limit}
            onPageChange={onPageChange}
            onItemsPerPageChange={onItemsPerPageChange}
          />
        </div>
      )}
    </div>
  );
}
