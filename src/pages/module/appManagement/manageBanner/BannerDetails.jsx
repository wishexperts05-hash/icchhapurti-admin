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

  const { loading, bannerDetail, fetchBannerById, resetBannerDetail } =
    useBanner();
  useEffect(() => {
    if (id) fetchBannerById(id);
  }, [id]);

  useEffect(() => {
    return () => resetBannerDetail();
  }, []);
  

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

  if (!bannerDetail?.data || !bannerDetail.data) {
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
  const videos = data.videos || [];
  const images = data.images || [];

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
       <div className="flex flex-col gap-8 w-full">
            <div className="flex flex-col gap-6 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 py-4">
                <div className="flex flex-col gap-2">
                  <span className="font-medium text-[#004AAD]">
                    Service Type
                  </span>
                  <div className="px-3 py-3 border border-[#e65d00]/80 rounded-lg shadow-sm">
                    {data.appType || "N/A"}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="font-medium text-[#004AAD]">
                    Banner Type
                  </span>
                  <div className="px-3 py-3 border border-[#e65d00]/80 rounded-lg shadow-sm">
                    {data.bannerType || "N/A"}
                  </div>
                </div>
              </div>
              {/* VIDEOS */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Videos</h3>

                {videos.length > 0 ? (
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                    {videos.map((url, i) => (
                      <video
                        key={i}
                        src={url}
                        className="h-64 rounded-lg shadow-md object-cover"
                        controls
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center">
                    No Videos Uploaded
                  </p>
                )}
              </div>

              {/* IMAGES */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Images</h3>
                {images.length > 0 ? (
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                    {images.map((url, i) => (
                      <img
                        key={i}
                        src={url}
                        alt={`banner-${i}`}
                        className="h-64 rounded-lg shadow-md object-cover"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="h-40 flex items-center justify-center border border-dashed border-gray-300 rounded-lg text-gray-400">
                    No Images Uploaded
                  </div>
                )}
              </div>
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
   
  );
};

export default BannerDetails;
