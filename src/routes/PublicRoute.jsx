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

const Dashboard = lazy(() => import("../pages/module/dashboard/Dashboard"));
const AdminProfile = lazy(
  () => import("../pages/module/adminProfile/AdminProfile")
);
const EditProfile = lazy(
  () => import("../pages/module/adminProfile/EditProfile")
);
const Layout = lazy(() => import("../components/Layouts/Layout"));

// ---------------------------- User Management ----------------------------
const UserManagement = lazy(
  () => import("../pages/module/userManagement/UserManagementList")
);
const UserDetails = lazy(
  () => import("../pages/module/userManagement/UserManagementDetails")
);

// ---------------------------- Promoter Management ----------------------------
const PromoterManagement = lazy(
  () => import("../pages/module/promotermanagement/PromoterManagement")
);
const PromoterManagementEdit = lazy(
  () => import("../pages/module/promotermanagement/PromoterManagementEdit")
);
const PromoterManagementAdd = lazy(
  () => import("../pages/module/promotermanagement/PromoterManagementAdd")
);
const PromoterDetails = lazy(
  () => import("../pages/module/promotermanagement/PromotorDetails")
);

// ---------------------------- Order Management ----------------------------


const OrderManagement = lazy(
  () => import("../pages/module/OrderManagement/OrderManagement")
);

const OrderDetails = lazy(
  () => import("../pages/module/OrderManagement/OrderDetails")
);

const EditOrderDetails = lazy(
  () => import("../pages/module/OrderManagement/EditOrderDetails")
);
// ---------------------------- Report and Analytics ----------------------------
const Reports = lazy(() => import("../pages/module/report&Analytics/reports/Reports"));
const StaffPerformance = lazy(() => import("../pages/module/report&Analytics/staffPerformance/StaffPerformance"));
const LuckyDrawAnalysis = lazy(()=>import("../pages/module/report&Analytics/luckyDrawAnalysis/LuckyDrawAnalysis"))

// ---------------------------- Staff Management ----------------------------
const StaffManagement = lazy(
  () => import("../pages/module/staffManagement/staffList/StaffListing")
);
const AddStaffForm = lazy(
  () => import("../pages/module/staffManagement/addStaff/AddStaff")
);
const EditStaff = lazy(
  () => import("../pages/module/staffManagement/addStaff/EditStaff")
);
const AttendanceListing = lazy(
  () => import("../pages/module/staffManagement/attendance/AttendanceListing")
);
const StaffSales = lazy(
  () => import("../pages/module/staffManagement/Sales/SalesListing")
);
const StaffMapPage = lazy(
  () => import("../pages/module/staffManagement/attendance/StaffMapPage")
);
const ViewStaff = lazy(
  () => import("../pages/module/staffManagement/addStaff/ViewStaff")
);

// ---------------------------- Product Management (Non-lazy) ----------------------------
import AddProduct from "../pages/module/productManagment/AddProduct";
import ManageShippingCost from "../pages/module/productManagment/ManageShippingCost";
import EditProduct from "../pages/module/productManagment/EditProduct";
import ViewProduct from "../pages/module/productManagment/ViewProduct";
import AddShippingCost from "../pages/module/productManagment/AddShippingCost";
import EditShipingCost from "../pages/module/productManagment/EditShipingCost";

const OfferManagementAdd = lazy(
  () => import("../pages/module/offerManagement/OfferManagementAdd")
);
const OfferManagementEdit = lazy(
  () => import("../pages/module/offerManagement/OfferManagementEdit")
);
const OfferManagementList = lazy(
  () => import("../pages/module/offerManagement/OfferManagementList")
);
const OfferManagementView = lazy(
  () => import("../pages/module/offerManagement/OfferManagementView")
);

// ---------------------------- Blog Management ----------------------------

const BlogManagement = lazy(
  () => import("../pages/module/blogManagement/blogList/BlogListing")
);
const AddBlog = lazy(
  () => import("../pages/module/blogManagement/addBlog/AddBlog")
);
const EditBlog = lazy(() =>
  import("../pages/module/blogManagement/addBlog/EditBlog")
);
const ViewBlog = lazy(() =>
  import("../pages/module/blogManagement/addBlog/ViewBlog")
);

