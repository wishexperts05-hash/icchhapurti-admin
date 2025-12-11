import { Navigate, Outlet, useLocation } from "react-router-dom";

// Put your full route map here
const routeModuleMap = {
  "/dashboard": "Dashboard",
  "/user-management": "User Management",
  "/staff-management": "Staff Management",
  "/product-management": "Product Management",
  "/order-management": "Order Management",
  "/offer-management": "Offer Management",
  "/blog-management": "Blog Management",

  "/lucky-draw-management": "Lucky Draw Management",

  "/spin-reward-management": "Spin Reward Management",
  "/refer-and-earn-user": "Referral Tracking",
  "/upload-video": "Upload Video",

  "/reports": "Reports",
  "/staff-performance": "Staff Performance",
  "/lucky-draw-analysis": "Lucky Draw Analysis",

  "/commission-settings": "Commission Settings",
  "/coin-settings": "Coin Settings",
  "/withdraw-settings": "Withdraw Settings",
  "/target-management": "Target Management",

  "/country-management": "Country Management",
  "/notification-management/send-notification": "Send Notification",
  "/manage-redeem-request": "Manage Redeem Request",

  "/chat-support-system": "Chat Support System",
  "/manage-comments": "Comment & Reviews",
  "/app-management/aboutus": "About Us",

  "/app-management/terms-and-conditions": "Terms & Conditions",

  "/app-management/privacy-policy": "Privicy Policy",
  "/app-management/manage-banner": "Manage Banner",
  "/app-management/help-and-support": "Help & Support",

  "/app-management/other-settings": "Other Settings",
  "/app-management/faq": "Faq",

  "/sub-admin/roles": "Roles",
  "/sub-admin/users": "Users",
  "/sub-admin/user-permissions": "Sub-Admin Permission",
};

// Map URL → required action
const routeActionMap = {
  create: "create",
  edit: "update",
  update: "update",
  view: "read",
  details: "read",
};

const getRequiredAction = (path) => {
  const parts = path.toLowerCase().split("/");
  for (const part of parts) {
    if (routeActionMap[part]) return routeActionMap[part];
  }
  return "read";
};

const normalize = (str) =>
  str?.toLowerCase().trim().replace(/\s+/g, " ");

const SubAdminProtectedRoute = () => {
  const location = useLocation();

  const isSubAdminLoggedIn =
    sessionStorage.getItem("isSubAdminLoggedIn") === "true";

  const accessData = JSON.parse(
    sessionStorage.getItem("accessPermissions") || "[]"
  );

  // ADMIN bypass
  if (!isSubAdminLoggedIn) return <Outlet />;

  const currentPath = location.pathname;

  // Match dynamic route (remove :id)
  const matchedRoute = Object.keys(routeModuleMap).find((route) =>
    currentPath.startsWith(route.split("/:")[0])
  );

  if (!matchedRoute) {
    return <Navigate to="/no-access" replace />;
  }

  const requiredModule = routeModuleMap[matchedRoute];
  const requiredAction = getRequiredAction(currentPath);

  const modulePermission = accessData.find(
    (item) =>
      normalize(item.moduleName) === normalize(requiredModule) ||
      normalize(item.parentModuleName) === normalize(requiredModule)
  );

  if (!modulePermission) {
    return <Navigate to="/no-access" replace />;
  }

  if (!modulePermission.accessTypes.includes(requiredAction)) {
    return <Navigate to="/no-access" replace />;
  }

  return <Outlet />;
};

export default SubAdminProtectedRoute;
