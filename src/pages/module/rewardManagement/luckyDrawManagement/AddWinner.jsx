import React, { useState } from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import FormField from "../../../../components/uiComponent/FormField";
import Button from "../../../../components/uiComponent/Button";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";


const validationSchema = Yup.object().shape({
    winners: Yup.array().of(
        Yup.object().shape({
            ticketNumber: Yup.string().required("Ticket number is required"),
            name: Yup.string().required("Winner name is required"),
        })
    ).min(1, "At least one winner is required"),
});

const AddWinner = () => {
    const navigate = useNavigate();

    const initialValues = {
        winners: [
            {
                ticketNumber: "",
                name: "",
            },
        ],
    };

    const handleSubmit = (values, { resetForm }) => {
        console.log("Winners Added:", values);
        alert("Winners saved successfully!");
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
                    { text: "Add Winner" },
                ]}
            />

            <PagePath2
                title="Add Winner"
                description=""
            />

            <div className="bg-white shadow-md rounded-b-xl p-6">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values }) => (
                        <Form className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">Winner Details</h3>

                            <FieldArray name="winners">
                                {({ push, remove }) => (
                                    <>
                                        {values.winners.map((winner, index) => (
                                            <div key={index} className="mb-4">
                                                <div className="flex items-start gap-4">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                                                        <FormField
                                                            label="Ticket Number"
                                                            name={`winners.${index}.ticketNumber`}
                                                            fieldType="select"
                                                            options={[
                                                                { value: "", label: "Select Ticket Number" },
                                                                { value: "1654466479", label: "1654466479" },
                                                                { value: "1654466480", label: "1654466480" },
                                                                { value: "1654466481", label: "1654466481" },
                                                                { value: "1654466482", label: "1654466482" },
                                                                { value: "1654466483", label: "1654466483" },
                                                            ]}
                                                        />
                                                        <FormField
                                                            label="Name"
                                                            name={`winners.${index}.name`}
                                                            placeholder="Enter winner name"
                                                        />
                                                    </div>
                                                    {values.winners.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => remove(index)}
                                                            className="mt-8 text-red-500 hover:text-red-700 text-2xl transition-colors"
                                                            title="Remove winner"
                                                        >
                                                            ✕
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}

                                        <button
                                            type="button"
                                            onClick={() => push({ ticketNumber: "", name: "" })}
                                            className="text-yellow-600 hover:text-yellow-700 font-medium mt-4 flex items-center gap-1"
                                        >
                                            + Add More
                                        </button>
                                    </>
                                )}
                            </FieldArray>

                            {/* Action Buttons */}
                            <div className="flex justify-center gap-4 pt-6">
                                <Button
                                    text="Cancel"
                                    variant={2}
                                    type="button"
                                    onClick={handleCancel}
                                />
                                <Button
                                    text="Save Winner"
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

export default AddWinner;