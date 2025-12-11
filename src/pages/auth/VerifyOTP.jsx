import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useLogin from "../../hooks/auth/useLogin";
import verify from "../../assets/verify.png";
import { allNavigationItems } from "../../utils/sidebarHelpers";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRef = useRef([]);
  const [timer, setTimer] = useState(59);
  const navigate = useNavigate();
  const { verifyOtp, resendOtp, loading, subAdminAccess } = useLogin();
  const location = useLocation();
  const [verified, setVerified] = useState(false);

  const email = sessionStorage.getItem("email");

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [timer]);

  useEffect(() => {
    if (verified && subAdminAccess) {
      const isAdminLoggedIn = sessionStorage.getItem("isAdminLoggedIn") === "true";
      const isSubAdminLoggedIn = sessionStorage.getItem("isSubAdminLoggedIn") === "true";

      if (isSubAdminLoggedIn) {
        if (subAdminAccess.length > 0) {
          const firstAccessibleRoute = getFirstAccessibleRoute(subAdminAccess);
          navigate(firstAccessibleRoute);
          setVerified(false);
        }
      } else if (isAdminLoggedIn) {
        navigate("/dashboard");
        setVerified(false);
      }
    }
  }, [verified, subAdminAccess, navigate]);

  const handleInputChange = (e, index) => {
    if (/^[0-9]$/.test(e.target.value) || e.target.value === "") {
      const newOtp = [...otp];
      newOtp[index] = e.target.value;
      setOtp(newOtp);
    }
    if (e.target.value !== "" && index < 3) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const hasSubAdminAccess = (accessData, moduleName) => {
    if (!accessData || !Array.isArray(accessData)) return false;

    const module = accessData.find(item =>
      item.moduleName === moduleName ||
      (item.parentModuleName && item.parentModuleName === moduleName)
    );

    return module && module.accessTypes && module.accessTypes.length > 0;
  };

  const getFirstAccessibleRoute = (accessData) => {
    if (!accessData || !Array.isArray(accessData)) {
      return "/dashboard";
    }

    const accessibleRoutes = [];
    allNavigationItems.forEach(item => {
      if (item.hasSubmenu && item.subItems) {
        const accessibleSubItems = item.subItems.filter(subItem =>
          hasSubAdminAccess(accessData, subItem.title)
        );

        if (accessibleSubItems.length > 0) {
          const firstSubItem = accessibleSubItems[0];
          accessibleRoutes.push({
            url: firstSubItem.url,
            title: firstSubItem.title,
            priority: getRoutePriority(firstSubItem.url)
          });
        }
      }
      else if (!item.hasSubmenu) {
        const hasAccess = hasSubAdminAccess(accessData, item.title);
        if (hasAccess && item.url && item.url !== "") {
          accessibleRoutes.push({
            url: item.url,
            title: item.title,
            priority: getRoutePriority(item.url)
          });
        }
      }
    });

    if (accessibleRoutes.length === 0) {
      return "/dashboard";
    }

    accessibleRoutes.sort((a, b) => a.priority - b.priority);
    const firstRoute = accessibleRoutes[0];
    return firstRoute.url;
  };

  const getRoutePriority = (url) => {
    const priorityMap = {
      "/dashboard": 1,
      "/user-management": 2,
      "/staff-management": 3,
      "/product-management": 4,
      "/order-management": 5,
      "/offer-management": 6,
      "/blog-management": 7,
      "/lucky-draw-management": 8,
      "/spin-reward-management": 9,
      "/refer-and-earn-user": 10,
      "/upload-video": 11,
      "/reports": 12,
      "/staff-performance": 13,
      "/lucky-draw-analysis": 14,
      "/commission-settings": 15,
      "/coin-settings": 16,
      "/withdraw-settings": 17,
      "/target-management": 18,
      "/country-management": 19,
      "/notification-management/send-notification": 20,
      "/manage-redeem-request": 21,
      "/chat-support-system": 22,
      "/manage-comments": 23,
      "/app-management/aboutus": 24,
      "/app-management/terms-and-conditions": 25,
      "/app-management/privacy-policy": 26,
      "/app-management/manage-banner": 27,
      "/app-management/other-settings": 28,
      "/app-management/faq": 29,
    };

    return priorityMap[url] || 999;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join("").trim();
    const isLogin = location.state?.isLogin;
    const data = {
      otp: otpString,
      email: email,
      ...(isLogin && { isLogin })
    };
    const isValid = await verifyOtp(data);
    if (otpString.length < 4) {
      alert("OTP is required");
      return;
    }
    if (isValid) {
      const isAdminLoggedIn = sessionStorage.getItem("isAdminLoggedIn") === "true";
      const isSubAdminLoggedIn = sessionStorage.getItem("isSubAdminLoggedIn") === "true";

      if (isLogin) {
        if (isAdminLoggedIn) {
          navigate("/dashboard");
        } else if (isSubAdminLoggedIn) {
          setVerified(true);
        } else {
          navigate("/dashboard");
        }
      } else {
        navigate("/reset-password");
      }
    }
  };

  const handleResend = async () => {
    const success = await resendOtp(email);
    if (success) {
      setTimer(30);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#CCA547]">
      {/* Right Section - Hero Image */}
      <div className="hidden md:flex w-1/2 justify-center items-center ">
        <div className="w-[641px] h-[636px]">
          <img
            src={verify}
            alt="Reset Password Illustration"
            className=" object-cover "
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 lg:px-20 ">
        <div className="w-[589px] h-[601px] bg-[#FFFFFF] rounded-2xl p-5 flex flex-col items-center justify-center shadow-lg">

          <div className="flex flex-col gap-4 items-center mb-4">
            <h2 className="text-3xl font-bold mb-2 text-[#262626]">
              Verify Code
            </h2>
            <p className="text-[#262626] mb-4 text-center">
              Please enter OTP received on your email id {email}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 w-full max-w-md">
            <div className="flex justify-center py-2 gap-4 ">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  className="w-12 h-12 border border-gray-300 text-xl text-center bg-[#F8F5FF] rounded-lg md:font-semibold"
                  value={digit}
                  ref={(element) => (inputRef.current[index] = element)}
                  maxLength={1}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-sm text-gray-600 flex justify-center ">
                Didn't Receive Code ?
              </p>
              {timer > 0 ? (
                <p className="text-sm text-gray-600 flex justify-center gap-2">
                  Resend Code in
                  <span className="font-bold text-blue-600">
                    00:{timer.toString().padStart(2, "0")}
                  </span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-sm text-blue-600 font-semibold"
                >
                  Resend Code
                </button>
              )}
            </div>

            <div className="flex justify-center w-full">
              <button
                type="submit"
                disabled={loading || (verified && subAdminAccess?.length === 0)}
                className="w-full flex justify-center items-center text-white font-bold 
          bg-[#CCA547] py-3 rounded-lg hover:bg-[#CCA547] transition duration-200 disabled:bg-gray-400"
              >
                {loading || (verified && subAdminAccess?.length === 0) ? (
                  <>
                    <AiOutlineLoading3Quarters className="animate-spin text-lg mr-2" />
                    {verified && subAdminAccess?.length === 0 ? "Loading Access..." : "Verifying..."}
                  </>
                ) : (
                  "Verify"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;