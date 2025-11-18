import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Gift } from "lucide-react";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import DataTable from "../../../../components/uiComponent/DataTable";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import Pagination from "../../../../components/uiComponent/Pagination";
import Button from "../../../../components/uiComponent/Button";
import { FaEye } from "react-icons/fa";

export default function LuckyDrawManagementResult({ activeItem, setActiveItem }) {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // reset page when searching
  };

  const [results, setResults] = useState([
    {
      srNo: 1,
      luckyDrawId: "G458",
      eventName: "Diwali Dhamaka",
      ticketsProduct: "1 ticket / pen",
      numberOfWinners: 5,
    },
    {
      srNo: 2,
      luckyDrawId: "G459",
      eventName: "Festival Bonanza",
      ticketsProduct: "5 ticket / pen",
      numberOfWinners: 2,
    },
    {
      srNo: 3,
      luckyDrawId: "G460",
      eventName: "Festival Bonanza",
      ticketsProduct: "4 ticket / pen",
      numberOfWinners: 3,
    },
    {
      srNo: 4,
      luckyDrawId: "G461",
      eventName: "Festival Bonanza",
      ticketsProduct: "2 ticket / pen",
      numberOfWinners: 5,
    },
    {
      srNo: 5,
      luckyDrawId: "G462",
      eventName: "Festival Bonanza",
      ticketsProduct: "1 ticket / pen",
      numberOfWinners: 2,
    },
    {
      srNo: 6,
      luckyDrawId: "G463",
      eventName: "Festival Bonanza",
      ticketsProduct: "2 ticket / pen",
      numberOfWinners: 5,
    },
    {
      srNo: 7,
      luckyDrawId: "G464",
      eventName: "Festival Bonanza",
      ticketsProduct: "1 ticket / pen",
      numberOfWinners: 4,
    },
    {
      srNo: 8,
      luckyDrawId: "G465",
      eventName: "Festival Bonanza",
      ticketsProduct: "4 ticket / pen",
      numberOfWinners: 2,
    },
    {
      srNo: 9,
      luckyDrawId: "G466",
      eventName: "Festival Bonanza",
      ticketsProduct: "3 ticket / pen",
      numberOfWinners: 3,
    },
    ...Array.from({ length: 21 }, (_, i) => ({
      srNo: i + 10,
      luckyDrawId: `G${467 + i}`,
      eventName: i % 2 === 0 ? "Festival Bonanza" : "New Year Special",
      ticketsProduct: `${(i % 5) + 1} ticket / pen`,
      numberOfWinners: (i % 5) + 1,
    })),
  ]);

  // Filter logic
  const filteredData = useMemo(
    () =>
      results.filter(
        (item) =>
          item.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.luckyDrawId.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [results, searchTerm]
  );

  // Pagination logic
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  // Handlers
  const handleSelectWinner = (result) => {
    console.log("Selecting winner for:", result);
    navigate(`/lucky-draw-management/select-winner`, {
      state: {
        drawId: result.luckyDrawId,
        eventName: result.eventName,
        numberOfWinners: result.numberOfWinners,
      },
    });
  };
  const handleView = (offer) => {
    console.log("Navigating to offer details with:", offer);
    navigate(`/lucky-draw-management/select-winner`);
  };

  // Custom action button renderer
  const renderSelectWinnerButton = (row) => {
    return (
      <button
        onClick={() => handleSelectWinner(row)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
      >
        <Gift className="w-4 h-4" />
        <span className="text-sm font-medium">Select Winner</span>
      </button>
    );
  };

  // Columns for DataTable
  const columns = [
    { header: "Lucky Draw ID", field: "luckyDrawId" },
    { header: "Event Name", field: "eventName" },
    { header: "Tickets/ Product", field: "ticketsProduct" },
    { header: "Number of Winners", field: "numberOfWinners" },
    {
      header: "Action",
      field: "action",
      render: (row) => renderSelectWinnerButton(row),
    },
  ];

  // Actions for DataTable (empty as we're using custom render)
  const actions = [
      
     {
           icon: <FaEye className="text-yellow-600" />,
           title: "View",
           onClick: (row) => handleView(row),
         },
    ];
  

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <BreadCrumb
        linkText={[
          { text: "Lucky Draw Management", href: "/lucky-draw-management" },
          { text: "Result" },
        ]}
      />

      {/* Page Title & Search */}
      <PagePath2
        title="Result"
        showSearch={true}
        searchTerm={searchTerm}
        handleSearchTerm={handleSearchTerm}
      />

      {/* Data Table */}
      <div className="mt-6 bg-white p-4 rounded shadow">
        <DataTable
          columns={columns}
          data={currentItems}
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