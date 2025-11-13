import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../../../components/uiComponent/FormField";
import Button from "../../../components/uiComponent/Button";
import { useNavigate } from "react-router-dom";
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

const OfferManagementEdit = () => {
    const navigate = useNavigate();
    const handleSelectChange = (option) => setStatusFilter(option);

    // Simple initial values without any ID dependency
    const initialValues = {
        offerTitle: "",
        offerCode: "",
        discountType: "",
        discountValue: "",
        startDate: "",
        endDate: "",
        minPurchaseAmount: "",
        maxDiscount: "",
        usageLimit: "",
        status: "",
    };

    const handleSubmit = (values, { resetForm }) => {
        console.log("Offer Updated:", values);
        alert("Offer updated successfully!");
        resetForm();
        navigate("/offer-management");
    };

    const handleCancel = () => {
        navigate("/offer-management");
    };

    return (
        <div className="">
            <BreadCrumb
                linkText={[
                    { text: "Offer Management", href: "/offer-management" },
                    { text: "Edit Offer" },
                ]}
            />
            <PagePath2 title="Edit Offer" />
            <div className="bg-white rounded-lg shadow-md p-6 mt-4">

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    label="Offer Title"
                                    name="offerTitle"
                                    type="text"
                                    placeholder="Enter offer title"
                                />
                                <FormField
                                    label="Target Auidence"
                                    name="offerCode"
                                    type="text"
                                    placeholder="Enter offer code"
                                />
                                <FormField
                                    label="Start Date"
                                    name="startDate"
                                    type="date"
                                />
                                <FormField
                                    label="End Date"
                                    name="discountValue"
                                    type="date"
                                />


                                <FormField
                                    label="Status"
                                    name="status"
                                    type="select"
                                    options={[
                                        { value: "", label: "Select status" },
                                        { value: "active", label: "Active" },
                                        { value: "inactive", label: "Inactive" },
                                        { value: "expired", label: "Expired" },
                                    ]}
                                />
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

                            </div>




                            <div className="col-span-1 sm:col-span-2 flex justify-center gap-4 mt-4">
                                <Button text="Cancel" variant={2} type="button" onClick={handleCancel} />
                                <Button text="save" type="submit" variant={1} />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default OfferManagementEdit;