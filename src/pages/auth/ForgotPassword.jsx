import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import forgetPass from "../../assets/forgetPass.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import useLogin from "../../hooks/auth/useLogin";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { forgotPassword, password, loading } = useLogin();

  const handleForgotPassword = async (email) => {
    try {
      console.log("Submitting with email:", email);
      const isSuccess = await forgotPassword(email);
      console.log("isSuccess", isSuccess);
      if (isSuccess) {
        navigate("/verify-otp");
      }
    } catch (error) {
      console.error("Error submitting forgot password:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleForgotPassword,
  });

  return (
    <div className="flex min-h-screen bg-[#CCA547]">
      {/* Right Section - Hero Image */}
      <div className="hidden md:flex w-1/2 justify-center items-center ">
        <div className="w-[641px] h-[636px]">
          <img
            src={forgetPass}
            alt="Reset Password Illustration"
            className="object-cover"
          />
        </div>
      </div>

      {/* Left Section - Forgot Password Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 lg:px-20">
        <div className="w-[589px] h-[601px] bg-[#FFFFFF] rounded-2xl p-5 flex flex-col items-center justify-center shadow-lg">
          <div className="flex justify-center mb-6">
          </div>
          <div className="flex flex-col gap-4 items-center mb-4">
            <h2 className="text-3xl font-bold mb-2 text-[#262626]">
              Forget Password ?
            </h2>
            <p className="text-[#262626] mb-4 text-center">
              Enter your registered email address to continue
            </p>
          </div>

          {/* Forgot Password Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-5 w-full max-w-md">
            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="">E-Mail ID:</label>
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
            </div>
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center items-center text-white font-bold 
        bg-[#CCA547] py-3 rounded-lg hover:bg-[#CCA547] transition duration-200 disabled:bg-gray-400"
            >
              {loading ? (
                <AiOutlineLoading3Quarters className="animate-spin text-lg" />
              ) : (
                "Get OTP"
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

export default ForgotPassword;
