// ...existing code...
import React, { useRef } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import JoditEditor from "jodit-pro-react";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import Button from "../../../../components/uiComponent/Button"; 

const EditPrivacyPolicy = () => {
  const navigate = useNavigate();
  const editor = useRef(null);

  const initialContent = `
  Welcome to [Your Business/Service Name]...
  `;

  const validationSchema = Yup.object({
    description: Yup.string().required("Terms and Conditions content is required."),
  });

  return (
    <div className="bg-[#F9F9F9] min-h-screen ">
      <BreadCrumb
        linkText={[
          { text: "Terms and Conditions", href: "/app-management/privicyandpolicy" },
          { text: "Edit Terms and Conditions" },
        ]}
      />
      <PagePath2 title="Edit Terms and Conditions" />
      <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 mt-4 ">
        <Formik
          initialValues={{ description: initialContent }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Updated Terms & Conditions:", values);
            navigate("/app-management/termandcondition"); 
          }}
        >
          {({ values, setFieldValue, handleSubmit }) => (
            <Form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <JoditEditor
                  ref={editor}
                  value={values.description}
                  onBlur={(newContent) => setFieldValue("description", newContent)}
                />
              </div>
              <div className="flex justify-center gap-4 pt-6">
                <Button
                  text="Cancel"
                  variant={2}
                  onClick={() => navigate("/app-management/privicyandpolicy")}
                />
                <Button text="Update" type="submit" variant={1} />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditPrivacyPolicy;
