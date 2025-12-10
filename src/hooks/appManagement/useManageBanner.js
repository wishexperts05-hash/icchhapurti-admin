import { useRecoilState } from "recoil";
import { 
  bannerManagementListAtom, 
  bannerDetailAtom 
} from "../../state/appManagement/ManageBannerState";
import { useState } from "react";
import useFetch from "../useFetch";
import { useNavigate } from "react-router-dom";
import conf from "../../config";
import { toast } from "react-toastify";
import { confirmAlert } from "../../utils/alertToast";
import Swal from "sweetalert2";

const useBanner = () => {
  const [bannerList, setBannerList] = useRecoilState(bannerManagementListAtom);
  const [bannerDetail, setBannerDetail] = useRecoilState(bannerDetailAtom);
  const [loading, setLoading] = useState(false);
  const [fetchData] = useFetch();
  const navigate = useNavigate();

  /** -------------------------------------------
   * GET: Fetch all banners
   * API: GET /api/admin/banners/getAllBanners
   * ------------------------------------------- */
  const fetchBannerList = async (page = 1, limit = 10, search = "") => {
    setLoading(true);
    try {
      let url = `${conf.apiBaseUrl}admin/banners/getAllBanners?page=${page}&limit=${limit}`;

      if (search.trim() !== "") {
        url += `&search=${encodeURIComponent(search.trim())}`;
      }

      const res = await fetchData({ method: "GET", url });

      if (res) {
        setBannerList(res);
      }

      return res;
    } catch (error) {
      console.error("Error fetching banner list", error);
      toast.error("Failed to fetch Banner List");
    } finally {
      setLoading(false);
    }
  };

  const resetBannerList = () => {
    setBannerList({
      data: [],
      totalPages: 0,
      currentPage: 1,
      totalCount: 0,
    });
  };

  /** -------------------------------------------
   * POST: Create Banner
   * API: POST /api/admin/banners/createBanner
   * ------------------------------------------- */
  const createBanner = async (formData) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}admin/banners/createBanner`,
        data: formData,
      });

      if (res) {
        toast.success(res?.message || "Banner Created Successfully");
        navigate("/app-management/manage-banner");
      }

      return res;
    } catch (error) {
      console.error("Error creating banner:", error);
      toast.error(error?.response?.data?.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  /** -------------------------------------------
   * PUT: Update Banner
   * API: PUT /api/admin/banners/updateBanner/:id
   * ------------------------------------------- */
  const updateBanner = async (id, formData) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "PUT",
        url: `${conf.apiBaseUrl}admin/banners/updateBanner/${id}`,
        data: formData,
      });

      if (res) {
        toast.success(res?.message || "Banner Updated Successfully");
        navigate("/app-management/manage-banner");
      }

      return res;
    } catch (error) {
      console.error("Error updating banner:", error);
      toast.error(
        error?.response?.data?.message ||
        "Failed to update banner. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /** -------------------------------------------
   * GET: Banner details
   * API: GET /api/admin/banners/getBanner/:id
   * ------------------------------------------- */
  const fetchBannerById = async (id) => {
    setLoading(true);
    setBannerDetail(null);

    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/banners/getBanner/${id}`,
      });

      if (res) {
        setBannerDetail(res);
      }

      return res;
    } catch (error) {
      console.error("Error fetching banner details:", error);
      toast.error("Failed to fetch banner details");
    } finally {
      setLoading(false);
    }
  };

  const resetBannerDetail = () => {
    setBannerDetail(null);
  };

  /** -------------------------------------------
   * DELETE: Delete Banner
   * API: DELETE /api/admin/banners/deleteBanner/:id
   * ------------------------------------------- */
  const deleteBanner = async (id) => {
    const result = await confirmAlert("Do you really want to delete this Banner?");

    if (!result.isConfirmed) return;

    setLoading(true);

    try {
      const res = await fetchData({
        method: "DELETE",
        url: `${conf.apiBaseUrl}admin/banners/deleteBanner/${id}`,
      });

      if (res) {
        Swal.fire({
          title: "Deleted!",
          text: res?.message || "Banner Deleted Successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
      }

      return res;
    } catch (error) {
      console.error("Error deleting banner:", error);
      toast.error(error?.response?.data?.message || "Failed to delete banner");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    bannerList,
    bannerDetail,
    fetchBannerList,
    resetBannerList,
    createBanner,
    updateBanner,
    fetchBannerById,
    resetBannerDetail,
    deleteBanner,
  };
};

export default useBanner;
