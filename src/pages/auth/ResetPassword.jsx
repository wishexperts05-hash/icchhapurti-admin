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
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/\d/, "Must contain at least one number")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const ResetPassword = () => {
  const navigate = useNavigate();
  const { confirmPassword, loading } = useLogin();

  const handleConfirmPassword = async (values) => {
    try {
      const sanitizedPassword = validator.trim(values.password);
      const sanitizedConfirmPassword = validator.trim(values.confirmPassword);

      const payload = {
        newPassword: sanitizedPassword,
        confirmPassword: sanitizedConfirmPassword,
        token: sessionStorage.getItem("token"),
      };

      const isSuccess = await confirmPassword(payload);
      if (isSuccess) navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const formik = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema,
    validateOnBlur: true,
    validateOnChange: true,   // ← enable live feedback as user types
    onSubmit: handleConfirmPassword,
  });

  const inputClass = (field) =>
    `flex items-center bg-[#F5F5F5] rounded-lg px-3 border ${
      formik.touched[field] && formik.errors[field]
        ? "border-red-500"
        : formik.touched[field] && !formik.errors[field]
        ? "border-green-500"
        : "border-gray-300"
    }`;

  return (
    <div className="flex min-h-screen bg-[#CCA547]">
      {/* Hero Image */}
      <div className="hidden md:flex w-1/2 justify-center items-center">
        <div className="w-[641px] h-[636px]">
          <img src={resetPass} alt="Reset Password Illustration" className="object-cover" />
        </div>
      </div>

      {/* Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 lg:px-20">
        <div className="w-[589px] bg-[#FFFFFF] rounded-2xl p-8 flex flex-col items-center shadow-lg">

          <div className="flex flex-col gap-2 items-center mb-6">
            <h2 className="text-3xl font-bold text-[#262626]">Reset Password</h2>
            <p className="text-[#262626] text-center text-sm">Please enter your new password</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-5 w-full max-w-md">

            {/* New Password */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[#262626]">New Password</label>
              <div className={inputClass("password")}>
                <RiLockPasswordFill className="text-gray-500 text-xl mr-2 shrink-0" />
                <input
                  type="password"
                  placeholder="Enter New Password"
                  name="password"
                  className="w-full bg-transparent py-3 focus:outline-none text-sm"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
              </div>
              {/* Error */}
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <span>⚠</span> {formik.errors.password}
                </p>
              )}
              {/* Success */}
              {formik.touched.password && !formik.errors.password && (
                <p className="text-green-500 text-xs mt-1 flex items-center gap-1">
                  <span>✓</span> Password looks good
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[#262626]">Confirm Password</label>
              <div className={inputClass("confirmPassword")}>
                <RiLockPasswordFill className="text-gray-500 text-xl mr-2 shrink-0" />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  name="confirmPassword"
                  className="w-full bg-transparent py-3 focus:outline-none text-sm"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                />
              </div>
              {/* Error */}
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <span>⚠</span> {formik.errors.confirmPassword}
                </p>
              )}
              {/* Success */}
              {formik.touched.confirmPassword && !formik.errors.confirmPassword && formik.values.confirmPassword && (
                <p className="text-green-500 text-xs mt-1 flex items-center gap-1">
                  <span>✓</span> Passwords match
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !formik.isValid || !formik.dirty}
              className="w-full flex justify-center items-center text-white font-bold
                bg-[#CCA547] py-3 rounded-lg hover:opacity-90 transition duration-200
                disabled:bg-gray-400 disabled:cursor-not-allowed mt-2"
            >
              {loading
                ? <AiOutlineLoading3Quarters className="animate-spin text-lg" />
                : "Update Password"
              }
            </button>

            <div className="flex justify-center mt-2">
              <p className="text-sm text-gray-600">
                Remember your password?{" "}
                <Link to="/" className="text-[#CCA547] font-semibold hover:underline">
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