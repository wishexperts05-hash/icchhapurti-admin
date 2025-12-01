import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../../../../components/uiComponent/FormField";
import Button from "../../../../components/uiComponent/Button";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";


const validationSchema = Yup.object().shape({
  category: Yup.string().required("Category is required"),
  question: Yup.string().required("Question is required"),
  answer: Yup.string().required("Answer is required"),
});

const FaqAdd = () => {
  const navigate = useNavigate();
  const [loading] = useState(false);

  const initialValues = {
    category: "",
    question: "",
    answer: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      console.log("FAQ Added:", values);
      resetForm();
      navigate("/app-management/faq");
    } catch (error) {
      console.error("Error creating FAQ:", error);
    }
  };

  const handleCancel = () => {
    navigate("/app-management/faq");
  };

  return (
    <div className="bg-[#F9F9F9] min-h-screen">
      <BreadCrumb
        linkText={[
          { text: "App Management" },
          { text: "FAQ", href: "/app-management/faq" },
          { text: "Add FAQ" },
        ]}
      />

      <PagePath2 title="Add FAQ" />

      <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 mt-4">
        {loading ? (
          <div className="w-full flex items-center justify-center">
            <LoaderSpinner />
          </div>
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="grid grid-cols-1 gap-6">
                <FormField
                  label="Select Category"
                  name="category"
                  fieldType="select"
                  placeholder="Select Category"
                  options={[
                    { value: "", label: "Select Category" },
                    { value: "General", label: "General" },
                    { value: "Shop", label: "Shop" },
                    { value: "Account", label: "Account" },
                    { value: "Support", label: "Support" },
                  ]}
                />

                <FormField
                  label="Question"
                  name="question"
                  placeholder="Enter question.."
                />

                <FormField
                  label="Answer"
                  name="answer"
                  type="textarea"
                  placeholder="Enter the answer"
                />

                <hr className="border-t border-gray-200" />

                <div className="flex items-center justify-center gap-5 w-full">
                  <Button
                    text="Cancel"
                    variant={2}
                    type="button"
                    onClick={handleCancel}
                  />
                  <Button text="Save" variant={1} type="submit" />
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default FaqAdd;