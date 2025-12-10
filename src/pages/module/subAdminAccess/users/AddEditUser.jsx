import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import FormField from "../../../../components/uiComponent/FormField";
import { Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import Button from "../../../../components/uiComponent/Button";
import useUsers from "../../../../hooks/subAdminAccess/useUsers";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";
import ButtonGroup from "@mui/material/ButtonGroup";

const AddEditUser = () => {
  const {
    loading,
    addUser,
    updateUser,
    fetchUserDetails,
    usersDetail,
    fetchRoleNames,
    roleNameList,
    resetUsersDetails,
  } = useUsers();
  const navigate = useNavigate();
  const { id } = useParams();
  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const userValidationSchema = Yup.object({
    role: Yup.string().required("Role is required"),
    firstName: Yup.string()
      .required("First name is required")
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name must be less than 50 characters"),
    lastName: Yup.string()
      .required("Last name is required")
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name must be less than 50 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: id
      ? Yup.string().min(8, "Password must be at least 8 characters")
      : Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must contain only digits")
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must be less than 15 digits"),
    photo: Yup.mixed()
      .nullable()
      .test("fileSize", "File size is too large", (value) => {
        if (!value) return true;
        return value.size <= 5 * 1024 * 1024;
      })
      .test("fileType", "Unsupported file format", (value) => {
        if (!value) return true;
        return ["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(
          value.type
        );
      }),
  });

  const initialValues = {
    role: usersDetail?.role || "",
    firstName: usersDetail?.firstName || "",
    lastName: usersDetail?.lastName || "",
    email: usersDetail?.email || "",
    password: id ? "********" : "",
    phoneNumber: usersDetail?.phoneNumber || "",
    photo: null,
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log("Form submitted with values:", values);

    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key === "photo" && values[key] instanceof File) {
        formData.append("photo", values[key]);
      } else if (values[key] !== null && values[key] !== undefined) {
        if (id && key === "password" && values[key] === "********") {
          return;
        }
        formData.append(key, values[key]);
      }
    });

    console.log("FormData contents:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      if (id) {
        await updateUser(id, formData);
      } else {
        await addUser(formData);
        resetForm();
        setPreview(null);
      }

      navigate("/sub-admin/users");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePhotoChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setFieldValue("photo", file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (setFieldValue) => {
    setFieldValue("photo", null);
    setPreview(null);
  };

  const handlePasswordFocus = (setFieldValue) => {
    if (id) {
      setFieldValue("password", "");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (id) {
      fetchUserDetails(id);
    }
    return () => resetUsersDetails();
  }, [id]);

  useEffect(() => {
    fetchRoleNames();
  }, []);

  useEffect(() => {
    if (usersDetail && id) {
      if (usersDetail.photo) {
        setPreview(usersDetail.photo);
      }
    }
  }, [usersDetail, id]);

  const handleCancel = () => {
    navigate("/sub-admin/users");
  };

  const roleOptions = [
    // { value: "", label: "Select role" },
    ...(roleNameList?.map((role) => ({
      value: role.roleName,
      label: role.roleName,
    })) || []),
  ];

  return (
    <div>
      <BreadCrumb
        linkText={[
          { text: "Sub Admin Access" },
          {
            text: "Users",
            href: "/sub-admin/users",
          },
          { text: id ? "Edit User" : "Add User" },
        ]}
      />
      <PagePath2 title={id ? "Edit User" : "Create User"} />

      <div className="w-full min-h-[300px] p-6 rounded-[8px] bg-white shadow flex flex-col gap-6 ">
        <Formik
          initialValues={initialValues}
          validationSchema={userValidationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({
            handleSubmit,
            isSubmitting,
            isValid,
            dirty,
            setFieldValue,
            values,
          }) => (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {(isSubmitting || loading) && (
                <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center rounded-[8px] z-10">
                  <LoaderSpinner />
                </div>
              )}

              <div className="flex flex-col gap-4">
                <label className="block text-sm font-medium text-gray-700">
                  User Photo {!id && <span className="text-red-500">*</span>}
                </label>

                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <div className="relative">
                      <label className="relative cursor-pointer group">
                        <input
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,image/gif"
                          onChange={(event) =>
                            handlePhotoChange(event, setFieldValue)
                          }
                          className="hidden"
                        />
                        <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50 group-hover:border-blue-500 transition-colors">
                          {preview ? (
                            <img
                              src={preview}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-gray-400 text-2xl">
                              <svg
                                className="w-8 h-8"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                              </svg>
                            </div>
                          )}
                        </div>

                        <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1.5 shadow-lg group-hover:bg-blue-700 transition-colors">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                      </label>

                      {preview && (
                        <button
                          type="button"
                          onClick={() => removePhoto(setFieldValue)}
                          className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1 shadow-lg hover:bg-red-600 transition-colors"
                        >
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      )}
                    </div>

                    <span className="text-xs text-gray-500">
                      {preview ? "Click to change photo" : "Click to add photo"}
                    </span>

                    {preview && (
                      <button
                        type="button"
                        onClick={() => removePhoto(setFieldValue)}
                        className="text-xs text-red-600 hover:text-red-800 transition-colors"
                      >
                        Remove Photo
                      </button>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-gray-600">
                      {preview ? "Photo selected" : "No photo selected"}
                    </p>
                    <p className="text-xs text-gray-500">
                      JPG, PNG or GIF (Max 5MB)
                      {id && (
                        <span className="block text-green-600 mt-1">
                          Optional - Upload only if you want to change the
                          current photo
                        </span>
                      )}
                    </p>
                  </div>
                  {id && (
                    <div className="px-10">
                      {usersDetail?.isActive ? (
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xl font-semibold">
                          Active
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xl font-semibold">
                          Block
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <FormField
                label="Select Role"
                name="role"
                type="select"
                fieldType="select"
                placeholder="Select role"
                options={roleOptions}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="First Name"
                  name="firstName"
                  type="text"
                  fieldType="input"
                  placeholder="Enter first name"
                />

                <FormField
                  label="Last Name"
                  name="lastName"
                  type="text"
                  fieldType="input"
                  placeholder="Enter last name"
                />
              </div>

              <FormField
                label="Email"
                name="email"
                type="email"
                fieldType="input"
                placeholder="Enter email"
              />

              <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <FormField
                    name="password"
                    type={showPassword ? "text" : "password"}
                    fieldType="input"
                    placeholder="Enter password"
                    onFocus={() => handlePasswordFocus(setFieldValue)}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M9.878 9.878l-.88-.88m4.242 4.242l-.88-.88m4.242 4.242L15.536 15.536M9.88 9.88l3.535-3.536"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  {id
                    ? "Leave blank to keep current password, or enter new password"
                    : "Enter password (min 6 characters)"}
                </p>
              </div>

              <FormField
                label="Phone Number"
                name="phoneNumber"
                type="tel"
                fieldType="input"
                placeholder="Enter phone number"
              />

              <div className="col-span-2 mt-8 flex justify-center gap-6">
                <Button
                  type="button"
                  text="Cancel"
                  variant={2}
                  onClick={handleCancel}
                />
                <Button
                  type="submit"
                  disabled={isSubmitting || loading}
                  variant={1}
                  text={id ? "Update User" : "Create User"}
                />
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddEditUser;
