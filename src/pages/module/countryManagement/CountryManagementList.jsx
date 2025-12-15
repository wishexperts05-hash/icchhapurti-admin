import React, { useState, useEffect } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import DataTable from "../../../components/uiComponent/DataTable";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import Pagination from "../../../components/uiComponent/Pagination";
import { FaRegEdit } from "react-icons/fa";
import useCountryManagement from "../../../hooks/countryManagement/useCountryManagement";
import LoaderSpinner from "../../../components/uiComponent/LoaderSpinner";
import useDebounce from "../../../hooks/debounce/useDebounce";
import useLogin from "../../../hooks/auth/useLogin";
import usePermissions from "../../../hooks/auth/usePermissions";

export default function CountryManagementList() {
  const navigate = useNavigate();
  const { loading, countryList, fetchCountryList, deleteCountryListById } = useCountryManagement();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const debouncedSearch = useDebounce(searchTerm, 500);
  const { subAdminAccess } = useLogin();
  const { canCreate, canUpdate, canDelete } = usePermissions(
    subAdminAccess,
    "Country Management"
  );

  useEffect(() => {
    fetchCountryList(page, itemsPerPage, debouncedSearch);
  }, [page, itemsPerPage, debouncedSearch])

  const onPageChange = (newPage) => {
    setPage(newPage);
  };

  const onItemsPerPageChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };

  const handleAddCountry = () => {
    navigate("/country-management/add-country");
  };

  const handleDelete = async (id) => {
    await deleteCountryListById(id);
    fetchCountryList(page, itemsPerPage, status);
  }

  const onSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    setPage(1);
  };

  const columns = [
    { header: "Sr.No.", field: "srNo" },
    { header: "Country ", field: "name" },
    { header: " Default Currency", field: "defaultCurrency" },
    { header: "Action", field: "action" },
  ];

  const actions = [
    {
      icon: <FaEdit className="w-5 h-5 text-yellow-600 hover:text-green-600 transition-colors duration-200 cursor-pointer" />,
      title: "Edit",
      onClick: (row) => navigate(`/country-management/edit-country/${row._id}`),
      disableCondition: () => !canUpdate,
    },
    {
      icon: <Trash2 className="w-5 h-5 text-red-600" />,
      title: "Delete",
      onClick: (row) => handleDelete(row?._id),
      disableCondition: () => !canDelete,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <BreadCrumb linkText={[{ text: "Country Management" }]} />

      {/* Page Title & Search */}
      <PagePath2
        title="Country Management"
        showSearch={true}
        searchTerm={searchTerm}
        handleSearchTerm={onSearchChange}
        showAddButton={true}
        addButtonText="Add New Country"
        onClick={canCreate ? handleAddCountry : undefined}
        canCreate={canCreate}
      />

      {loading ? (
        <div className="flex w-full items-center justify-center py-10">
          <LoaderSpinner />
        </div>
      ) : (
        <div className="rounded-t-2xl overflow-hidden shadow-lg border border-gray-200">
          <DataTable
            columns={columns}
            data={countryList?.countries || []}
            actions={actions}
            currentPage={page}
            usersPerPage={limit}
          />

          {/* Pagination */}
          <Pagination
            currentPage={countryList?.currentPage}
            totalPages={countryList?.totalPages}
            totalItems={countryList?.totalCountries}
            itemsPerPage={countryList?.perPage}
            onPageChange={onPageChange}
            onItemsPerPageChange={onItemsPerPageChange}
          />
        </div>
      )}

    </div>
  );
}