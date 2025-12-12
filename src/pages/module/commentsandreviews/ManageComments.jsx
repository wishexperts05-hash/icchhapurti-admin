import React, { useState, useMemo, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import DataTable from "../../../components/uiComponent/DataTable";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import Pagination from "../../../components/uiComponent/Pagination";
import useCommentandReviews from "../../../hooks/CommentandReviews/useCommentandReviews";
import useLogin from "../../../hooks/auth/useLogin";
import usePermissions from "../../../hooks/auth/usePermissions";

export default function ManageComments({ activeItem, setActiveItem }) {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  const { subAdminAccess } = useLogin();
  const { canUpdate, canDelete } = usePermissions(
    subAdminAccess,
    "Comment Management"
  );

  //change
  const { loading, commentAndReviews, fetchCommentsList } =
    useCommentandReviews();
  //Calling Api Whenever Page , Search, limit Changes
  useEffect(() => {
    fetchCommentsList(currentPage, itemsPerPage, searchTerm);
  }, [currentPage, itemsPerPage, searchTerm, fetchCommentsList]);
  console.log(commentAndReviews)
  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSetReviewDisplay = () => {
    // Navigate to set review display page or open modal
    navigate("/set-review-display");
  };


  //comments from recoil
  const comments =
    commentAndReviews?.data ||
    commentAndReviews?.reviews ||
    commentAndReviews?.rows ||
    [];

  //Changes
  const totalItems =
    commentAndReviews?.total ||
    commentAndReviews?.totalReviews ||
    commentAndReviews?.count ||
    comments.length;

  const totalPages = Math.ceil((totalItems || 0) / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = comments.slice(startIndex, startIndex + itemsPerPage);

  //main
  // const handleViewComment = (comment) => {
  //   navigate("/manage-comments/view-comment");
  //   // Navigate to view comment page or open modal
  // };
  //---------------------------------------------------
  const handleViewComment = (row) => {
    console.log("Row on eye click:", row); 
    navigate(`/manage-comments/view-comment/${row._id}/${row.reviewType}`);
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
      icon: <FaEye className="text-yellow-600" />,
      onClick: (row) => handleViewComment(row),
      title: "View",
      disableCondition: () => false 
    },
    {
      icon: (
        <span className="text-green-600 hover:text-green-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      ),
      onClick: (row) => handleApprove(row),
      title: "Approve",
      disableCondition: () => !canUpdate
    },
    {
      icon: (
        <span className="text-red-600 hover:text-red-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      ),
      onClick: (row) => handleReject(row),
      title: "Reject",
      disableCondition: () => !canUpdate
    },
    {
      icon: (
        <span className="text-red-600 hover:text-red-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      ),
      onClick: (row) => handleDelete(row),
      title: "Delete",
      disableCondition: () => !canDelete
    },
  ];

  const handleApprove = (row) => {
    console.log("Approve clicked:", row);
  };

  const handleReject = (row) => {
    console.log("Reject clicked:", row);
  };

  const handleDelete = (row) => {
    console.log("Delete clicked:", row);
  };

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
            status: item.status === "show" ? "Shown" : "Hidden",
            review: renderStars(item.stars || 0),
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
