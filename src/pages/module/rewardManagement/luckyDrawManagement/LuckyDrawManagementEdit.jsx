import React, { useState } from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import FormField from "../../../../components/uiComponent/FormField";
import Button from "../../../../components/uiComponent/Button";
import { useNavigate, useLocation } from "react-router-dom";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import { FaTimes, FaPlus } from "react-icons/fa";

const validationSchema = Yup.object().shape({
    eventName: Yup.string().required("Event name is required"),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date()
        .min(Yup.ref("startDate"), "End date must be after start date")
        .required("End date is required"),
    rules: Yup.array().of(
        Yup.object().shape({
            productCategory: Yup.string().required("Product category is required"),
            ticketsPerProduct: Yup.number()
                .positive("Tickets per product must be positive")
                .integer("Tickets per product must be an integer")
                .required("Tickets per product is required"),
        })
    ),
    numberOfWinners: Yup.string().required("Number of winners is required"),
    resultAnnouncementDate: Yup.date().required("Result announcement date is required"),
    productImageSets: Yup.array().min(1, "At least one product image set is required"),
});

const LuckyDrawManagementEdit = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const drawData = location.state?.drawData || null;

   
    const [productImageSets, setProductImageSets] = useState(
        drawData?.productImageSets || [[]]
    );

   
    const initialValues = {
        eventName: drawData?.eventName || "",
        startDate: drawData?.startDate || "",
        endDate: drawData?.endDate || "",
        rules: drawData?.rules || [
            {
                productCategory: "",
                ticketsPerProduct: "",
            },
        ],
        numberOfWinners: drawData?.numberOfWinners || "",
        resultAnnouncementDate: drawData?.resultAnnouncementDate || "",
    };

    const handleImageUpload = (e, setIndex) => {
        const files = Array.from(e.target.files);
        const newImageSets = [...productImageSets];

        if (!newImageSets[setIndex]) {
            newImageSets[setIndex] = [];
        }

        if (files.length + newImageSets[setIndex].length > 10) {
            alert("Maximum 10 images allowed per set");
            return;
        }

        newImageSets[setIndex] = [...newImageSets[setIndex], ...files];
        setProductImageSets(newImageSets);
    };

    const handleRemoveImage = (setIndex, imageIndex) => {
        const newImageSets = [...productImageSets];
        newImageSets[setIndex] = newImageSets[setIndex].filter((_, i) => i !== imageIndex);
        setProductImageSets(newImageSets);
    };

    const handleAddImageSet = () => {
        setProductImageSets([...productImageSets, []]);
    };

    const handleRemoveImageSet = (setIndex) => {
        if (productImageSets.length > 1) {
            setProductImageSets(productImageSets.filter((_, i) => i !== setIndex));
        }
    };

    const handleSubmit = (values, { resetForm }) => {
       
        const hasInvalidSets = productImageSets.some(set => set.length < 3);
        if (hasInvalidSets) {
            alert("Each product image set must have at least 3 images");
            return;
        }

        const formData = {
            ...values,
            productImageSets: productImageSets,
        };

        
    };

    const handleCancel = () => {
        navigate("/lucky-draw-management");
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <BreadCrumb
                linkText={[
                    { text: "Lucky Draw Management", href: "/lucky-draw-management" },
                    { text: "Edit Lucky Draw" },
                ]}
            />

            <PagePath2
                title="Edit Lucky Draw"
                description="Update the lucky draw details below."
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
                            {/* Event Name, Start Date, End Date */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <FormField
                                    label="Draw Name"
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
                                <FieldArray name="rules">
                                    {({ push, remove }) => (
                                        <>
                                            {values.rules.map((rule, index) => (
                                                <div key={index} className="mb-4">
                                                    <div className="flex items-start gap-4">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                                                            <FormField
                                                                label="Select Product"
                                                                name={`rules.${index}.productCategory`}
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
                                                            <FormField
                                                                label="Tickets per Quantity"
                                                                name={`rules.${index}.ticketsPerProduct`}
                                                                type="number"
                                                                placeholder="Enter number of tickets"
                                                            />
                                                        </div>
                                                        {values.rules.length > 1 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => remove(index)}
                                                                className="mt-8 text-red-500 hover:text-red-700 text-2xl transition-colors"
                                                                title="Remove rule"
                                                            >
                                                                ✕
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={() => push({ productCategory: "", ticketsPerProduct: "" })}
                                                className="text-yellow-600 hover:text-yellow-700 font-medium mt-4 flex items-center gap-1"
                                            >
                                                + Add More
                                            </button>
                                        </>
                                    )}
                                </FieldArray>
                            </div>

                            {/* Prize Distribution Section */}
                            <div className="pt-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        label="Number of Winners"
                                        name="numberOfWinners"
                                        placeholder="Enter number of winners"
                                    />
                                    <FormField
                                        label="Result Announcement Date"
                                        name="resultAnnouncementDate"
                                        type="date"
                                        placeholder="DD-MM-YYYY"
                                    />
                                </div>
                            </div>

                            {/* Product Images Section */}
                            <div className="pt-4">
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                    Product Images (Min 3)
                                </h3>
                                {productImageSets.map((imageSet, setIndex) => (
                                    <div key={setIndex} className="mb-6">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-1">
                                                <div className="flex flex-wrap gap-4 mt-4">
                                                    {imageSet.map((image, imageIndex) => (
                                                        <div key={imageIndex} className="relative w-24 h-24 border rounded-lg overflow-hidden">
                                                            <img
                                                                src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                                                                alt={`product-${setIndex}-${imageIndex}`}
                                                                className="object-cover w-full h-full"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveImage(setIndex, imageIndex)}
                                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600"
                                                            >
                                                                <FaTimes />
                                                            </button>
                                                        </div>
                                                    ))}

                                                    <label
                                                        htmlFor={`upload-${setIndex}`}
                                                        className="w-24 h-24 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                                                    >
                                                        <FaPlus className="text-gray-500 text-xl" />
                                                        <input
                                                            id={`upload-${setIndex}`}
                                                            type="file"
                                                            accept="image/*"
                                                            multiple
                                                            className="hidden"
                                                            onChange={(e) => handleImageUpload(e, setIndex)}
                                                        />
                                                    </label>
                                                </div>
                                                {imageSet.length < 3 && (
                                                    <p className="text-red-500 text-sm mt-2">
                                                        Please upload at least 3 images
                                                    </p>
                                                )}
                                            </div>
                                            {productImageSets.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveImageSet(setIndex)}
                                                    className="mt-4 text-red-500 hover:text-red-700 text-2xl transition-colors"
                                                    title="Remove image set"
                                                >
                                                    ✕
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={handleAddImageSet}
                                    className="text-yellow-600 hover:text-yellow-700 font-medium mt-4 flex items-center gap-1"
                                >
                                    + Add More
                                </button>
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
                                    text="Update Lucky Draw"
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

export default LuckyDrawManagementEdit;