import React, { useRef } from "react";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../../../../components/uiComponent/FormField";
import Button from "../../../../components/uiComponent/Button";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-pro-react"; 

const AddBlog = () => {
  const navigate = useNavigate();
  const editor = useRef(null);

  // Validation schema
  const validationSchema = Yup.object().shape({
    title: Yup.string().trim().required("Blog title is required"),
    body: Yup.string().trim().required("Blog content cannot be empty"),
  });

  return (
    <div className="">
      {/* Breadcrumb Navigation */}
      <BreadCrumb
        linkText={[
          { text: "Blog Management", href: "/blog-management" },
          { text: "Add Blog" },
        ]}
      />

      {/* Page Header */}
      <PagePath2 title="Add Blog" showAddButton={false} showSearch={false} />

      {/* Formik Form */}
      <Formik
        initialValues={{
          title: "",
          body: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          console.log("Blog Data Submitted:", values);
          resetForm();
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
            <div className="flex justify-center gap-4 mt-6">
              <Button
                type="reset"
                text="Cancel"
                variant={2}
                onClick={() => navigate("/blog-management")}
              />
              <Button
                type="submit"
                text="Save"
                variant={1}
                onClick={() => navigate("/blog-management")}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddBlog;
