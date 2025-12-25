import React, { useState, useEffect, useRef } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../../../../components/uiComponent/FormField";
import Button from "../../../../components/uiComponent/Button";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";
import { toast } from "react-toastify";
import useFAQ from "../../../../hooks/appManagement/useFAQ";
import useDropdown from "../../../../hooks/dropdown/useDropdown";

const validationSchema = Yup.object().shape({
  category: Yup.string().required("Category is required"),
  question: Yup.string().required("Question is required"),
  answer: Yup.string().required("Answer is required"),
});

const FaqAddEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const formikRef = useRef(null);
  
  const { 
    loading, 
    fetchFaqById, 
    createFaq, 
    updateFaqById 
  } = useFAQ();
  
  const {
    faqCategories,
    loadingFaqCategories,
    fetchFaqCategories,



     fetchAllUserType,userTypeFAQ,loadingUser
  } = useDropdown();

  const [initialValues, setInitialValues] = useState({
    category: "",
    question: "",
    answer: "",
  });

  const isEditMode = Boolean(id);

  // Fetch FAQ categories on mount
  useEffect(() => {
    console.log("Fetching FAQ categories...");
    try {
      fetchFaqCategories();
    } catch (error) {
      console.error("Error in fetchFaqCategories effect:", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(()=>{
    fetchAllUserType();
  },[])
  console.log("nice to meet you", userTypeFAQ)

  // Fetch FAQ data if in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      const fetchFaqData = async () => {
        try {
          console.log("Fetching FAQ with ID:", id);
          const result = await fetchFaqById(id);
          
          if (result && result.success && result.data) {
            setInitialValues({
              category: result.data.category || "",
              question: result.data.question || "",
              answer: result.data.answer || "",
            });
          } else {
            toast.error("FAQ not found");
            navigate("/app-management/faq");
          }
        } catch (error) {
          console.error("Error fetching FAQ:", error);
          toast.error("Something went wrong while fetching FAQ details");
          navigate("/app-management/faq");
        }
      };

      fetchFaqData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isEditMode]);

  const resetForm = () => {
    if (formikRef.current) {
      formikRef.current.resetForm();
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      
      if (isEditMode) {
        console.log("Updating FAQ with ID:", id, "Values:", values);
        const result = await updateFaqById(id, values);
        
        if (result && result.success) {
          toast.success("FAQ updated successfully");
          navigate("/app-management/faq");
        } else {
          toast.error(result?.message || "Failed to update FAQ");
        }
      } else {
        console.log("Creating new FAQ with values:", values);
        const result = await createFaq(values);
        
        if (result && result.success) {
          toast.success("FAQ added successfully");
          resetForm();
          // Optionally navigate back to list
          // navigate("/app-management/faq");
        } else {
          toast.error(result?.message || "Failed to create FAQ");
        }
      }
    } catch (error) {
      console.error(`Error ${isEditMode ? "updating" : "creating"} FAQ:`, error);
      toast.error(`Something went wrong while ${isEditMode ? "updating" : "creating"} FAQ`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/app-management/faq");
  };



  if (loading || (isEditMode && initialValues.category === "" && initialValues.question === "")) {
    return (
      <div className="bg-[#F9F9F9] min-h-screen pb-6">
        <BreadCrumb
          linkText={[
            { text: "App Management" },
            { text: "FAQ", href: "/app-management/faq" },
            { text: isEditMode ? "Edit FAQ" : "Add FAQ" },
          ]}
        />
        <PagePath2 title={isEditMode ? "Edit FAQ" : "Add FAQ"} />
        <div className="flex items-center justify-center h-64">
          <LoaderSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9F9F9] min-h-screen pb-6">
      <BreadCrumb
        linkText={[
          { text: "App Management" },
          { text: "FAQ", href: "/app-management/faq" },
          { text: isEditMode ? "Edit FAQ" : "Add FAQ" },
        ]}
      />

      <PagePath2 title={isEditMode ? "Edit FAQ" : "Add FAQ"} />

      <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 mt-4">
        <Formik
          innerRef={formikRef}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={isEditMode}
        >
          {({ isSubmitting }) => (
            <Form className="grid grid-cols-1 gap-6">
              <FormField
                label="Select Category"
                name="category"
                fieldType="select"
                placeholder="Select Category"
                options={userTypeFAQ}
                disabled={loadingFaqCategories}
              />

              <FormField
                label="Question"
                name="question"
                placeholder={isEditMode ? "Enter your question" : "Enter question.."}
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
                  disabled={isSubmitting}
                />
                <Button 
                  text={isEditMode ? "Update FAQ" : "Save"} 
                  variant={1} 
                  type="submit"
                  disabled={isSubmitting || loadingFaqCategories}
                  loading={isSubmitting}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FaqAddEdit;