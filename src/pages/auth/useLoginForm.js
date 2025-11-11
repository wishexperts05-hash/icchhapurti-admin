// hooks/useLoginForm.js
import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";


export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export const useLoginForm = () => {

  const [selectedRole, setSelectedRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginSubmit = async () => {
   
    navigate("/dashboard");
    
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginValidationSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleLoginSubmit,
  });

  return {
    formik,
    selectedRole,
    showPassword,

    handleRoleSelect,
    togglePasswordVisibility,
  };
};