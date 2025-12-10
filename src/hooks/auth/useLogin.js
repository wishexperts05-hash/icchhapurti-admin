import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import conf from "../../config/index";
import useFetch from "../useFetch";
import { toast } from "react-toastify";
import {
  adminAuthState,
  adminForgotPasswordAtom,
  adminResponseAtom,
  confirmPasswordAtom,
  otpVerifyAtom,
  subAdminAccessAtom,
  subAdminResponseAtom,
} from "../../state/auth/authenticatedState";

const useLogin = () => {
  const [fetchData] = useFetch();
  const navigate = useNavigate();
  const setUserInfo = useSetRecoilState(adminAuthState);
  const [loading, setLoading] = useState(false);
  const [adminResponse, setAdminResponse] = useRecoilState(adminResponseAtom);
  const [subAdminResponse, setSubAdminResponse] =
    useRecoilState(subAdminResponseAtom);

  const [password, setPassword] = useRecoilState(adminForgotPasswordAtom);
  const [confirmPass, setConfirmPass] = useRecoilState(confirmPasswordAtom);
  const [otpRes, setOtpRes] = useRecoilState(otpVerifyAtom);
  const [subAdminAccess, setSubAdminAccess] =
    useRecoilState(subAdminAccessAtom);

  const adminLogin = async (email, password) => {
    const data = { email, password };
    setLoading(true);
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}admin/auth/login`,
        data,
      });
      console.log("OTP", res?.data?.otp);
      if (res) {
        setLoading(false);
        const otp = res?.data?.otp;
        const msg = otp ? `${res?.message} OTP: ${otp}` : res?.message;
        toast.success(msg);
        setAdminResponse(res);
        sessionStorage.setItem("email", res?.data?.email);
        return true;
      }
    } catch (error) {
      toast.error("Invalid Credentials");
      // eslint-disable-next-line no-console
      console.error("Error fetching Sign in:", error);
      setLoading(false);
      return false;
    }
  };

  const subAdminLogin = async (email, password) => {
    const data = { email, password };
    setLoading(true);
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}admin/adminUsers/loginAdminUser`,
        data,
      });
      console.log("OTP", res?.data?.otp);
      if (res) {
        setLoading(false);
        const otp = res?.data?.otp;
        const msg = otp ? `${res?.message} OTP: ${otp}` : res?.message;
        toast.success(msg);
        setSubAdminResponse(res);
        sessionStorage.setItem("email", res?.data?.email);
        return true;
      }
    } catch (error) {
      toast.error("Invalid Credentials");
      // eslint-disable-next-line no-console
      console.error("Error fetching Sign in:", error);
      setLoading(false);
      return false;
    }
  };

  const verifyOtp = async (data) => {
    setLoading(true);
    try {
      const url = new URL(`${conf.apiBaseUrl}admin/auth/verify-otp`);
      const res = await fetchData({
        method: "POST",
        url: url.toString(),
        data: data,
      });
      if (res) {
        setOtpRes(res);
        setLoading(false);
        toast.success(res?.message);
        sessionStorage.setItem("token", res?.data?.token);
        sessionStorage.setItem("adminId", res?.data?.admin?._id);
        sessionStorage.setItem("adminName", res?.data?.admin?.name);
        sessionStorage.setItem("adminProfile", res?.data?.admin?.profileImage);
        sessionStorage.setItem("isAdminLoggedIn", res?.isAdminLoggedIn);
        sessionStorage.setItem("isSubAdminLoggedIn", res?.isSubAdminLoggedIn);

        if (res?.user?.userAccess) {
          sessionStorage.setItem(
            "userAccess",
            JSON.stringify(res.user.userAccess)
          );
          setSubAdminAccess(res.user.userAccess);
        }
        setUserInfo({
          isAuthenticated: true,
        });
        return true;
      }
    } catch (error) {
      console.error("Error fetching Verify Otp:", error);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred."
      );
      setLoading(false);
      return false;
    }
  };

  //new resend otp added sent here email instaed of data (harshal)
  const resendOtp = async (email) => {
    setLoading(true);
    try {
      const url = new URL(`${conf.apiBaseUrl}admin/auth/forgot-password`);
      const res = await fetchData({
        method: "PUT",
        url: url.toString(),
        data: { email },
      });
      if (res) {
        setLoading(false);
        const otp = res?.data?.otp;
        const baseMsg = res?.message || "OTP Resent Successfully!";
        const msg = otp ? `${baseMsg} OTP: ${otp}` : baseMsg;
        toast.success(msg);
        return true;
      }
    } catch (error) {
      console.error("Error fetching Resend OTP:", error);
      toast.error("Failed to resend OTP. Please try again.");
      setLoading(false);
      return false;
    }
  };

  const forgotPassword = async (data) => {
    setLoading(true);
    try {
      const url = new URL(`${conf.apiBaseUrl}admin/auth/forgot-password`);
      const res = await fetchData({
        method: "PUT",
        url: url.toString(),
        data: data,
      });

      console.log("OTP", res?.data?.otp);
      if (res) {
        setLoading(false);
        const otp = res?.data?.otp;
        const msg = otp ? `${res?.message} OTP: ${otp}` : res?.message;
        toast.success(msg);
        setPassword(res?.data);
        sessionStorage.setItem("email", res?.data?.email);
        return true;
      }
    } catch (error) {
      console.error("Error fetching forgot password:", error);
      toast.error("Invalid Email Id");
      setLoading(false);
      return false;
    }
  };

  const resetAdminLogin = () => {
    setAdminResponse(null);
    setOtpRes(null);
  };

  const resetSubAdminAccess = () => {
    setSubAdminAccess([]);
  };

  const confirmPassword = async (data) => {
    setLoading(true);
    try {
      const url = new URL(`${conf.apiBaseUrl}admin/auth/reset-password`);
      const res = await fetchData({
        method: "PUT",
        url: url.toString(),
        data: data,
      });
      console.log("res", res);
      if (res) {
        setConfirmPass(res);
        toast.success(res?.message);
        setLoading(false);
        return true;
      }
      if (!loading) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching forgot password:", error);
      setLoading(false);
      return false;
    }
  };

  return {
    adminLogin,
    adminResponse,
    loading,
    resetAdminLogin,
    forgotPassword,
    password,
    verifyOtp,
    otpRes,
    confirmPassword,
    confirmPass,
    resendOtp,
    subAdminLogin,
    subAdminResponse,
    subAdminAccess,
    resetSubAdminAccess,
  };
};

export default useLogin;
