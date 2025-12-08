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

// StatCard Component
const StatCard = ({ title, value, change, icon, bgColor, textColor }) => {
  return (
    <div className={`${bgColor} rounded-xl p-6 shadow-md`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p
            className={`font-medium text-gray-500 text-sm ${textColor} mb-2`}
          >
            {title}
          </p>
          <p className={`text-2xl font-bold ${textColor} mb-2`}>{value}</p>
          <p className="text-xs font-medium text-green-600">{change}</p>
        </div>
        <div>
          <img src={icon} alt="icon" className="w-20 h-20 object-contain" />
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <PagePath2 title="Dashboard" />
      </div>

      <div className="space-y-6">
        {/* Main Grid: Left Stats + Right Sales Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT SECTION (2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            {/* 4 Stat Cards in 2-column layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <StatCard
                title="Total User"
                value="300K"
                change="+5% This Month"
                icon={Teamwork}
                bgColor="bg-[#c4ffba]"
                textColor="text-gray-800"
              />
              <StatCard
                title="Total Staff"
                value="50K"
                change="+5% This Month"
                icon={Staff}
                bgColor="bg-[#bdccf1]"
                textColor="text-gray-800"
              />
              <StatCard
                title="Total Sales"
                value="₹ 250K"
                change="+5% This Month"
                icon={Analytics}
                bgColor="bg-[#f1bdbd]"
                textColor="text-gray-800"
              />
              <StatCard
                title="Total Orders"
                value="2.5K"
                change="+5% This Month"
                icon={Order}
                bgColor="bg-[#a8deed]"
                textColor="text-gray-800"
              />
            </div>

            {/* Full Width Stat Card - App Installed */}
            <StatCard
              title="Total App Installed"
              value="350K"
              change="+5% This Month"
              icon={Download}
              bgColor="bg-[#f1bdea]"
              textColor="text-gray-800"
            />
          </div>

          {/* RIGHT SECTION - Sales Chart */}
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
    </div>
  );
};

export default Dashboard;
