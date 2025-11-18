import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../../../../components/uiComponent/FormField";
import Button from "../../../../components/uiComponent/Button";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";

const validationSchema = Yup.object().shape({
    productCategory: Yup.string().required("Product category is required"),
    eventName: Yup.string().required("Event name is required"),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date()
        .min(Yup.ref("startDate"), "End date must be after start date")
        .required("End date is required"),
    ticketsPerProduct: Yup.number()
        .positive("Tickets per product must be positive")
        .integer("Tickets per product must be an integer")
        .required("Tickets per product is required"),
    numberOfWinners: Yup.number()
        .positive("Number of winners must be positive")
        .integer("Number of winners must be an integer")
        .required("Number of winners is required"),
    firstPrize: Yup.string().required("1st prize is required"),
    secondPrize: Yup.string().required("2nd prize is required"),
    thirdPrize: Yup.string().required("3rd prize is required"),
    fourthPrize: Yup.string().required("4th prize is required"),
});

const LuckyDrawManagementAdd = () => {
    const navigate = useNavigate();

    const initialValues = {
        productCategory: "",
        eventName: "",
        startDate: "",
        endDate: "",
        ticketsPerProduct: "",
        numberOfWinners: "",
        firstPrize: "",
        secondPrize: "",
        thirdPrize: "",
        fourthPrize: "",
    };

    const handleSubmit = (values, { resetForm }) => {
        console.log("Lucky Draw Added:", values);
        alert("Lucky draw created successfully!");
        resetForm();
        navigate("/lucky-draw-management");
    };

    const handleCancel = () => {
        navigate("/lucky-draw-management");
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <BreadCrumb
                linkText={[
                    { text: "Lucky Draw Management", href: "/lucky-draw-management" },
                    { text: "Add New Lucky Draw" },
                ]}
            />

            <PagePath2
                title="Add New Lucky Draw"
                description="Fill in the lucky draw details below to create a new event."
            />

            <div className="bg-white shadow-md rounded-b-xl p-6">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form className="space-y-6">
                            {/* Product Category */}
                            <div className="grid grid-cols-1">
                                <FormField
                                    label="Product Category"
                                    name="productCategory"
                                    fieldType="select"
                                    options={[
                                        { value: "", label: "Select Product Category" },
                                        { value: "pen", label: "Pen" },
                                        { value: "notebook", label: "Notebook" },
                                        { value: "diary", label: "Diary" },
                                        { value: "pencil", label: "Pencil" },
                                        { value: "eraser", label: "Eraser" },
                                    ]}
                                />
                            </div>

                            {/* Event Name, Start Date, End Date */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <FormField
                                    label="Event Name"
                                    name="eventName"
                                    placeholder="Enter event name"
                                />
                                <FormField
                                    label="Start Date"
                                    name="startDate"
                                    type="date"
                                    placeholder="DD-MM-YYYY"
                                />
                                <FormField
                                    label="End Date"
                                    name="endDate"
                                    type="date"
                                    placeholder="DD-MM-YYYY"
                                />
                            </div>

                            {/* Rules Setup Section */}
                            <div className="pt-4">
                                <h3 className="text-lg font-semibold text-gray-700 mb-4">Rules Setup</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        label="Tickets per Product"
                                        name="ticketsPerProduct"
                                        type="number"
                                        placeholder="Enter number of tickets"
                                    />
                                    <FormField
                                        label="Number of Winners"
                                        name="numberOfWinners"
                                        type="number"
                                        placeholder="Enter number of winners"
                                    />
                                </div>
                            </div>

                            {/* Prize Distribution Section */}
                            <div className="pt-4">
                                <h3 className="text-lg font-semibold text-gray-700 mb-4">Prize Distribution</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        label="1st Prize"
                                        name="firstPrize"
                                        placeholder="Enter 1st prize amount"
                                    />
                                    <FormField
                                        label="2nd Prize"
                                        name="secondPrize"
                                        placeholder="Enter 2nd prize amount"
                                    />
                                    <FormField
                                        label="3rd Prize"
                                        name="thirdPrize"
                                        placeholder="Enter 3rd prize amount"
                                    />
                                    <FormField
                                        label="4th Prize"
                                        name="fourthPrize"
                                        placeholder="Enter 4th prize amount"
                                    />
                                </div>
                            </div>
                            <div className="pt-4">

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        label="Result Annoucement Date"
                                        name="startDate"
                                        type="date"
                                        placeholder="DD-MM-YYYY"
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-center gap-4 pt-6">
                                <Button
                                    text="Cancel"
                                    variant={2}
                                    type="button"
                                    onClick={handleCancel}
                                />
                                <Button
                                    text="Save Lucky Draw"
                                    type="submit"
                                    variant={1}
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default LuckyDrawManagementAdd;