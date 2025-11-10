import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("/dashboard/admin");
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // 🔹 Detect screen size and toggle sidebar accordingly
  useEffect(() => {
    const checkScreenSize = () => {
      const mobileView = window.innerWidth < 1024; // lg breakpoint
      setIsMobile(mobileView);
      setIsSidebarOpen(!mobileView);
    };

    checkScreenSize(); // Run on mount
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // 🔹 Update active item when route changes
  useEffect(() => {
    const currentPath = location.pathname;
    setActiveItem(currentPath || "/dashboard/admin");
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        isMobile={isMobile}
      />

      {/* Main Content Wrapper */}
      <div className="flex flex-col flex-1 min-w-0 ">
        {/* Navbar */}
        <Navbar
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          isMobile={isMobile}
        />

        {/* Main Content Area */}
        <main
          className={`flex-1 overflow-y-auto bg-gray-50 transition-all duration-300 ease-in-out ${
            isMobile ? "pt-[72px]" : "pt-[80px]"
          }`}
        >
          <div
            className={`p-4 sm:p-6 transition-all duration-300 ${
              isSidebarOpen && !isMobile ? "ml-0" : ""
            }`}
          >
            <div className="w-full mx-auto overflow-x-auto rounded-b-2xl ">
              <Outlet context={{ activeItem, setActiveItem }} />
            </div>
          </div>
        </main>
      </div>

      {/* Overlay for mobile view */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden "
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
