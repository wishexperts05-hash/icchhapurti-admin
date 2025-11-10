import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import { useNavigate } from "react-router-dom";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";
import DataTable from "../../../../components/uiComponent/DataTable";
import { FaRegEdit } from "react-icons/fa";
import { FiEye, FiTrash2 } from "react-icons/fi";
import Pagination from "../../../../components/uiComponent/Pagination";
import useUsersPermission from "../../../../hooks/subAdminAccess/useUsersPermission";
import useDebounce from "../../../../hooks/debounce/useDebounce";

const UsersPermission = () => {
  const {
    loading,
    fetchUsersPermission,
    usersPermission,
    deleteUserPermission,
  } = useUsersPermission();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const onSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearch(newSearchTerm);
    setPage(1);
  };

  useEffect(() => {
    fetchUsersPermission(page, limit, debouncedSearch);
  }, [page, limit, debouncedSearch]);

  const columns = [
    { header: "Sr.No.", field: "srNo" },
    { header: "User Name", field: "fullName" },
    { header: "Role", field: "role" },
    { header: "Action", field: "action" },
  ];

  const tableData =
    usersPermission?.data?.map((user, index) => ({
      srNo: (page - 1) * limit + index + 1,
      fullName: (
        <div className="flex justify-center gap-3">
          <img
            src={user.photo}
            alt={user.fullName}
            className="w-10 h-10 rounded-full object-cover border"
          />
          <span className="font-medium">{user.fullName}</span>
        </div>
      ),
      role: user.role,
      id: user.id,
    })) || [];

  const onPageChange = (data) => {
    setPage(data);
  };

  const onItemsPerPageChange = (data) => {
    setLimit(data);
  };

  const handleView = (id) => navigate(`/sub-admin/user-permissions/view/${id}`);

  const handleEdit = (id) => navigate(`/sub-admin/user-permissions/edit/${id}`);

  const handleDelete = async (id) => {
    await deleteUserPermission(id);
    fetchUsersPermission(page, limit, debouncedSearch);
  };

  console.log("usersPermission", usersPermission);

  return (
    <div>
      <BreadCrumb
        linkText={[{ text: "Sub Admin Access" }, { text: "User Permissions" }]}
      />

      <PagePath2
        title="User Permissions"
        showSearch
        searchTerm={search}
        handleSearchTerm={onSearchChange}
        showAddButton
        addButtonText="Assign Access"
        onClick={() => navigate("/sub-admin/user-permissions/create")}
      />

      {loading ? (
        <div className="w-full flex items-center justify-center min-h-[200px]">
          <LoaderSpinner />
        </div>
      ) : (
        <div className="overflow-x-auto flex-1 font-inter">
          <div className="border border-gray-300 rounded-[8px] shadow-sm overflow-hidden">
            <DataTable
              columns={columns}
              data={tableData}
              currentPage={page}
              usersPerPage={limit}
              actions={[
                {
                  icon: <FiEye className="w-5 h-5 text-[#FF6B00]" />,
                  title: "View",
                  onClick: (row) => handleView(row.id),
                },
                {
                  icon: <FaRegEdit className="w-5 h-5 text-[#FF6B00]" />,
                  title: "Edit",
                  onClick: (row) => handleEdit(row.id),
                },
                {
                  icon: <FiTrash2 className="w-5 h-5 text-[#FF6B00]" />,
                  title: "Delete",
                  onClick: (row) => handleDelete(row?.id),
                },
              ]}
            />
          </div>

          {usersPermission?.pagination && (
            <Pagination
              currentPage={usersPermission?.pagination?.page || page}
              totalPages={usersPermission?.pagination?.totalPages || 1}
              totalItems={usersPermission?.pagination?.total || 0}
              itemsPerPage={usersPermission?.pagination?.limit || limit}
              onPageChange={onPageChange}
              onItemsPerPageChange={onItemsPerPageChange}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default UsersPermission;
