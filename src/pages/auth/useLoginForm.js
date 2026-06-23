import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import useLogin from "../../hooks/auth/useLogin";
import validator from "validator";

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export const useLoginForm = () => {
  const { adminLogin, loading, subAdminLogin } = useLogin();
  const [selectedRole, setSelectedRole] = useState("admin");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginSubmit = async (values) => {
    if (!selectedRole) {
      alert("Please select a role");
      return;
    }
    try {
      const sanitizedEmail = validator.trim(values.email);
      const sanitizedPassword = validator.trim(values.password);
      let isSuccess = false;

      if (selectedRole === "admin") {
        isSuccess = await adminLogin(sanitizedEmail, sanitizedPassword);
      } else if (selectedRole === "subadmin") {
        isSuccess = await subAdminLogin(sanitizedEmail, sanitizedPassword);
      }

      if (isSuccess) {
        navigate(`/verify-otp?role=${selectedRole}`, {
          state: {
            isLogin: true,
            role: selectedRole
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
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
    loading,
    handleRoleSelect,
    togglePasswordVisibility,
  };
};