import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../../../../components/uiComponent/FormField";
import Button from "../../../../components/uiComponent/Button";
import { useLocation, useNavigate } from "react-router-dom";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";;

const validationSchema = Yup.object().shape({
    staffName: Yup.string().required("Staff name is required"),
    phoneNumber: Yup.string()
        .matches(/^[0-9+\s()-]+$/, "Invalid phone number")
        .required("Phone number is required"),
    dob: Yup.date().required("Date of birth is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    location: Yup.string().required("Location is required"),
    referralCode: Yup.string().required("Referral code is required"),
});

const AddStaffForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isEditMode = location.pathname.includes("editStaff");
    const staffData = location.state?.staffData || null;

    const initialValues = {
        staffName: staffData?.name || "",
        phoneNumber: staffData?.phone || "",
        dob: staffData?.dob || "",
        email: staffData?.email || "",
        location: staffData?.location || "",
        referralCode: staffData?.referralCode || "",
    };

    const handleSubmit = (values, { resetForm }) => {
        console.log(isEditMode ? "Staff Updated:" : "Staff Added:", values);
        alert(isEditMode ? "Staff updated successfully!" : "Staff added successfully!");
        resetForm();
        navigate("/staff-Management");
    };

    const handleCancel = () => {
        navigate("/staff-Management");
    };

    return (
        <div className=" bg-gray-50 min-h-screen">
            <BreadCrumb
                linkText={[
                    {text:"Dashboard"},
                    { text: "Staff Management", href: "/staff-Management" },
                    { text: isEditMode ? "Edit Staff" : "Add New Staff" },
                ]}
            />

            <PagePath2
                title={isEditMode ? "Edit Staff" : "Add New Staff"}
                description="Fill in the staff details below to add or update staff information."
            />
            <div className="bg-white shadow-md rounded-b-xl p-6">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <FormField label="Staff Name" name="staffName" placeholder="Enter staff name" />
                            <FormField label="Staff Phone Number" name="phoneNumber" placeholder="Enter phone number" />
                            <FormField label="Date of Birth" name="dob" type="date" placeholder="Select date of birth" />
                            <FormField label="Email" name="email" type="email" placeholder="Enter email address" />
                            <FormField label="Staff Location" name="location" placeholder="Enter staff location" />
                            <FormField label="Assign Referral Code" name="referralCode" placeholder="Enter referral code" />
                            <hr className="text-black col-span-1 sm:col-span-2 flex justify-center gap-4 mt-4" />
                            <div className="col-span-1 sm:col-span-2 flex justify-center gap-4 mt-4">
                                <Button text="Cancel" variant={2} type="button" onClick={handleCancel} />
                                <Button text={isEditMode ? "Update Staff" : "Add Staff"} type="submit" variant={1} />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AddStaffForm;
