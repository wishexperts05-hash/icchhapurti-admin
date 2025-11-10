import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/TifstayWbg.png";
import useLogin from "../../hooks/auth/useLogin";
import tiffinImg from "../../assets/BgImgLogin.png"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
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
      "/customers": 2,
      "/pg-hostel-owner": 3,
      "/tiffin-restaurant-provider": 4,
      "/feature-facilities": 5,
      "/pg-hostel-listing": 6,
      "/restaurant-listing": 7,
      "/pg-hostel-bookings": 8,
      "/restaurant-orders": 9,
      "/payments-overview": 10,
      "/wallet-transactions": 11,
      "/deposit-transactions": 12,
      "/deposit-refund-requests": 13,
      "/payout-history": 14,
      "/coupon": 15,
      "/reviews": 16,
      "/analytics": 17,
      "/cms/banner": 18,
      "/cms/static-page": 19,
      "/cms/notification-management": 20,
      "/chats": 21,
      "/settings/commission": 22,
      "/settings/cashback": 23,
      "/sub-admin/roles": 24,
      "/sub-admin/users": 25,
      "/sub-admin/user-permissions": 26
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

        <h2 className="text-3xl font-bold mb-2 text-gray-800">Verify Your Code</h2>
        <p className="text-gray-500 mb-8 text-center">
          We have sent an OTP to {sessionStorage.getItem("email")}. <br /> Enter the 4-digit code below.
        </p>

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
          bg-blue-600 py-3 rounded-lg hover:bg-blue-700 transition duration-200 disabled:bg-gray-400"
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
  );
};

export default VerifyOtp;