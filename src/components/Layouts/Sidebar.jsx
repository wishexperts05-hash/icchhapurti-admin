
import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import AnimationCSS from "./AnimationCSS";
import { allNavigationItems } from "../../utils/sidebarHelpers";
import logo from "../../assets/logo.png";
import { useSetRecoilState } from "recoil";
import { adminAuthState, subAdminAuthState } from "../../state/auth/authenticatedState";
import useLogin from "../../hooks/auth/useLogin";

const Sidebar = ({ isOpen, setIsOpen, isMobile }) => {
  const setAdminInfo = useSetRecoilState(adminAuthState);
  const setSubAdminInfo = useSetRecoilState(subAdminAuthState);
  const { resetAdminLogin, resetSubAdminAccess } = useLogin();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const navigationItems = allNavigationItems;

  // 🔥 Only one menu can be expanded at a time
  const [expandedItems, setExpandedItems] = useState([]);
  const [focusedItemId, setFocusedItemId] = useState(null);
  const itemRefs = useRef({});
  const sidebarRef = useRef(null);

  const navigationItems = useMemo(() => {
    return filterNavigationItems(
      allNavigationItems,
      subAdminAccess,
      isAdminLoggedIn
    );
  }, [subAdminAccess, isAdminLoggedIn]);

  // Get all visible items including sub-items when expanded
  const getAllVisibleItems = useCallback(() => {
    const visibleItems = [];

    const collectItems = (items) => {
      items.forEach(item => {
        visibleItems.push(item);
        if (item.hasSubmenu && expandedItems.includes(item.id) && item.subItems) {
          collectItems(item.subItems);
        }
      });
    };

    collectItems(navigationItems);
    return visibleItems;
  }, [navigationItems, expandedItems]);

  // Get current item index based on path
  const getCurrentItemIndex = useCallback(() => {
    const visibleItems = getAllVisibleItems();
    let bestMatchIndex = 0;
    let bestMatchLength = 0;
    
    visibleItems.forEach((item, index) => {
      if (item.url) {
        if (currentPath === item.url) {
          // Exact match takes highest priority
          bestMatchIndex = index;
          bestMatchLength = item.url.length;
        } else if (currentPath.startsWith(item.url + "/") && item.url.length > bestMatchLength) {
          // For nested paths, find the most specific match
          bestMatchIndex = index;
          bestMatchLength = item.url.length;
        } else if (bestMatchLength === 0 && currentPath.startsWith(item.url)) {
          // Fallback for partial matches
          bestMatchIndex = index;
        }
      }
    });
    
    return bestMatchIndex;
  }, [getAllVisibleItems, currentPath]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (!isOpen && !isMobile) return;

    // Don't handle if user is typing in an input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      return;
    }

    const visibleItems = getAllVisibleItems();
    let currentIndex = visibleItems.findIndex(item => item.id === focusedItemId);

    // If no focus, start from current page
    if (currentIndex === -1) {
      currentIndex = getCurrentItemIndex();
    }

    let newIndex = currentIndex;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        e.stopPropagation();
        newIndex = (currentIndex + 1) % visibleItems.length;
        break;

      case 'ArrowUp':
        e.preventDefault();
        e.stopPropagation();
        newIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
        break;

      case 'Enter':
        e.preventDefault();
        e.stopPropagation();
        const currentItem = visibleItems[currentIndex];
        if (currentItem) {
          if (currentItem.hasSubmenu && currentItem.url) {
            // If the item has a URL and submenu, navigate to its URL
            navigate(currentItem.url);
            if (isMobile) setIsOpen(false);
          } else if (currentItem.hasSubmenu) {
            // If it's just a parent with submenu, toggle its expanded state
            const isExpanded = expandedItems.includes(currentItem.id);
            setExpandedItems(prev =>
              isExpanded
                ? prev.filter(id => id !== currentItem.id)
                : [...prev, currentItem.id]
            );
          } else if (currentItem.url) {
            navigate(currentItem.url);
            if (isMobile) setIsOpen(false);
          }
        }
        return;

      default:
        return;
    }

    // Update focused item
    if (newIndex >= 0 && newIndex < visibleItems.length) {
      const newItem = visibleItems[newIndex];
      setFocusedItemId(newItem.id);

      // Focus the element with a slight delay
      setTimeout(() => {
        if (itemRefs.current[newItem.id]) {
          itemRefs.current[newItem.id].focus();
          itemRefs.current[newItem.id].scrollIntoView({
            block: 'nearest',
            behavior: 'smooth'
          });
        }
      }, 10);
    }
  }, [isOpen, isMobile, getAllVisibleItems, focusedItemId, getCurrentItemIndex, expandedItems, navigate]);

  // Add and remove keyboard event listener
  useEffect(() => {
    const handleKeyDownEvent = (e) => handleKeyDown(e);
    const sidebarElement = sidebarRef.current;
    if (sidebarElement) {
      sidebarElement.addEventListener('keydown', handleKeyDownEvent);
    }
    return () => {
      if (sidebarElement) {
        sidebarElement.removeEventListener('keydown', handleKeyDownEvent);
      }
    };
  }, [handleKeyDown]);

  // Initialize focused item on mount and when navigation items change
  useEffect(() => {
    const currentIndex = getCurrentItemIndex();
    const visibleItems = getAllVisibleItems();
    if (currentIndex >= 0 && currentIndex < visibleItems.length) {
      setFocusedItemId(visibleItems[currentIndex].id);
    }
  }, [getCurrentItemIndex, getAllVisibleItems]);

  console.log("subAdminAccess", subAdminAccess);
  console.log("isAdminLoggedIn", isAdminLoggedIn);
  console.log("isSubAdminLoggedIn", isSubAdminLoggedIn);

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

    return subItems.some((sub) => isSubItemActive(sub.url, sub.subItems));
  };

  // Check active submenus
  const isSubItemActive = (url, subSubItems = []) => {
    if (currentPath === url) return true;
    if (currentPath.startsWith(url + "/") && url !== "/") return true;

    return subSubItems?.some(
      (s) => currentPath === s.url || currentPath.startsWith(s.url + "/")
    );
  };

  // 🔥 Toggle menu — only 1 open at a time
  const handleToggle = (id, subItems = []) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? [] : [id] // collapse all others
    );
  };

  // 🔥 Clicking on parent
  const handleItemClick = (item) => {
    setFocusedItemId(item.id);
    if (item.hasSubmenu) {
      handleToggle(item.id, item.subItems);

      // Auto-open first submenu item
      const firstSub = item.subItems?.[0];
      if (firstSub && !firstSub.hasSubmenu) {
        navigate(firstSub.url);
      }
    } else {
      // Normal menu item
      navigate(item.url);
      setExpandedItems([]); // collapse all
    }

    if (isMobile) setIsOpen(false);
  };

  // 🔥 Clicking subitem
  const handleSubItemClick = (url, parentId) => {
    navigate(url);
    setExpandedItems([parentId]); // keep only parent open
    if (isMobile) setIsOpen(false);
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


   const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const renderSubItems = (subItems, parentId) => {
    return (
      <div className="ml-3 mt-1">
        {subItems.map((subItem) => {
          const isActive = isSubItemActive(subItem.url, subItem.subItems);
          const hasNested = subItem.hasSubmenu;
          const isExpanded = expandedItems.includes(subItem.id);

          return (
            <div key={subItem.id}>
              <button
                ref={el => itemRefs.current[subItem.id] = el}
                onClick={() => {
                  setFocusedItemId(subItem.id);
                  hasNested
                    ? handleToggle(subItem.id)
                    : handleSubItemClick(subItem.url, parentId);
                }}
                onFocus={() => setFocusedItemId(subItem.id)}
                tabIndex={focusedItemId === subItem.id ? 0 : -1}
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 mb-1

                  ${isActive
                    ? "bg-yellow-400 text-gray-900"
                    : focusedItemId === subItem.id
                      ? "ring-2 ring-blue-500 ring-offset-1 bg-blue-50"
                      : "hover:bg-gray-100 text-gray-700"
                  }
                  outline-none focus:outline-none
                `}
              >
                <subItem.icon className="h-4 w-4" />

                {isOpen && (
                  <div className="flex items-center justify-between w-full ml-3">
                    <span className="font-medium text-sm">{subItem.title}</span>
                    {hasNested && (
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          isExpanded ? "rotate-180" : ""
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
        ref={sidebarRef}
        tabIndex={-1}
        className={`
              ${isMobile ? "fixed" : "relative"} ${isMobile ? "z-50" : "z-10"}
              ${isOpen ? "w-72" : isMobile ? "w-0" : "w-20"} 
              ${isMobile && !isOpen ? "-translate-x-full" : "translate-x-0"}
              transition-all duration-300 ease-in-out
              bg-white border-r border-gray-200
              h-screen flex flex-col
              outline-none
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
                      ref={el => itemRefs.current[item.id] = el}
                      onClick={() => handleItemClick(item)}
                      onFocus={() => setFocusedItemId(item.id)}
                      tabIndex={focusedItemId === item.id ? 0 : -1}
                      className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200
                        ${isActive
                          ? "bg-yellow-400 text-gray-900"
                          : focusedItemId === item.id
                            ? "ring-2 ring-blue-500 ring-offset-1 bg-blue-50"
                            : "bg-white hover:bg-gray-100 text-gray-700"
                        }
                        ${!isOpen ? "justify-center" : ""}
                        outline-none focus:outline-none
                      `}
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
                    ${
                      isActive
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
                          className={`h-4 w-4 transition-transform ${
                            isExpanded ? "rotate-180" : ""
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