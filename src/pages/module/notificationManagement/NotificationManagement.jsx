import React, { useState, useEffect } from "react";
import { Calendar, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import useNotificationManagement from "../../../hooks/notificationManagement/useNotificationManagement";

function NotificationManagement() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const {
    loading,
    notificationList,
    fetchNotificationList,
    resetNotificationList,
  } = useNotificationManagement();

  // Fetch notifications on component mount
  useEffect(() => {
    fetchNotificationList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      resetNotificationList();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateNotification = () => {
    navigate("/notification-management/send-notification");
  };

  // Format date helper - API returns date as string "25/11/2025"
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    // If already in DD/MM/YYYY format, return as is
    if (typeof dateString === 'string' && dateString.includes('/')) {
      return dateString;
    }
    // Otherwise try to format
    try {
      return new Date(dateString).toLocaleDateString("en-GB");
    } catch {
      return "N/A";
    }
  };

  // Get color scheme based on index
  const getColorScheme = (index) => {
    const colors = [
      {
        bgColor: "bg-green-50",
        iconBg: "bg-green-500",
        borderColor: "border-l-green-500",
      },
      {
        bgColor: "bg-blue-50",
        iconBg: "bg-blue-500",
        borderColor: "border-l-blue-500",
      },
      {
        bgColor: "bg-red-50",
        iconBg: "bg-red-500",
        borderColor: "border-l-red-500",
      },
      {
        bgColor: "bg-purple-50",
        iconBg: "bg-purple-500",
        borderColor: "border-l-purple-500",
      },
      {
        bgColor: "bg-yellow-50",
        iconBg: "bg-yellow-500",
        borderColor: "border-l-yellow-500",
      },
      {
        bgColor: "bg-indigo-50",
        iconBg: "bg-indigo-500",
        borderColor: "border-l-indigo-500",
      },
      {
        bgColor: "bg-pink-50",
        iconBg: "bg-pink-500",
        borderColor: "border-l-pink-500",
      },
      {
        bgColor: "bg-teal-50",
        iconBg: "bg-teal-500",
        borderColor: "border-l-teal-500",
      },
    ];
    return colors[index % colors.length];
  };

  // Extract notifications from API response
  const notifications = notificationList?.data || [];
  
  // Get pagination info
  const pagination = notificationList?.pagination || {
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
  };

  // Filter notifications based on search
  const filteredNotifications = notifications.filter(
    (notification) =>
      notification?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification?.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification?.targetAudience?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification?.targetCountry?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#F9F9F9] min-h-screen">
      <BreadCrumb linkText={[{ text: "Notification Management" }]} />

      <PagePath2
        title="Notification Management"
        showSearch
        showAddButton
        placeholder="Search by Title, Message or Audience"
        searchTerm={searchTerm}
        handleSearchTerm={(e) => setSearchTerm(e.target.value)}
        addButtonText="Create New Notification"
        onClick={handleCreateNotification}
      />

      <div className="px-6 pb-6">
        <div className="bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B00]"></div>
            </div>
          ) : (
            <>
              <div className="p-6 space-y-3">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification, index) => {
                    const colorScheme = getColorScheme(index);
                    return (
                      <div
                        key={notification._id || index}
                        className={`${colorScheme.bgColor} ${colorScheme.borderColor} border-l-4 rounded-lg p-5 transition-all hover:shadow-md cursor-pointer`}
                        onClick={() =>
                          navigate(
                            `/notification-management/view/${notification._id}`
                          )
                        }
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`${colorScheme.iconBg} w-10 h-10 rounded-full flex items-center justify-center text-white text-lg shadow-sm flex-shrink-0`}
                          >
                            🔔
                          </div>
                          <div className="flex-1">
                            <h3 className="text-base font-semibold text-gray-800 mb-1">
                              {notification?.title || "No Title"}
                            </h3>
                            <p className="text-gray-600 text-sm mb-2">
                              {notification?.message || "No Message"}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <div className="flex items-center gap-1.5">
                                <Users className="w-3.5 h-3.5" />
                                <span>
                                  Target Audience:{" "}
                                  {notification?.targetAudience || "All"}
                                </span>
                              </div>
                              {notification?.targetCountry &&
                                notification?.targetCountry !== "all" && (
                                  <div className="flex items-center gap-1.5">
                                    <span>
                                      Country: {notification?.targetCountry}
                                    </span>
                                  </div>
                                )}
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>
                                  {formatDate(notification?.createdAt)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-3xl">🔍</span>
                    </div>
                    <p className="text-gray-500 font-medium">
                      No notifications found
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      {searchTerm
                        ? "Try adjusting your search"
                        : "Create your first notification to get started"}
                    </p>
                    {!searchTerm && (
                      <button
                        onClick={handleCreateNotification}
                        className="mt-4 px-6 py-2 bg-[#FF6B00] text-white rounded-lg hover:bg-[#e55d00] transition-colors"
                      >
                        Create Notification
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Footer with pagination info */}
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing{" "}
                  <span className="text-[#FF6B00] font-semibold">
                    {filteredNotifications.length}
                  </span>{" "}
                  of{" "}
                  <span className="text-[#FF6B00] font-semibold">
                    {pagination.totalRecords || notifications.length}
                  </span>{" "}
                  Notifications
                </p>
                {searchTerm && filteredNotifications.length < notifications.length && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="text-sm text-[#FF6B00] hover:underline font-medium"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationManagement;