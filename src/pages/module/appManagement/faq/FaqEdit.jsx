import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../../../../components/uiComponent/FormField";
import Button from "../../../../components/uiComponent/Button";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  category: Yup.string().required("Category is required"),
  question: Yup.string().required("Question is required"),
  answer: Yup.string().required("Answer is required"),
});

const FaqEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({
    category: "",
    question: "",
    answer: "",
  });

  useEffect(() => {
    const fetchFaqData = async () => {
      try {
        setLoading(true);

        const dummyFaqData = [
          {
            _id: "1",
            category: "General",
            question: "How to redeem my coins?",
            answer:
              "Lorem ipsum dolor sit amet consectetur. Etiam ut arcu arcu mattis praesent vel iaculis id eu. Porttitor nulla feugiat ligula auctor euismod eu eget consequat. Vitae non pretium non molestie. Egestas nisl arcu elit nisl amet nec tortor.",
          },
          {
            _id: "2",
            category: "Shop",
            question: "How to redeem my coins?",
            answer: "Lorem ipsum dolor sit amet consectetur. Etis epsum...",
          },
          {
            _id: "3",
            category: "Account",
            question: "How to redeem my coins?",
            answer: "Lorem ipsum dolor sit amet consectetur. Etis epsum...",
          },
          {
            _id: "4",
            category: "Support",
            question: "How to redeem my coins?",
            answer: "Lorem ipsum dolor sit amet consectetur. Etis epsum...",
          },
          {
            _id: "5",
            category: "General",
            question: "How to redeem my coins?",
            answer: "Lorem ipsum dolor sit amet consectetur. Etis epsum...",
          },
        ];

        const faq = dummyFaqData.find((item) => item._id === id);

        if (faq) {
          setInitialValues({
            category: faq.category || "",
            question: faq.question || "",
            answer: faq.answer || "",
          });
        } else {
          toast.error("FAQ not found");
          navigate("/app-management/faq");
        }
      } catch (error) {
        console.error("Error fetching FAQ:", error);
        toast.error("Something went wrong while fetching FAQ details");
        navigate("/app-management/faq");
      } finally {
        setLoading(false);
      }
    };

    fetchFaqData();
  }, [id, navigate]);

  const handleSubmit = async (values) => {
    try {
      console.log("FAQ Updated:", values);
      toast.success("FAQ updated successfully");
      navigate("/app-management/faq");
    } catch (error) {
      console.error("Error updating FAQ:", error);
      toast.error("Something went wrong while updating FAQ");
    }
  };

  const handleCancel = () => {
    navigate("/app-management/faq");
  };

  if (loading) {
    return (
      <div className="bg-[#F9F9F9] min-h-screen">
        <BreadCrumb
          linkText={[
            { text: "App Management" },
            { text: "FAQ", href: "/app-management/faq" },
            { text: "Edit FAQ" },
          ]}
        />
        <PagePath2 title="Edit FAQ" />
        <div className="flex items-center justify-center h-64">
          <LoaderSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9F9F9] min-h-screen">
      <BreadCrumb
        linkText={[
          { text: "App Management" },
          { text: "FAQ", href: "/app-management/faq" },
          { text: "Edit FAQ" },
        ]}
      />

      <PagePath2 title="Edit FAQ" />

      <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 mt-4">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
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
                placeholder="Enter your question"
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
                <Button text="Update FAQ" variant={1} type="submit" />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FaqEdit;