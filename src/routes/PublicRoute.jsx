import { lazy, Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../routes/ProtectedRoute";
import ProductManagment from "../pages/module/productManagment/ProductManagment";
import LoaderSpinner from "../components/uiComponent/LoaderSpinner";

// ---------------------------- Lazy Imports ----------------------------
const Login = lazy(() => import("../pages/auth/Login"));
const VerifyOTP = lazy(() => import("../pages/auth/VerifyOTP"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/auth/ResetPassword"));
const PasswordResetSuccessfully = lazy(() =>
  import("../pages/auth/PasswordResetSuccefully")
);

const Dashboard = lazy(() => import("../pages/module/dashboard/Dashboard"));
const AdminProfile = lazy(() =>
  import("../pages/module/adminProfile/AdminProfile")
);
const EditProfile = lazy(() =>
  import("../pages/module/adminProfile/EditProfile")
);
const Layout = lazy(() => import("../components/Layouts/Layout"));

// ---------------------------- Promoter Management ----------------------------
const PromoterManagement = lazy(() =>
  import("../pages/module/promotermanagement/PromoterManagement")
);
const PromoterManagementEdit = lazy(() =>
  import("../pages/module/promotermanagement/PromoterManagementEdit")
);
const PromoterManagementAdd = lazy(() =>
  import("../pages/module/promotermanagement/PromoterManagementAdd")
);

// ---------------------------- Order Management ----------------------------

const OrderManagement = lazy(() =>
  import("../pages/module/OrderManagement/OrderManagement")
);

const OrderDetails = lazy(() =>
  import("../pages/module/OrderManagement/OrderDetails")
);

const EditOrderDetails = lazy(() =>
  import("../pages/module/OrderManagement/EditOrderDetails")
);

// ---------------------------- Staff Management ----------------------------
const StaffManagement = lazy(() =>
  import("../pages/module/staffManagement/staffList/StaffListing")
);
const AddStaffForm = lazy(() =>
  import("../pages/module/staffManagement/addStaff/AddStaff")
);
const EditStaff = lazy(() =>
  import("../pages/module/staffManagement/addStaff/EditStaff")
);
const AttendanceListing = lazy(() =>
  import("../pages/module/staffManagement/attendance/AttendanceListing")
);
const StaffSales = lazy(() =>
  import("../pages/module/staffManagement/Sales/SalesListing")
);
const StaffMapPage = lazy(() =>
  import("../pages/module/staffManagement/attendance/StaffMapPage")
);

// --------------------------------------------------------------------------------
import AddProduct from "../pages/module/productManagment/AddProduct";
import ManageShippingCost from "../pages/module/productManagment/ManageShippingCost";
import EditProduct from "../pages/module/productManagment/EditProduct";
import ViewProduct from "../pages/module/productManagment/ViewProduct";
import UserManagement from "../pages/module/userManagement/UserManagementList";
import UserDetails from "../pages/module/userManagement/UserManagementDetails";
import AddShippingCost from "../pages/module/productManagment/AddShippingCost";
import EditShipingCost from "../pages/module/productManagment/EditShipingCost";



// ---------------------------- Blog Management ----------------------------

const BlogManagement = lazy(() =>
  import("../pages/module/blogManagement/blogList/BlogListing")
);
const AddBlog = lazy(() =>
  import("../pages/module/blogManagement/addBlog/AddBlog")
);

const EditBlog = lazy(() =>
  import("../pages/module/blogManagement/addBlog/EditBlog")
);

const ViewBlog = lazy(() =>
  import("../pages/module/blogManagement/addBlog/ViewBlog")
);
// --------------------------------------------------------------------------------

//-------------------------Manage Redeem Request-----------------------------------------
import {
  ManageRedeemRequest,
  ViewRedeemRequest,
} from "../pages/module/ManageRedeemRequest/index";

function PublicRoute() {
  const [activeItem, setActiveItem] = useState("/dashboard");
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex items-center justify-center">
          <LoaderSpinner />
        </div>
      }
    >
      <Routes>
        {/* ---------------------------- Authentication Routes ---------------------------- */}
        <Route path="/" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/password-reset-successfully"
          element={<PasswordResetSuccessfully />}
        />

        {/* ---------------------------- Protected Routes with Layout ---------------------------- */}
        {/* <Route element={<ProtectedRoute />}> */}
        <Route path="/" element={<Layout />}>
          {/* Dashboard */}
          <Route
            path="dashboard"
            element={
              <Dashboard
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              />
            }
          />

          {/* ---------------------------- Admin Profile ---------------------------- */}
          <Route path="adminProfile" element={<AdminProfile />} />
          <Route path="adminProfile/editProfile" element={<EditProfile />} />

          {/* ---------------------------- Promoter Management ---------------------------- */}
          <Route path="promotermanagement" element={<PromoterManagement />} />
          <Route
            path="promotermanagementedit"
            element={<PromoterManagementEdit />}
          />
          <Route
            path="promotermanagementadd"
            element={<PromoterManagementAdd />}
          />

          {/* -------------------------- Order Management -------------------------- */}
          <Route
            path="order-management"
            element={<OrderManagement />}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
          <Route
            path="order-management/order-details"
            element={<OrderDetails />}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
          <Route
            path="order-management/edit-order-details"
            element={<EditOrderDetails />}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
          {/* -------------------------- User Management -------------------------- */}
          <Route path="user-management" element={<UserManagement />} />
          <Route
            path="user-management/user-details"
            element={<UserDetails />}
          />

          {/* -------------------------- Staff Management -------------------------- */}
          <Route path="staff-management" element={<StaffManagement />} activeItem={activeItem}
            setActiveItem={setActiveItem} />
          <Route path="/staff-management/addStaff" element={<AddStaffForm />} activeItem={activeItem}
            setActiveItem={setActiveItem} />
          <Route path="/staff-management/editStaff" element={<EditStaff />} activeItem={activeItem}
            setActiveItem={setActiveItem} />
          <Route path="/staff-management/attendanceListing" element={<AttendanceListing />} activeItem={activeItem}
            setActiveItem={setActiveItem} />
          <Route path="/staff-management/salesListing" element={<StaffSales />} activeItem={activeItem}
            setActiveItem={setActiveItem} />
          <Route path="/staff-management/staff-map/:id" element={<StaffMapPage />} activeItem={activeItem}
            setActiveItem={setActiveItem} />

          {/* -------------------------------------Product Managment ------------------------------------------- */}
          <Route path="product-management" element={<ProductManagment />} />
          <Route path="/product-management/add-product" element={<AddProduct />} />
          <Route path="/product-management/product-edit:id" element={<EditProduct />} />
          <Route path="/product-management/product-view:id" element={<ViewProduct />} />
          <Route path="/product-management/shipping-cost:id" element={<ManageShippingCost />} />
          <Route path="/product-management/shipping-cost/add-shipping-cost:id" element={<AddShippingCost />} />
          <Route path="/product-management/shipping-cost/edit-shipping-cost:id" element={<EditShipingCost />} />

          {/* Blog Management */}
          <Route path="blog-management" element={<BlogManagement />} />
          <Route path="/blog-management/add-blogs" element={<AddBlog />} />
          <Route path="/blog-management/edit-blogs/:id" element={<EditBlog />} />
          <Route path="/blog-management/view-blogs/:id" element={<ViewBlog />} />
          {/* 404 Not Found */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
        {/* </Route> */}
      </Routes>
    </Suspense>
  );
}

export default PublicRoute;
