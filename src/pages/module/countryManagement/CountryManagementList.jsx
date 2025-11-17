import React, { useState, useMemo } from "react";
import { FaEye } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import DataTable from "../../../components/uiComponent/DataTable";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import Pagination from "../../../components/uiComponent/Pagination";
import { FaRegEdit } from "react-icons/fa";

export default function CountryManagementList({ activeItem, setActiveItem }) {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // reset page when searching
  };

  const handleAddCountry = () => {
    navigate("/country-management/add-country");
  };

  const [countries, setCountries] = useState([
    {
      srNo: 1,
      countryName: "United States",
      countryCode: "US",
      currency: "USD",
      phoneCode: "+1",
      region: "North America",
      status: "active",
    },
    {
      srNo: 2,
      countryName: "United Kingdom",
      countryCode: "UK",
      currency: "GBP",
      phoneCode: "+44",
      region: "Europe",
      status: "active",
    },
    {
      srNo: 3,
      countryName: "India",
      countryCode: "IN",
      currency: "INR",
      phoneCode: "+91",
      region: "Asia",
      status: "active",
    },
    {
      srNo: 4,
      countryName: "Canada",
      countryCode: "CA",
      currency: "CAD",
      phoneCode: "+1",
      region: "North America",
      status: "active",
    },
    {
      srNo: 5,
      countryName: "Australia",
      countryCode: "AU",
      currency: "AUD",
      phoneCode: "+61",
      region: "Oceania",
      status: "inactive",
    },
    ...Array.from({ length: 25 }, (_, i) => ({
      srNo: i + 6,
      countryName: `Country ${i + 6}`,
      countryCode: `C${i + 6}`,
      currency: `CUR${i + 6}`,
      phoneCode: `+${i + 6}`,
      region: i % 3 === 0 ? "Asia" : i % 3 === 1 ? "Europe" : "Africa",
      status: i % 2 === 0 ? "active" : "inactive",
    })),
  ]);

  // Filter logic
  const filteredData = useMemo(
    () =>
      countries.filter((item) =>
        item.countryName.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [countries, searchTerm]
  );

  // Pagination logic
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  // Handlers
  const handleView = (country) => {
    console.log("Navigating to country details with:", country);
    navigate(`/country-management/country-details`);
  };

  const handleEdit = (country) => {
    console.log("Editing country:", country);
    navigate(`/country-management/edit-country`);
  };

  const handleToggleStatus = (row) => {
    setCountries((prev) =>
      prev.map((item) =>
        item.id === row.id ? { ...item, status: !item.status } : item
      )
    );
  };

  // Columns for DataTable
  const columns = [
    { header: "Sr.No.", field: "srNo" },
    { header: "Country ", field: "countryName" },
    { header: "Default language", field: "countryCode" },
    { header: " Default Currency", field: "currency" },
     { header: "Action", field: "action" },
  ];

  // Actions for DataTable
  const actions = [
    
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
      icon: (row) => (
        <Trash2
          className="w-5 h-5 text-yellow-600 hover:text-red-600 transition-colors duration-200 cursor-pointer"
          title="Delete"
        />
      ),
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

      {/* Data Table */}
      <div className="mt-6 bg-white p-4 rounded shadow">
        <DataTable
          columns={columns}
          data={currentItems.map((item, index) => ({
            ...item,
            srNo: startIndex + index + 1,
          }))}
          actions={actions}
        />
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
      />
    </div>
  );
}