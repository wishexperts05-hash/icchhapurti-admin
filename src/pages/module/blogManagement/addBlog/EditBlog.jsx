import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import JoditEditor from "jodit-pro-react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../../../../components/uiComponent/FormField";
import Button from "../../../../components/uiComponent/Button";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const editor = useRef(null);

  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
  });

  // Validation Schema
  const validationSchema = Yup.object().shape({
    title: Yup.string().trim().required("Blog title is required"),
    description: Yup.string().trim().required("Blog content cannot be empty"),
  });

  // Simulate fetching blog data by ID
  useEffect(() => {
    const fakeFetchedBlog = {
      title: "Evolution of The Pen",
      description: `
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...</p>
      `,
    };

    setInitialValues(fakeFetchedBlog);
  }, [id]);

  // Handle form submit
  const handleUpdate = (values) => {
    console.log("Updated Blog Data:", values);
    navigate("/blog-management");
  };

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <BreadCrumb
        linkText={[
          { text: "Dashboard" },
          { text: "Blog Management", href: "/blog-management" },
          { text: "Edit Blog" },
        ]}
      />

      {/* Page Header */}
      <PagePath2 title="Edit Post" showAddButton={false} showSearch={false} />

      {/* Only show form after blog data is loaded */}
      {initialValues.title ? (
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleUpdate}
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form className="bg-white p-6 rounded-2xl shadow-xl mt-4">
              {/* Title Field */}
              <FormField
                label="Title of the Blog"
                name="title"
                placeholder="Enter title"
              />

              {/* Jodit Editor Field */}
              <label className="block text-sm font-medium text-[#004AAD] mb-2 mt-4">
                Body
              </label>
              <JoditEditor
                ref={editor}
                value={values.description}
                onBlur={(newContent) =>
                  setFieldValue("description", newContent)
                }
              />
              {touched.description && errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}

              {/* Buttons */}
              <div className="flex justify-center gap-4 mt-6">
                <Button
                  type="button"
                  text="Cancel"
                  variant={2} 
                  onClick={() => navigate("/blog-management")}
                />
                <Button
                  type="submit"
                  text="Update"
                  variant={1}
                />
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          Loading blog details...
        </p>
      )}
    </div>
  );
};

export default EditBlog;
