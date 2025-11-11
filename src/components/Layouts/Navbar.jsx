import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import user from "../../../src/assets/user.png";
import useLogin from "../../hooks/auth/useLogin";
import { useSetRecoilState } from "recoil";
import { adminAuthState, subAdminAuthState } from "../../state/auth/authenticatedState";
import { GoBell } from "react-icons/go";

function Navbar({ toggleSidebar, isSidebarOpen, isMobile }) {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const adminName = sessionStorage.getItem("adminName") || "N/A";
  const adminProfileImg = sessionStorage.getItem("adminProfile") || user;
  const setAdminInfo = useSetRecoilState(adminAuthState);
  const setSubAdminInfo = useSetRecoilState(subAdminAuthState);
  const { resetAdminLogin, resetSubAdminAccess } = useLogin();

  // Placeholder for profile image - replace with your actual import
  const profilePlaceholder =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%234F46E5'/%3E%3Ctext x='20' y='25' text-anchor='middle' fill='white' font-size='14' font-family='Arial'%3EJD%3C/text%3E%3C/svg%3E";

  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    resetAdminLogin();
    resetSubAdminAccess();
    setAdminInfo({ isAuthenticated: false });
    setSubAdminInfo({ isAuthenticated: false });
    navigate("/");
  };
  return (
    <div
      className={`fixed top-0 right-0 h-[72px] bg-[#FACD34] border-b border-gray-200 p-4 flex items-center justify-between z-40 transition-all duration-300 ${isMobile ? "left-0" : isSidebarOpen ? "left-72" : "left-20"
        }`}
      style={{ boxShadow: "0 4px 8px -2px rgba(0, 0, 0, 0.1)" }}
    >
      {/* Left side - Logo and Mobile Menu */}
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        {isMobile && (
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 lg:hidden"
          >
            {isSidebarOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        )}
      </div>

      {/* Right side - Notifications and Profile */}
      <div className="flex items-center gap-4">

        {/* Profile Dropdown */}
        <div className="relative flex items-center gap-2"> 
          <GoBell className="w-8 h-8"/>
          <button
            onClick={() => {
              setIsProfileDropdownOpen(!isProfileDropdownOpen);
            }}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <img
              src={adminProfileImg}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
            />
            <span className="hidden sm:block text-sm font-medium text-gray-700">
              {adminName}
            </span>
            <FaChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isProfileDropdownOpen ? "rotate-180" : ""
                }`}
            />
          </button>

          {/* Profile Dropdown Menu */}
          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <button
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => {
                  navigate("/adminProfile");
                  setIsProfileDropdownOpen(!isProfileDropdownOpen);
                }}
              >
                Profile
              </button>
              <div className="border-t border-gray-100 mt-2 pt-2">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Click outside handler */}
      {(isProfileDropdownOpen || isNotificationOpen) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setIsProfileDropdownOpen(false);
            setIsNotificationOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default Navbar;
