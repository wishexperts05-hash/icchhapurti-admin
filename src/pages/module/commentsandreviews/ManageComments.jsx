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
import useDebounce from "../../../hooks/debounce/useDebounce";

export default function ManageComments() {
  const { loading, commentAndReviews, fetchCommentsList } = useCommentandReviews();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const { subAdminAccess } = useLogin();
  const { canCreate, canRead } = usePermissions(
    subAdminAccess,
    "Comment Management"
  );

  useEffect(() => {
    fetchCommentsList(page, limit, debouncedSearch);
  }, [page, limit, debouncedSearch]);

  const handleSearchTerm = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleSetReviewDisplay = () => {
    navigate("/set-review-display");
  };

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
            className={`text-lg ${star <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const onPageChange = (newPage) => {
    setPage(newPage);
  };

  const onItemsPerPageChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
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
      title: "View",
      onClick: handleViewComment,
      disableCondition: () => !canRead,
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
        searchTerm={search}
        handleSearchTerm={handleSearchTerm}
        showExtraButton={true}
        extraButtonText="Set Review Display"
        onExtraClick={canCreate ? handleSetReviewDisplay : undefined}
        canCreate = {canCreate}
      />

      {/* Data Table */}
      <div className="rounded-t-2xl overflow-hidden shadow-lg border border-gray-200">
        <DataTable
          columns={columns}
          // data={currentItems.map((item, index) => ({
          //   ...item,
          //   srNo: startIndex + index + 1,
          //   status: item.status === "show" ? "Shown" : "Hidden",
          //   review: renderStars(item.stars || 0),
          // }))}
          data={(commentAndReviews?.data || []).map((item, index) => ({
            ...item,
            srNo: (commentAndReviews?.pagination?.currentPage - 1) * limit + index + 1,
            status: item.status === "show" ? "Shown" : "Hidden",
            review: renderStars(item.stars || 0),
            mobileNumber: item.mobileNumber ? String(item.mobileNumber) : "-",
            email: item.email || "-",
            name: item.name || "-",
          }))}
          actions={actions}
          currentPage={page}
          usersPerPage={limit}
        />
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={commentAndReviews?.pagination?.currentPage}
        totalPages={commentAndReviews?.pagination?.totalPages}
        totalItems={commentAndReviews?.pagination?.totalRecords}
        itemsPerPage={commentAndReviews?.pagination?.limit}
        onPageChange={onPageChange}
        onItemsPerPageChange={onItemsPerPageChange}
      />
    </div>
  );
}
