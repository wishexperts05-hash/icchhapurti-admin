import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useStoriesSection from "../../../../hooks/appManagement/useStoriesSection";

import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";
import Button from "../../../../components/uiComponent/Button";
import { useNavigate } from "react-router-dom";

const ViewStories = () => {
  const { storyDetail, fetchStoryById, loading } = useStoriesSection();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) fetchStoryById(id);
  }, [id]);

  if (loading || !storyDetail) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <LoaderSpinner />
      </div>
    );
  }
  return (
    <div className="bg-[#F9F9F9] w-full">
      {/* BreadCrumb */}
      <BreadCrumb
        linkText={[
          { text: "App Management", href: "/app-management/stories" },
          { text: "Stories", href: "/app-management/stories-section" },
          { text: "View Story" },
        ]}
      />

      {/* Page Title / Path */}
      <PagePath2 title="View Story" />

      {/* Story Card */}
      <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 mt-4 w-full mx-auto">
        <h1 className="text-3xl font-bold mb-3">
          Title : {storyDetail?.data?.title}
        </h1>

        <div className="flex flex-wrap gap-4 mb-4">
          <p className="text-sm text-gray-500">
            <span className="font-medium">Type:</span> {storyDetail?.data?.type}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-medium">Created At:</span>{" "}
            {new Date(storyDetail?.data?.createdAt).toLocaleString()}
          </p>
        </div>

        <p className="text-gray-700 mb-6">
          Description :{storyDetail?.data?.description}
        </p>

        {/* Thumbnail */}
        <label className="text-base font-medium">Thumbnail :</label>
        {storyDetail?.data?.thumbnailUrl && (
          <div className="mb-6 flex justify-center">
            <img
              src={storyDetail?.data?.thumbnailUrl}
              alt="Story Thumbnail"
              className="w-full object-cover rounded-lg border shadow-md"
            />
          </div>
        )}

        <label className="text-base font-medium">Video :</label>
        {storyDetail?.data?.videoUrl && (
          <video
            src={storyDetail?.data?.videoUrl}
            controls
            className="w-full rounded-lg border"
          />
        )}

        {/* Back Button */}
        <div className="mt-6 flex justify-center gap-4">
          <Button
            text={"Back"}
            icon={null}
            onClick={() => navigate(-1)}
            type={"button"}
            variant={2}
          />

          <Button
            text={"Edit"}
            icon={null}
            onClick={() => navigate(`/app-management/stories/edit-story/${id}`)}
            type={"button"}
            variant={1}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewStories;
