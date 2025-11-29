import { useRecoilState } from "recoil";
import { termsAndConditionsListAtom } from "../../state/appManagement/TermsAndCondtionsState";
import { useState } from "react";
import useFetch from "../useFetch";
import conf from "../../config";
import { toast } from "react-toastify";
import { confirmAlert } from "../../utils/alertToast";
import Swal from "sweetalert2";

const useTermsAndConditions = () => {
  const [termsList, setTermsList] = useRecoilState(termsAndConditionsListAtom);
  const [termsDetail, setTermsDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dropdown, setDropdown] = useState([]);
  const [fetchData] = useFetch();

  // Fetch Terms and Conditions List
  const fetchTermsList = async (page, limit, search) => {
    setLoading(true);
    try {
      // Remove the extra 'api/' since conf.apiBaseUrl already includes it
      let url = `${conf.apiBaseUrl}admin/termsAndCondition/getAllTermsAndConditions`;
      
      const params = new URLSearchParams();
      if (page) params.append('page', page);
      if (limit) params.append('limit', limit);
      if (search && search.trim() !== "") {
        params.append('search', search.trim());
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const res = await fetchData({
        method: "GET",
        url,
      });

      if (res && res.success) {
        // Handle response based on actual API structure
        setTermsList({
          data: res.data || [],
          currentPage: page || 1,
          totalPages: Math.ceil((res.data?.length || 0) / (limit || 10)),
          totalTerms: res.data?.length || 0,
          perPage: limit || 10,
        });
      }
    } catch (error) {
      console.error("Error fetching terms and conditions list:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch terms list");
    } finally {
      setLoading(false);
    }
  };

  // Reset Terms and Conditions List
  const resetTermsList = () => {
    setTermsList({
      data: [],
      currentPage: 1,
      totalPages: 1,
      totalTerms: 0,
      perPage: 10,
    });
  };

  // Create Terms and Conditions
  const addTerms = async (formdata) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}admin/termsAndCondition/createOrUpdate`,
        data: formdata,
      });

      if (res && res.success) {
        toast.success(res?.message || "Terms and Conditions created successfully");
        return res;
      }
    } catch (error) {
      console.error("Error creating terms and conditions:", error);
      toast.error(error?.response?.data?.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Update Terms and Conditions
  const updateTerms = async (id, data) => {
    setLoading(true);
    try {
      // Using POST method for createOrUpdate endpoint
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}admin/termsAndCondition/createOrUpdate`,
        data: { ...data, id }, // Include ID in the data payload for update
      });

      if (res && res.success) {
        toast.success(res?.message || "Terms and Conditions updated successfully");
        return res;
      }
    } catch (error) {
      console.error("Error updating terms and conditions:", error);
      toast.error(error?.response?.data?.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Fetch Terms and Conditions Detail by ID
  const fetchTermsDetailById = async (id) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/termsAndCondition/getTermsAndConditionById/${id}`,
      });

      if (res && res.success) {
        setTermsDetail(res?.data);
      }
    } catch (error) {
      console.error("Error fetching terms and conditions details:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch details");
    } finally {
      setLoading(false);
    }
  };

  // Reset Terms and Conditions Details
  const resetTermsDetails = () => {
    setTermsDetail(null);
  };

  // Delete Terms and Conditions by ID
  const deleteTermsById = async (id) => {
    const result = await confirmAlert(
      "Do you really want to delete these Terms and Conditions?"
    );
    if (!result.isConfirmed) return;

    setLoading(true);
    try {
      const res = await fetchData({
        method: "DELETE",
        url: `${conf.apiBaseUrl}admin/termsAndCondition/delete/${id}`,
      });

      if (res && res.success) {
        Swal.fire({
          title: "Deleted!",
          text: res?.message || "Terms and Conditions deleted successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
        return res;
      }
    } catch (error) {
      console.error("Error deleting terms and conditions:", error);
      toast.error(
        error?.response?.data?.message || "Failed to delete Terms and Conditions"
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch Terms and Conditions Dropdown
  const termsAndConditionsDropdown = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/termsAndCondition/all/dropdown-add`,
      });

      if (res && res.success) {
        const list = res?.data || [];
        setDropdown(list);
      }
    } catch (error) {
      console.error("Failed to load dropdown:", error);
      toast.error(
        error?.response?.data?.message || "Failed to load dropdown options"
      );
    } finally {
      setLoading(false);
    }
  };

  // Get Terms and Conditions by Role
  const getTermsAndConditionsByRole = async (role) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/termsAndCondition/role/${role}`,
      });

      if (res && res.success) {
        return res?.data || null;
      }
      return null;
    } catch (error) {
      console.error("Error fetching terms and conditions by role:", error);
      toast.error(
        error?.response?.data?.message || "Failed to fetch terms by role"
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    termsList,
    fetchTermsList,
    resetTermsList,
    termsDetail,
    addTerms,
    updateTerms,
    fetchTermsDetailById,
    termsAndConditionsDropdown,
    resetTermsDetails,
    deleteTermsById,
    dropdown,
    getTermsAndConditionsByRole,
  };
};

export default useTermsAndConditions;