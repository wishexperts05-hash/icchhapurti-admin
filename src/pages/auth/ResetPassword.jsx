


import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../../hooks/auth/useLogin";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import * as Yup from "yup";
import validator from "validator";
import { useFormik } from "formik";
import resetPass from "../../assets/resetPass.png";

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
  // const { confirmPassword, loading } = useLogin();
    const {  loading } = useLogin();

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

    // ✅ Call confirmPassword API
    // const isSuccess = await confirmPassword(payload);
    const isSuccess = true; // Mock success for demonstration

    // ✅ Redirect if password reset successful
    if (isSuccess) {
      alert("Password updated successfully! Please log in again.");
      sessionStorage.removeItem("email"); // optional cleanup
      navigate("/"); // redirect to login page
    } else {
      alert("Password update failed. Try again.");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Something went wrong. Please try again.");
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

    <div className="flex min-h-screen bg-[#CCA547]">
  {/* Right Section - Hero Image */}
  <div className="hidden md:flex w-1/2 justify-center items-center ">
          <div className="w-[641px] h-[636px]">
            <img
              src={resetPass}
              alt="Reset Password Illustration"
              className=" object-cover "
            />
          </div>
        </div>

  {/* Left Section - Reset Password Form */}
  <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 lg:px-20 ">
  <div className="w-[589px] h-[601px] bg-[#FFFFFF] rounded-2xl p-5 flex flex-col items-center justify-center shadow-lg">
    {/* Logo */}
   
<div className="flex flex-col gap-4 items-center mb-4">
            <h2 className="text-3xl font-bold mb-2 text-[#262626]">
           Reset Password
          </h2>
          <p className="text-[#262626] mb-4 text-center">
            Please enter new password
          </p>
          </div>

    {/* Reset Password Form */}
    <form onSubmit={formik.handleSubmit} className="space-y-5 w-full max-w-md">

      <div className="flex flex-col gap-2">
        <label>New Password:</label>
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
      </div>
      {formik.touched.password && formik.errors.password && (
        <div className="text-red-500 text-sm mt-1">
          {formik.errors.password}
        </div>
      )}

      {/* Confirm Password Input */}
       <div className="flex flex-col gap-2">
        <label>Confirm Password:</label>
      <div className="flex items-center bg-[#F5F5F5] rounded-lg px-3  border border-gray-300">
         
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
        bg-[#CCA547] py-3 rounded-lg hover:bg-[#CCA547] transition duration-200 disabled:bg-gray-400 mb-2"
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
            className="text-[#CCA547] font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </form>
  </div>
</div>
</div>

  );
};

export default ResetPassword;
