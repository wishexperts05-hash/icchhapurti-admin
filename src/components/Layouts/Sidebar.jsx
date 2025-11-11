import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import AnimationCSS from "./AnimationCSS";
import { allNavigationItems } from "../../utils/sidebarHelpers";

const Sidebar = ({ isOpen, setIsOpen, isMobile }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [expandedItems, setExpandedItems] = useState([]);

  // ✅ Use all navigation items directly
  const navigationItems = allNavigationItems;

  // Check if a menu/submenu is active
  const isItemActive = (itemUrl, subItems = []) => {
    if (currentPath === itemUrl) return true;
    if (currentPath.startsWith(itemUrl + "/") && itemUrl !== "/") return true;

    if (
      subItems.some((subItem) => {
        if (subItem.subItems && subItem.subItems.length > 0) {
          return isItemActive(subItem.url, subItem.subItems);
        }
        return (
          currentPath === subItem.url ||
          currentPath.startsWith(subItem.url + "/")
        );
      })
    )
      return true;
    return false;
  };

  const isSubItemActive = (subItemUrl, subSubItems = []) => {
    if (currentPath === subItemUrl) return true;
    if (currentPath.startsWith(subItemUrl + "/") && subItemUrl !== "/")
      return true;

    if (
      subSubItems.some(
        (subSubItem) =>
          currentPath === subSubItem.url ||
          currentPath.startsWith(subSubItem.url + "/")
      )
    )
      return true;

    return false;
  };

  // Handle expand/collapse
  const handleToggle = (id, subItems = [], parentPath = []) => {
    setExpandedItems((prev) => {
      const isAlreadyOpen = prev.includes(id);
      const newPath = [...parentPath, id];

      if (isAlreadyOpen) {
        const index = prev.indexOf(id);
        return prev.slice(0, index);
      } else {
        return newPath;
      }
    });
  };

  const handleItemClick = (item) => {
    if (item.hasSubmenu) {
      handleToggle(item.id, item.subItems, []);
    } else {
      navigate(item.url);
      if (isMobile) setIsOpen(false);
    }
  };

  const handleSubItemClick = (url, parentId) => {
    navigate(url);
    if (!expandedItems.includes(parentId)) {
      setExpandedItems((prev) => [...prev, parentId]);
    }
    if (isMobile) setIsOpen(false);
  };

  // Auto-expand active menus
  useEffect(() => {
    const autoExpandMenus = () => {
      const newExpandedItems = [];

      navigationItems.forEach((item) => {
        if (item.hasSubmenu && isItemActive(item.url, item.subItems)) {
          newExpandedItems.push(item.id);

          item.subItems?.forEach((subItem) => {
            if (
              subItem.hasSubmenu &&
              isSubItemActive(subItem.url, subItem.subItems)
            ) {
              newExpandedItems.push(subItem.id);
            }
          });
        }
      });

      setExpandedItems(newExpandedItems);
    };

    autoExpandMenus();
  }, [currentPath, navigationItems]);

  const getIconBgClass = (color, isActive) => {
    if (isActive) {
      return "bg-[#004AAD] text-white shadow-sm";
    }
    return "bg-gray-100 text-gray-600 group-hover:bg-[#004AAD] group-hover:text-white";
  };

  const renderSubItems = (subItems, level = 1, parentId = null) => {
    return (
      <div className={`transition-all duration-300 ease-in-out ${level > 1 ? "ml-4" : ""}`}>
        {subItems.map((subItem) => {
          const isSubExpanded = expandedItems.includes(subItem.id);
          const isSubActive = isSubItemActive(subItem.url, subItem.subItems);
          const hasSubSubmenu = subItem.hasSubmenu && subItem.subItems && subItem.subItems.length > 0;

          return (
            <div key={subItem.id}>
              <button
                onClick={() =>
                  hasSubSubmenu
                    ? handleToggle(subItem.id, subItem.subItems, parentId ? [parentId] : [])
                    : handleSubItemClick(subItem.url, parentId)
                }
                className={`flex items-center w-full px-3 py-2.5 rounded-lg transition-all duration-200 group hover:shadow-sm mb-1 ${
                  isSubActive
                    ? "bg-blue-50 border border-blue-200 shadow-sm"
                    : "hover:bg-gray-50 border border-transparent"
                }`}
              >
                <div
                  className={`flex items-center justify-center w-6 h-6 rounded-md transition-all duration-200 micro-bounce ${
                    isSubActive
                      ? "bg-[#004AAD] text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 group-hover:bg-[#004AAD] group-hover:text-white"
                  }`}
                >
                  <subItem.icon className="h-3 w-3" />
                </div>
                {isOpen && (
                  <div className="flex items-center justify-between w-full ml-3">
                    <span
                      className={`text-sm font-medium transition-colors duration-200 ${
                        isSubActive ? "text-blue-700" : "text-gray-700"
                      }`}
                    >
                      {subItem.title}
                    </span>
                    {hasSubSubmenu && (
                      <ChevronDown
                        className={`h-3 w-3 text-gray-400 transition-transform duration-200 ${
                          isSubExpanded ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </div>
                )}
                {isSubActive && !hasSubSubmenu && (
                  <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full shadow-sm" />
                )}
              </button>

              {hasSubSubmenu && isSubExpanded && isOpen && (
                <div className="mt-1">
                  {renderSubItems(subItem.subItems, level + 1, subItem.id)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <AnimationCSS />

      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`
        ${isMobile ? "fixed" : "relative"} ${isMobile ? "z-50" : "z-10"}
        ${isOpen ? "w-72" : isMobile ? "w-0" : "w-20"} 
        ${isMobile && !isOpen ? "-translate-x-full" : "translate-x-0"}
        transition-all duration-300 ease-in-out
        bg-white border-r border-gray-200 shadow-lg
        backdrop-blur-xl h-screen flex flex-col
      `}
      >
        {isMobile && !isOpen ? null : (
          <div className="flex items-center justify-between p-4 border-b border-gray-100 shadow-lg">
            {isOpen && (
              <div className="flex items-center space-x-3 animate-slide-in-left">
                <div className="h-auto w-48">
                  <img 
                    // src={Logo} 
                    alt="Logo" className="w-full" 
                  />
                </div>
              </div>
            )}

            {!isMobile && (
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-blue-50 transition-all duration-200 group hover:shadow-md micro-bounce"
              >
                {isOpen ? (
                  <ChevronLeft className="h-6 w-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
                ) : (
                  <ChevronRight className="h-6 w-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
                )}
              </button>
            )}
          </div>
        )}

        <div className="flex-1 flex flex-col overflow-y-auto scrollbar-hide">
          <div className="flex-1 p-3 overflow-y-auto scrollbar-hide">
            <div className="space-y-2">
              {navigationItems.map((item, index) => {
                const isActive = isItemActive(item.url, item.subItems);
                const isExpanded = expandedItems.includes(item.id);
                const hasSubmenu = item.hasSubmenu;

                const buttonClasses = [
                  "relative group h-12 rounded-xl transition-all duration-300 hover:shadow-lg w-full card-hover-effect",
                  isActive
                    ? "bg-blue-50 border border-blue-200 shadow-md"
                    : "hover:bg-gray-50 border border-transparent",
                  !isOpen && !isMobile ? "justify-center" : "",
                ].join(" ");

                return (
                  <div key={item.id}>
                    <button
                      onClick={() => handleItemClick(item)}
                      className={buttonClasses}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-center w-full px-3">
                        <div
                          className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 micro-bounce ${getIconBgClass(
                            item.color,
                            isActive
                          )}`}
                        >
                          <item.icon className="h-4 w-4" />
                        </div>

                        {isOpen && (
                          <div className="flex items-center justify-between w-full ml-3 animate-text-reveal">
                            <span
                              className={`font-medium text-sm truncate transition-colors duration-200 ${
                                isActive ? "text-blue-700" : "text-gray-700"
                              }`}
                            >
                              {item.title}
                            </span>
                            {hasSubmenu && (
                              <ChevronDown
                                className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                                  isExpanded ? "rotate-180" : ""
                                }`}
                              />
                            )}
                          </div>
                        )}
                      </div>

                      {isActive && (
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#004AAD] rounded-l-full shadow-lg" />
                      )}
                    </button>

                    {hasSubmenu && isExpanded && isOpen && (
                      <div className="mt-2 ml-4">
                        {renderSubItems(item.subItems, 1, item.id)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Logout */}
          <div className="px-3 pb-3 border-t-2 border-[#e65d00]/40">
            <button
              onClick={handleLogout}
              className={`mt-2 relative group py-1 rounded-xl transition-all duration-300 hover:shadow-lg w-full card-hover-effect flex items-center px-3 bg-[#e65d00]/20 border border-[#e65d00]/20 hover:bg-[#e65d00]`}
            >
              <div className="flex items-center justify-center rounded-lg transition-all duration-200 micro-bounce text-white">
                <div className="bg-[#e65d00] p-1 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-box-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                    />
                  </svg>
                </div>

                {isOpen && (
                  <span className="ml-3 font-medium text-sm text-[#e65d00] group-hover:text-white">
                    Log out
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
