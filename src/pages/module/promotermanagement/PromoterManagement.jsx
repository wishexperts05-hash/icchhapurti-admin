import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import {RiDeleteBin6Fill } from "react-icons/ri";
import DataTable from "../../../components/uiComponent/DataTable";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate

export default function PromoterManagement() {
  const navigate = useNavigate(); // 2. Initialize the navigate function
  const [promoters, setPromoters] = useState([
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

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPromoter, setSelectedPromoter] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    phone: "",
    referral: "",
  });

  const columns = [
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
    <div className="p-8 bg-[#FFFFFF] min-h-screen font-[Inter] tracking-wide">
      {/* Breadcrumb */}
      <div className="text-sm text-blue-600 font-medium mb-3 flex items-center gap-1">
        <span className="text-gray-500">›</span> Promoter Management
      </div>

      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-8">Promoter Management</h2>

      {/* DataTable Component */}
      <DataTable
        columns={columns}
        data={promoters}
        searchPlaceholder="Search promoters..."
        showAddButton={true}
        addButtonText="Add New Promoter"
        onAddClick={handleAddPromoter} // This now navigates
        showEntries={true}
        showSearch={true}
        showPagination={true}
      />
    </div>
  );
}