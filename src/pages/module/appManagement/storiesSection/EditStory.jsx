import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import Button from "../../../../components/uiComponent/Button";
import FormField from "../../../../components/uiComponent/FormField";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";

import useStoriesSection from "../../../../hooks/appManagement/useStoriesSection";
import { IoMdClose } from "react-icons/io";

const EditStory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const formikRef = useRef(null);

  const { fetchStoryById, storyDetail, editStory, loading, stories } =
    useStoriesSection();

  /* ---------------- Fetch Story ---------------- */
  useEffect(() => {
    if (id) fetchStoryById(id);
  }, [id]);
  console.log("stories", storyDetail);

  /* ---------------- Validation ---------------- */
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    type: Yup.string().required("Type is required"),
    description: Yup.string(),
    // video: Yup.mixed(), // optional in edit
  });

  /* ---------------- Initial Values (Prefill) ---------------- */
  const initialValues = {
    title: storyDetail?.data?.title || "",
    type: storyDetail?.data?.type || "",
    description: storyDetail?.data?.description || "",
    video: null, // only set if user uploads new one
  };

  /* ---------------- Submit ---------------- */
  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();

    formData.append("id", id); // important if backend needs ID

    Object.entries(values).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        formData.append(key, value);
      }
    });

    await editStory(id, formData);
    setSubmitting(false);
  };

  return (
    <div className="bg-[#F9F9F9] min-h-screen">
      <BreadCrumb
        linkText={[
          { text: "App Management" },
          { text: "Stories", href: "/app-management/stories" },
          { text: "Edit Story" },
        ]}
      />

      <PagePath2 title="Edit Story" />

      <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 mt-4 w-full">
        <Formik
          innerRef={formikRef}
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form className="flex flex-col gap-6">
              {/* TITLE */}
              <FormField
                label="Title"
                name="title"
                placeholder="Enter story title"
              />

              {/* TYPE */}
              <FormField
                label="Type"
                name="type"
                fieldType="select"
                options={[
                  { label: "Story", value: "story" },
                  { label: "Unboxing", value: "unboxing" },
                ]}
                placeholder="Select Type"
              />

              {/* DESCRIPTION */}
              <FormField
                label="Description"
                name="description"
                placeholder="Enter description"
              />

              {/* EXISTING VIDEO PREVIEW */}
              {/* EXISTING VIDEO FROM API */}
              {storyDetail?.data?.videoUrl && !values.video && (
                <div className="flex justify-center">
                  <video
                    src={storyDetail.data.videoUrl}
                    className="w-48 h-48 rounded-lg"
                    controls
                  />
                </div>
              )}

              {/* VIDEO UPLOAD */}
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium">Upload New Video</label>

                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setFieldValue("video", file);
                  }}
                />

                {values.video && (
                  <div className="relative w-40 mx-auto">
                    <video
                      src={URL.createObjectURL(values.video)}
                      className="rounded-lg w-40 h-40 object-cover"
                      controls
                    />
                    <button
                      type="button"
                      onClick={() => setFieldValue("video", null)}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1"
                    >
                      <IoMdClose />
                    </button>
                  </div>
                )}

                <ErrorMessage
                  name="video"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* BUTTONS */}
              <div className="flex justify-center gap-6 mt-6">
                <Button
                  variant={2}
                  text="Cancel"
                  onClick={() => navigate("/app-management/stories-section")}
                  disabled={loading || isSubmitting}
                />

                <Button
                  variant={1}
                  type="submit"
                  text={
                    loading || isSubmitting ? "Updating..." : "Update Story"
                  }
                  disabled={loading || isSubmitting}
                />
              </div>

              {(loading || isSubmitting) && (
                <div className="flex justify-center">
                  <LoaderSpinner />
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditStory;
