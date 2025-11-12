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
import {
  OrderManagement,
  OrderDetails,
} from "../pages/module/OrderManagement/index";


// ---------------------------- Staff Management ----------------------------
import StaffManagement from "../pages/module/staffManagement/staffList/StaffListing";
import AddStaffForm from "../pages/module/staffManagement/addStaff/AddStaff";
import AttendanceListing from "../pages/module/staffManagement/attendance/AttendanceListing";
import StaffSales from "../pages/module/staffManagement/Sales/SalesListing";
// --------------------------------------------------------------------------------
import AddProduct from "../pages/module/productManagment/AddProduct";
import ManageShippingCost from "../pages/module/productManagment/ManageShippingCost";
import EditProduct from "../pages/module/productManagment/EditProduct";
import ViewProduct from "../pages/module/productManagment/ViewProduct";
<<<<<<< HEAD
import StaffManagement from "../pages/module/staffManagement/staffList/staffListing";
import AddStaffForm from "../pages/module/staffManagement/addStaff/AddStaff";
import AddShippingCost from "../pages/module/productManagment/AddShippingCost";
import EditShipingCost from "../pages/module/productManagment/EditShipingCost"
=======
import UserManagement from "../pages/module/userManagement/UserManagementList";
import UserDetails from "../pages/module/userManagement/UserManagementDetails";
>>>>>>> 9255da6aaf5bc30a07fb72f3486326e367196c37
// --------------------------------------------------------------------------------

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
        {/* Uncomment ProtectedRoute when ready */}
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
            element={
              <PromoterManagementEdit
              />
            }
          />
          <Route
            path="promotermanagementadd"
            element={
              <PromoterManagementAdd
              />
            }
          />

          {/* -------------------------- Order Management -------------------------- */}
          <Route path="order-management" element={<OrderManagement />} />
          <Route
            path="order-management/order-details"
            element={<OrderDetails />}
          />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="user-management/user-details" element={<UserDetails />} />

          {/* -------------------------- Staff Management -------------------------- */}
          <Route path="staff-Management" element={<StaffManagement />} />
          <Route path="addStaff" element={<AddStaffForm />} />
          <Route path="attendanceListing" element={<AttendanceListing />} />
          <Route path="salesListing" element={<StaffSales />} />
          {/* -------------------------------------Product Managment ------------------------------------------- */}
<<<<<<< HEAD
           <Route path="product-management" element={<ProductManagment/>} />
           <Route path="/product-management/add-product" element={<AddProduct />} />
           <Route path="/product-management/product-edit" element={<EditProduct />} />
           <Route path="/product-management/product-view" element={<ViewProduct />} />
           <Route path="/product-management/shipping-cost" element={<ManageShippingCost />} />
            <Route path="/product-management/shipping-cost/add-shipping-cost" element={<AddShippingCost />} />
            <Route path="/product-management/shipping-cost/edit-shipping-cost" element={<EditShipingCost />} />
=======
          <Route path="product-management" element={<ProductManagment />} />
          <Route path="/product-management/add-product" element={<AddProduct />} />
          <Route path="/product-management/product-edit" element={<EditProduct />} />
          <Route path="/product-management/product-view" element={<ViewProduct />} />
          <Route path="/product-management/shipping-cost" element={<ManageShippingCost />} />



>>>>>>> 9255da6aaf5bc30a07fb72f3486326e367196c37

          {/* 404 Not Found */}
          {/* <Route path="*" element={<NotFound />} /> */}



        </Route>
        {/* </Route> */}

      </Routes>
    </Suspense>
  );
}

export default PublicRoute;