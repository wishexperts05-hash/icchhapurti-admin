import React, { useState, useMemo } from "react";
import { FaEye } from "react-icons/fa";
import { MdOutlineBlock } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import DataTable from "../../../components/uiComponent/DataTable";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import Pagination from "../../../components/uiComponent/Pagination";

export default function UserManagement({ activeItem, setActiveItem }) {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // reset page when searching
  };

  const [users, setUsers] = useState([
    {
      id: 1,
      userName: "Dheeraj Jadhav",
      phoneNo: "9876543210",
      email: "example@gmail.com",
      referrer: "John Deo",
      isBlocked: true,
    },
    {
      id: 2,
      userName: "Sahai Meena",
      phoneNo: "9876543210",
      email: "example@gmail.com",
      referrer: "John Deo",
      isBlocked: false,
    },
    {
      id: 3,
      userName: "Raeesh Khan",
      phoneNo: "9876543210",
      email: "example@gmail.com",
      referrer: "John Deo",
      isBlocked: true,
    },
    {
      id: 4,
      userName: "Devendra Sharma",
      phoneNo: "9876543210",
      email: "example@gmail.com",
      referrer: "Dev Kumar",
      isBlocked: false,
    },
    {
      id: 5,
      userName: "Anil Pabbi Ap",
      phoneNo: "9876543210",
      email: "example@gmail.com",
      referrer: "Dev Kumar",
      isBlocked: true,
    },
    ...Array.from({ length: 25 }, (_, i) => ({
      id: i + 6,
      userName: `User ${i + 6}`,
      phoneNo: "9876543210",
      email: "example@gmail.com",
      referrer: i % 2 === 0 ? "John Deo" : "Dev Kumar",
      isBlocked: i % 2 === 0,
    })),
  ]);

  // ✅ Corrected filter logic
  const filteredData = useMemo(
    () =>
      users.filter((item) =>
        item.userName.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [users, searchTerm]
  );

  // Pagination logic
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  // Handlers
  const handleView = (user) => {
    console.log("Navigating to user details with:", user);
    navigate(`/user-management/user-details`);
  };

  const handleBlock = (user) => {
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.id === user.id ? { ...u, isBlocked: !u.isBlocked } : u
      )
    );
  };
  const handleToggleStatus = (row) => {
        setStaffData((prev) =>
            prev.map((item) =>
                item.id === row.id ? { ...item, status: !item.status } : item
            )
        );
    };

  // Columns for DataTable
  const columns = [
    { header: "Sr.No.", field: "srNo" },
    { header: "User Name", field: "userName" },
    { header: "Phone No.", field: "phoneNo" },
    { header: "Email", field: "email" },
    { header: "Referrer", field: "referrer" },
    { header: "Action", field: "action" },
  ];

  // Actions for DataTable
  const actions = [
      {
        icon: <FaEye className="text-yellow-600" />,
        title: "View",
        onClick: () => navigate("/user-management/user-details"),
      },
      {
                  icon: (row) => (
                      <MdOutlineBlock
                          className={`w-5 h-5 ${row.status
                              ? "text-yellow-600 cursor-pointer"
                              : "text-gray-400 cursor-pointer"
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
        {/* Breadcrumb */}
        <BreadCrumb
          linkText={[
          
            { text: "User Management" },
          ]}
        />

        {/* Page Title */}
        
        {/* Search and Entries Controls */}
        <PagePath2
           title="User Management"
          showSearch={true}
          searchTerm={searchTerm}
          handleSearchTerm={handleSearchTerm}
        />

        {/* Data Table */}
       <div class="mt-6 bg-white p-4 rounded shadow">
          <DataTable
            columns={columns}
            data={currentItems.map((item, index) => ({
              ...item,
              srNo: startIndex + index + 1,
            }))}
            actions={actions.map((action) => ({
              ...action,
              label:
                typeof action.label === "function"
                  ? undefined
                  : action.label,
              onClick: action.onClick,
            }))}
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
