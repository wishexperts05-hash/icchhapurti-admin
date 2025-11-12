import React, { useState } from "react";
import { FiSearch, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import DataTable from "../../../components/uiComponent/DataTable";

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

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const handleView = (user) => {
    console.log("Navigating to user details with:", user);
    navigate(`/user-management/user-details`);
  };

  const handleBlock = (user) => {
    setUsers(users.map(u => 
      u.id === user.id ? { ...u, isBlocked: !u.isBlocked } : u
    ));
  };

  // Filter data based on search term
  const filteredData = users.filter((row) =>
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

  // Define columns for DataTable
  const columns = [
    {
      header: "Sr.No.",
      field: "srNo"
    },
    {
      header: "User Name",
      field: "userName"
    },
    {
      header: "Phone No.",
      field: "phoneNo"
    },
    {
      header: "Email",
      field: "email"
    },
    {
      header: "Referrer",
      field: "referrer"
    },
    {
      header: "Action",
      field: "action"
    }
  ];

  // Define actions for DataTable
  const actions = [
    {
      icon: <FiEye size={20} />,
      title: "View Details",
      onClick: handleView
    },
    {
      label: (row) => row.isBlocked ? "Block" : "UnBlock",
      title: "Block/Unblock User",
      onClick: handleBlock,
      getClassName: (row) => row.isBlocked 
        ? "border border-red-500 text-red-500 hover:bg-red-50"
        : "border border-yellow-500 text-yellow-600 hover:bg-yellow-50"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <BreadCrumb
                linkText={[
                    { text: "Dashboard", href: "/dashboard" },
                    { text: "User Management" },
                ]}
            />

        {/* Page Title */}
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">
          User Management
        </h1>
        
        {/* Search and Entries Controls */}
        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
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

          <div className="relative w-80">
            <FiSearch className="absolute top-3 left-3 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-md pl-10 pr-4 py-2.5 w-full text-[15px] placeholder-gray-400 shadow-sm"
            />
          </div>
        </div>

        {/* DataTable */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
          <DataTable
            columns={columns}
            data={paginatedData}
            actions={actions.map(action => ({
              ...action,
              label: typeof action.label === 'function' 
                ? undefined 
                : action.label,
              onClick: action.onClick
            }))}
            currentPage={currentPage}
            usersPerPage={entriesPerPage}
          />
        </div>

        {/* Pagination */}
        {totalEntries > 0 && (
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
    </div>
  );
}