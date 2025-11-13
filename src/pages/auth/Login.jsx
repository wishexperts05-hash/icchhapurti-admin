import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import login from "../../assets/login.png";
import adminImage from "../../assets/admin.png";
import subAdminImage from "../../assets/admin.png";

import { useLoginForm } from "./useLoginForm";
import SplashScreen from "../../components/uiComponent/SplashScreen";

const Login = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const {
    formik,
    showPassword,
    togglePasswordVisibility,
    handleRoleSelect,
    selectedRole,
  } = useLoginForm();
  // const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => setIsSplashVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isSplashVisible) {
    return <SplashScreen />;
  }

  const roles = [
    {
      id: "admin",
      label: "Admin",
      image: adminImage,
      color: "bg-orange-100",
      className:
        "border-[4px] border-orange-100 text-grey-500 hover:border-orange-100 hover:scale-105 ",
    },
    {
      id: "subadmin",
      label: "Sub Admin",
      image: subAdminImage,
      color: "bg-blue-100",
      className:
        "border-[4px] border-blue-100 text-grey-500 hover:border-blue-100 hover:scale-105",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#CCA547] flex items-center">
      {/* Right Section - Hero Image */}
      <div className="hidden md:flex w-1/2 justify-center items-center ">
        <div className="w-[641px] h-[636px]">
          <img
            src={login}
            alt="Reset Password Illustration"
            className=" object-cover "
          />
        </div>
      </div>
      {/* Left Section - Login Form */}
      <div className="w-full md:w-1/2 flex  justify-center items-center px-6 lg:px-20 ">
        <div className="w-[589px] h-[601px] bg-[#FFFFFF] rounded-2xl p-5 flex flex-col items-center justify-center shadow-lg">
          <div className="flex flex-col gap-2 items-center mb-4">
            <h2 className="text-3xl font-bold  text-[#262626]">Welcome Back</h2>
            <p className="text-[#262626]  text-center">
              Please enter your registered email and password to continue.
            </p>
          </div>

          {/* Role Selection */}
          <div className="mb-4 w-full flex justify-center">
            <label className="block text-xl text-gray-800 font-bold">
              Select Role
            </label>
          </div>
          <div className="flex justify-center gap-6 w-full mb-8">
            {roles.map((role) => (
              <button
                key={role.id}
                type="button"
                onClick={() => handleRoleSelect(role.id)}
                className={`p-4 w-full max-w-[140px] h-[140px] rounded-[6px] transition transform duration-200 flex flex-col items-center justify-center gap-2
    shadow-[0_0_10px_rgba(0,0,0,0.3)]
    ${
      selectedRole === role.id
        ? `${role.color} text-black border-[4px] border-white scale-105`
        : `${role.className}`
    }`}
              >
                <img
                  src={role.image}
                  alt={role.label}
                  className="w-16 h-16 object-fill rounded-full"
                />
                <span className="text-xs font-semibold text-center">
                  {role.label}
                </span>
              </button>
            ))}
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className="space-y-3 w-full max-w-md"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="">E-Mail ID:</label>
              <EmailField formik={formik} />
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1">
              <label htmlFor="">Password:</label>
              <PasswordField
                formik={formik}
                showPassword={showPassword}
                onTogglePassword={togglePasswordVisibility}
              />
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link to="/forgot-password">
                <p className="text-sm text-[#CCA547] hover:text-[#CCA547]">
                  Forgot Password?
                </p>
              </Link>
            </div>

            {/* Submit Button */}
            <SubmitButton />
          </form>
        </div>
      </div>
    </div>
  );
};

// Sub-components for better organization
const EmailField = ({ formik }) => (
  <>
    <div className="flex items-center bg-[#F5F5F5] rounded-lg px-3 border border-gray-300">
      <MdEmail className="text-gray-500 text-xl mr-2" />
      <input
        type="email"
        placeholder="Enter your email address"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="w-full bg-transparent py-3 focus:outline-none"
      />
    </div>
    {formik.touched.email && formik.errors.email && (
      <div className="text-red-500 text-sm">{formik.errors.email}</div>
    )}
  </>
);

const PasswordField = ({ formik, showPassword, onTogglePassword }) => (
  <>
    <div className="flex items-center bg-[#F5F5F5] rounded-lg px-3 border border-gray-300">
      <RiLockPasswordFill className="text-gray-500 text-xl mr-2" />
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="w-full bg-transparent py-3 focus:outline-none"
      />
      <button
        type="button"
        onClick={onTogglePassword}
        className="ml-2 text-gray-600 focus:outline-none"
      >
        {showPassword ? (
          <IoEyeOffOutline className="text-xl" />
        ) : (
          <IoEyeOutline className="text-xl" />
        )}
      </button>
    </div>
    {formik.touched.password && formik.errors.password && (
      <div className="text-red-500 text-sm">{formik.errors.password}</div>
    )}
  </>
);

const SubmitButton = () => (
  <button
    type="submit"
    className="w-full flex justify-center items-center text-white font-bold 
    bg-[#CCA547] py-3 rounded-lg hover:bg-[#CCA547] transition duration-200 disabled:bg-gray-400"
  >
    Login
  </button>
);

export default Login;
