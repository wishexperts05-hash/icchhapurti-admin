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

export default function LuckyDrawManagementList() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { luckyDrawList, loading, fetchLuckyDrawList, deleteLuckyDrawById} =
    useLuckyDrawManagement();

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
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

  const handleDelete = async(row) => {
    await deleteLuckyDrawById(row._id);
    fetchLuckyDrawList(currentPage, itemsPerPage, debouncedSearch);
  };

  const formatDate = (iso) => {
    if (!iso) return "-";
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    fetchLuckyDrawList(currentPage, itemsPerPage, debouncedSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, itemsPerPage, debouncedSearch]);

  const pagination = luckyDrawList?.pagination || {};
  const totalItems = pagination.totalRecords || 0;
  const totalPages = pagination.totalPages || 1;
  const currentApiPage = pagination.currentPage || currentPage;
  const limitFromApi = pagination.limit || itemsPerPage;

  const tableData = useMemo(() => {
    const apiData = luckyDrawList?.data || [];

    return apiData.map((item, index) => ({
      ...item,
      srNo: (currentApiPage - 1) * limitFromApi + index + 1,
      luckyDrawId: item.eventId,
      eventName: item.eventName,
      startEndDate: `${formatDate(item.startDate)} - ${formatDate(
        item.endDate
      )}`,
      status: item.status,
    }));
  }, [luckyDrawList, currentApiPage, limitFromApi]);

  const columns = [
    { header: "Sr. No.", field: "srNo" },
    { header: "Lucky Draw ID", field: "luckyDrawId" },
    { header: "Draw Name", field: "eventName" },
    { header: "Start - End Date", field: "startEndDate" },
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
    },
    {
      icon: () => (
        <FaRegEdit
          className="w-5 h-5 text-yellow-600 hover:text-green-600 transition-colors duration-200 cursor-pointer"
          title="Edit"
        />
      ),
      onClick: handleEdit,
    },
    {
      icon: () => (
        <Trash2
          className="w-5 h-5 text-yellow-600 hover:text-red-600 transition-colors duration-200 cursor-pointer"
          title="Delete"
        />
      ),
      onClick: handleDelete,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <BreadCrumb linkText={[{ text: "Lucky Draw Management" }]} />

      {/* Page Title & Search */}
      <PagePath2
        title="Lucky Draw Events"
        showSearch={true}
        searchTerm={searchTerm}
        handleSearchTerm={handleSearchTerm}
        showExtraButton={true}
        extraButtonText="Add Lucky Draw Event"
        onExtraClick={handleAddLuckyDraw}
      />

      {/* Data Table */}

      {loading ? (
        <div className="flex w-full items-center justify-center py-10">
          <LoaderSpinner />
        </div>
      ) : (
        <div className="mt-6 bg-white p-4 rounded shadow">
          <DataTable
            columns={columns}
            data={tableData}
            actions={actions}
            currentPage={currentApiPage}
            usersPerPage={limitFromApi}
          />

          <Pagination
            currentPage={currentApiPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={limitFromApi}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </div>
      )}
    </div>
  );
}
