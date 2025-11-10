import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import logo from "../../assets/TifstayWbg.png";
import { useFormik } from "formik";
import useLogin from "../../hooks/auth/useLogin";
import validator from "validator";
import * as Yup from "yup";
import tiffinImg from "../../assets/BgImgLogin.png"
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
    // <div className="flex flex-col items-center justify-center min-h-screen bg-[#DFE1E6] px-6">
    //   {/* Logo and title */}

    //   <div className="bg-blue-50 shadow-lg rounded-2xl p-8 w-full max-w-md">
    //     <div className="flex justify-center m-4 ">
    //       <img
    //         src={logo}
    //         alt=""
    //         className="object-contain"
    //       // style={{width: "259px", height: "202.58px"}}
    //       />
    //     </div>
    //     <h2 className="text-center text-2xl font-bold mb-2">
    //       FORGOT PASSWORD?
    //     </h2>
    //     <p className="text-center text-gray-500 mb-6">
    //       Enter Your Registered Email Id
    //     </p>

    //     <form onSubmit={formik.handleSubmit} className="space-y-5">
    //       {/* Email input */}
    //       <div className="flex items-center bg-[#F5F5F5] rounded-lg px-3">
    //         <MdEmail className="text-gray-500 text-xl mr-2" />
    //         <input
    //           type="email"
    //           placeholder="Email Id"
    //           name="email"
    //           value={formik.values.email}
    //           onChange={formik.handleChange}
    //           onBlur={formik.handleBlur}
    //           className="w-full bg-transparent py-3 focus:outline-none"
    //         />
    //       </div>
    //       {formik.touched.email && formik.errors.email && (
    //         <div className="text-red-500 text-sm">{formik.errors.email}</div>
    //       )}

    //       {/* Submit Button */}
    //       <button
    //         type="submit"
    //         className="w-full flex justify-center items-center text-white font-bold 
    //             bg-[#004AAD] py-3 rounded-lg hover:bg-blue-800 transition duration-200 disabled:bg-gray-400"
    //         disabled={loading}
    //       >
    //         {loading ? (
    //           <AiOutlineLoading3Quarters className="animate-spin text-lg" />
    //         ) : (
    //           "Get OTP"
    //         )}
    //       </button>
    //       <div className="flex justify-center">
    //         <p className="text-sm text-gray-600 hover:text-blue-600">
    //           Remember Password?{" "}
    //         <Link
    //           to="/login"
    //           className="text-blue-600 font-semibold hover:underline"
    //         >
    //           Login
    //         </Link>
    //         </p>
    //       </div>
    //     </form>
    //   </div>
    // </div>

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

  {/* Left Section - Forgot Password Form */}
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

    <h2 className="text-3xl font-bold mb-2 text-gray-800">Forgot Password?</h2>
    <p className="text-gray-500 mb-8 text-center">
      Enter your registered email address <br /> to receive a password reset OTP.
    </p>

    {/* Forgot Password Form */}
    <form onSubmit={formik.handleSubmit} className="space-y-5 w-full max-w-md">
      {/* Email Input */}
      <div className="flex items-center bg-[#F5F5F5] rounded-lg px-3 border border-gray-300">
        <MdEmail className="text-gray-500 text-xl mr-2" />
        <input
          type="email"
          placeholder="Email Id"
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

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full flex justify-center items-center text-white font-bold 
        bg-blue-600 py-3 rounded-lg hover:bg-blue-700 transition duration-200 disabled:bg-gray-400"
        disabled={loading}
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

export default ForgotPassword;
