import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import Button from "../../../../components/uiComponent/Button";
import useBanner from "../../../../hooks/appManagement/useManageBanner";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";

const BannerDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    loading,
    bannerDetail,
    fetchBannerById,
    resetBannerDetail,
  } = useBanner();

  useEffect(() => {
    if (id) fetchBannerById(id);
  }, [id]);

  useEffect(() => {
    return () => resetBannerDetail();
  }, []);

  const isVideoUrl = (url) => {
    return url?.toLowerCase().match(/\.(mp4|webm|ogg|mov)$/);
  };

  const renderMedia = (url, index) => {
    if (isVideoUrl(url)) {
      return (
        <video
          key={index}
          src={url}
          className="h-64 rounded-lg shadow-md object-cover"
          controls
          preload="metadata"
        />
      );
    }

    return (
      <img
        key={index}
        src={url}
        alt={`banner-${index}`}
        className="h-64 rounded-lg shadow-md object-cover"
        onError={(e) => {
          e.target.src =
            "https://via.placeholder.com/400x200?text=Image+Not+Found";
        }}
      />
    );
  };

  if (loading) {
    return (
      <div className="bg-[#F9F9F9] min-h-screen">
        <BreadCrumb
          linkText={[
            { text: "Banner", href: "/app-management/manage-banner" },
            { text: "Banner Details" },
          ]}
        />
        <PagePath2 title="Banner Details" />
        <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 mt-4">
          <div className="flex justify-center items-center py-20">
            <LoaderSpinner />
          </div>
        </div>
      </div>
    );
  }

  if (!bannerDetail?.data) {
    return (
      <div className="bg-[#F9F9F9] min-h-screen">
        <BreadCrumb
          linkText={[
            { text: "Banner", href: "/app-management/manage-banner" },
            { text: "Banner Details" },
          ]}
        />
        <PagePath2 title="Banner Details" />
        <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 mt-4">
          <div className="flex justify-center items-center py-20 text-gray-500">
            Banner not found
          </div>
        </div>
      </div>
    );
  }

  const data = bannerDetail.data;

  return (
    <div className="bg-[#F9F9F9] min-h-screen">
      <BreadCrumb
        linkText={[
          { text: "Banner", href: "/app-management/manage-banner" },
          { text: "Banner Details" },
        ]}
      />

      <PagePath2 title="Banner Details" />

      <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 mt-4">
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center items-center gap-4">
            {data.mediaUrls?.length > 0 ? (
              data.mediaUrls.map((url, i) => renderMedia(url, i))
            ) : (
              <div className="h-64 w-full flex items-center justify-center bg-gray-100 rounded-lg border border-gray-300 px-4">
                No Media Available
              </div>
            )}
          </div>
        </div>

        <div className="my-6 border-t border-gray-200"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 py-4">
          <div className="flex flex-col gap-2">
            <span className="font-medium text-[#004AAD]">Service Type</span>
            <div className="px-3 py-3 border border-[#e65d00]/80 rounded-lg shadow-sm">
              {data.appType || "N/A"}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-medium text-[#004AAD]">Banner Type</span>
            <div className="px-3 py-3 border border-[#e65d00]/80 rounded-lg shadow-sm">
              {data.bannerType || "N/A"}
            </div>
          </div>
        </div>

        <div className="my-6 border-t border-gray-200"></div>

        <div className="py-4 flex items-center justify-center gap-5 w-full">
          <Button variant={2} text="Back" onClick={() => navigate(-1)} />
          <Button
            variant={1}
            text="Edit Banner"
            onClick={() =>
              navigate(`/app-management/manage-banner/edit-banner/${id}`)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default BannerDetails;
