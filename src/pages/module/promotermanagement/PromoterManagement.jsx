import React, { useState } from "react";
import { FaEye, FaRegEdit } from "react-icons/fa";
import { Trash2 } from "lucide-react";
import { MdOutlineBlock } from "react-icons/md";
import DataTable from "../../../components/uiComponent/DataTable";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import Pagination from "../../../components/uiComponent/Pagination";
import useDebounce from "../../../hooks/debounce/useDebounce";
import useLogin from "../../../hooks/auth/useLogin";
import usePermissions from "../../../hooks/auth/usePermissions";
import LoaderSpinner from "../../../components/uiComponent/LoaderSpinner";

export default function PromoterManagement() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const { subAdminAccess } = useLogin();
  const { canCreate, canRead, canUpdate, canDelete } = usePermissions(
    subAdminAccess,
    "Promoter Management"
  );

  const onPageChange = (data) => {
    setPage(data);
  };

  const onItemsPerPageChange = (data) => {
    setLimit(data);
  };

  const handleAddStaff = () => {
    navigate("/promoter-management/promoter-managementadd");
  };

  const [promoters, setPromoters] = useState([
    { id: 1, name: "Arlene McCoy", code: "C001", phone: "9876543210", referral: "HVSGU45789", total: 50, status: false },
  ]);

  const handleView = (row) => {
    navigate("/promoter-management/promoter-details", { state: { promoterData: row } });
  };

  const handleEdit = (row) => {
    navigate("/promoter-management/promoter-managementedit", { state: { promoterData: row } });
  };

  const handleDelete = (row) => {
    setPromoters((prev) => prev.filter((item) => item.id !== row.id));
  };

  const handleToggleStatus = (row) => {
    console.log("Toggle status for:", row);
    setPromoters((prev) =>
      prev.map((item) =>
        item.id === row.id ? { ...item, status: !item.status } : item
      )
    );
  };

  const columns = [
    { header: "Sr No.", field: "srNo" },
    { header: "Promoter Name", field: "name" },
    { header: "Phone No.", field: "phoneNumber" },
    { header: "Referral Code", field: "referralCode" },
    { header: "Total User Registered", field: "totalUsersRegistered" },
    { header: "Status", field: "isActive" },
    { header: "Action", field: "action" },
  ];

  const actions = [
    {
      icon: <FaEye className="text-yellow-600" />,
      onClick: handleView,
      title: "View",
      disableCondition: (row) => !canRead,
    },
    {
      icon: (row) => (
        <FaRegEdit
          className="w-5 h-5 text-yellow-600 hover:text-yellow-700 transition-colors duration-200 cursor-pointer"
          title="Edit"
        />
      ),
      onClick: handleEdit,
      title: "Edit",
      disableCondition: (row) => !canUpdate,
    },
    {
      icon: <Trash2 className="w-5 h-5 text-red-600" />,
      onClick: handleDelete,
      title: "Delete",
      disableCondition: (row) => !canDelete,
    },
    {
      icon: (row) => (
        <MdOutlineBlock
          className={`w-5 h-5 ${row.status
            ? "text-yellow-700 cursor-pointer"
            : "text-red-500 cursor-pointer"
            }`}
          title={row.status ? "Unblock" : "Block"}
        />
      ),
      onClick: handleToggleStatus,
      title: "Toggle Status",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <BreadCrumb
        linkText={[
          { text: "Promotor Management" },
        ]}
      />

      {/* Header Bar */}
      <PagePath2
        title="Promotor Management"
        showSearch={true}
        searchTerm={searchTerm}
        handleSearchTerm={(e) => {
          setSearchTerm(e.target.value);
          setPage(1);
        }}
        showAddButton={true}
        addButtonText="Add New Promoter"
        onClick={canCreate ? handleAddStaff : undefined}
      />

      {"loading" ? (
        <div className="flex w-full items-center justify-center py-10">
          <LoaderSpinner />
        </div>
      ) : (
        <div className="rounded-t-2xl overflow-hidden shadow-lg border border-gray-200">
          {/* DataTable Component */}
          <DataTable
            columns={columns}
            data={ []}
            currentPage={[]}
            usersPerPage={limit}
            actions={actions.map((action) => ({
              ...action,
              label:
                typeof action.label === "function"
                  ? undefined
                  : action.label,
              onClick: action.onClick,
            }))}
          />
        </div>
      )}
      {/* Pagination */}
      <Pagination
      // currentPage={staffList?.currentPage}
      // totalPages={staffList?.totalPages}
      // totalItems={staffList?.totalStaff}
      // itemsPerPage={limit}
      // onPageChange={onPageChange}
      // onItemsPerPageChange={onItemsPerPageChange}
      />
    </div>
  );
} 