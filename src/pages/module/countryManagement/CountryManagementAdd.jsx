import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../../../components/uiComponent/FormField";
import Button from "../../../components/uiComponent/Button";
import { useLocation, useNavigate } from "react-router-dom";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";

const validationSchema = Yup.object().shape({
    countryName: Yup.string().required("Country name is required"),
    countryCode: Yup.string()
        .required("Country code is required")
        .matches(/^[A-Z]{2,3}$/, "Country code must be 2-3 uppercase letters"),
    currency: Yup.string().required("Currency is required"),
    currencySymbol: Yup.string().required("Currency symbol is required"),
    phoneCode: Yup.string()
        .required("Phone code is required")
        .matches(/^\+\d+$/, "Phone code must start with + followed by numbers"),
    region: Yup.string().required("Region is required"),
    timezone: Yup.string().required("Timezone is required"),
    capital: Yup.string().required("Capital is required"),
    status: Yup.string().required("Status is required"),
});

const CountryManagementAdd = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isEditMode = location.pathname.includes("editCountry");
    const countryData = location.state?.countryData || null;

    const initialValues = {
        countryName: countryData?.countryName || "",
        countryCode: countryData?.countryCode || "",
        currency: countryData?.currency || "",
        currencySymbol: countryData?.currencySymbol || "",
        phoneCode: countryData?.phoneCode || "",
        region: countryData?.region || "",
        timezone: countryData?.timezone || "",
        capital: countryData?.capital || "",
        status: countryData?.status || "",
    };

    const handleSubmit = (values, { resetForm }) => {
        console.log(isEditMode ? "Country Updated:" : "Country Added:", values);
        alert(isEditMode ? "Country updated successfully!" : "Country added successfully!");
        resetForm();
        navigate("/country-management");
    };

    const handleCancel = () => {
        navigate("/country-management");
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <BreadCrumb
                linkText={[
                    { text: "Dashboard" },
                    { text: "Country Management", href: "/country-management" },
                    { text: isEditMode ? "Edit Country" : "Add New Country" },
                ]}
            />

            <PagePath2
                title={isEditMode ? "Edit Country" : "Add New Country"}
                description="Fill in the country details below to add or update country information."
            />
            <div className="bg-white shadow-md rounded-b-xl p-6">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <FormField
                                label="Country"
                                name="region"
                                fieldType="select"
                                options={[
                                    { value: "", label: "Choose Country" },
                                    { value: "india", label: "India" },
                                    { value: "usa", label: "United States" },
                                    { value: "uk", label: "United Kingdom" },
                                    { value: "canada", label: "Canada" },
                                    { value: "australia", label: "Australia" },
                                    { value: "germany", label: "Germany" },
                                    { value: "france", label: "France" },
                                ]}
                            />
                            <FormField
                                label="Default language "
                                name="countryCode"
                                placeholder="Enter Default language (e.g., EN, HI)"
                            />
                            <FormField
                                label=" Default Currency"
                                name="currency"
                                placeholder="Enter currency (e.g., USD, INR)"
                            />



                            <hr className="text-black col-span-1 sm:col-span-2 flex justify-center gap-4 mt-4" />
                            <div className="col-span-1 sm:col-span-2 flex justify-center gap-4 mt-4">
                                <Button text="Cancel" variant={2} type="button" onClick={handleCancel} />
                                <Button text={isEditMode ? "Update Country" : "Add "} type="submit" variant={1} />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default CountryManagementAdd;