import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { FaEye, FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import DataTable from "../../../../components/uiComponent/DataTable";
import Pagination from "../../../../components/uiComponent/Pagination";
import useBanner from "../../../../hooks/appManagement/useManageBanner";
import useDebounce from "../../../../hooks/debounce/useDebounce";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";

function Banner() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    loading,
    bannerList,
    fetchBannerList,
    deleteBanner,
    resetBannerList,
  } = useBanner();

  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    fetchBannerList(page, limit, debouncedSearch);
  }, [page, limit, debouncedSearch]);

  useEffect(() => {
    return () => resetBannerList();
  }, []);

  const onPageChange = (data) => setPage(data);

  const onItemsPerPageChange = (data) => {
    setLimit(data);
    setPage(1);
  };

  const handleDelete = async (id) => {
    const result = await deleteBanner(id);
    if (result) {
      fetchBannerList(page, limit, debouncedSearch);
    }
  };

  const renderBannerPreview = (row) => {
  const media = row.mediaUrls || [];
  const firstMedia = media[0];
  const extraCount = media.length > 1 ? media.length - 1 : 0;

  return (
    <div className="flex justify-center items-center w-full h-full py-2">
      {firstMedia ? (
        <div className="relative w-16 h-16 flex justify-center items-center">
          {/\.(mp4|webm|ogg|mov)$/i.test(firstMedia) ? (
            <video
              src={firstMedia}
              className="w-16 h-16 object-cover rounded"
              muted
            />
          ) : (
            <img
              src={firstMedia}
              className="w-16 h-16 object-cover rounded"
              alt="banner"
            />
          )}

          {extraCount > 0 && (
            <div className="absolute top-0 left-0 w-16 h-16 bg-black bg-opacity-50 flex items-center justify-center text-white text-xs rounded">
              +{extraCount}
            </div>
          )}
        </div>
      ) : (
        <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs">
          No Media
        </div>
      )}
    </div>
  );
};


  const transformedData =
    bannerList?.data?.map((banner, index) => ({
      _id: banner._id,
      srNo: (page - 1) * limit + index + 1,
      serviceType: banner.appType || "N/A",
      bannerType: banner.bannerType || "N/A",
      mediaUrls: banner.mediaUrls || [],
      createdAt: banner.createdAt
        ? new Date(banner.createdAt).toLocaleDateString("en-GB")
        : "N/A",
    })) || [];

  const columns = [
    { header: "Sr.No.", field: "srNo" },
    { header: "Service Type", field: "serviceType" },
    { header: "Banner Type", field: "bannerType" },
    {
      header: "Banner Preview",
      field: "mediaUrls",
      render: renderBannerPreview,
    },
    { header: "Action", field: "action" },
  ];

  const actions = [
    {
      icon: <FaEye className="text-yellow-600" />,
      title: "View",
      onClick: (row) =>
        navigate(`/app-management/manage-banner/banner-details/${row._id}`),
    },
    {
      icon:  <FaRegEdit
                          className="w-5 h-5 text-yellow-600 hover:text-yellow-700 transition-colors duration-200 cursor-pointer"
                          title="Edit"
                      />,
      title: "Edit",
      onClick: (row) =>
        navigate(`/app-management/manage-banner/edit-banner/${row._id}`),
    },
    {
      icon: <Trash2 className="w-5 h-5 text-red-600" />,
      title: "Delete",
      onClick: (row) => handleDelete(row._id),
    },
  ];

  return (
    <div className="bg-[#F9F9F9] min-h-screen">
      <BreadCrumb linkText={[{ text: "App Management" }, { text: "Banner" }]} />

      <PagePath2
        title="Banner List"
        showSearch
        showAddButton
        searchTerm={searchTerm}
        placeholder="Search by Banner Type"
        handleSearchTerm={(e) => {
          setSearchTerm(e.target.value);
          setPage(1);
        }}
        addButtonText="Create Banner"
        onClick={() =>
          navigate("/app-management/manage-banner/create-banner")
        }
      />

      <div className="bg-white border shadow-lg rounded-2xl p-6 mt-4">
        <div className="overflow-x-auto">
          <div className="border rounded-xl shadow overflow-hidden">
            {loading ? (
              <div className="flex justify-center py-20">
                <LoaderSpinner />
              </div>
            ) : transformedData.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                No banners found
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
              totalPages={bannerList?.totalPages || 1}
              totalItems={bannerList?.totalCount || 0}
              itemsPerPage={limit}
              onPageChange={onPageChange}
              onItemsPerPageChange={onItemsPerPageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Banner;
