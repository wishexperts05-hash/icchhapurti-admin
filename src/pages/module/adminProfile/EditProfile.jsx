import React, { useEffect, useState } from 'react'
import BreadCrumb from '../../../components/uiComponent/BreadCrumb'
import PagePath2 from '../../../components/uiComponent/PagePath2'
import { Formik, Form } from 'formik'
import * as Yup from "yup";
import FormField from '../../../components/uiComponent/FormField';
import Button from '../../../components/uiComponent/Button';
import { LuPencil } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import useAdminProfile from "../../../hooks/auth/useAdminProfile"

const validationSchema = Yup.object({
    name: Yup.string().required("Full Name is required"),
    phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
        .required("Phone Number is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    // address: Yup.string().required("Address is required"),
    // password: Yup.string().required("Password is required")
});

const EditProfile = () => {
    const navigate = useNavigate();
    const { loading, fetchAdminProfile, adminProfile, updateAdminProfile } = useAdminProfile();
    const adminId = sessionStorage.getItem("adminId");
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        if (adminId) fetchAdminProfile(adminId);
    }, []);

    return (
        <div className="w-full">
            <BreadCrumb linkText={[
                { text: "Admin Profile", href: "/adminProfile" },
                { text: "Edit Profile" }
            ]} />

            <div className="min-h-screen flex flex-col w-full">
                <PagePath2 title="Edit Admin Profile" />

                <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
                    <Formik
                        enableReinitialize
                        initialValues={{
                            profileImage: adminProfile?.profileImage || "",
                            name: adminProfile?.name || "",
                            phone: adminProfile?.phone || "",
                            email: adminProfile?.email || "",
                            password: adminProfile?.password || ""
                        }}
                        validationSchema={validationSchema}
                        onSubmit={async (values) => {
                            console.log("Submitted values:", values);

                            const initialValues = {
                                profileImage: adminProfile?.profileImage || "",
                                name: adminProfile?.name || "",
                                phone: adminProfile?.phone || "",
                                email: adminProfile?.email || "",
                                password: adminProfile?.password || ""
                            };
                            const updatedFields = {};
                            Object.keys(values).forEach((key) => {
                                if (values[key] !== initialValues[key]) {
                                    updatedFields[key] = values[key];
                                }
                            });

                            if (Object.keys(updatedFields).length === 0) return;
                            const formData = new FormData();
                            Object.keys(updatedFields).forEach((key) => {
                                formData.append(key, updatedFields[key]);
                            });

                            try {
                                const res = await updateAdminProfile(formData);
                                if (res?.success) navigate('/adminProfile');
                            } catch (err) {
                                console.log("Error while updating admin profile", err);
                            }
                        }}
                    >
                        {({ values, setFieldValue, isSubmitting }) => (
                            <Form className="flex flex-col gap-6">
                                {/* Profile Image Upload */}
                                <div className="relative flex flex-col items-center justify-center w-full gap-3">
                                    <img
                                        src={previewImage || values.profileImage || "/default-profile.png"}
                                        alt="Profile"
                                        className="w-48 h-48 rounded-full border-4 border-white shadow-md transition-all duration-300 object-cover"
                                    />

                                    <label
                                        htmlFor="profileImage"
                                        className="flex items-center gap-2 cursor-pointer bg-[#CCA547] text-white px-4 py-2 rounded-full shadow-md"
                                    >
                                        <LuPencil /> Change Photo
                                    </label>

                                    <input
                                        id="profileImage"
                                        name="profileImage"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                setPreviewImage(URL.createObjectURL(file));
                                                setFieldValue("profileImage", file);
                                            }
                                        }}
                                    />
                                </div>

                                {/* Divider */}
                                <div className="my-6 border-t border-gray-200"></div>

                                {/* Form Fields (Full Width) */}
                                <div className="flex flex-col gap-6 w-full">
                                    <FormField
                                        label="Full Name"
                                        name="name"
                                        placeholder="Enter Full Name"
                                        type="text"
                                        fieldType="input"
                                    />
                                    <FormField
                                        label="Phone Number"
                                        name="phone"
                                        placeholder="Enter Phone Number"
                                        type="text"
                                        fieldType="input"
                                    />
                                    <FormField
                                        label="Email"
                                        name="email"
                                        placeholder="Enter Email Address"
                                        type="email"
                                        fieldType="input"
                                    />
                                    <FormField
                                        label="Password"
                                        name="password"
                                        placeholder="Enter Password"
                                        type="text"
                                        fieldType="input"
                                    />
                                </div>

                                {/* Divider */}
                                <div className="my-6 border-t border-gray-200"></div>

                                {/* Submit Buttons */}
                                <div className="flex w-full items-center justify-center gap-6">
                                    <Button
                                        variant={2}
                                        text="Cancel"
                                        onClick={() => navigate('/adminProfile')}
                                    />
                                    <Button
                                        variant={1}
                                        text={isSubmitting ? "Submitting..." : "Save"}
                                        type="submit"
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default EditProfile
