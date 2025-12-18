import { useState } from "react";
import { Bell, ChevronRight } from "lucide-react";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";

export default function GetNotification() {
  const [activeTab, setActiveTab] = useState("all");

  const notifications = [
    {
      id: 1,
      message: "Hostel booking #HSTB96902551 approved of XYZ service",
      time: "27 minutes ago",
      badge: "Booking Approved",
      badgeColor: "bg-blue-100 text-blue-700",
      isRead: false,
    },
    {
      id: 2,
      message:
        "Guest Akash created hostel booking #HSTB96902551 for XYZ service",
      time: "27 minutes ago",
      badge: "New Hostel Booking",
      badgeColor: "bg-green-100 text-green-700",
      isRead: false,
    },
    {
      id: 3,
      message: "New hostel booking #HSTB96902551 received for XYZ service",
      time: "27 minutes ago",
      badge: "New Hostel Booking",
      badgeColor: "bg-green-100 text-green-700",
      isRead: false,
    },
    {
      id: 4,
      message:
        "Guest Aniket created hostel booking #HSTB96292389 for Priyadarshini Hostel",
      time: "1 hours ago",
      badge: "New Hostel Booking",
      badgeColor: "bg-green-100 text-green-700",
      isRead: false,
    },
    {
      id: 5,
      message:
        "New hostel booking #HSTB96292389 received for Priyadarshini Hostel",
      time: "1 hours ago",
      badge: "New Hostel Booking",
      badgeColor: "bg-green-100 text-green-700",
      isRead: false,
    },
    {
      id: 6,
      message: "Guest created tiffin booking #TFNB13508023 for Ghar per",
      time: "1 hours ago",
      badge: "New Tiffin Booking",
      badgeColor: "bg-green-100 text-green-700",
      isRead: false,
    },
    {
      id: 7,
      message: "New tiffin booking #TFNB13508023 received for Ghar per",
      time: "1 hours ago",
      badge: "New Tiffin Booking",
      badgeColor: "bg-green-100 text-green-700",
      isRead: false,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const displayNotifications =
    activeTab === "unread"
      ? notifications.filter((n) => !n.isRead)
      : notifications;

  return (
    <div className="min-h-screen bg-gray-50 rounded-xl">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 rounded-xl px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side: Icon + Text */}
          <div className="flex items-center gap-2">
            <Bell className="w-6 h-6 text-[#facd34]" />
            <h1 className="font-medium text-xl">Notifications</h1>
          </div>

          {/* Right side: Total Count */}
          <span className="text-sm font-medium text-gray-500">
            {notifications.length} total
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6 rounded-xl">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab("all")}
            className={`py-4 px-2 font-medium text-sm relative ${
              activeTab === "all"
                ? "text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            All
            {activeTab === "all" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("unread")}
            className={`py-4 px-2 font-medium text-sm flex items-center gap-2 relative ${
              activeTab === "unread"
                ? "text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Unread
            <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">
              {unreadCount}
            </span>
            {activeTab === "unread" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
            )}
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white border-b border-gray-200 px-6 rounded-xl mt-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {displayNotifications.map((notification, index) => (
            <div
              key={notification.id}
              className={`flex items-center justify-between p-4 hover:bg-[#f6f6f1] cursor-pointer transition-colors ${
                index !== displayNotifications.length - 1
                  ? "border-b border-gray-100"
                  : ""
              } ${notification.isRead ? "bg-white" : "bg-white"}`}
            >
              <div className="flex items-start gap-4 flex-1">
                {/* Blue dot indicator for unread */}
                <div className="flex-shrink-0 mt-1">
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${
                      notification.isRead ? "bg-transparent" : "bg-blue-600"
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 font-medium mb-1">
                    {notification.message}
                  </p>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-gray-500">{notification.time}</span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${notification.badgeColor}`}
                    >
                      {notification.badge}
                    </span>
                  </div>
                </div>
              </div>

              {/* Arrow icon */}
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
