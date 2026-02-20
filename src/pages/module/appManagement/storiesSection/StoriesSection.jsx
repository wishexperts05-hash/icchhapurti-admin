import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { FaEye, FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import DataTable from "../../../../components/uiComponent/DataTable";
import Pagination from "../../../../components/uiComponent/Pagination";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";

import useStoriesSection from "../../../../hooks/appManagement/useStoriesSection";

const StoriesSection = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const {
    loading,
    stories, 
    fetchAllStories,
    deleteStory,
  } = useStoriesSection();

  useEffect(() => {
    fetchAllStories(page, limit);
  }, [page, limit]);

  /* ---------------- Video Preview ---------------- */
  const renderVideoPreview = (row) => {


    return (
      <div className="flex justify-center">
        <video
          src={row.videoUrl}
          className="w-16 h-16 rounded object-cover"
          muted
        />
      </div>
    );
  };

    const renderImagePreview = (row) => {


    return (
      <div className="flex justify-center">
        <img
          src={row.thumbnailUrl}
          className="w-16 h-16 rounded object-cover"
          muted
        />
      </div>
    );
  };

  /* ---------------- Transform API Data ---------------- */
  const transformedData =
    stories?.data?.map((story, index) => ({
      _id: story._id,
      srNo: (page - 1) * limit + index + 1,
      title: story.title || "N/A",
      type: story.type || "N/A",
      videoUrl: story.videoUrl,
      thumbnailUrl : story.thumbnailUrl,
      status: story.isActive ? "Active" : "Inactive",
      createdAt: story.createdAt
        ? new Date(story.createdAt).toLocaleDateString("en-GB")
        : "N/A",
    })) || [];

  /* ---------------- Actions ---------------- */
  const actions = [
    {
      icon: <FaEye className="text-yellow-600" />,
      title: "View",
      onClick: (row) =>
        navigate(`/app-management/stories/story-details/${row._id}`),
    },
    {
      icon: <FaRegEdit className="text-yellow-600" />,
      title: "Edit",
      onClick: (row) =>
        navigate(`/app-management/stories/edit-story/${row._id}`),
    },
    {
      icon: <Trash2 className="text-red-600" />,
      title: "Delete",
      onClick: (row) => deleteStory(row._id),
    },
  ];

  /* ---------------- Columns ---------------- */
  const columns = [
    { header: "Sr.No.", field: "srNo" },
    { header: "Title", field: "title" },
    { header: "Type", field: "type" },
    {
      header: "Video",
      field: "videoUrl",
      render: renderVideoPreview,
    },
    { header: "Thumbnail", field: "thumbnailUrl", render: renderImagePreview ,  },
    { header: "Status", field: "status" },
    { header: "Created At", field: "createdAt" },
    { header: "Action", field: "action" },
  ];

  return (
    <div className="bg-[#F9F9F9] min-h-screen">
      <BreadCrumb
        linkText={[{ text: "App Management" }, { text: "Stories" }]}
      />

      <PagePath2
        title="Stories List"
        showAddButton
        addButtonText="Create Story"
        onClick={() =>
          navigate("/app-management/stories/create-story")
        }
      />

      <div className="bg-white border shadow-lg rounded-2xl p-6 mt-4">
        <div className="border rounded-xl shadow overflow-hidden">
          {loading ? (
            <div className="flex justify-center py-20">
              <LoaderSpinner />
            </div>
          ) : transformedData.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              No stories found
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={transformedData}
              currentPage={page}
              usersPerPage={limit}
              actions={actions}
            />
          )}
        </div>

        {!loading && transformedData.length > 0 && (
          <Pagination
            currentPage={page}
            totalPages={stories?.pagination?.totalPages || 1}
            totalItems={stories?.pagination?.totalRecords || 0}
            itemsPerPage={limit}
            onPageChange={(p) => setPage(p)}
            onItemsPerPageChange={(l) => {
              setLimit(l);
              setPage(1);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default StoriesSection;
