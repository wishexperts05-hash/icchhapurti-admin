import {
  BarChart3,
  Users,
  Star,
  Home,
  User,
  Settings,
  FileText,
  MessageSquare,
  Calendar,
  Activity,
  PieChart,
  Award,
  Clock,
  CreditCard,
  BanknoteArrowUp,
  Users2Icon,
  SplitSquareHorizontalIcon,
} from "lucide-react";

import { RiCoupon2Line, RiListSettingsFill, RiProductHuntFill, RiUserSettingsFill } from "react-icons/ri";
import { adminRoleManagementIcon, appManagementIcon, blogManagementIcon, chatSupportSystemIcon, commentandReviewIcon, commissionsettingsIcon, countryManagementIcon, dashboardIcon, manageReddemRequestIcon, offerManagementIcon, orderManagementIcon, productManagementIcon, referandearnIcon, reportandanalyticsIcon, rewardManagementIcon, staffManagementIcon, targetManagementIcon, themecustomizationIcon, userManagementIcon } from "../assets/sidebaricon/sidebaricon";

export const hasSubAdminAccess = (subAdminAccess, moduleName) => {
  if (!subAdminAccess || !Array.isArray(subAdminAccess)) return false;

  const module = subAdminAccess.find(
    (item) =>
      item.moduleName === moduleName ||
      (item.parentModuleName && item.parentModuleName === moduleName)
  );

  return module && module.accessTypes && module.accessTypes.length > 0;
};

export const filterNavigationItems = (
  items,
  subAdminAccess,
  isAdminLoggedIn
) => {
  if (isAdminLoggedIn) {
    return items;
  }
  const filteredItems = items
    .map((item) => {
      const itemCopy = { ...item };

      const hasParentAccess = hasSubAdminAccess(subAdminAccess, item.title);

      if (item.subItems) {
        const accessibleSubItems = item.subItems.filter((subItem) =>
          hasSubAdminAccess(subAdminAccess, subItem.title)
        );

        itemCopy.subItems = accessibleSubItems;
        const shouldShow = accessibleSubItems.length > 0 || hasParentAccess;

        return shouldShow ? itemCopy : null;
      }

      return hasParentAccess ? itemCopy : null;
    })
    .filter(Boolean);
  return filteredItems;
};

export const debugAccessibleModules = (subAdminAccess, navigationItems) => {
  if (!subAdminAccess) return;
  navigationItems.forEach((item) => {
    const hasAccess = hasSubAdminAccess(subAdminAccess, item.title);
    console.log(`- ${item.title}: ${hasAccess ? "ACCESSIBLE" : "NO ACCESS"}`);

    if (item.subItems) {
      item.subItems.forEach((subItem) => {
        const subHasAccess = hasSubAdminAccess(subAdminAccess, subItem.title);
        console.log(
          `  └─ ${subItem.title}: ${subHasAccess ? "ACCESSIBLE" : "NO ACCESS"}`
        );
      });
    }
  });
};

