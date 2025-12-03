import React, { useState, useMemo, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { MdDelete, MdEdit, MdOutlineBlock } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import DataTable from "../../../components/uiComponent/DataTable";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import Pagination from "../../../components/uiComponent/Pagination";
import { FaRegEdit } from "react-icons/fa";
import useOfferManagement from "../../../hooks/offerManagement/useOfferManagement";
import useDebounce from "../../../hooks/debounce/useDebounce";

export default function OfferManagementList() {
  const { loading, offerEnableDisable, deleteOffer, offerList, fetchOfferList } = useOfferManagement();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    fetchOfferList(page, limit, debouncedSearch);
  }, [page, limit, debouncedSearch]);

  console.log("offerList:", offerList);

  const onPageChange = (newPage) => {
    setPage(newPage);
  };

  const onItemsPerPageChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };

  const onSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearch(newSearchTerm);
    setPage(1);
  };

  const handleAddStaff = () => {
    navigate("/offer-management/add-offer");
  };

  // Columns for DataTable
  const columns = [
    { header: "Sr.No.", field: "srNo" },
    { header: "Offer Title", field: "title" },
    { header: "Target Audience", field: "targetAudience" },
    { 
      header: "Product Name", 
      field: "productName",
      render: (row) => (
        <span className="text-sm text-gray-700">
          {row.productName || "N/A"}
        </span>
      )
    },
    { header: "Start Date", field: "startDate" },
    { header: "End Date", field: "endDate" },
    { 
      header: "Status", 
      field: "isActive",
      render: (row) => (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
          row.isActive 
            ? "bg-green-100 text-green-800" 
            : "bg-red-100 text-red-800"
        }`}>
          {row.isActive ? "Enable" : "Disable"}
        </span>
      )
    },
    { header: "Action", field: "action" },
  ];

  const handleView = (row) => {
    navigate(`/offer-management/offer-details/${row._id}`);
  };

  const handleEdit = (row) => {
    navigate(`/offer-management/edit-offer/${row._id}`);
  };


  const handleDelete = async (row) => {
    await deleteOffer(row._id);
    fetchOfferList(page, limit, debouncedSearch);
  }

  const handleDisableEnable = async (row) => {
    await offerEnableDisable(row._id, { isActive: !row.isActive });
    fetchOfferList(page, limit, debouncedSearch);
  };

  const actions = [
    {
      icon: (row) => (
        <MdOutlineBlock
          className="w-5 h-5 text-yellow-600 cursor-pointer"
          title="Block User"
        />
      ),
      onClick: handleDisableEnable,
      title: "Toggle Status",
    },
    {
      icon: <FaEye className="text-yellow-600" />,
      title: "View",
      onClick: handleView,
    },
    {
      icon: (row) => (
        <FaRegEdit
          className="w-5 h-5 text-yellow-600 hover:text-green-600 transition-colors duration-200 cursor-pointer"
          title="Edit"
        />
      ),
      onClick: handleEdit,
    },
    {
      icon: <Trash2 className="w-5 h-5 text-red-600" />,
      onClick: handleDelete,
      title: "Delete",
    },

  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <BreadCrumb
        linkText={[
          { text: "Offer Management" },
        ]}
      />

      {/* Page Title & Search */}
      <PagePath2
        title="Offer Management"
        showSearch={true}
        searchTerm={search}
        handleSearchTerm={onSearchChange}
        showAddButton={true}
        addButtonText="Add New Offer"
        onClick={handleAddStaff}

      />

      {/* Data Table */}
      <div className="mt-6 bg-white p-4 rounded shadow">
        <DataTable
          columns={columns}
          data={offerList?.data || []}
          currentPage={page}
          usersPerPage={limit}
          actions={actions}
        />
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={offerList?.pagination?.currentPage}
        totalPages={offerList?.pagination?.totalPages}
        totalItems={offerList?.pagination?.totalRecords}
        itemsPerPage={offerList?.pagination?.limit}
        onPageChange={onPageChange}
        onItemsPerPageChange={onItemsPerPageChange}
      />
    </div>
  );
}