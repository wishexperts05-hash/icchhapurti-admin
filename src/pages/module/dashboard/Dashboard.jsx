import PagePath2 from "../../../components/uiComponent/PagePath2";
import Teamwork from "../../../assets/Teamwork.png";
import Order from "../../../assets/Order.png";
import Staff from "../../../assets/Staff.png";
import Analytics from "../../../assets/Analytics.png";
import Download from "../../../assets/Download.png";
import TotalUsersChart from "./TotalUsersChart";
import TotalStaffChart from "./TotalStaffChart";
import CityWiseSalesReport from "./CityWiseSalesReport";
import SalesChart from "./SalesChart";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import useDashboardManagement from "../../../hooks/dashboard/useDashboardManagement";
import { dashboardTotalStateAtom } from "../../../state/dashboard/DashboardManagementState";
import LoaderSpinner from "../../../components/uiComponent/LoaderSpinner";

// StatCard Component
const StatCard = ({ title, value, change, icon, bgColor, textColor }) => {
  return (
    <div
      className={`${bgColor} rounded-xl p-4 shadow-md border border-gray-100 
  h-[160px] transition-all duration-200 hover:shadow-lg`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className={`font-medium text-gray-600 text-sm ${textColor} mb-3`}>
            {title}
          </p>

          <p className="text-sm font-semibold text-green-600">{change}</p>
          <p className={`text-3xl font-bold ${textColor} mt-4 truncate`}>
            {value}
          </p>
        </div>
        <div className="flex-shrink-0">
          <img
            src={icon}
            alt={title}
            className="w-12 h-12 sm:w-20 sm:h-20 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const { fetchDashboardTotals, loading } = useDashboardManagement();
  const dashboardTotals = useRecoilValue(dashboardTotalStateAtom);

  useEffect(() => {
    fetchDashboardTotals();
  }, []);

  const formatChange = (percent, trend) =>
    `${trend === "increased" ? "+" : ""}${percent}%`;

  return (
    <div className="min-h-screen bg-gray-50  sm:p-6">
      {/* Header */}
      <div className="">
        <PagePath2 title="Dashboard" />
      </div>

      {loading || !dashboardTotals ? (
        <div className="flex w-full items-center justify-center py-20">
          <LoaderSpinner />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Main Grid: 50-50 Split - Stats + Sales Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* LEFT SECTION - 50% - Stat Cards */}
            <div className="space-y-6">
              {/* 4 Stat Cards in 2-column layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StatCard
                  title="Total User"
                  value={dashboardTotals?.users?.total ?? 0}
                  change={formatChange(
                    dashboardTotals.users.percent,
                    dashboardTotals.users.trend
                  )}
                  icon={Teamwork}
                  bgColor="bg-[#c4ffba]"
                  textColor="text-gray-800"
                />

                <StatCard
                  title="Total Staff"
                  value={dashboardTotals.staff.total}
                  change={formatChange(
                    dashboardTotals.staff.percent,
                    dashboardTotals.staff.trend
                  )}
                  icon={Staff}
                  bgColor="bg-[#bdccf1]"
                  textColor="text-gray-800"
                />

                <StatCard
                  title="Total Sales"
                  value={`₹ ${dashboardTotals.sales.total.toLocaleString()}`}
                  change={formatChange(
                    dashboardTotals.sales.percent,
                    dashboardTotals.sales.trend
                  )}
                  icon={Analytics}
                  bgColor="bg-[#f1bdbd]"
                  textColor="text-gray-800"
                />

                <StatCard
                  title="Total Orders"
                  value={dashboardTotals.orders.total}
                  change={formatChange(
                    dashboardTotals.orders.percent,
                    dashboardTotals.orders.trend
                  )}
                  icon={Order}
                  bgColor="bg-[#a8deed]"
                  textColor="text-gray-800"
                />
              </div>

              {/* Full Width Stat Card - App Installed */}
              <StatCard
                title="Total App Installed"
                value={dashboardTotals.appInstalls.total}
                change={formatChange(
                  dashboardTotals.appInstalls.percent,
                  dashboardTotals.appInstalls.trend
                )}
                icon={Download}
                bgColor="bg-[#f1bdea]"
                textColor="text-gray-800"
              />
            </div>

            {/* RIGHT SECTION - 50% - Sales Chart */}
            <div className="h-full">
              <SalesChart />
            </div>
          </div>

          {/* Other charts below */}
          <div className="space-y-6">
            <CityWiseSalesReport />
            <TotalUsersChart />
            <TotalStaffChart />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