export const allNavigationItems = [
  {
    id: 1,
    title: "Dashboard",
    url: "/dashboard",
    icon: dashboardIcon,
    badge: null,
    color: "blue",
  },
  {
    id: 3,
    title: "User Management",
    url: "/",
    icon: userManagementIcon,
    badge: null,
    color: "blue",
  },
  {
    id: 2,
    title: "Staff Management",
    
    url: "/staff-management",
    icon: staffManagementIcon,
    badge: null,
    color: "blue",
  },
  
  {
    id: 4,
    title: "Promoter Management",
    url: "/promotermanagement",
    icon: productManagementIcon,
    badge: null,
    color: "blue",
  },
  {
    id: 5,
    title: "Product Management",
    url: "/product-management",
    icon: productManagementIcon,
    badge: null,
    color: "blue",
  },
  {
    id: 6,
    title: "Order Management",
    url: "/order-management",
    icon: orderManagementIcon,
    badge: null,
    color: "blue",
  },
  {
    id: 7,
    title: "Offer Management",
    url: "/",
    icon: offerManagementIcon,
    badge: null,
    color: "blue",
  },
  {
    id: 8,
    title: "Blog Management",
    url: "/",
    icon: blogManagementIcon,
    badge: null,
    color: "blue",
  },
  {
    id: 9,
    title: "Reward Management",
    url: "/customers",
    icon: rewardManagementIcon,
    badge: null,
    color: "purple",
    hasSubmenu: true,
    subItems: [
      {
        id: 21,
        title: "Lucky Draw Management",
        url: "/customers",
        icon: User,
        badge: null,
        color: "blue",
      },
      {
        id: 22,
        title: "Spin Reward Management",
        url: "/pg-hostel-owner",
        icon: Home,
        badge: null,
        color: "purple",
      },
    ],
  },
  {
    id: 10,
    title: " Refer & Earn ",
    url: "/feature-facilities",
    icon: referandearnIcon,
    badge: null,
    color: "green",
    hasSubmenu: true,
    subItems: [
      {
        id: 31,
        title: "Referral Tracking",
        url: "/feature-facilities",
        icon: Home,
        badge: null,
        color: "Pink",
      },
      {
        id: 32,
        title: " Upload Video ",
        url: "/pg-hostel-listing",
        icon: Home,
        badge: null,
        color: "purple",
      },
    ],
  },
  {
    id: 11,
    title: "Report & Analytics",
    url: "/pg-hostel-bookings",
    icon: reportandanalyticsIcon,
    badge: null,
    color: "orange",
    hasSubmenu: true,
    subItems: [
      {
        id: 41,
        title: "Reports",
        url: "/pg-hostel-bookings",
        icon: Home,
        badge: null,
        color: "purple",
      },
      {
        id: 42,
        title: "Staff Performance",
        url: "/restaurant-orders",
        icon: Star,
        badge: null,
        color: "yellow",
      },
      {
        id: 43,
        title: "Lucky Draw Analysis",
        url: "/Continue-subscription",
        icon: CreditCard,
        badge: null,
        color: "yellow",
      },
      {
        id: 44,
        title: "Blocked User & Staffs",
        url: "/cms/notification-management",
        icon: MessageSquare,
        badge: null,
        color: "yellow",
      },
    ],
  },
  {
    id: 12,
    title: "Commission Settings",
    url: "/payments-overview",
    icon: commissionsettingsIcon,
    badge: null,
    color: "red",
    hasSubmenu: true,
    subItems: [
      {
        id: 51,
        title: "Staff Commission",
        url: "/payments-overview",
        icon: BarChart3,
        badge: null,
        color: "blue",
      },
      {
        id: 52,
        title: "User Commission",
        url: "/wallet-transactions",
        icon: Activity,
        badge: null,
        color: "purple",
      },
      {
        id: 53,
        title: "Promoter Commission",
        url: "/deposit-transactions",
        icon: BanknoteArrowUp,
        badge: null,
        color: "yellow",
      },
      {
        id: 54,
        title: "Coin Setting",
        url: "/deposit-refund-requests",
        icon: CreditCard,
        badge: null,
        color: "yellow",
      },
    ],
  },
  {
    id: 13,
    title: "Target Management",
    url: "/coupon",
    icon: targetManagementIcon,
    badge: null,
    color: "pink",
  },
  {
    id: 14,
    title: "Country Management",
    url: "/reviews",
    icon: countryManagementIcon,
    badge: null,
    color: "yellow",
  },
  {
    id: 15,
     title: "Product Managment",
      url: "/productMangment",
    icon: productManagementIcon,
    badge: null,
    color: "gray",
  },
  {
    id: 16,
    title: "Theme Customization",
    url: "/analytics",
    icon: themecustomizationIcon,
    badge: null,
    color: "gray",
  },
  {
    id: 17,
    title: "Manage Redeem Request",
    url: "/analytics",
    icon: manageReddemRequestIcon,
    badge: null,
    color: "gray",
  },
  {
    id: 18,
    title: "Chat Support System",
    url: "/analytics",
    icon: chatSupportSystemIcon,
    badge: null,
    color: "gray",
  },
  {
    id: 19,
    title: "Admin Role Management",
    url: "/analytics",
    icon: adminRoleManagementIcon,
    badge: null,
    color: "gray",
  },
  {
    id: 20,
    title: "Comment & Reviews",
    url: "/analytics",
    icon: commentandReviewIcon,
    badge: null,
    color: "gray",
  },
  {
    id: 21,
    title: "App Management",
    url: "/cms/banner",
    icon: appManagementIcon,
    badge: null,
    color: "gray",
    hasSubmenu: true,
    subItems: [
      {
        id: 61,
        title: "Terms & Conditions",
        url: "/cms/banner",
        icon: FileText,
        badge: null,
        color: "blue",
      },
      {
        id: 62,
        title: "Privicy Policy",
        url: "/cms/static-page",
        icon: Settings,
        badge: null,
        color: "purple",
      },
      {
        id: 63,
        title: "Manage Banner",
        url: "/cms/notification-management",
        icon: MessageSquare,
        badge: null,
        color: "yellow",
      },
      {
        id: 64,
        title: "Help & Support",
        url: "/cms/notification-management",
        icon: MessageSquare,
        badge: null,
        color: "yellow",
      },
      {
        id: 65,
        title: "Other Settings",
        url: "/cms/notification-management",
        icon: MessageSquare,
        badge: null,
        color: "yellow",
      },
    ],
  },
];
