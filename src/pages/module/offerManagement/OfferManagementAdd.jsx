import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../../../components/uiComponent/FormField";
import Button from "../../../components/uiComponent/Button";
import { useLocation, useNavigate } from "react-router-dom";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";

const validationSchema = Yup.object().shape({
    offerTitle: Yup.string().required("Offer title is required"),
    offerCode: Yup.string().required("Offer code is required"),
    discountType: Yup.string().required("Discount type is required"),
    discountValue: Yup.number()
        .positive("Discount value must be positive")
        .required("Discount value is required"),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date()
        .min(Yup.ref("startDate"), "End date must be after start date")
        .required("End date is required"),
    minPurchaseAmount: Yup.number()
        .positive("Minimum purchase amount must be positive")
        .required("Minimum purchase amount is required"),
    maxDiscount: Yup.number()
        .positive("Maximum discount must be positive")
        .required("Maximum discount is required"),
    usageLimit: Yup.number()
        .positive("Usage limit must be positive")
        .required("Usage limit is required"),
    status: Yup.string().required("Status is required"),
});

const OfferManagementAdd = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isEditMode = location.pathname.includes("editOffer");
    const offerData = location.state?.offerData || null;

    const initialValues = {
        offerTitle: offerData?.title || "",
        offerCode: offerData?.code || "",
        discountType: offerData?.discountType || "",
        discountValue: offerData?.discountValue || "",
        startDate: offerData?.startDate || "",
        endDate: offerData?.endDate || "",
        minPurchaseAmount: offerData?.minPurchaseAmount || "",
        maxDiscount: offerData?.maxDiscount || "",
        usageLimit: offerData?.usageLimit || "",
        status: offerData?.status || "",
    };

    const handleSubmit = (values, { resetForm }) => {
        console.log(isEditMode ? "Offer Updated:" : "Offer Added:", values);
        alert(isEditMode ? "Offer updated successfully!" : "Offer added successfully!");
        resetForm();
        navigate("/offer-management");
    };

    const handleCancel = () => {
        navigate("/offer-management");
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <BreadCrumb
                linkText={[
                    { text: "Dashboard" },
                    { text: "Offer Management", href: "/offer-management" },
                    { text: isEditMode ? "Edit Offer" : "Add New Offer" },
                ]}
            />

            <PagePath2
                title={isEditMode ? "Edit Offer" : "Add New Offer"}
                description="Fill in the offer details below to add or update offer information."
            />
            <div className="bg-white shadow-md rounded-b-xl p-6">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <FormField label="Offer Title" name="offerTitle" placeholder="Enter offer title" />
                            <FormField label="Target Audience" name="target audience" placeholder="Enter offer code" />
                            <FormField label="Start Date" name="startDate" type="date" placeholder="Select start date" />
                            <FormField label="End Date" name="endDate" type="date" placeholder="Select end date" />
                            <FormField
                                                                label="Offer Type"
                                                                name="offerType"
                                                                fieldType="select"  // Important: specify fieldType as "select"
                                                                options={[
                                                                    { value: "", label: "Choose Offer" },
                                                                    { value: "discount", label: "Discount" },
                                                                    { value: "buyget", label: "Buy & Get" },
                                                                    { value: "freedelivery", label: "Free Delivery" },
                                                                    { value: "productbundles", label: "Product Bundles" },
                                                                ]}
                                                            />
                            
                            <hr className="text-black col-span-1 sm:col-span-2 flex justify-center gap-4 mt-4" />
                            <div className="col-span-1 sm:col-span-2 flex justify-center gap-4 mt-4">
                                <Button text="Cancel" variant={2} type="button" onClick={handleCancel} />
                                <Button text={isEditMode ? "Update Offer" : "Add Offer"} type="submit" variant={1} />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default OfferManagementAdd;