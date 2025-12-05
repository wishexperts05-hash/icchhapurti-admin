import React, { useEffect, useRef, useState } from "react";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../../../../components/uiComponent/FormField";
import Button from "../../../../components/uiComponent/Button";
import { useNavigate, useParams } from "react-router-dom";
import JoditEditor from "jodit-pro-react";
import useBlogManagement from "../../../../hooks/blogManagement/useBlogManagement";

const AddBlog = () => {
  const { createBlog, loading, updateBlog, fetchBlogDetails, blogDetail, resetBlogDetails } = useBlogManagement();
  const navigate = useNavigate();
  const editor = useRef(null);
  const { id } = useParams();
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (id) {
      fetchBlogDetails(id);
    }
    return () => {
      resetBlogDetails();
    };
  }, [id]);

  console.log("blogDetail in AddBlog:", blogDetail);

  const validationSchema = Yup.object().shape({
    title: Yup.string().trim().required("Blog title is required"),
    body: Yup.string().trim().required("Blog content cannot be empty"),
  });

  useEffect(() => {
    if (blogDetail && blogDetail.imageUrl) {
      setPreviewImage(blogDetail.imageUrl);
    }
  }, [blogDetail]);

  const handleCancel = () => {
    navigate("/blog-management");
  };
  
  return (
    <div className="">
      {/* Breadcrumb Navigation */}
      <BreadCrumb
        linkText={[
          { text: "Blog Management", href: "/blog-management" },
          { text: id ? "Edit Blog" : "Add Blog" },
        ]}
      />

      {/* Page Header */}
      <PagePath2 title={id ? "Edit Blog" : "Add Blog"} />

      {/* Formik Form */}
      <Formik
        enableReinitialize
        initialValues={{
          title: blogDetail?.title || "",
          body: blogDetail?.body || "",
          image: null,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("body", values.body);
            // If a new file is chosen, values.image will be a File
            if (values.image) {
              formData.append("image", values.image);
            }
            if (id) {
              await updateBlog(id, formData);
            } else {
              await createBlog(formData);
            }
            resetForm();
            navigate("/blog-management");
          } catch (err) {
            // errors handled in hook
            console.error(err);
          }
        }}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form className="bg-white p-6 rounded-2xl shadow-xl mt-4">
            {/* Blog Title */}
            <FormField
              label="Title of the Blog"
              name="title"
              placeholder="Enter title"
            />

            {/* Blog Body */}
            <label className="block text-sm font-medium text-[#004AAD] mb-2 mt-4">
              Body
            </label>

            {/* Jodit Pro Editor */}
            <JoditEditor
              ref={editor}
              value={values.body}
              onBlur={(newContent) => setFieldValue("body", newContent)}

            />

            {/* Validation Error */}
            {touched.body && errors.body && (
              <p className="text-red-500 text-sm mt-1">{errors.body}</p>
            )}

            {/* Buttons */}
            {/* Image upload + preview */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-[#004AAD] mb-2">
                Feature Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.currentTarget.files && e.currentTarget.files[0];
                  setFieldValue("image", file || null);
                  if (file) {
                    const url = URL.createObjectURL(file);
                    setPreviewImage(url);
                  } else if (blogDetail?.imageUrl) {
                    setPreviewImage(blogDetail.imageUrl);
                  } else {
                    setPreviewImage(null);
                  }
                }}
                className="w-full"
              />

              {previewImage && (
                <div className="mt-3">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-48 h-48 object-cover rounded-md border"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <Button
                type="button"
                text="Cancel"
                variant={2}
                onClick={handleCancel}
              />
              <Button type="submit" text="Save" variant={1} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddBlog;
