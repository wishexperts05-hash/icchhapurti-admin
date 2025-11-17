import React, { useState, useMemo } from "react";
import { FaEye } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {Trash2 } from "lucide-react";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import DataTable from "../../../components/uiComponent/DataTable";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import Pagination from "../../../components/uiComponent/Pagination";
import { FaRegEdit } from "react-icons/fa";

export default function OfferManagementList({ activeItem, setActiveItem }) {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // reset page when searching
  };
const handleAddStaff = () => {
        navigate("/offer-management/add-offer");
    };
  const [offers, setOffers] = useState([
    {
      srNo: 1,
      offerTitle: "Diwali Special Offer",
      targetaudience: "All Customers",
      productname: "Electronics Bundle",
      startdate: "01/11/2024",
      enddate: "15/11/2024",
      action: "active",
    },
    {
      srNo: 2,
      offerTitle: "New Year Sale",
      targetaudience: "Premium Members",
      productname: "Fashion Collection",
      startdate: "25/12/2024",
      enddate: "05/01/2025",
      action: "active",
    },
    {
      srNo: 3,
      offerTitle: "Flash Sale",
      targetaudience: "New Users",
      productname: "Home Appliances",
      startdate: "10/11/2024",
      enddate: "12/11/2024",
      action: "inactive",
    },
    {
      srNo: 4,
      offerTitle: "Weekend Special",
      targetaudience: "VIP Customers",
      productname: "Smartphones",
      startdate: "16/11/2024",
      enddate: "17/11/2024",
      action: "active",
    },
    {
      srNo: 5,
      offerTitle: "Cyber Monday Deal",
      targetaudience: "All Customers",
      productname: "Laptops & Accessories",
      startdate: "02/12/2024",
      enddate: "02/12/2024",
      action: "inactive",
    },
    ...Array.from({ length: 25 }, (_, i) => ({
      srNo: i + 6,
      offerTitle: `Offer ${i + 6}`,
      targetaudience: i % 3 === 0 ? "All Customers" : i % 3 === 1 ? "Premium Members" : "New Users",
      productname: `Product ${i + 6}`,
      startdate: "01/12/2024",
      enddate: "31/12/2024",
      action: i % 2 === 0 ? "active" : "inactive",
    })),
  ]);

  // Filter logic
  const filteredData = useMemo(
  () =>
    offers.filter((item) =>
      item.offerTitle.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  [offers, searchTerm]
);

  // Pagination logic
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  // Handlers
  const handleView = (offer) => {
    console.log("Navigating to offer details with:", offer);
    navigate(`/offer-management/offer-details`);
  };

  const handleEdit = (offer) => {
  console.log("Editing offer:", offer);
  navigate(`/offer-management/edit-offer`); // Remove the /${offer.id}
};
  
  const handleToggleStatus = (row) => {
    setOffers((prev) =>
      prev.map((item) =>
        item.id === row.id ? { ...item, status: !item.status } : item
      )
    );
  };

  // Columns for DataTable
  const columns = [
    { header: "Sr.No.", field: "srNo" },
    { header: "Offer Title", field: "offerTitle" },
    { header: "Target Audience", field: "targetaudience" },
    { header: "Product Name", field: "productname" },
    { header: "start Date", field: "startdate" },
     { header: "End Date", field: "enddate" },
    { header: "Action", field: "action" },
  ];

  // Actions for DataTable
  const actions = [
    {
      icon: <FaEye className="text-yellow-600" />,
      title: "View",
      onClick: (row) => handleView(row),
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
      <BreadCrumb
        linkText={[
          { text: "Offer Management" },
        ]}
      />

      {/* Page Title & Search */}
      <PagePath2
        title="Offer Management"
        showSearch={true}
        searchTerm={searchTerm}
        handleSearchTerm={handleSearchTerm}
         showAddButton={true}
                addButtonText="Add New Offer"
                onClick={handleAddStaff}
            
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