import React, { useState, useMemo, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import DataTable from "../../../components/uiComponent/DataTable";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import Pagination from "../../../components/uiComponent/Pagination";
import useCommentandReviews from "../../../hooks/CommentandReviews/useCommentandReviews";

export default function ManageComments({ activeItem, setActiveItem }) {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  //change
  const { loading, commentAndReviews, fetchCommentsList } =
    useCommentandReviews();
  //Calling Api Whenever Page , Search, limit Changes
  useEffect(() => {
    fetchCommentsList(currentPage, itemsPerPage, searchTerm);
  }, [currentPage, itemsPerPage, searchTerm, fetchCommentsList]);

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
    console.log("Row on eye click:", row); // just to verify _id and reviewType
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
              item.status === "show" ? (
                <span className="text-green-600 font-medium">Shown</span>
              ) : (
                <span className="text-red-600 font-medium">Hidden</span>
              ),
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
