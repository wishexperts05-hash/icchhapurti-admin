import React, { useState, useMemo } from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import DataTable from "../../../../components/uiComponent/DataTable";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import Pagination from "../../../../components/uiComponent/Pagination";
import { FaRegEdit } from "react-icons/fa";

export default function LuckyDrawManagementList({ activeItem, setActiveItem }) {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // reset page when searching
  };

  const handleAddLuckyDraw = () => {
    navigate("/lucky-draw-management/add-lucky-draw");
  };

  const handleManageWinners = () => {
    navigate("/lucky-draw-management/lucky-draw-result");//lucky-draw-management/select-winner
  };

  const [luckyDraws, setLuckyDraws] = useState([
    {
     
      luckyDrawId: "G458",
      productCategory: "Pen",
      eventName: "Diwali Dhamaka",
      startEndDate: "20-25 Oct",
      status: "ongoing",
    },
    {
     
      luckyDrawId: "G459",
      productCategory: "Pen",
      eventName: "Festival Bonanza",
      startEndDate: "20-25 Oct",
      status: "upcoming",
    },
    {
      
      luckyDrawId: "G460",
      productCategory: "Pen",
      eventName: "Festival Bonanza",
      startEndDate: "20-25 Oct",
      status: "completed",
    },
    {
      
      luckyDrawId: "G461",
      productCategory: "Pen",
      eventName: "Festival Bonanza",
      startEndDate: "20-25 Oct",
      status: "completed",
    },
    {
      
      luckyDrawId: "G462",
      productCategory: "Pen",
      eventName: "Festival Bonanza",
      startEndDate: "20-25 Oct",
      status: "completed",
    },
    {
      
      luckyDrawId: "G463",
      productCategory: "Pen",
      eventName: "Festival Bonanza",
      startEndDate: "20-25 Oct",
      status: "completed",
    },
    {
      
      luckyDrawId: "G464",
      productCategory: "Pen",
      eventName: "Festival Bonanza",
      startEndDate: "20-25 Oct",
      status: "completed",
    },
    {
      
      luckyDrawId: "G465",
      productCategory: "Pen",
      eventName: "Festival Bonanza",
      startEndDate: "20-25 Oct",
      status: "completed",
    },
    {
      
      luckyDrawId: "G466",
      productCategory: "Pen",
      eventName: "Festival Bonanza",
      startEndDate: "20-25 Oct",
      status: "completed",
    },
    ...Array.from({ length: 21 }, (_, i) => ({
      
      luckyDrawId: `G${467 + i}`,
      productCategory: i % 3 === 0 ? "Pen" : i % 3 === 1 ? "Notebook" : "Diary",
      eventName: i % 2 === 0 ? "Festival Bonanza" : "New Year Special",
      startEndDate: "20-25 Oct",
      status: i % 3 === 0 ? "completed" : i % 3 === 1 ? "ongoing" : "upcoming",
    })),
  ]);

  // Filter logic
  const filteredData = useMemo(
    () =>
      luckyDraws.filter(
        (item) =>
          item.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.luckyDrawId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.productCategory.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [luckyDraws, searchTerm]
  );

  // Pagination logic
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  // Handlers
  

  const handleEdit = (draw) => {
    console.log("Editing lucky draw:", draw);
    navigate(`/lucky-draw-management/edit-lucky-draw`);
  };

  const handleDelete = (draw) => {
   
  };

  // Custom status renderer
  const renderStatus = (status) => {
    const statusConfig = {
      ongoing: {
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        dot: "bg-yellow-600",
        text: "Ongoing",
      },
      upcoming: {
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        dot: "bg-blue-600",
        text: "Upcoming",
      },
      completed: {
        color: "text-green-600",
        bgColor: "bg-green-50",
        dot: "bg-green-600",
        text: "Completed",
      },
    };

    const config = statusConfig[status] || statusConfig.completed;

    return (
      <span
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${config.bgColor} ${config.color} text-sm font-medium`}
      >
        <span className={`w-2 h-2 rounded-full ${config.dot}`}></span>
        {config.text}
      </span>
    );
  };

  // Columns for DataTable
  const columns = [
    
    { header: "Lucky Draw ID", field: "luckyDrawId" },
    { header: "Product Category", field: "productCategory" },
    { header: "Event Name", field: "eventName" },
    { header: "Start - End Date", field: "startEndDate" },
    {
      header: "Status",
      field: "status",
      render: (row) => renderStatus(row.status),
    },
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
      onClick: handleDelete,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <BreadCrumb linkText={[{ text: "Lucky Draw Management" }]} />

      {/* Page Title & Search */}
      <PagePath2
        title="Lucky Draw Events"
        showSearch={true}
        searchTerm={searchTerm}
        handleSearchTerm={handleSearchTerm}
        showAddButton={true}
        addButtonText="Manage Winners"
        onClick={handleManageWinners}
        showExtraButton={true}
        extraButtonText="Add New Lucky Draw Events"
        onExtraClick={handleAddLuckyDraw}
        
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