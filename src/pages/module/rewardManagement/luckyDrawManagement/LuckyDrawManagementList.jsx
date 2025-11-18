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
    setCurrentPage(1);
  };

  const handleAddLuckyDraw = () => {
    navigate("/lucky-draw-management/add-lucky-draw");
  };

  const handleViewLuckyDraw = () => {
    navigate("/lucky-draw-management/view-lucky-draw");
  };
 

  const [luckyDraws, setLuckyDraws] = useState([
    {
      luckyDrawId: "G458",
      eventName: "Diwali Dhamaka",
      startEndDate: "20-25 Oct",
      status: "ongoing",
    },
    {
      luckyDrawId: "G459",
      eventName: "Festival Bonanza",
      startEndDate: "20-25 Oct",
      status: "upcoming",
    },
    {
      luckyDrawId: "G460",
      eventName: "Festival Bonanza",
      startEndDate: "20-25 Oct",
      status: "completed",
    },
    {
      luckyDrawId: "G461",
      eventName: "Festival Bonanza",
      startEndDate: "20-25 Oct",
      status: "completed",
    },
    {
      luckyDrawId: "G462",
      eventName: "Festival Bonanza",
      startEndDate: "20-25 Oct",
      status: "completed",
    },
    {
      luckyDrawId: "G463",
      eventName: "Festival Bonanza",
      startEndDate: "20-25 Oct",
      status: "completed",
    },
    {
      luckyDrawId: "G464",
      eventName: "Festival Bonanza",
      startEndDate: "20-25 Oct",
      status: "completed",
    },
    {
      luckyDrawId: "G465",
      eventName: "Festival Bonanza",
      startEndDate: "20-25 Oct",
      status: "completed",
    },
    {
      luckyDrawId: "G466",
      eventName: "Festival Bonanza",
      startEndDate: "20-25 Oct",
      status: "completed",
    },
    ...Array.from({ length: 21 }, (_, i) => ({
      luckyDrawId: `G${467 + i}`,
      eventName: i % 2 === 0 ? "Festival Bonanza" : "New Year Special",
      startEndDate: "20-25 Oct",
      status: i % 3 === 0 ? "completed" : i % 3 === 1 ? "ongoing" : "upcoming",
    })),
  ]);

  const filteredData = useMemo(
    () =>
      luckyDraws.filter(
        (item) =>
          item.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.luckyDrawId.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [luckyDraws, searchTerm]
  );

  
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  const handleEdit = (draw) => {
   
    navigate(`/lucky-draw-management/edit-lucky-draw`);
  };

  const handleDelete = (draw) => {
   
  };

  
  const columns = [
    { header: "Sr. No.", field: "srNo" },
    { header: "Lucky Draw ID", field: "luckyDrawId" },
    { header: "Event Name", field: "eventName" },
    { header: "Start - End Date", field: "startEndDate" },
    { header: "Status", field: "status" },
    { header: "Action", field: "action" },
  ];


  const actions = [
    {
      icon: (row) => (
        <FaEye
          className="w-4 h-4 text-yellow-600 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
          title="View"
        />
      ),
      onClick: handleViewLuckyDraw,
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
            status: item.status === "ongoing" ? "Ongoing"
              : item.status === "upcoming" ? "Upcoming"
                : "Completed"
          }))}
          actions={actions}
          currentPage={currentPage}
          usersPerPage={itemsPerPage}
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