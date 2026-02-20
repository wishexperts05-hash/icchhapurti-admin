import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import Button from "../../../../components/uiComponent/Button";
import FormField from "../../../../components/uiComponent/FormField";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";

import useStoriesSection from "../../../../hooks/appManagement/useStoriesSection";
import { IoMdClose } from "react-icons/io";

function CreateStory() {
  const navigate = useNavigate();
  const { createStory, loading } = useStoriesSection();
  const formikRef = useRef(null);

  /* ---------------- Validation ---------------- */
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    type: Yup.string().required("Type is required"),
    // description: Yup.string().required("Description is required"),
    video: Yup.mixed().required("Video is required"),
  });

  /* ---------------- Initial Values ---------------- */
  const initialValues = {
    title: "",
    type: "",
    description: "",
    video: null,
    thumbnail : null
  };

  /* ---------------- Submit ---------------- */
const handleSubmit = async (values, formikHelpers) => {
  const formData = new FormData();

  Object.entries(values).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });

  await createStory(formData);
  formikHelpers.setSubmitting(false);
};

  return (
    <div className="bg-[#F9F9F9] min-h-screen">
      <BreadCrumb
        linkText={[
          { text: "App Management" },
          { text: "Stories", href: "/app-management/stories-section" },
          { text: "Create Story" },
        ]}
      />

      <PagePath2 title="Create Story" />

      <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 mt-4 w-full">
        <Formik
          innerRef={formikRef}
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
                fieldType="input"
                placeholder="Enter description"
              />
                            {/* THUMBNAIL UPLOAD */}
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium">Upload Thumbnail</label>

                <label
                  htmlFor="thumbnail-upload"
                  className="text-yellow-500 underline cursor-pointer hover:text-yellow-600"
                >
                  Upload Thumbnail
                </label>

                <input
                  id="thumbnail-upload"
                  type="file"
                  accept="img/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFieldValue("thumbnail", file);
                    }
                  }}
                />

                {/* PREVIEW */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  {values.thumbnail ? (
                    <div className="relative w-40 mx-auto">
                      <img
                        src={URL.createObjectURL(values.thumbnail)}
                        className="rounded-lg w-40 h-40 object-cover"
                        controls
                      />

                      <button
                        type="button"
                        onClick={() => setFieldValue("thumbnail", null)}
                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1"
                      >
                        <IoMdClose />
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm text-center">
                      No thumbnail selected
                    </p>
                  )}
                </div>

                <ErrorMessage
                  name="video"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>


              {/* VIDEO UPLOAD */}
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium">Upload Video</label>

                <label
                  htmlFor="video-upload"
                  className="text-yellow-500 underline cursor-pointer hover:text-yellow-600"
                >
                  Upload video
                </label>

                <input
                  id="video-upload"
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFieldValue("video", file);
                    }
                  }}
                />

                {/* PREVIEW */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  {values.video ? (
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
                  ) : (
                    <p className="text-gray-400 text-sm text-center">
                      No video selected
                    </p>
                  )}
                </div>

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
                    loading || isSubmitting ? "Creating..." : "Create Story"
                  }
                  disabled={loading || isSubmitting}
                />
              </div>

              {/* {(loading || isSubmitting) && (
                <div className="flex justify-center">
                  <LoaderSpinner />
                </div>
              )} */}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default CreateStory;
