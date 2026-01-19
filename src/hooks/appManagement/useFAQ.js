import { useRecoilState } from "recoil";
import { faqListAtom, faqDetailAtom, } from "../../state/appManagement/FAQState";
import { useState } from "react";
import useFetch from "../useFetch";
import { useNavigate } from "react-router-dom";
import conf from "../../config";
import { toast } from "react-toastify";
import { confirmAlert } from "../../utils/alertToast";
import Swal from "sweetalert2";

const useFAQ = () => {
  const [faqList, setFaqList] = useRecoilState(faqListAtom);
  const [faqDetail, setFaqDetail] = useRecoilState(faqDetailAtom);
  
  const [loading, setLoading] = useState(false);

  const [fetchData] = useFetch();
  const navigate = useNavigate();

  const fetchFaqList = async (page = 1, limit = 10, search = "",category) => {
    setLoading(true);
    try {
      let url = `${conf.apiBaseUrl}admin/faq/list?page=${page}&limit=${limit}`;
      
      if (search && search.trim() !== "") {
        url += `&search=${encodeURIComponent(search.trim())}`;
      }

      if (category && category.trim() !== "") {
        url += `&category=${encodeURIComponent(category.trim())}`;
      }

      const res = await fetchData({
        method: "GET",
        url,
      });

      if (res && res.success) {
        setFaqList({
          data: res.data || [],
          pagination: res.pagination || {
            currentPage: page,
            totalPages: 1,
            totalRecords: 0,
            limit: limit,
            hasNextPage: false,
            hasPrevPage: false,
          },
        });
      }
    } catch (error) {
      console.error("Error fetching FAQ list:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch FAQ list");
    } finally {
      setLoading(false);
    }
  };

  
  const resetFaqList = () => {
    setFaqList({
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

 
  const fetchFaqById = async (id) => {
  let res = null;                 
  setFaqDetail(null);
  setLoading(true);

  try {
    res = await fetchData({
      method: "GET",
      url: `${conf.apiBaseUrl}admin/faq/${id}`,
    });

    if (res?.success) {
      setFaqDetail(res.data);
    }
  } catch (error) {
    console.error("Error fetching FAQ details:", error);
  } finally {
    setLoading(false);
  }

  return res;   
};


  
  const resetFaqDetail = () => {
    setFaqDetail(null);
  };

  
 

  /**
   * Create a new FAQ
   * POST: /api/admin/faq/create
   * Body: { category, question, answer }
   */
  const createFaq = async (formData) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}admin/faq/create`,
        data: formData,
      });

      if (res && res.success) {
        navigate("/app-management/faq");
        return res;
      }
    } catch (error) {
      console.error("Error creating FAQ:", error);
      toast.error(error?.response?.data?.message || "Failed to create FAQ");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update FAQ by ID
   * PUT: /api/admin/faq/update/:id
   * Body: { category, question, answer }
   */
  const updateFaq = async (id, formData) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "PUT",
        url: `${conf.apiBaseUrl}admin/faq/update/${id}`,
        data: formData,
      });

      if (res && res.success) {
        toast.success(res?.message || "FAQ updated successfully");
        navigate("/faq-management");
        return res;
      }
    } catch (error) {
      console.error("Error updating FAQ:", error);
      toast.error(error?.response?.data?.message || "Failed to update FAQ");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Delete FAQ by ID
   * DELETE: /api/admin/faq/delete/:id
   */
  const deleteFaqById = async (id) => {
    const result = await confirmAlert(
      "Do you really want to delete this FAQ?"
    );
    
    if (result.isConfirmed) {
      setLoading(true);
      try {
        const res = await fetchData({
          method: "DELETE",
          url: `${conf.apiBaseUrl}admin/faq/delete/${id}`,
        });

        if (res && res.success) {
          Swal.fire({
            title: "Deleted!",
            text: res?.message || "FAQ deleted successfully",
            icon: "success",
            confirmButtonText: "OK",
          });
          return res;
        }
      } catch (error) {
        console.error("Error deleting FAQ:", error);
        toast.error(error?.response?.data?.message || "Failed to delete FAQ");
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    loading,
    faqList,
    faqDetail,
    fetchFaqList,
    resetFaqList,
    fetchFaqById,
    resetFaqDetail,
    createFaq,
    updateFaq,
    deleteFaqById,
  };
};

export default useFAQ;