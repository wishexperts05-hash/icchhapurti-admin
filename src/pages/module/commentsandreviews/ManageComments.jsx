import React, { useState, useMemo } from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import DataTable from "../../../components/uiComponent/DataTable";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import Pagination from "../../../components/uiComponent/Pagination";

export default function ManageComments({ activeItem, setActiveItem }) {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSetReviewDisplay = () => {
    // Navigate to set review display page or open modal
    navigate("/set-review-display");
  };

  const [comments, setComments] = useState([
    {
      srNo: 1,
      name: "Jane Cooper",
      mobileNumber: "+91 9876543210",
      email: "example@mail.com",
      status: "shown",
      review: 4,
    },
    {
      srNo: 2,
      name: "Sahai Meena",
      mobileNumber: "+91 9876543210",
      email: "example@mail.com",
      status: "shown",
      review: 5,
    },
    {
      srNo: 3,
      name: "Raeesh Khan",
      mobileNumber: "+91 9876543210",
      email: "example@mail.com",
      status: "hidden",
      review: 5,
    },
    {
      srNo: 4,
      name: "Devendra Sharma",
      mobileNumber: "+91 9876543210",
      email: "example@mail.com",
      status: "hidden",
      review: 5,
    },
    {
      srNo: 5,
      name: "Anil Pabbi Ap",
      mobileNumber: "+91 9876543210",
      email: "example@mail.com",
      status: "shown",
      review: 4,
    },
    {
      srNo: 6,
      name: "Ashpak Tamboli",
      mobileNumber: "+91 9876543210",
      email: "example@mail.com",
      status: "shown",
      review: 4,
    },
    {
      srNo: 7,
      name: "Kamal Verma",
      mobileNumber: "+91 9876543210",
      email: "example@mail.com",
      status: "hidden",
      review: 3,
    },
    ...Array.from({ length: 23 }, (_, i) => ({
      srNo: 8 + i,
      name: `User ${8 + i}`,
      mobileNumber: "+91 9876543210",
      email: "example@mail.com",
      status: i % 2 === 0 ? "shown" : "hidden",
      review: Math.floor(Math.random() * 3) + 3,
    })),
  ]);

  const filteredData = useMemo(
    () =>
      comments.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.mobileNumber.includes(searchTerm)
      ),
    [comments, searchTerm]
  );

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  const handleViewComment = (comment) => {
    navigate("/manage-comments/view-comment");
    // Navigate to view comment page or open modal
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-lg ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const columns = [
    { header: "Sr. No.", field: "srNo" },
    { header: "Name", field: "name" },
    { header: "Mobile Number", field: "mobileNumber" },
    { header: "Email", field: "email" },
    { header: "Status", field: "status" },
    { header: "Review", field: "review" },
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
      onClick: handleViewComment,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <BreadCrumb linkText={[{ text: "Comment & Review" }]} />

      {/* Page Title & Search */}
      <PagePath2
        title="Manage Comments"
        showSearch={true}
        searchTerm={searchTerm}
        handleSearchTerm={handleSearchTerm}
        showExtraButton={true}
        extraButtonText="Set Review Display"
        onExtraClick={handleSetReviewDisplay}
      />

      {/* Data Table */}
      <div className="mt-6 bg-white p-4 rounded shadow">
        <DataTable
          columns={columns}
          data={currentItems.map((item, index) => ({
            ...item,
            srNo: startIndex + index + 1,
            status:
              item.status === "shown" ? (
                <span className="text-green-600 font-medium">Shown</span>
              ) : (
                <span className="text-red-600 font-medium">Hidden</span>
              ),
            review: renderStars(item.review),
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