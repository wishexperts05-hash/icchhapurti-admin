import React, { useState, useMemo, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { MdOutlineBlock } from "react-icons/md";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import DataTable from "../../../components/uiComponent/DataTable";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import Pagination from "../../../components/uiComponent/Pagination";
import useUserManagement from "../../../hooks/userManagement/useUserManagement";
import useDebounce from "../../../hooks/debounce/useDebounce";
import LoaderSpinner from "../../../components/uiComponent/LoaderSpinner";
import usePermissions from "../../../hooks/auth/usePermissions";
import useLogin from "../../../hooks/auth/useLogin";

export default function UserManagement() {
  const navigate = useNavigate();
  const { loading, fetchUserList, userList, updateStatus, deleteUser } =
    useUserManagement();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { subAdminAccess } = useLogin();
  const { canCreate, canRead, canUpdate, canDelete } = usePermissions(
    subAdminAccess,
    "User Management"
  );

  console.log("userList:", userList);

  const onPageChange = (data) => {
    setPage(data);
  };

  const onItemsPerPageChange = (data) => {
    setLimit(data);
  };

  useEffect(() => {
    fetchUserList(page, limit, debouncedSearch);
  }, [page, limit, debouncedSearch]);

  const handleBlock = async (row) => {
    console.log("Toggling block status for user:", row);
    await updateStatus(row._id, { isActive: !row.isActive });
    fetchUserList(page, limit, debouncedSearch);
  };

  const columns = [
    { header: "Sr.No.", field: "srNo" },
    { header: "User Name", field: "name" },
    { header: "Phone No.", field: "phoneNumber" },
    { header: "Email", field: "email" },
    // { header: "Referrer", field: "referrer" },
    { header: "Status", field: "isActive" },
    { header: "Action", field: "action" },
  ];

  const handleView = (row) => {
    console.log("Navigating to user details with:", row);
    navigate(`/user-management/user-details/${row._id}`);
  };

  const handleDelete = async (row) => {
    await deleteUser(row._id);
    fetchUserList(page, limit, debouncedSearch);
  };

  const actions = [
    {
      icon: <FaEye className="text-yellow-600" />,
      title: "View",
      onClick: handleView,
      disableCondition: () => !canRead,
    },
    {
      icon: (row) => (
        <MdOutlineBlock
          className="w-5 h-5 text-yellow-600 cursor-pointer"
          title="Block User"
        />
      ),
      onClick: handleBlock,
      title: "Toggle Status",
      disableCondition: () => !canUpdate,
    },
    {
      icon: <Trash2 className="w-5 h-5 text-red-600" />,
      title: "Delete",
      onClick: handleDelete,
      disableCondition: () => !canDelete
    },

    // {
    //   icon: (row) => (
    //     <Trash2
    //       className={`w-5 h-5 ${row.deletePossible && canDelete
    //         ? "text-red-600 cursor-pointer"
    //         : "text-gray-400 cursor-not-allowed"
    //         }`}
    //       title={
    //         row.deletePossible
    //           ? "Delete User"
    //           : "User must be soft deleted first"
    //       }
    //     />
    //   ),
    //   title: "Delete",
    //   onClick: (row) => {
    //     if (row.deletePossible && canDelete) {
    //       handleDelete(row);
    //     }
    //   },
    //   disableCondition: (row) => !row.deletePossible || !canDelete,
    // },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <BreadCrumb linkText={[{ text: "User Management" }]} />
      {/* Page Path */}
      <PagePath2
        title="User Management"
        showSearch={true}
        searchTerm={searchTerm}
        handleSearchTerm={(e) => {
          setSearchTerm(e.target.value);
          if (!error) setPage(1);
        }}
      />

      {loading ? (
        <div className="flex w-full items-center justify-center py-10">
          <LoaderSpinner />
        </div>
      ) : (
        <div className="rounded-t-2xl overflow-hidden shadow-lg border border-gray-200">
          <DataTable
            columns={columns}
            data={userList?.formantedUserList || []}
            currentPage={userList?.currentPage}
            usersPerPage={limit}
            actions={actions.map((action) => ({
              ...action,
              label:
                typeof action.label === "function" ? undefined : action.label,
              onClick: action.onClick,
            }))}
          />
          {/* Pagination */}
          <Pagination
            currentPage={userList?.currentPage}
            totalPages={userList?.totalPages}
            totalItems={userList?.totalUser}
            itemsPerPage={limit}
            onPageChange={onPageChange}
            onItemsPerPageChange={onItemsPerPageChange}
          />
        </div>
      )}
    </div>
  );
}

