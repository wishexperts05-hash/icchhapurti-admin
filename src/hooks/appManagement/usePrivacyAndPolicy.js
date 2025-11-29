import { useRecoilState } from "recoil";
import { privacyPolicyListAtom } from "../../state/appManagement/PrivacyAndPolicyState";
import { useState } from "react";
import useFetch from "../useFetch";
import conf from "../../config";
import { toast } from "react-toastify";
import { confirmAlert } from "../../utils/alertToast";
import Swal from "sweetalert2";

const usePrivacyPolicy = () => {
  const [privacyPolicyList, setPrivacyPolicyList] = useRecoilState(privacyPolicyListAtom);
  const [privacyPolicyDetail, setPrivacyPolicyDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dropdown, setDropdown] = useState([]);
  const [fetchData] = useFetch();

  // Fetch Privacy Policy List
  const fetchPrivacyPolicyList = async (page, limit, search) => {
    setLoading(true);
    try {
      let url = `${conf.apiBaseUrl}admin/privacyPolicy/getAllPrivacyPolicies?page=${
        page || 1
      }&limit=${limit || ""}`;
      if (search && search.trim() !== "") {
        url += `&search=${encodeURIComponent(search.trim())}`;
      }

      const res = await fetchData({
        method: "GET",
        url,
      });

      if (res) {
        setPrivacyPolicyList(res);
      }
    } catch (error) {
      console.error("Error fetching privacy policy list:", error);
    } finally {
      setLoading(false);
    }
  };

  // Reset Privacy Policy List
  const resetPrivacyPolicyList = () => {
    setPrivacyPolicyList({
      privacyPolicies: [],
      currentPage: 1,
      totalPages: 1,
      totalPolicies: 0,
      perPage: 10,
    });
  };

  // Create Privacy Policy
  const createPrivacyPolicy = async (formdata) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "PUT",
        url: `${conf.apiBaseUrl}admin/privacyPolicy/createOrUpdate`,
        data: formdata,
      });

      if (res) {
        toast.success(res?.message || "Privacy Policy created successfully");
        return res;
      }
    } catch (error) {
      console.error("Error creating privacy policy:", error);
      toast.error(error?.response?.data?.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Update Privacy Policy
  const updatePrivacyPolicy = async (id, data) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "PUT",
        url: `${conf.apiBaseUrl}admin/privacyPolicy/createOrUpdate`,
        data,
      });

      if (res) {
        toast.success(res?.message || "Privacy Policy updated successfully");
        return res;
      }
    } catch (error) {
      console.error("Error updating privacy policy:", error);
      toast.error(error?.response?.data?.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Fetch Privacy Policy Detail by ID
  const fetchPrivacyPolicyById = async (id) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/privacyPolicy/getPrivacyPolicyById/${id}`,
      });

      if (res) {
        setPrivacyPolicyDetail(res?.data);
      }
    } catch (error) {
      console.error("Error fetching privacy policy details:", error);
    } finally {
      setLoading(false);
    }
  };

  // Reset Privacy Policy Details
  const resetPrivacyPolicyDetails = () => {
    setPrivacyPolicyDetail(null);
  };

  // Delete Privacy Policy by ID
  const deletePrivacyPolicyById = async (id) => {
    const result = await confirmAlert(
      "Do you really want to delete this Privacy Policy?"
    );
    if (!result.isConfirmed) return;

    setLoading(true);
    try {
      const res = await fetchData({
        method: "DELETE",
        url: `${conf.apiBaseUrl}admin/privacyPolicy/delete/${id}`,
      });

      if (res) {
        Swal.fire({
          title: "Deleted!",
          text: res?.message || "Privacy Policy deleted successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
        return res;
      }
    } catch (error) {
      console.error("Error deleting privacy policy:", error);
      toast.error(error?.response?.data?.message || "Failed to delete Privacy Policy");
    } finally {
      setLoading(false);
    }
  };

  // Fetch Privacy Policy Dropdown
  const privacyPolicyDropdown = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/privacyPolicy/all/dropdown-add`,
      });

      if (res) {
        const list = res?.data || [];
        setDropdown(list);
      }
    } catch (error) {
      console.error("Failed to load dropdown:", error);
      toast.error(error?.response?.data?.message || "Failed to load dropdown options");
    } finally {
      setLoading(false);
    }
  };

  // Get Privacy Policy by Role
  const getPrivacyPolicyByRole = async (role) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/privacyPolicy/role/${role}`,
      });

      if (res) {
        return res?.data || null;
      }
      return null;
    } catch (error) {
      console.error("Error fetching privacy policy by role:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch privacy policy by role");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    privacyPolicyList,
    fetchPrivacyPolicyList,
    resetPrivacyPolicyList,
    privacyPolicyDetail,
    createPrivacyPolicy,
    updatePrivacyPolicy,
    fetchPrivacyPolicyById,
    privacyPolicyDropdown,
    resetPrivacyPolicyDetails,
    deletePrivacyPolicyById,
    dropdown,
    getPrivacyPolicyByRole,
  };
};

export default usePrivacyPolicy;