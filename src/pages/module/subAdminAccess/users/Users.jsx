import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import { useNavigate } from "react-router-dom";
import useUsers from "../../../../hooks/subAdminAccess/useUsers";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";
import DataTable from "../../../../components/uiComponent/DataTable";
import { FaRegEdit } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import Pagination from "../../../../components/uiComponent/Pagination";
import { FiEye } from "react-icons/fi";
import useDebounce from "../../../../hooks/debounce/useDebounce";

const Users = () => {
  const { loading, fetchUsers, users, deleteUser } = useUsers();
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
    fetchUsers(page, limit, debouncedSearch);
  }, [page, limit, debouncedSearch]);

  const columns = [
    { header: "Sr.No.", field: "srNo" },
    { header: "Name", field: "name" },
    { header: "Role", field: "role" },
    {
      header: "Status",
      field: "isActive",
    },

    { header: "Action", field: "action" },
  ];

  const tableData = users?.data?.map((user, index) => ({
    srNo: index + 1,
    name: (
      <div className="flex justify-center gap-3">
        <img
          src={user.photo}
          alt={user.firstName}
          className="w-10 h-10 rounded-full object-cover border"
        />
        <span>{`${user.firstName} ${user.lastName}`}</span>
      </div>
    ),
    role: user.role,
    isActive: user.isActive,
    _id: user._id,
  }));

  const onPageChange = (data) => {
    setPage(data);
  };

  const onItemsPerPageChange = (data) => {
    setLimit(data);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers(page, limit, search);
  };

  console.log("users", users);
  return (
    <div>
      <BreadCrumb
        linkText={[{ text: "Sub Admin Access" }, { text: "Users" }]}
      />

      <PagePath2
        title="Users"
        showSearch
        searchTerm={search}
        handleSearchTerm={onSearchChange}
        showAddButton
        addButtonText="Add User"
        onClick={() => navigate("/sub-admin/users/create")}
      />

      {loading ? (
        <div className="w-full flex items-center justify-center">
          <LoaderSpinner />
        </div>
      ) : (
        <div className="overflow-x-auto flex-1 font-inter">
          <div className="border border-gray-300 rounded-[8px] shadow-sm overflow-hidden">
            <DataTable
              columns={columns}
              data={tableData}
              currentPage={users?.currentPage}
              usersPerPage={limit}
              actions={[
                {
                  icon: <FiEye className="w-5 h-5 text-yellow-600" />,
                  title: "View",
                  onClick: (row) =>
                    navigate(`/sub-admin/users/view/${row._id}`),
                },
                {
                  icon: <FaRegEdit className="w-5 h-5 text-yellow-600 hover:text-green-600 transition-colors duration-200 cursor-pointer" />,
                  title: "Edit",
                  onClick: (row) =>
                    navigate(`/sub-admin/users/edit/${row._id}`),
                },
                {
                  icon: <FiTrash2 className="w-5 h-5 text-red-600" />,
                  title: "Delete",
                  onClick: (row) => handleDelete(row?._id),
                },
              ]}
            />
          </div>
          <Pagination
            currentPage={users?.currentPage}
            totalPages={users?.totalPages}
            totalItems={users?.totalItems}
            itemsPerPage={limit}
            onPageChange={onPageChange}
            onItemsPerPageChange={onItemsPerPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Users;
