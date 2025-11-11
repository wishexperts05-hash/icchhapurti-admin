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
    id: 2,
    title: "User Management",
    url: "/customers",
    icon: Users,
    badge: null,
    color: "purple",
    hasSubmenu: true,
    subItems: [
      {
        id: 21,
        title: "Customer",
        url: "/customers",
        icon: User,
        badge: null,
        color: "blue",
      },
      {
        id: 22,
        title: "PG/Hostel Owner",
        url: "/pg-hostel-owner",
        icon: Home,
        badge: null,
        color: "purple",
      },
      {
        id: 23,
        title: "Tiffin/Restaurant Provider",
        url: "/tiffin-restaurant-provider",
        icon: Star,
        badge: null,
        color: "yellow",
      },
    ],
  },
  {
    id: 3,
    title: "Listing Management",
    url: "/feature-facilities",
    icon: FileText,
    badge: null,
    color: "green",
    hasSubmenu: true,
    subItems: [
      {
        id: 31,
        title: "Feature&Facilities",
        url: "/feature-facilities",
        icon: Home,
        badge: null,
        color: "Pink",
      },
      {
        id: 32,
        title: "PG/Hostel Listing",
        url: "/pg-hostel-listing",
        icon: Home,
        badge: null,
        color: "purple",
      },
      {
        id: 33,
        title: "Tiffin/Restaurant Listing",
        url: "/restaurant-listing",
        icon: Star,
        badge: null,
        color: "yellow",
      },
    ],
  },
  {
    id: 4,
    title: "Booking & Order",
    url: "/pg-hostel-bookings",
    icon: Calendar,
    badge: null,
    color: "orange",
    hasSubmenu: true,
    subItems: [
      {
        id: 41,
        title: "PG/Hostel Booking",
        url: "/pg-hostel-bookings",
        icon: Home,
        badge: null,
        color: "purple",
      },
      {
        id: 42,
        title: "Tiffin/Restaurant Orders",
        url: "/restaurant-orders",
        icon: Star,
        badge: null,
        color: "yellow",
      },
      {
        id: 43,
        title: "Continue Subscription",
        url: "/Continue-subscription",
        icon: CreditCard,
        badge: null,
        color: "yellow",
      },
    ],
  },
  {
    id: 5,
    title: "Payment & Wallet",
    url: "/payments-overview",
    icon: BarChart3,
    badge: null,
    color: "red",
    hasSubmenu: true,
    subItems: [
      {
        id: 51,
        title: "Payment Overview",
        url: "/payments-overview",
        icon: BarChart3,
        badge: null,
        color: "blue",
      },
      {
        id: 52,
        title: "Wallet Transactions",
        url: "/wallet-transactions",
        icon: Activity,
        badge: null,
        color: "purple",
      },
      {
        id: 53,
        title: "Deposit Transactions",
        url: "/deposit-transactions",
        icon: BanknoteArrowUp,
        badge: null,
        color: "yellow",
      },
      {
        id: 54,
        title: "Deposit Refund Request",
        url: "/deposit-refund-requests",
        icon: CreditCard,
        badge: null,
        color: "yellow",
      },
      {
        id: 55,
        title: "Payout History",
        url: "/payout-history",
        icon: Clock,
        badge: null,
        color: "pink",
      },
    ],
  },
  {
    id: 6,
    title: "Product Managment",
    url: "/productMangment",
    icon: RiCoupon2Line,
    badge: null,
    color: "pink",
  },
  {
    id: 7,
    title: "Rating & Reviews",
    url: "/reviews",
    icon: Star,
    badge: null,
    color: "yellow",
  },
  {
    id: 8,
    title: "Report & Analytics",
    url: "/analytics",
    icon: PieChart,
    badge: null,
    color: "gray",
  },
  {
    id: 9,
    title: "CMS",
    url: "/cms/banner",
    icon: Settings,
    badge: null,
    color: "gray",
    hasSubmenu: true,
    subItems: [
      {
        id: 91,
        title: "Banner",
        url: "/cms/banner",
        icon: FileText,
        badge: null,
        color: "blue",
      },
      {
        id: 92,
        title: "Static Page",
        url: "/cms/static-page",
        icon: Settings,
        badge: null,
        color: "purple",
      },
      {
        id: 93,
        title: "Notification Management",
        url: "/cms/notification-management",
        icon: MessageSquare,
        badge: null,
        color: "yellow",
      },
    ],
  },
  {
    id: 11,
    title: "Chat List",
    url: "/chats",
    icon: MessageSquare,
    badge: null,
    color: "gray",
  },
  {
    id: 12,
    title: "Settings",
    url: "/settings/commission",
    icon: Settings,
    badge: null,
    color: "gray",
    hasSubmenu: true,
    subItems: [
      {
        id: 121,
        title: "Commission",
        url: "/settings/commission",
        icon: BarChart3,
        badge: null,
        color: "blue",
      },
      {
        id: 122,
        title: "Charges & Benefit",
        url: "/settings/cashback",
        icon: Award,
        badge: null,
        color: "purple",
      },
    ],
  },
  {
    id: 13,
    title: "Sub-Admin Access",
    url: "/sub-admin/roles",
    icon: Settings,
    badge: null,
    color: "gray",
    hasSubmenu: true,
    subItems: [
      {
        id: 131,
        title: "Roles",
        url: "/sub-admin/roles",
        icon: BarChart3,
        badge: null,
        color: "blue",
      },
      {
        id: 132,
        title: "Users",
        url: "/sub-admin/users",
        icon: Award,
        badge: null,
        color: "purple",
      },
      {
        id: 133,
        title: "User Permissions",
        url: "/sub-admin/user-permissions",
        icon: Award,
        badge: null,
        color: "purple",
      },
    ],
  },
];
