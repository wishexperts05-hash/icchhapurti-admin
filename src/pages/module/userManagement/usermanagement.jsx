import React, { useState } from "react";
import { FiSearch, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// DataTable Component
function DataTable({
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

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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
                    ? "bg-[rgba(204,165,71,1)] text-white"
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

// User Management Page Component
export default function UserManagement({ activeItem, setActiveItem }) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([
    {
      id: 1,
      userName: "Dheeraj Jadhav",
      phoneNo: "9876543210",
      email: "example@gmail.com",
      referrer: "John Deo",
      isBlocked: true
    },
    {
      id: 2,
      userName: "Sahai Meena",
      phoneNo: "9876543210",
      email: "example@gmail.com",
      referrer: "John Deo",
      isBlocked: false
    },
    {
      id: 3,
      userName: "Raeesh Khan",
      phoneNo: "9876543210",
      email: "example@gmail.com",
      referrer: "John Deo",
      isBlocked: true
    },
    {
      id: 4,
      userName: "Devendra Sharma",
      phoneNo: "9876543210",
      email: "example@gmail.com",
      referrer: "Dev Kumar",
      isBlocked: false
    },
    {
      id: 5,
      userName: "Anil Pabbi Ap",
      phoneNo: "9876543210",
      email: "example@gmail.com",
      referrer: "Dev Kumar",
      isBlocked: true
    },
    // Add more dummy data to test pagination
    ...Array.from({ length: 25 }, (_, i) => ({
      id: i + 6,
      userName: `User ${i + 6}`,
      phoneNo: "9876543210",
      email: "example@gmail.com",
      referrer: i % 2 === 0 ? "John Deo" : "Dev Kumar",
      isBlocked: i % 2 === 0
    }))
  ]);

  const handleView = (user) => {
    // IMPORTANT CHANGE: Use the user ID in the path for routing
    console.log("Navigating to user details with:", user);
    navigate(`user-details/${user.id}`, { state: { user } });
  };

  const handleBlock = (user) => {
    setUsers(users.map(u => 
      u.id === user.id ? { ...u, isBlocked: !u.isBlocked } : u
    ));
  };

  const columns = [
    {
      header: "Sr.No.",
      field: "id",
      width: "80px",
      render: (row, index) => index + 1
    },
    {
      header: "User Name",
      field: "userName",
      width: "180px"
    },
    {
      header: "Phone No.",
      field: "phoneNo",
      width: "140px"
    },
    {
      header: "Email",
      field: "email",
      width: "200px"
    },
    {
      header: "Referrer",
      field: "referrer",
      width: "140px"
    },
    {
      header: "Action",
      width: "180px",
      render: (row) => (
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleView(row)}
            className="text-[rgba(204,165,71,1)] hover:text-yellow-600 transition-colors"
            title="View Details"
          >
            <FiEye size={20} />
          </button>
          <button
            onClick={() => handleBlock(row)}
            className={`px-4 py-1.5 rounded border text-sm font-medium transition-colors ${
              row.isBlocked
                ? "border-red-500 text-red-500 hover:bg-red-50"
                : "border-yellow-500 text-yellow-600 hover:bg-yellow-50"
            }`}
          >
            {row.isBlocked ? "Block" : "UnBlock"}
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <span className="text-gray-400">⊞</span>
          <span className="text-blue-600">User Management</span>
        </div>

        {/* Page Title */}
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">
          User Management
        </h1>

        {/* DataTable */}
        <DataTable
          columns={columns}
          data={users}
          searchPlaceholder="Search"
          showEntries={true}
          showSearch={true}
          showPagination={true}
        />
      </div>
    </div>
  );
}