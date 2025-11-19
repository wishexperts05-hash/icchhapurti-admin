import React, { useState } from "react";
import { FaEye, FaRegEdit } from "react-icons/fa";
import { Trash2 } from "lucide-react";
import { MdOutlineBlock } from "react-icons/md";
import DataTable from "../../../components/uiComponent/DataTable";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import Pagination from "../../../components/uiComponent/Pagination";

export default function PromoterManagement() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchTerm = (e) => setSearchTerm(e.target.value);
  
  const handleAddStaff = () => {
    navigate("/promotermanagementadd");
  };

  const [promoters, setPromoters] = useState([
    { id: 1, name: "Arlene McCoy", code: "C001", phone: "9876543210", referral: "HVSGU45789", total: 50, status: false },
    { id: 2, name: "Jacob Jones", code: "G001", phone: "9876543210", referral: "HVSGU43255", total: 30, status: true },
    { id: 3, name: "Kristin Watson", code: "F001", phone: "9876543210", referral: "HVSGU486214", total: 20, status: false },
    { id: 4, name: "Jenny Wilson", code: "B001", phone: "9876543210", referral: "HVSGU455524", total: 10, status: false },
    { id: 5, name: "Kristin Watson", code: "F001", phone: "9876543210", referral: "HVSGU478652", total: 15, status: true },
    { id: 6, name: "Robert Fox", code: "D001", phone: "9876543210", referral: "HVSGU489632", total: 25, status: true },
    { id: 7, name: "Eleanor Pena", code: "E001", phone: "9876543210", referral: "HVSGU412589", total: 40, status: false },
    { id: 8, name: "Cameron Williamson", code: "H001", phone: "9876543210", referral: "HVSGU425896", total: 35, status: true },
    { id: 9, name: "Savannah Nguyen", code: "I001", phone: "9876543210", referral: "HVSGU436985", total: 28, status: false },
    { id: 10, name: "Brooklyn Simmons", code: "J001", phone: "9876543210", referral: "HVSGU447896", total: 22, status: true },
    { id: 11, name: "Ralph Edwards", code: "K001", phone: "9876543210", referral: "HVSGU458745", total: 18, status: false },
    { id: 12, name: "Kathryn Murphy", code: "L001", phone: "9876543210", referral: "HVSGU469874", total: 32, status: true },
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

  // Handler functions
  const handleView = (row) => {
    console.log("Navigating to promoter details with:", row);
    navigate("/promotor-management/promotor-details", { state: { promoterData: row } });
  };

  const handleEdit = (row) => {
    console.log("Edit promoter:", row);
    navigate("/promotermanagementedit", { state: { promoterData: row } });
  };

  const handleDelete = (row) => {
    console.log("Delete promoter:", row);
    setPromoters((prev) => prev.filter((item) => item.id !== row.id));
  };

  const handleToggleStatus = (row) => {
    console.log("Toggle status for:", row);
    setPromoters((prev) =>
      prev.map((item) =>
        item.id === row.id ? { ...item, status: !item.status } : item
      )
    );
  };

  const columns = [
    {
      header: "Sr No.",
      field: "id",
    },
    {
      header: "Promoter Name",
      field: "name",
      render: (row) => (
        <div className="flex flex-col justify-center h-full text-center leading-tight">
          <span className="font-semibold text-gray-900">{row.name}</span>
          <span className="flex justify-center text-start text-gray-500 text-xs">{row.code}</span>
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
    },
  ];

  const actions = [
    {
      icon: <FaEye className="text-yellow-600" />,
      onClick: handleView,
      title: "View",
    },
    {
      icon: (row) => (
        <FaRegEdit
          className="w-5 h-5 text-yellow-600 hover:text-yellow-700 transition-colors duration-200 cursor-pointer"
          title="Edit"
        />
      ),
      onClick: handleEdit,
      title: "Edit",
    },
    {
      icon: <Trash2 className="w-5 h-5 text-red-600" />,
      onClick: handleDelete,
      title: "Delete",
    },
    {
      icon: (row) => (
        <MdOutlineBlock
          className={`w-5 h-5 ${
            row.status
              ? "text-yellow-700 cursor-pointer"
              : "text-red-500 cursor-pointer"
          }`}
          title={row.status ? "Unblock" : "Block"}
        />
      ),
      onClick: handleToggleStatus,
      title: "Toggle Status",
    },
  ];

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
          actions={actions.map((a) =>
            a.icon
              ? {
                  ...a,
                  render: (row) => (
                    <button
                      onClick={() => a.onClick(row)}
                      className="p-2 rounded-full hover:bg-gray-100 transition"
                      title={a.title}
                      disabled={a.disableCondition?.(row)}
                    >
                      {typeof a.icon === "function" ? a.icon(row) : a.icon}
                    </button>
                  ),
                }
              : a
          )}
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