// ---------------------------- App Management ----------------------------
const TermsAndConditions = lazy(() =>
  import("../pages/module/appManagement/term&condition/Term&Condition")

);
const CreateTermsAndConditions = lazy(
  () =>
    import("../pages/module/appManagement/term&Condition/CreateTerms&Conditions")
);
const ViewTermsAndConditions = lazy(
  () => import("../pages/module/appManagement/term&Condition/ViewTerms&Conditions")
);
import EditTermsAndConditions from "../pages/module/appManagement/term&condition/EditTerm&Condition";

const PrivacyPolicy = lazy(
  () => import("../pages/module/appManagement/privicy&Policy/Privacy&Policy")
);
const CreatePrivacyPolicy = lazy(
  () => import("../pages/module/appManagement/privicy&Policy/CreatePrivacy&Policy")
);
const ViewPrivacyPolicy = lazy(
  () => import("../pages/module/appManagement/privicy&Policy/ViewPrivacy&Policy")
);
const OtherSettings = lazy(
  () => import("../pages/module/appManagement/otherSettings/OtherSettings")
);
// ---------------------------- Banner Management ----------------------------
const Banner = lazy(
  () => import("../pages/module/appManagement/manageBanner/Banner")
);
const BannerDetails = lazy(
  () => import("../pages/module/appManagement/manageBanner/BannerDetails")
);
const CreateBanner = lazy(
  () => import("../pages/module/appManagement/manageBanner/CreateBanner")
);
const UpdateBanner = lazy(
  () => import("../pages/module/appManagement/manageBanner/CreateBanner")
);
const EditBanner = lazy(
  () => import("../pages/module/appManagement/manageBanner/CreateBanner")
);

// ---------------------------- Help & Support Number ----------------------------

const HelpSupport = lazy(
  () => import("../pages/module/appManagement/help&Support/Help&Support")
);
//-------------------------Manage Redeem Request-----------------------------------------
import {
  ManageRedeemRequest,
  ViewRedeemRequest,
} from "../pages/module/ManageRedeemRequest/index";
// import EditTermsAndConditions from "../pages/module/appManagement/term&condition/EditTerm&Condition";
// import { countryManagementIcon } from "../assets/sidebaricon/sidebaricon";





//------------------------------- Country Management ---------------------------------------------
const CountryManagementList = lazy(
  () => import("../pages/module/countryManagement/CountryManagementList")
);
const CountryManagementAdd = lazy(
  () => import("../pages/module/countryManagement/CountryManagementAdd")
);
const CountryManagementEdit = lazy(
  () => import("../pages/module/countryManagement/CountryManagementEdit")
);

// ---------------------------- Reward Management ----------------------------
const LuckyDrawManagementList = lazy(() =>
  import("../pages/module/rewardManagement/luckyDrawManagement/LuckyDrawManagementList")
);
const LuckyDrawManagementAdd = lazy(() =>
  import("../pages/module/rewardManagement/luckyDrawManagement/LuckyDrawManagementAdd")
);
const LuckyDrawManagementView = lazy(() =>
  import("../pages/module/rewardManagement/luckyDrawManagement/LuckyDrawManagementView")
);
const LuckyDrawManagementEdit = lazy(() =>
  import("../pages/module/rewardManagement/luckyDrawManagement/LuckyDrawManagementEdit")
);

const LuckyDrawManagementSelectWinner = lazy(() =>
  import("../pages/module/rewardManagement/luckyDrawManagement/LuckyDrawManagementSelectWinner")
);
const AddWinner = lazy(() =>
  import("../pages/module/rewardManagement/luckyDrawManagement/AddWinner")
);
const SpinRewardManagementList = lazy(() =>
  import("../pages/module/rewardManagement/spinRewardManagement/SpinRewardManagementList")
);
const AddSpinReward = lazy(() =>
  import("../pages/module/rewardManagement/spinRewardManagement/AddSpinReward")
);
const EditSpinReward = lazy(() =>
  import("../pages/module/rewardManagement/spinRewardManagement/EditSpinReward")
);
const SetSpinPrice = lazy(() =>
  import("../pages/module/rewardManagement/spinRewardManagement/SetSpinPrice")
);

