import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../../../components/uiComponent/FormField";
import Button from "../../../components/uiComponent/Button";
import { useNavigate, useLocation } from "react-router-dom";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";

const validationSchema = Yup.object().shape({
    reviewRating: Yup.number()
        .min(1, "Rating must be at least 1")
        .max(5, "Rating must be at most 5")
        .required("Review rating is required"),
});

const EditReviewDisplay = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const reviewData = location.state?.reviewData || null;

    // Initial values
    const initialValues = {
        reviewRating: reviewData?.reviewRating || "3",
    };

    const handleSubmit = (values, { resetForm }) => {
        console.log("Form submitted with values:", values);
        
        // Add your API call here to save the review rating
        // Example:
        // await updateReviewDisplaySetting(values.reviewRating);
        
        // Navigate back or show success message
        navigate("/manage-comments");
    };

    const handleCancel = () => {
        navigate("/manage-comments");
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <BreadCrumb
                linkText={[
                    { text: "Comment & Review", href: "/manage-comments" },
                    { text: "Edit Set Review Display" },
                ]}
            />

            <PagePath2
                title="Edit Set Review Display"
            />

            <div className="bg-white shadow-md rounded-b-xl p-6">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ values }) => (
                        <Form className="space-y-6">
                            {/* Review Rating Section */}
                            <div className="max-w-md">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Set Review to Display For User
                                </h3>
                                <p className="text-sm text-gray-600 mb-6">
                                    Reviews with Rating or Above
                                </p>

                                <FormField
                                    label=""
                                    name="reviewRating"
                                    type="number"
                                    placeholder="Enter rating (1-5)"
                                    min="1"
                                    max="5"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-center gap-4 pt-6">
                                <Button
                                    text="Cancel"
                                    variant={1}
                                    type="button"
                                    onClick={handleCancel}
                                />
                                <Button
                                    text="Save"
                                    type="submit"
                                    variant={2}
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default EditReviewDisplay;