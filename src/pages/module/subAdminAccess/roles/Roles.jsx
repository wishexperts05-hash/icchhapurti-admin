import React, { useEffect, useState } from "react";
import Pagination from "../../../../components/uiComponent/Pagination";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";
import DataTable from "../../../../components/uiComponent/DataTable";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import useRoles from "../../../../hooks/subAdminAccess/useRoles";
import useDebounce from "../../../../hooks/debounce/useDebounce";

const Roles = () => {
  const { loading, roles, fetchRoles, deleteRole } = useRoles();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  console.log("roles", roles);
  useEffect(() => {
    fetchRoles(page, limit, debouncedSearch);
  }, [page, limit, debouncedSearch]);

  const onSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearch(newSearchTerm);
    setPage(1);
  };

  const columns = [
    { header: "Sr.No.", field: "srNo" },
    { header: "Role", field: "roleName" },
    { header: "Action", field: "action" },
  ];

  const onPageChange = (data) => {
    setPage(data);
  };

  const onItemsPerPageChange = (data) => {
    setLimit(data);
  };

  const handleDelete = async (id) => {
    await deleteRole(id);
    await fetchRoles(page, limit, search);
  };

  return (
    <div>
      <BreadCrumb
        linkText={[{ text: "Sub Admin Access" }, { text: "Roles" }]}
      />

      <PagePath2
        title="Roles"
        showSearch
        searchTerm={search}
        handleSearchTerm={onSearchChange}
        showAddButton
        addButtonText="Create Role"
        onClick={() => navigate("/sub-admin/roles/create")}
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
              data={roles?.data}
              currentPage={roles?.currentPage}
              usersPerPage={limit}
              actions={[
                {
                  icon: <FaRegEdit className="w-5 h-5 text-[#FF6B00]" />,
                  title: "Edit",
                  onClick: (row) =>
                    navigate(`/sub-admin/roles/edit/${row._id}`),
                },
                {
                  icon: <FiTrash2 className="w-5 h-5 text-[#FF6B00]" />,
                  title: "Delete",
                  onClick: (row) => handleDelete(row?._id),
                },
              ]}
            />
          </div>
          <Pagination
            currentPage={roles?.currentPage}
            totalPages={roles?.totalPages}
            totalItems={roles?.totalItems}
            itemsPerPage={limit}
            onPageChange={onPageChange}
            onItemsPerPageChange={onItemsPerPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Roles;
