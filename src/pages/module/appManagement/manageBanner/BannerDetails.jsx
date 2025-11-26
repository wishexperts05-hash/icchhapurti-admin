import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import Button from "../../../../components/uiComponent/Button";

const BannerDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Static dummy data
  const bannerDetails = {
    bannerImages: [
      "https://via.placeholder.com/400x200",
      "https://via.placeholder.com/400x200",
    ],
    bannerType: "Refer",
    serviceType: "Staff",
    createdAt: "2025-01-15",
  };

  return (
    <div className="bg-[#F9F9F9] min-h-screen">
      <BreadCrumb
        linkText={[
          
          { text: "Banner", href: "/app-management/manage-banner" },
          { text: "Banner Details" },
        ]}
      />

      <PagePath2 title="Banner Details" />

      {/* Card container */}
      <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 mt-4">
        {/* Header Section - Banner Images */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center items-center gap-4">
            {bannerDetails.bannerImages.length > 0 ? (
              bannerDetails.bannerImages.map((bannerImg, index) => (
                <img
                  key={index}
                  src={bannerImg}
                  alt={`banner-${index}`}
                  className="h-64 rounded-lg shadow-md object-cover"
                />
              ))
            ) : (
              <div className="h-64 w-full flex items-center justify-center bg-gray-100 rounded-lg border border-gray-300 px-4">
                No Image Available
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-200"></div>

        {/* Info Section */}
        <div className="grid grid-cols-1 gap-6 text-gray-700 py-4">
          <div className="flex flex-col gap-2">
            <span className="font-medium text-[#004AAD]">Banner Type</span>
            <div className="px-3 py-3 border border-[#e65d00]/80 rounded-lg shadow-sm">
              {bannerDetails.bannerType}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-medium text-[#004AAD]">Service</span>
            <div className="px-3 py-3 border border-[#e65d00]/80 rounded-lg shadow-sm">
              {bannerDetails.serviceType}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-medium text-[#004AAD]">Creation Date</span>
            <div className="px-3 py-3 border border-[#e65d00]/80 rounded-lg shadow-sm">
              {new Date(bannerDetails.createdAt).toLocaleDateString("en-GB")}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-200"></div>

        {/* Action Buttons */}
        <div className="py-4 flex items-center justify-center gap-5 w-full">
          <Button variant={2} text="Back" onClick={() => navigate(-1)} />
          <Button
            variant={1}
            text="Edit Banner"
            onClick={() => navigate(`/app-management/manage-banner/edit-banner/:id`)}
          />
        </div>
      </div>
    </div>
  );
};

export default BannerDetails;