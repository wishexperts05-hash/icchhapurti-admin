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

               <div className="bg-white rounded-2xl shadow-xl p-6">
      <Formik
        enableReinitialize
        initialValues={{
          profileImage: adminProfile?.profileImage || "",
          name: adminProfile?.name || "",
          phone: adminProfile?.phone || "",
          email: adminProfile?.email || "",
          password: adminProfile?.password || "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          const initial = {
            profileImage: adminProfile?.profileImage || "",
            name: adminProfile?.name || "",
            phone: adminProfile?.phone || "",
            email: adminProfile?.email || "",
            password: adminProfile?.password || "",
          };

          const updated = {};
          Object.keys(values).forEach((key) => {
            if (values[key] !== initial[key]) updated[key] = values[key];
          });

          if (Object.keys(updated).length === 0) return;

          const formData = new FormData();
          Object.keys(updated).forEach((key) => formData.append(key, updated[key]));

          const res = await updateAdminProfile(formData);
          if (res?.success) navigate("/adminProfile");
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="flex flex-col gap-10">

            {/* ---------- Profile Image Section ---------- */}
            <div className="flex flex-col items-center">
              <div className="relative">

                <img
                  src={previewImage || values.profileImage || "/default-profile.png"}
                  alt="Admin"
                  className="w-40 h-40 rounded-full object-cover shadow-md border-4 border-gray-100"
                />

                <label
                    htmlFor="profileImage"
                    className="absolute bottom-0 right-0 bg-primary-600 text-black text-sm rounded-full p-2 cursor-pointer shadow-lg hover:bg-primary-700 transition-colors"
                    title="Upload or change photo"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 5c.621 0 1.227.158 1.757.46l.598-.598A1 1 0 0115 4h2a1 1 0 01.928.629l.447 1.118A2 2 0 0020 7v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 011.625-1.96l.447-1.118A1 1 0 016 4h2a1 1 0 01.646.238l.598.598A3.985 3.985 0 0112 5z"
                      />
                      <circle cx="12" cy="13" r="3" />
                    </svg>
                  </label>

                <input
                  id="profileImage"
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
            </div>

            {/* Divider */}
            <div className="border-t border-gray-300"></div>

            {/* ---------- 2-Column Grid Form ---------- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

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
              />

              <FormField
                label="Email Address"
                name="email"
                placeholder="Enter Email Address"
                type="email"
              />

              <FormField
                label="Password"
                name="password"
                placeholder="Enter Password"
                type="text"
              />
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* ---------- Buttons ---------- */}
            <div className="flex justify-center gap-6">
              <Button
                variant={2}
                text="Cancel"
                onClick={() => navigate("/adminProfile")}
              />
              <Button
                variant={1}
                type="submit"
                text={isSubmitting ? "Saving..." : "Save Changes"}
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
