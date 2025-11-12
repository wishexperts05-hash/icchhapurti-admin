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
      return "bg-white text-gray-700";
    }
    return "bg-white text-gray-700";
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
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 group mb-1 ${
                  isSubActive
                    ? "bg-yellow-400 text-gray-900"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <div
                  className={`flex items-center justify-center w-6 h-6 rounded-md transition-all duration-200 ${
                    isSubActive
                      ? "bg-white text-gray-700"
                      : "bg-white text-gray-700"
                  }`}
                >
                  <subItem.icon className="h-4 w-4" />
                </div>
                {isOpen && (
                  <div className="flex items-center justify-between w-full ml-3">
                    <span
                      className={`text-sm font-medium transition-colors duration-200 ${
                        isSubActive ? "text-gray-900" : "text-gray-700"
                      }`}
                    >
                      {subItem.title}
                    </span>
                    {hasSubSubmenu && (
                      <ChevronDown
                        className={`h-4 w-4 text-gray-600 transition-transform duration-200 ${
                          isSubExpanded ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </div>
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
        bg-white border-r border-gray-200
        h-screen flex flex-col
      `}
      >
        {isMobile && !isOpen ? null : (
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
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
                className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
              >
                {isOpen ? (
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                )}
              </button>
            )}
          </div>
        )}

        <div className="flex-1 flex flex-col overflow-y-auto scrollbar-hide">
          <div className="flex-1 p-3 overflow-y-auto scrollbar-hide">
            <div className="space-y-1">
              {navigationItems.map((item, index) => {
                const isActive = isItemActive(item.url, item.subItems);
                const isExpanded = expandedItems.includes(item.id);
                const hasSubmenu = item.hasSubmenu;

                const buttonClasses = [
                  "relative group rounded-lg transition-all duration-200 w-full",
                  isActive
                    ? "bg-yellow-400 text-gray-900"
                    : "hover:bg-gray-100 text-gray-700",
                  !isOpen && !isMobile ? "justify-center" : "",
                ].join(" ");

                return (
                  <div key={item.id}>
                    <button
                      onClick={() => handleItemClick(item)}
                      className={buttonClasses}
                    >
                      <div className="flex items-center w-full px-4 py-3">
                        <div
                          className={`flex items-center justify-center w-6 h-6 rounded-md transition-all duration-200 ${getIconBgClass(
                            item.color,
                            isActive
                          )}`}
                        >
                          <item.icon className="h-4 w-4" />
                        </div>

                        {isOpen && (
                          <div className="flex items-center justify-between w-full ml-3">
                            <span
                              className={`font-medium text-sm truncate transition-colors duration-200 ${
                                isActive ? "text-gray-900" : "text-gray-700"
                              }`}
                            >
                              {item.title}
                            </span>
                            {hasSubmenu && (
                              <ChevronDown
                                className={`h-4 w-4 text-gray-600 transition-transform duration-200 ${
                                  isExpanded ? "rotate-180" : ""
                                }`}
                              />
                            )}
                          </div>
                        )}
                      </div>
                    </button>

                    {hasSubmenu && isExpanded && isOpen && (
                      <div className="mt-1 ml-2">
                        {renderSubItems(item.subItems, 1, item.id)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Logout */}
          <div className="px-3 pb-3 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className={`mt-3 relative group py-3 rounded-lg transition-all duration-200 w-full flex items-center px-4 hover:bg-gray-100 text-gray-700`}
            >
              <div className="flex items-center justify-center rounded-lg transition-all duration-200">
                <div className="bg-white p-1 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-box-arrow-right text-gray-700"
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
                  <span className="ml-3 font-medium text-sm text-gray-700">
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