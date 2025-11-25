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

export default function CountryManagementList() {
  const navigate = useNavigate();

  const { loading,countryList,fetchCountryList,deleteCountryListById}= useCountryManagement();

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(()=>{
    fetchCountryList(page,itemsPerPage,searchTerm);
  },[page,itemsPerPage,searchTerm])
  
  const setCurrentPage = (data) =>{
    setPage(data);
  }

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // reset page when searching
  };

  const handleAddCountry = () => {
    navigate("/country-management/add-country");
  };

  const handleDelete = async (id) => {
    await deleteCountryListById(id);
    fetchCountryList(page, itemsPerPage,  status); 
  }
  

  // Columns for DataTable
  const columns = [
    { header: "Sr.No.", field: "srNo" },
    { header: "Country ", field: "name" },
    { header: "Default language", field: "defaultLanguage" },
    { header: " Default Currency", field: "defaultCurrency" },
     { header: "Action", field: "action" },
  ];

  // Actions for DataTable
  const actions = [
      {
        icon: <FaEdit className="text-green-600" />,
        title: "Edit",
        onClick: (row) => navigate(`/country-management/edit-country/${row._id}`),
      },
      {
        icon: <FaTrash className="text-red-600" />,
        title: "Delete",
        onClick: (row) => handleDelete(row?._id),
  
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
        handleSearchTerm={handleSearchTerm}
        showAddButton={true}
        addButtonText="Add New Country"
        onClick={handleAddCountry}
      />

        {loading ? (
        <div className="flex w-full items-center justify-center py-10">
          <LoaderSpinner />
        </div>
      ) : (
      <div className="mt-6 bg-white p-4 rounded shadow">
        {console.log(countryList?.countries)}
        <DataTable
          columns={columns}
          data={countryList?.countries || []}
          actions={actions}
          usersPerPage={10}
          currentPage={1}
        />

        {/* Pagination */}
      <Pagination
        currentPage={countryList?.currentPage}
        totalPages={countryList?.totalPages ||1}
        totalItems={countryList?.totalCountries}
        itemsPerPage={countryList?.perPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
      />
      </div>
      )}
      
    </div>
  );
}