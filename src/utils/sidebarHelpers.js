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
} from "lucide-react";

import { RiCoupon2Line } from "react-icons/ri";

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
    icon: Home,
    badge: null,
    color: "blue",
  },
  {
    id: 1,
    title: "Staff Management",
    url: "/",
    icon: Home,
    badge: null,
    color: "blue",
  },
  {
    id: 1,
    title: "User Management",
    url: "/",
    icon: Home,
    badge: null,
    color: "blue",
  },
  {
    id: 1,
    title: "Promoter Management",
    url: "/",
    icon: Home,
    badge: null,
    color: "blue",
  },
  {
    id: 1,
    title: "Product Management",
    url: "/",
    icon: Home,
    badge: null,
    color: "blue",
  },
  {
    id: 1,
    title: "Order Management",
    url: "/",
    icon: Home,
    badge: null,
    color: "blue",
  },
  {
    id: 1,
    title: "Offer Management",
    url: "/",
    icon: Home,
    badge: null,
    color: "blue",
  },
  {
    id: 1,
    title: "Blog Management",
    url: "/",
    icon: Home,
    badge: null,
    color: "blue",
  },
  {
    id: 2,
    title: "Reward Management",
    url: "/customers",
    icon: Users,
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
    id: 3,
    title: " Refer & Earn ",
    url: "/feature-facilities",
    icon: FileText,
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
    id: 4,
    title: "Report & Analytics",
    url: "/pg-hostel-bookings",
    icon: Calendar,
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
        id: 93,
        title: "Blocked User & Staffs",
        url: "/cms/notification-management",
        icon: MessageSquare,
        badge: null,
        color: "yellow",
      },
    ],
  },
  {
    id: 5,
    title: "Commission Settings",
    url: "/payments-overview",
    icon: BarChart3,
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
    id: 6,
<<<<<<< HEAD
    title: "Product Managment",
    url: "/productMangment",
=======
    title: "Target Management",
    url: "/coupon",
>>>>>>> c1b47e0ed6db9df7bf6f8fad730d06947293dd99
    icon: RiCoupon2Line,
    badge: null,
    color: "pink",
  },
  {
    id: 7,
    title: "Country Management",
    url: "/reviews",
    icon: Star,
    badge: null,
    color: "yellow",
  },
  {
    id: 8,
    title: "Notification Management",
    url: "/analytics",
    icon: PieChart,
    badge: null,
    color: "gray",
  },
  {
    id: 8,
    title: "Theme Customization",
    url: "/analytics",
    icon: PieChart,
    badge: null,
    color: "gray",
  },
  {
    id: 8,
    title: "Manage Redeem Request",
    url: "/analytics",
    icon: PieChart,
    badge: null,
    color: "gray",
  },
  {
    id: 8,
    title: "Chat Support System",
    url: "/analytics",
    icon: PieChart,
    badge: null,
    color: "gray",
  },
  {
    id: 8,
    title: "Admin Role Management",
    url: "/analytics",
    icon: PieChart,
    badge: null,
    color: "gray",
  },
  {
    id: 8,
    title: "Comment & Reviews",
    url: "/analytics",
    icon: PieChart,
    badge: null,
    color: "gray",
  },
  {
    id: 9,
    title: "App Management",
    url: "/cms/banner",
    icon: Settings,
    badge: null,
    color: "gray",
    hasSubmenu: true,
    subItems: [
      {
        id: 91,
        title: "Terms & Conditions",
        url: "/cms/banner",
        icon: FileText,
        badge: null,
        color: "blue",
      },
      {
        id: 92,
        title: "Privicy Policy",
        url: "/cms/static-page",
        icon: Settings,
        badge: null,
        color: "purple",
      },
      {
        id: 93,
        title: "Manage Banner",
        url: "/cms/notification-management",
        icon: MessageSquare,
        badge: null,
        color: "yellow",
      },
      {
        id: 93,
        title: "Help & Support",
        url: "/cms/notification-management",
        icon: MessageSquare,
        badge: null,
        color: "yellow",
      },
      {
        id: 93,
        title: "Other Settings",
        url: "/cms/notification-management",
        icon: MessageSquare,
        badge: null,
        color: "yellow",
      },
    ],
  },
  {
    id: 11,
    title: "My Profile",
    url: "/chats",
    icon: MessageSquare,
    badge: null,
    color: "gray",
  },
];
