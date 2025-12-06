import React, { useState, useMemo, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { MdOutlineBlock } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import DataTable from "../../../components/uiComponent/DataTable";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import Pagination from "../../../components/uiComponent/Pagination";
import useUserManagement from "../../../hooks/userManagement/useUserManagement";
import useDebounce from "../../../hooks/debounce/useDebounce";
import LoaderSpinner from "../../../components/uiComponent/LoaderSpinner";

export default function UserManagement() {
  const navigate = useNavigate();
  const { loading, fetchUserList, userList, updateStatus } = useUserManagement();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

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
    { header: "Referrer", field: "referrer" },
    { header: "Status", field: "isActive" },
    { header: "Action", field: "action" },
  ];

  const handleView = (row) => {
    console.log("Navigating to user details with:", row);
    navigate(`/user-management/user-details/${row._id}`);
  };

  const actions = [
    {
      icon: <FaEye className="text-yellow-600" />,
      title: "View",
      onClick: handleView,
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
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <BreadCrumb
        linkText={[{ text: "User Management" }]}
      />
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
            data={userList?.userList || []}
            currentPage={userList?.currentPage}
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
