import { useRecoilState } from "recoil";
import { notificationListAtom } from "../../state/notificationManagement/NotificationManagementState";
import { useState, useCallback } from "react";
import useFetch from "../useFetch";
import conf from "../../config";
import { toast } from "react-toastify";

const useNotificationManagement = () => {
  const [notificationList, setNotificationList] = useRecoilState(notificationListAtom);
  const [notificationDetail, setNotificationDetail] = useState(null);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [countryLoading, setCountryLoading] = useState(false);
  const [fetchData] = useFetch();

  // Fetch All Notifications - GET /api/admin/notifications/all
  const fetchNotificationList = useCallback(async () => {
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
  }, [fetchData, setNotificationList]);

  // Reset Notification List
  const resetNotificationList = useCallback(() => {
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
  }, [setNotificationList]);

  // Fetch Country Dropdown - GET /api/admin/country/all/dropdown
  const fetchCountryDropdown = useCallback(async () => {
    setCountryLoading(true);
    try {
      const url = `${conf.apiBaseUrl}admin/country/all/dropdown`;

      const res = await fetchData({
        method: "GET",
        url,
      });

      if (res) {
        setCountries(res?.data || res || []);
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
      toast.error("Failed to load countries");
    } finally {
      setCountryLoading(false);
    }
  }, [fetchData]);

  // Create/Send Notification - POST /api/admin/notifications/add
  const sendNotification = useCallback(async (formdata) => {
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
      return null;
    } catch (error) {
      console.error("Error sending notification:", error);
      toast.error(error?.response?.data?.message || "Failed to send notification");
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchData]);

  // Fetch Notification by ID - GET /api/admin/notifications/getbyid/:id
  const fetchNotificationById = useCallback(async (id) => {
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
  }, [fetchData]);

  // Reset Notification Details
  const resetNotificationDetails = useCallback(() => {
    setNotificationDetail(null);
  }, []);

  return {
    loading,
    notificationList,
    fetchNotificationList,
    resetNotificationList,
    notificationDetail,
    sendNotification,
    fetchNotificationById,
    resetNotificationDetails,
    countries,
    countryLoading,
    fetchCountryDropdown,
  };
};

export default useNotificationManagement;