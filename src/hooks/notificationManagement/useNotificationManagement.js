import { useRecoilState } from "recoil";
import { notificationListAtom } from "../../state/notificationManagement/NotificationManagementState";
import { useState } from "react";
import useFetch from "../useFetch";
import conf from "../../config";
import { toast } from "react-toastify";

const useNotificationManagement = () => {
  const [notificationList, setNotificationList] = useRecoilState(notificationListAtom);
  const [notificationDetail, setNotificationDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchData] = useFetch();

  // Fetch All Notifications - GET /api/admin/notifications/all
  const fetchNotificationList = async () => {
    setLoading(true);
    try {
      const url = `${conf.apiBaseUrl}admin/notifications/all`;

      const res = await fetchData({
        method: "GET",
        url,
      });

      if (res) {
        setNotificationList(res);
      }
    } catch (error) {
      console.error("Error fetching notification list:", error);
    } finally {
      setLoading(false);
    }
  };

  // Reset Notification List
  const resetNotificationList = () => {
    setNotificationList({
      data: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalRecords: 0,
        limit: 10,
        hasNextPage: false,
        hasPrevPage: false,
      },
    });
  };

  // Create/Send Notification - POST /api/admin/notifications/add
  const sendNotification = async (formdata) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}admin/notifications/add`,
        data: formdata,
      });

      if (res) {
        toast.success(res?.message || "Notification created successfully");
        return res;
      }
    } catch (error) {
      console.error("Error sending notification:", error);
      toast.error(error?.response?.data?.message || "Failed to send notification");
    } finally {
      setLoading(false);
    }
  };

  // Fetch Notification by ID - GET /api/admin/notifications/getbyid/:id
  const fetchNotificationById = async (id) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/notifications/getbyid/${id}`,
      });

      if (res) {
        setNotificationDetail(res?.data);
      }
    } catch (error) {
      console.error("Error fetching notification details:", error);
    } finally {
      setLoading(false);
    }
  };

  // Reset Notification Details
  const resetNotificationDetails = () => {
    setNotificationDetail(null);
  };

  return {
    loading,
    notificationList,
    fetchNotificationList,
    resetNotificationList,
    notificationDetail,
    sendNotification,
    fetchNotificationById,
    resetNotificationDetails,
  };
};

export default useNotificationManagement;