import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function DataTable({
  columns,
  data,
  searchPlaceholder = "Search...",
  showAddButton = false,
  addButtonText = "Add New",
  onAddClick,
  renderActions,
  showEntries = true,
  showSearch = true,
  showPagination = true,
}) {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter data based on search
  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination logic
  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = Math.min(startIndex + entriesPerPage, totalEntries);
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 3;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 2) {
        pages.push(1, 2, 3);
      } else if (currentPage >= totalPages - 1) {
        pages.push(totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(currentPage - 1, currentPage, currentPage + 1);
      }
    }
    return pages;
  };

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        {showEntries && (
          <div className="flex items-center gap-3 text-gray-700 text-sm">
            <label>Show</label>
            <select
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>Entries</span>
          </div>
        )}

        {showSearch && (
          <div className="relative w-80">
            <FiSearch className="absolute top-3 left-3 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-md pl-10 pr-4 py-2.5 w-full text-[15px] placeholder-gray-400 shadow-sm"
            />
          </div>
        )}

        {showAddButton && (
          <button
            onClick={onAddClick}
            className="bg-[#CCA547] text-white text-base font-medium px-5 py-2.5"
          >
            {addButtonText}
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        <table className="min-w-full text-[15px] text-gray-700">
          <thead className="bg-gray-100 text-gray-700 font-semibold border-b border-gray-300">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left"
                  style={{ width: col.width }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b last:border-none hover:bg-gray-50 transition-colors text-gray-800"
                >
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="px-6 py-3">
                      {col.render ? col.render(row, rowIndex) : row[col.field]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {showPagination && totalEntries > 0 && (
        <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
          <p>
            Showing {startIndex + 1} to {endIndex} of {totalEntries} Entries
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1.5 border border-yellow-400 rounded-md text-yellow-500 hover:bg-yellow-50 ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Previous
            </button>
            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1.5 rounded-md ${
                  currentPage === page
                    ? "bg-yellow-400 text-white"
                    : "border border-yellow-400 text-yellow-500 hover:bg-yellow-50"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1.5 border border-yellow-400 rounded-md text-yellow-500 hover:bg-yellow-50 ${
                currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}