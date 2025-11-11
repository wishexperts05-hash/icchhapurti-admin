import { lazy, Suspense, useState } from "react";
// 1. Import useNavigate
import { Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "../routes/ProtectedRoute";
import LoaderSpinner from "../components/uiComponent/LoaderSpinner";

// ---------------------------- Lazy Imports ----------------------------
const Login = lazy(() => import("../pages/auth/Login"));
const VerifyOTP = lazy(() => import("../pages/auth/VerifyOTP"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/auth/ResetPassword"));
const PasswordResetSuccessfully = lazy(() =>
  import("../pages/auth/PasswordResetSuccefully")
);

const Dashboard = lazy(() => import("../pages/module/Dashboard/Dashboard"));

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

function PublicRoute() {
  const [activeItem, setActiveItem] = useState("/dashboard");
  const navigate = useNavigate(); // 2. Initialize navigate

  // 3. Create a function to handle navigation back to the list
  const handleNavigateBack = () => {
    navigate("/promotermanagement");
  };

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
          {/* ---------------------------- Dashboard ---------------------------- */}
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
          <Route
            path="promotermanagement"
            element={<PromoterManagement />}
          />
          <Route
            path="promotermanagementedit"
            // 4. Pass the navigation function as props
            element={
              <PromoterManagementEdit
                onCancel={handleNavigateBack}
                onSave={handleNavigateBack}
              />
            }
          />
          <Route
            path="promotermanagementadd"
            // 5. Pass the navigation function as props
            element={
              <PromoterManagementAdd
                onCancel={handleNavigateBack}
                onAdd={handleNavigateBack}
              />
            }
          />
        </Route>
        {/* </Route> */}
      </Routes>
    </Suspense>
  );
}

export default PublicRoute;