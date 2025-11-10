// components/Login.js
import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
// import logo from "../../assets/TifstayWbg.png";
// import tiffinImg from "../../assets/BgImgLogin.png";
import adminImage from "../../assets/student_3551373.png";
import subAdminImage from "../../assets/student_3551364.png";
import { useLoginForm } from "./useLoginForm";

const roles = [
  {
    id: "admin",
    label: "Admin",
    image: adminImage,
    color: "bg-orange-100"
  },
  {
    id: "subadmin",
    label: "Sub Admin",
    image: subAdminImage,
    color: "bg-blue-100",
  },
];

const Login = () => {
  const {
    formik,
    selectedRole,
    showPassword,
    loading,
    handleRoleSelect,
    togglePasswordVisibility,
  } = useLoginForm();

  return (
    <div className="flex min-h-screen">
      {/* Right Section - Hero Image */}
      <div className="hidden md:flex w-1/2 relative">
        <img
          // src={tiffinImg}
          alt="Tiffin Food"
          className="w-full h-screen object-cover"
        />
        <div className="absolute bottom-9 left-1/2 transform -translate-x-1/2 text-white text-center text-4xl font-bold drop-shadow-lg animate-slideFromLeft">
          Comfort <span className="text-orange-300">Food.. </span> <br />
          Comfortable <span className="text-orange-300">Stay.. </span>
        </div>
      </div>

      {/* Left Section - Login Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 lg:px-20 bg-stone-50">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            // src={logo}
            alt="Tifstay"
            className="object-contain"
            style={{ width: "200px", height: "auto" }}
          />
        </div>

        <h2 className="text-3xl font-bold mb-2 text-gray-800">Welcome Back</h2>
        <p className="text-gray-500 mb-4 text-center">
          Manage your Tiffin & Stay with ease
        </p>
        
        {/* Role Selection */}
        <div className="mb-6 w-full flex justify-center">
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
              className={`p-4 w-full max-w-[140px] rounded-xl transition transform duration-200 flex flex-col items-center gap-2 shadow-lg 
                ${selectedRole === role.id
                  ? `${role.color} text-black border-2 border-white scale-105`
                  : "border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:scale-105"
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

        {/* Form */}
        <form
          onSubmit={formik.handleSubmit}
          className="space-y-5 w-full max-w-md"
        >
          {/* Email Field */}
          <EmailField formik={formik} />
          
          {/* Password Field */}
          <PasswordField 
            formik={formik} 
            showPassword={showPassword}
            onTogglePassword={togglePasswordVisibility}
          />

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link to="/forgot-password">
              <p className="text-sm text-gray-600 hover:text-blue-600">
                Forgot Password?
              </p>
            </Link>
          </div>

          {/* Submit Button */}
          <SubmitButton loading={loading} selectedRole={selectedRole} />
        </form>
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
        placeholder="Email ID"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="w-full bg-transparent py-3 focus:outline-none"
      />
    </div>
    {formik.touched.email && formik.errors.email && (
      <div className="text-red-500 text-sm">
        {formik.errors.email}
      </div>
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
      <div className="text-red-500 text-sm">
        {formik.errors.password}
      </div>
    )}
  </>
);

const SubmitButton = ({ loading, selectedRole }) => (
  <button
    type="submit"
    className="w-full flex justify-center items-center text-white font-bold 
    bg-blue-600 py-3 rounded-lg hover:bg-blue-700 transition duration-200 disabled:bg-gray-400"
    disabled={loading || !selectedRole}
  >
    {loading ? (
      <AiOutlineLoading3Quarters className="animate-spin text-lg" />
    ) : (
      `Log In as ${selectedRole ? roles.find(role => role.id === selectedRole)?.label : '...'}`
    )}
  </button>
);

export default Login;