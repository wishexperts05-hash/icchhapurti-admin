import tiffinImg from "../../assets/BgImgLogin.png";
import logo from "../../assets/TifstayWbg.png";

import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../../hooks/auth/useLogin";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import * as Yup from "yup";
import validator from "validator";
import { useFormik } from "formik";

const validationSchema = Yup.object({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const ResetPassword = () => {
  const navigate = useNavigate();
  const { confirmPassword, loading } = useLogin();
  // const [showPassword, setShowPassword] = useState(false);

  const handleConfirmPassword = async (values) => {
    try {
      console.log("Submitting with values:", values);
      const sanitizedPassword = validator.trim(values.password);
      const sanitizedConfirmPassword = validator.trim(values.confirmPassword);
      const payload = {
        newPassword: sanitizedPassword,
        confirmPassword: sanitizedConfirmPassword,
        email: sessionStorage.getItem("email"),
      };
      console.log("Payload:", payload);
      // Call confirmPassword with sanitized values
      const isSuccess = await confirmPassword(payload);
      if (isSuccess) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleConfirmPassword,
  });

  return (

    <div className="flex min-h-screen">
  {/* Right Section - Hero Image */}
  <div className="hidden md:flex w-1/2 relative">
    <img
      src={tiffinImg}
      alt="Tiffin Food"
      className="w-full h-screen object-cover"
    />
    <div className="absolute bottom-9 left-1/2 transform -translate-x-1/2 text-white text-center text-4xl font-bold drop-shadow-lg animate-slideFromLeft">
      Comfort <span className="text-orange-300">Food.. </span> <br />
      Comfortable <span className="text-orange-300">Stay.. </span>
    </div>
  </div>

  {/* Left Section - Reset Password Form */}
  <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 lg:px-20 bg-stone-50">
    {/* Logo */}
    <div className="flex justify-center mb-6">
      <img
        src={logo}
        alt="Tifstay"
        className="object-contain"
        style={{ width: "200px", height: "auto" }}
      />
    </div>

    <h2 className="text-3xl font-bold mb-2 text-gray-800">Set Your New Password</h2>
    <p className="text-gray-500 mb-8 text-center">
      Enter your new password below.
    </p>

    {/* Reset Password Form */}
    <form onSubmit={formik.handleSubmit} className="space-y-5 w-full max-w-md">
      {/* New Password Input */}
      <div className="flex items-center bg-[#F5F5F5] rounded-lg px-3 border border-gray-300">
        <RiLockPasswordFill className="text-gray-500 text-xl mr-2" />
        <input
          type="password"
          placeholder="Enter New Password"
          name="password"
          className="w-full bg-transparent py-3 focus:outline-none"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
      </div>
      {formik.touched.password && formik.errors.password && (
        <div className="text-red-500 text-sm mt-1">
          {formik.errors.password}
        </div>
      )}

      {/* Confirm Password Input */}
      <div className="flex items-center bg-[#F5F5F5] rounded-lg px-3 mt-4 border border-gray-300">
        <RiLockPasswordFill className="text-gray-500 text-xl mr-2" />
        <input
          type="password"
          placeholder="Confirm New Password"
          name="confirmPassword"
          className="w-full bg-transparent py-3 focus:outline-none"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
        />
      </div>
      {formik.touched.confirmPassword && formik.errors.confirmPassword && (
        <div className="text-red-500 text-sm mt-1">
          {formik.errors.confirmPassword}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center items-center text-white font-bold 
        bg-blue-600 py-3 rounded-lg hover:bg-blue-700 transition duration-200 disabled:bg-gray-400 mb-2"
      >
        {loading ? (
          <AiOutlineLoading3Quarters className="animate-spin text-lg" />
        ) : (
          "Update Password"
        )}
      </button>

      {/* Link to Login Page */}
      <div className="flex justify-center mt-4">
        <p className="text-sm text-gray-600">
          Remember your password?{" "}
          <Link
            to="/"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </form>
  </div>
</div>

  );
};

export default ResetPassword;