// ---------------------------- Chat Support System ----------------------------

const ChatSupportSystem = lazy(
  () => import("../pages/module/chatSupportSystem/ChatSupportSystem")
);
const ChatBox = lazy(() =>
  import("../pages/module/chatSupportSystem/ChatBox")
);



// ---------------------------- Monetary Settings ----------------------------
const CommissionSetting = lazy(
  () => import("../pages/module/monetarySettings/commissionSettings/CommissionSetting")
);
const CoinSettings = lazy(
  () => import("../pages/module/monetarySettings/coinSettings/CoinSettings")
);
const WithDrawSettings = lazy(
  () => import("../pages/module/monetarySettings/withdrawSettings/WithDrawSettings")
);

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
          <Route path="promoter-management" element={<PromoterManagement />} />
          <Route
            path="/promoter-management/promoter-managementedit"
            element={<PromoterManagementEdit />}
          />
          <Route
            path="/promoter-management/promoter-managementadd"
            element={<PromoterManagementAdd />}
          />
          <Route
            path="/promoter-management/promoter-details"
            element={<PromoterDetails />}
          />

          {/* -------------------------- Order Management -------------------------- */}
          <Route
            path="order-management"
            element={
              <OrderManagement
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              />
            }
          />
          <Route
            path="order-management/order-details"
            element={
              <OrderDetails
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              />
            }
          />
          <Route
            path="order-management/edit-order-details"
            element={
              <EditOrderDetails
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              />
            }
          />

          {/* -------------------------- User Management -------------------------- */}
          <Route path="user-management" element={<UserManagement />} />
          <Route
            path="user-management/user-details/:id"
            element={<UserDetails />}
          />

          {/* -------------------------- Staff Management -------------------------- */}
          <Route
            path="staff-management"
            element={
              <StaffManagement
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              />
            }
          />
          <Route
            path="/staff-management/addStaff"
            element={
              <AddStaffForm
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              />
            }
          />
          <Route
            path="/staff-management/staff-details/:id"
            element={<ViewStaff />}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
          <Route
            path="/staff-management/editStaff/:id"
            element={<EditStaff />}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
          <Route
            path="/staff-management/attendanceListing"
            element={
              <AttendanceListing
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              />
            }
          />
          <Route
            path="/staff-management/salesListing"
            element={
              <StaffSales
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              />
            }
          />
          <Route
            path="/staff-management/staff-map/:id"
            element={
              <StaffMapPage
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              />
            }
          />

          {/* -------------------------- Product Management -------------------------- */}
          <Route path="product-management" element={<ProductManagment />} />
          <Route
            path="/product-management/add-product"
            element={<AddProduct />}
          />
          <Route
            path="/product-management/product-edit/:id"
            element={<EditProduct />}
          />
          <Route
            path="/product-management/product-view/:id"
            element={<ViewProduct />}
          />
          <Route
            path="/product-management/shipping-cost/"
            element={<ManageShippingCost />}
          />
          <Route
            path="/product-management/shipping-cost/add-shipping-cost"
            element={<AddShippingCost />}
          />
          <Route
            path="/product-management/shipping-cost/edit-shipping-cost/:id"
            element={<EditShipingCost />}
          />

          {/* -------------------------- Offer Management -------------------------- */}
          <Route path="offer-management" element={<OfferManagementList />} />
          <Route
            path="offer-management/add-offer"
            element={<OfferManagementAdd />}
          />
          <Route
            path="offer-management/edit-offer"
            element={<OfferManagementEdit />}
          />
          <Route
            path="offer-management/offer-details"
            element={<OfferManagementView />}
          />

          {/* -------------------------- Blog Management -------------------------- */}
          <Route path="blog-management" element={<BlogManagement />} />
          <Route path="/blog-management/add-blogs" element={<AddBlog />} />
          <Route
            path="/blog-management/edit-blogs/:id"
            element={<EditBlog />}
          />
          <Route
            path="/blog-management/view-blogs/:id"
            element={<ViewBlog />}
          />

          {/* App Management */}
          <Route path="/app-management" element={<TermsAndConditions />} />  
          <Route
            path="/app-management/terms-and-conditions"
            element={<TermsAndConditions />}  
          />
           <Route
            path="/app-management/create-terms-and-conditions"
            element={<CreateTermsAndConditions />}  
          />  
          <Route
          path="/app-management/edit-terms-and-conditions/:id"
            element={<CreateTermsAndConditions />}
          /> 
          <Route
            path="/app-management/terms-and-conditions/view"
            element={<ViewTermsAndConditions />}
          />
          <Route
            path="/app-management/privacy-policy"
            element={<PrivacyPolicy />} 
          />
          <Route
            path="/app-management/create-privacy-policy"
            element={<CreatePrivacyPolicy />}
          />
          <Route
            path="/app-management/edit-privacy-policy/:id"  
            element={<CreatePrivacyPolicy />}
          />
          <Route
            path="/app-management/privacy-policy/view/"
            element={<ViewPrivacyPolicy />}
          />
         
          <Route path="/app-management/manage-banner" element={<Banner />} />
          <Route
            path="/app-management/manage-banner/banner-details/:id"   
            element={<BannerDetails />}
          />
          <Route
            path="/app-management/manage-banner/create-banner"
            element={<CreateBanner />}
          />
       <Route
            path="/app-management/manage-banner/edit-banner/:id"
            element={<EditBanner />}
          />
          <Route
            path="/app-management/manage-banner/update-banner/:id"
            element={<UpdateBanner />}
          />
          <Route
           path="/app-management/help-and-support"
            element={<HelpSupport />} 
            />
            <Route
            path="/app-management/other-settings"
            element={<OtherSettings />} 
          />

          {/* -------------------------- Country Management -------------------------- */}
          <Route
            path="country-management"
            element={<CountryManagementList />}
          />
          <Route
            path="country-management/add-country"
            element={<CountryManagementAdd />}
          />
          <Route
            path="country-management/edit-country/:id"
            element={<CountryManagementAdd />}
          />

          {/* -------------------------- Reward Management -------------------------- */}
          <Route
            path="lucky-draw-management"
            element={<LuckyDrawManagementList />}
          />
          <Route
            path="lucky-draw-management/view-lucky-draw"
            element={<LuckyDrawManagementView />}
          />
          <Route
            path="lucky-draw-management/add-lucky-draw"
            element={<LuckyDrawManagementAdd />}
          />
          <Route
            path="lucky-draw-management/edit-lucky-draw"
            element={<LuckyDrawManagementEdit />}
          />
          
          <Route
            path="lucky-draw-management/select-winner"
            element={<LuckyDrawManagementSelectWinner />}
          />
          <Route
            path="lucky-draw-management/add-winner"
            element={<AddWinner />}
          />
          <Route
            path="spin-reward-management"
            element={<SpinRewardManagementList />}
          />
          <Route
            path="spin-reward-management/add-spin-reward"
            element={<AddSpinReward />}
          />
          <Route
            path="spin-reward-management/edit-spin-reward"
            element={<EditSpinReward />}
          />
          <Route
            path="spin-reward-management/set-spin-price"
            element={<SetSpinPrice />}
          />

          {/* -------------------------- Manage Redeem Request -------------------------- */}
          <Route
            path="manage-redeem-request"
            element={<ManageRedeemRequest />}
          />
          <Route
            path="manage-redeem-request/view-redeem-request/:id"
            element={<ViewRedeemRequest />}
          />

          {/* -------------------------- Chat Support System -------------------------- */}
          <Route path="chat-support-system" element={<ChatSupportSystem />} />
          <Route path="chat-support-system/chatbox/:conversationId" element={<ChatBox />} />


          {/* -------------------------------------Monetary Setting ------------------------------------------- */}
          <Route path="/commission-settings" element={<CommissionSetting />} />
          <Route path="/coin-settings" element={<CoinSettings />} />
          <Route path="/withdraw-settings" element={<WithDrawSettings />} />

           {/* -------------------------------------Reports & Analytics------------------------------------------- */} 

           <Route path="/reports" element={<Reports />} />
           <Route path="/staff-performance" element={<StaffPerformance />} />

           <Route path="/lucky-draw-analysis" element={<LuckyDrawAnalysis />} />





          {/* 404 Not Found */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
        {/* </Route> */}
      </Routes>
    </Suspense>
  );
}

export default PublicRoute;