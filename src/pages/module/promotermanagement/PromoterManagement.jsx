import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import {RiDeleteBin6Fill } from "react-icons/ri";
import DataTable from "../../../components/uiComponent/DataTable";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import Pagination from "../../../components/uiComponent/Pagination";
export default function PromoterManagement() {
  const navigate = useNavigate(); // 2. Initialize the navigate function
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchTerm = (e) => setSearchTerm(e.target.value);
   const handleAddStaff = () => {
        navigate("/promotermanagementadd")
    };
  const [promoters, _setPromoters] = useState([
    // ... your existing data ...
    { id: 1, name: "Arlene McCoy", code: "C001", phone: "9876543210", referral: "HVSGU45789", total: 50, status: "Block" },
    { id: 2, name: "Jacob Jones", code: "G001", phone: "9876543210", referral: "HVSGU43255", total: 30, status: "UnBlock" },
    { id: 3, name: "Kristin Watson", code: "F001", phone: "9876543210", referral: "HVSGU486214", total: 20, status: "Block" },
    { id: 4, name: "Jenny Wilson", code: "B001", phone: "9876543210", referral: "HVSGU455524", total: 10, status: "Block" },
    { id: 5, name: "Kristin Watson", code: "F001", phone: "9876543210", referral: "HVSGU478652", total: 15, status: "UnBlock" },
    { id: 6, name: "Robert Fox", code: "D001", phone: "9876543210", referral: "HVSGU489632", total: 25, status: "UnBlock" },
    { id: 7, name: "Eleanor Pena", code: "E001", phone: "9876543210", referral: "HVSGU412589", total: 40, status: "Block" },
    { id: 8, name: "Cameron Williamson", code: "H001", phone: "9876543210", referral: "HVSGU425896", total: 35, status: "UnBlock" },
    { id: 9, name: "Savannah Nguyen", code: "I001", phone: "9876543210", referral: "HVSGU436985", total: 28, status: "Block" },
    { id: 10, name: "Brooklyn Simmons", code: "J001", phone: "9876543210", referral: "HVSGU447896", total: 22, status: "UnBlock" },
    { id: 11, name: "Ralph Edwards", code: "K001", phone: "9876543210", referral: "HVSGU458745", total: 18, status: "Block" },
    { id: 12, name: "Kathryn Murphy", code: "L001", phone: "9876543210", referral: "HVSGU469874", total: 32, status: "UnBlock" },
  ]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    
  const filteredData = promoters.filter((promoter) =>
    promoter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    promoter.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    promoter.phone.includes(searchTerm) ||
    promoter.referral.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);


  const [_showAddModal, _setShowAddModal] = useState(false);
  const [_showEditModal, _setShowEditModal] = useState(false);
  const [_showDeleteModal, _setShowDeleteModal] = useState(false);
  const [_selectedPromoter, _setSelectedPromoter] = useState(null);
  const [_formData, _setFormData] = useState({
    id: "",
    name: "",
    code: "",
    phone: "",
    referral: "",
  });

  const columns = [
      {
      header: "Sr No.",
      field: "id",
    },
    {
      header: "Promoter Name",
      field: "name",
      render: (row) => (
        <div className="flex flex-col leading-tight">
          <span className="font-semibold text-[#262626]">{row.name}</span>
          <span className="text-base text-[#262626]">{row.code}</span>
        </div>
      ),
    },
    
  {
      header: "Phone No.",
      field: "phone",
    },
    {
      header: "Referral code",
      field: "referral",
    },
    {
      header: "Total user Registered",
      field: "total",
    },
    {
      header: "Action",
      field: "action",
      render: (row) => (
        <div className="flex items-center gap-4">
          <FiEdit
            className="text-[#34C759] text-xl cursor-pointer hover:scale-110 transition-transform"
            onClick={() => handleEdit(row)} // Kept original function call
          />
          <RiDeleteBin6Fill
            className="text-[#FF383C] text-xl cursor-pointer hover:scale-110 transition-transform"
            onClick={() => handleDelete(row)}
          />
          <button
            onClick={() => handleToggleStatus(row)}
            className={`px-4 py-1.5 border rounded-md text-base font-medium transition duration-150 ${
              row.status === "Block"
                ? "border-[#991F26] text-[#991F26] "
                : "border-[#CCA547] text-[#CCA547] "
            }`}
          >
            {row.status}
          </button>
        </div>
      ),
    },
  ];

  const handleAddPromoter = () => {
    // 3. Navigate to the Add page
    navigate("/promotermanagementadd");
  };

  const handleEdit = (promoter) => {
    console.log("Edit promoter:", promoter);
    // 4. Navigate to the Edit page
    // In a real app, you'd navigate to /promotermanagementedit/promoter.id
    // But based on your router, you have a static route:
    navigate("/promotermanagementedit");
  };

  const handleDelete = (promoter) => {
    console.log("Delete promoter:", promoter);
    // Add your logic here
  };

  const handleToggleStatus = (promoter) => {
    console.log("Toggle status for:", promoter);
    // Add your logic here
  };

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
                handleSearchTerm={handleSearchTerm}
                showAddButton={true}
                addButtonText="Add New Promoter"
                onClick={handleAddStaff}
            />
            <div className="mt-6 bg-white p-4 rounded shadow">
      {/* DataTable Component */}
      <DataTable
        columns={columns}
        data={currentItems}
        searchPlaceholder="Search promoters..."
        showAddButton={true}
        addButtonText="Add New Promoter"
        onAddClick={handleAddPromoter}
        showEntries={true}
        showSearch={true}
        showPagination={true}
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