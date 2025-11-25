import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import DataTable from "../../../../components/uiComponent/DataTable";
import { FiEye, FiTrash2 } from "react-icons/fi";
import Pagination from "../../../../components/uiComponent/Pagination";

function Banner() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Static dummy data
  const bannerData = [
    {
      _id: "1",
      srNo: 1,
      bannerName: "Refer",
      userType: "Staff",
      bannerImage: "https://via.placeholder.com/150x80",
      mediaType: "image", // Add this field to identify media type
    },
    {
      _id: "2",
      srNo: 2,
      bannerName: "Offer",
      userType: "User",
      bannerImage: "https://via.placeholder.com/150x80",
      mediaType: "image",
    },
    {
      _id: "3",
      srNo: 3,
      bannerName: "Information Banner",
      userType: "User",
      bannerImage: "https://via.placeholder.com/150x80",
      mediaType: "image",
    },
    {
      _id: "4",
      srNo: 4,
      bannerName: "Refer Banner",
      userType: "Staff",
      bannerImage: "https://via.placeholder.com/150x80",
      mediaType: "image",
    },
  ];

  const onPageChange = (data) => setPage(data);
  const onItemsPerPageChange = (data) => setLimit(data);

  const handleDelete = (id) => {
    console.log("Delete banner with id:", id);
  };

  // Custom render function for banner preview
  const renderBannerPreview = (row) => {
    if (row.mediaType === "video") {
      return (
        <div className="flex justify-center">
          <video 
            src={row.bannerImage} 
            className="w-32 h-20 object-cover rounded border border-gray-200"
            controls
            preload="metadata"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }
    
    return (
      <div className="flex justify-center">
        <img 
          src={row.bannerImage} 
          alt={row.bannerName}
          className="w-32 h-20 object-cover rounded border border-gray-200"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/150x80?text=No+Image";
          }}
        />
      </div>
    );
  };

  const columns = [
    { header: "Sr.No.", field: "srNo" },
    { header: "Banner Name", field: "bannerName" },
    { header: "User Type", field: "userType" },
    { 
      header: "Banner", 
      field: "bannerImage",
      render: renderBannerPreview // Add custom render function
    },
    { header: "Action", field: "action" },
  ];

  const actions = [
    {
      icon: <FiEye className="w-5 h-5 text-[#FF6B00]" />,
      title: "View",
      onClick: (row) => navigate(`/app-management/manage-banner/banner-details/${row._id}`),
    },
    {
      icon: <FaRegEdit className="w-5 h-5 text-[#FF6B00]" />,
      title: "Edit",
      onClick: (row) => navigate(`/app-management/manage-banner/edit-banner/${row._id}`),
    },
    {
      icon: <FiTrash2 className="w-5 h-5 text-red-500" />,
      title: "Delete",
      onClick: (row) => handleDelete(row._id),
    },
  ];

  return (
    <div className="bg-[#F9F9F9] min-h-screen">
      <BreadCrumb 
        linkText={[
          { text: "App Management" }, 
          { text: "Banner" }
        ]} 
      />

      <PagePath2
        title="Banner List"
        showSearch
        showAddButton
        placeholder="Search by Banner Name"
        searchTerm={searchTerm}
        handleSearchTerm={(e) => setSearchTerm(e.target.value)}
        addButtonText="Create Banner"
        onClick={() => navigate("/app-management/manage-banner/create-banner")}
      />

      <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 mt-4">
        <div className="overflow-x-auto">
          <div className="border border-gray-300 rounded-t-xl shadow-sm overflow-hidden">
            <DataTable
              columns={columns}
              data={bannerData}
              currentPage={page}
              usersPerPage={limit}
              actions={actions}
            />
          </div>
          <Pagination
            currentPage={page}
            totalPages={3}
            totalItems={30}
            itemsPerPage={limit}
            onPageChange={onPageChange}
            onItemsPerPageChange={onItemsPerPageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;