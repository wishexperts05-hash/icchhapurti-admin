import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import AnimationCSS from "./AnimationCSS";
import logo from "../../assets/logo.png";
import { useSetRecoilState } from "recoil";
import { adminAuthState, subAdminAuthState } from "../../state/auth/authenticatedState";
import useLogin from "../../hooks/auth/useLogin";
import {
  filterNavigationItems,
  allNavigationItems,
  debugAccessibleModules
} from "../../utils/sidebarHelpers";

const Sidebar = ({ isOpen, setIsOpen, isMobile }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const setAdminInfo = useSetRecoilState(adminAuthState);
  const setSubAdminInfo = useSetRecoilState(subAdminAuthState);
  const { resetAdminLogin, resetSubAdminAccess, subAdminAccess } = useLogin();
  const isAdminLoggedIn = sessionStorage.getItem("isAdminLoggedIn") === "true";
  const isSubAdminLoggedIn = sessionStorage.getItem("isSubAdminLoggedIn") === "true";
  const [expandedItems, setExpandedItems] = useState([]);

  console.log("subAdminAccess", subAdminAccess);
  console.log("isAdminLoggedIn", isAdminLoggedIn);
  console.log("isSubAdminLoggedIn", isSubAdminLoggedIn);

  const navigationItems = useMemo(() => {
    return filterNavigationItems(
      allNavigationItems,
      subAdminAccess,
      isAdminLoggedIn
    );
  }, [subAdminAccess, isAdminLoggedIn]);

  useEffect(() => {
    if (!isAdminLoggedIn && subAdminAccess) {
      console.log("Accessible Modules:", navigationItems.map(item => item.title));
      navigationItems.forEach(item => {
        if (item.subItems) {
          console.log(`- ${item.title} sub-items:`, item.subItems.map(sub => sub.title));
        }
      });

      debugAccessibleModules(subAdminAccess, allNavigationItems);
    }
  }, [navigationItems, isAdminLoggedIn, subAdminAccess, isSubAdminLoggedIn]);


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

  const handleToggle = (id, subItems = [], parentPath = []) => {
    setExpandedItems((prev) => {
      const isAlreadyOpen = prev.includes(id);
      const newPath = [...parentPath, id];

      if (isAlreadyOpen) {
        const index = prev.indexOf(id);
        return prev.slice(0, index);
      } else {
        if (
          subItems.length > 0 &&
          !subItems.some((subItem) => isSubItemActive(subItem.url))
        ) {
          const firstSubItem = subItems[0];
          if (firstSubItem.subItems && firstSubItem.subItems.length > 0) {
            navigate(firstSubItem.subItems[0].url);
          } else {
            navigate(firstSubItem.url);
          }
        }
        return newPath;
      }
    });
  };

  const handleItemClick = (item) => {
    if (item.hasSubmenu) {
      handleToggle(item.id, item.subItems, []);
    } else {
      navigate(item.url);
      if (isMobile) {
        setIsOpen(false);
      }
    }
  };

  const handleSubItemClick = (url, parentId) => {
    navigate(url);
    if (!expandedItems.includes(parentId)) {
      setExpandedItems((prev) => [...prev, parentId]);
    }
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    resetAdminLogin();
    resetSubAdminAccess();
    setAdminInfo({ isAuthenticated: false });
    setSubAdminInfo({ isAuthenticated: false });
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Auto-expand active menu
  useEffect(() => {
    const parentToOpen = navigationItems.find((i) =>
      isItemActive(i.url, i.subItems)
    );
    if (parentToOpen?.hasSubmenu) {
      setExpandedItems([parentToOpen.id]);
    }
  }, [currentPath]);

  const renderSubItems = (subItems, parentId) => {
    return (
      <div className="ml-3 mt-1">
        {subItems.map((subItem) => {
          const isExpanded = expandedItems.includes(subItem.id);
          const isActive = isSubItemActive(subItem.url, subItem.subItems);
          const hasNested = subItem.hasSubmenu && subItem.subItems && subItem.subItems.length > 0;

          return (
            <div key={subItem.id}>
              <button
                onClick={() =>
                  hasNested
                    ? handleToggle(subItem.id)
                    : handleSubItemClick(subItem.url, parentId)
                }
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 mb-1
                  ${isActive
                    ? "bg-yellow-400 text-gray-900"
                    : "hover:bg-gray-100 text-gray-700"
                  }
                `}
              >
                <subItem.icon className="h-4 w-4" />

                {isOpen && (
                  <div className="flex items-center justify-between w-full ml-3">
                    <span className="font-medium text-sm">{subItem.title}</span>
                    {hasNested && (
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""
                          }`}
                      />
                    )}
                  </div>
                )}
              </button>

              {hasNested && isExpanded && isOpen && (
                <div className="ml-4">
                  {renderSubItems(subItem.subItems, subItem.id)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <AnimationCSS />

      {/* Mobile Black Overlay */}
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
              <div className="flex items-center space-x-3 animate-slide-in-left w-full">
                <div className="h-16 w-full flex items-center justify-center">
                  <img
                    src={logo}
                    alt="Logo" className="object-cover w-full h-full"
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

        {/* Menus */}
        <div className="flex-1 flex flex-col overflow-y-auto scrollbar-hide">
          <div className="flex-1 p-3 overflow-y-auto scrollbar-hide">
            <div className="space-y-1">
              {navigationItems.map((item) => {
                const isActive = isItemActive(item.url, item.subItems);
                const isExpanded = expandedItems.includes(item.id);

                return (
                  <div key={item.id}>
                    <button
                      onClick={() => handleItemClick(item)}
                      className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200
                    ${isActive
                          ? "bg-yellow-400 text-gray-900"
                          : "bg-white hover:bg-gray-100 text-gray-700"
                        }
                    ${!isOpen ? "justify-center" : ""}
                  `}
                    >
                      <item.icon className="h-5 w-5" />

                      {isOpen && (
                        <div className="flex items-center justify-between w-full ml-3">
                          <span className="font-medium text-sm">{item.title}</span>

                          {item.hasSubmenu && (
                            <ChevronDown
                              className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""
                                }`}
                            />
                          )}
                        </div>
                      )}
                    </button>

                    {item.hasSubmenu && isExpanded && isOpen && (
                      <div>{renderSubItems(item.subItems, item.id)}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>


          {/* Logout Button */}
          <div className="px-3 pb-3 border-t-2 border-[#e65d00]/40">
            <button
              onClick={handleLogout}
              className={`mt-2 relative group py-1 rounded-xl transition-all duration-300 hover:shadow-lg w-full card-hover-effect flex items-center px-3 bg-[#e65d00]/20 border border-[#e65d00]/20 hover:bg-[#e65d00]`}
            >
              <div className="flex items-center justify-center rounded-lg transition-all duration-200 micro-bounce text-white">
                <div className="bg-[#ce0808] p-1 rounded-md">
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
                  <span className="ml-3 font-medium text-sm text-[#ce0808] group-hover:text-white">
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
