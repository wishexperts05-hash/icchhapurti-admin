import { lazy, Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../routes/ProtectedRoute";
import ProductManagment from "../pages/module/productManagment/ProductManagment";

// ---------------------------- Lazy Imports ----------------------------
const Login = lazy(() => import("../pages/auth/Login"));
const VerifyOTP = lazy(() => import("../pages/auth/VerifyOTP"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/auth/ResetPassword"));
const PasswordResetSuccessfully = lazy(() =>
  import("../pages/auth/PasswordResetSuccefully")
);

const Dashboard = lazy(() => import("../pages/module/Dashboard/Dashboard"));
// const Alerts = lazy(() => import("../pages/module/Dashboard/Alerts"));

const AdminProfile = lazy(() =>
  import("../pages/module/adminProfile/AdminProfile")
);
const EditProfile = lazy(() =>
  import("../pages/module/adminProfile/EditProfile")
);
// const NotFound = lazy(() => import("../pages/module/offers&Discount/NotFound"));
const Layout = lazy(() => import("../components/Layouts/Layout"));

import LoaderSpinner from "../components/uiComponent/LoaderSpinner";

// --------------------------Order Management-------------------------------------

import {
  OrderManagement,
  OrderDetails,
} from "../pages/module/OrderManagement/index";
import AddProduct from "../pages/module/productManagment/AddProduct";
import ManageShippingCost from "../pages/module/productManagment/ManageShippingCost";
import EditProduct from "../pages/module/productManagment/EditProduct";
import ViewProduct from "../pages/module/productManagment/ViewProduct";
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
        {/* Authentication Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/password-reset-successfully"
          element={<PasswordResetSuccessfully />}
        />

        {/* Protected Routes with Layout */}
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
          {/* Admin Profile */}
          <Route path="adminProfile" element={<AdminProfile />} />
          <Route path="adminProfile/editProfile" element={<EditProfile />} />

          {/* --------------------------Order Management------------------------------------- */}
          <Route path="order-management" element={<OrderManagement />} />
          <Route
            path="order-management/order-details"
            element={<OrderDetails />}
          />

          {/* -------------------------------------Product Managment ------------------------------------------- */}
           <Route path="product-management" element={<ProductManagment/>} />
           <Route path="/product-management/add-product" element={<AddProduct />} />
           <Route path="/product-management/product-edit" element={<EditProduct />} />
           <Route path="/product-management/product-view" element={<ViewProduct />} />
           <Route path="/product-management/shipping-cost" element={<ManageShippingCost />} />




          {/* 404 Not Found */}
          {/* <Route path="*" element={<NotFound />} /> */}


        </Route>
        {/* </Route> */}
        
      </Routes>
    </Suspense>
  );
}

export default PublicRoute;
