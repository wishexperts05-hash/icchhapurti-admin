import { useState } from "react";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";

import useFetch from "../useFetch";
import conf from "../../config";
import { spinRewardListAtom } from "../../state/rewardManagement/rewardManagementState";
import Swal from "sweetalert2";
import { confirmAlert } from "../../utils/alertToast";

const useSpinRewardManagement = () => {
  const [spinRewardList, setSpinRewardList] = useRecoilState(spinRewardListAtom);
  const [loading, setLoading] = useState(false);
  const [fetchData] = useFetch();

  // ------------------------ FETCH ALL ------------------------
  const fetchSpinRewardList = async (page = 1, limit = 10, search) => {
    setLoading(true);

    try{

      let url = `${conf.apiBaseUrl}admin/spinReward/getAllRewards?page=${page}&limit=${limit}`;

      if (search && search.trim() !== "") {
        url += `&search=${encodeURIComponent(search.trim())}`;
      }
      const res = await fetchData({
        method: "GET",
        url,
      });

      if (res?.success) {
        setSpinRewardList(res.data || []);
      } else {
        toast.error(res?.message || "Failed to fetch spin rewards");
      }
    } catch (error) {
      console.error("Error fetching spin rewards:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch spin rewards");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------ RESET LIST ------------------------
  const resetSpinRewardList = () => {
    setSpinRewardList([]);
  };

  // ------------------------ FETCH BY ID ------------------------
  const fetchSpinRewardById = async (id) => {
    if (!id) return null;

    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/spinReward/getRewardById/${id}`,
      });

      if (res?.success) {
        return res.data;
      } else {
        toast.error(res?.message || "Failed to fetch spin reward");
        return null;
      }
    } catch (error) {
      console.error("Error fetching spin reward by ID:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch spin reward");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // ------------------------ UPDATE ------------------------
  const updateSpinReward = async (id, payload) => {
    if (!id) {
      toast.error("Reward ID missing");
      return null;
    }

    setLoading(true);
    try {
      const res = await fetchData({
        method: "PUT",
        url: `${conf.apiBaseUrl}admin/spinReward/updateReward/${id}`,
        data: payload,
      });

      if (res?.success) {
        toast.success(res?.message || "Spin reward updated successfully.");
        return res.data;
      } else {
        toast.error(res?.message || "Failed to update spin reward");
        return null;
      }
    } catch (error) {
      console.error("Error updating spin reward:", error);
      toast.error(error?.response?.data?.message || "An unexpected error occurred");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // ------------------------ CREATE ------------------------
  const addSpinReward = async (payload) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}admin/spinReward/createReward`,
        data: payload,
      });

      if (res?.success) {
        toast.success(res?.message || "Spin reward created successfully.");
        return res.data;
      } else {
        toast.error(res?.message || "Failed to create spin reward");
        return null;
      }
    } catch (error) {
      console.error("Error creating spin reward:", error);
      toast.error(error?.response?.data?.message || "An unexpected error occurred");
      return null;
    } finally {
      setLoading(false);
    }
  };

//   const deleteSpinReward = async (id) => {
//   if (!id) {
//     toast.error("Reward ID missing");
//     return false;
//   }

//   setLoading(true);
//   try {
//     const res = await fetchData({
//       method: "DELETE",
//       url: `${conf.apiBaseUrl}admin/spinReward/deleteReward/${id}`,
//     });

//     if (res?.success) {
//       toast.success(res?.message || "Spin reward deleted successfully.");
//       return true;
//     } else {
//       toast.error(res?.message || "Failed to delete spin reward");
//       return false;
//     }
//   } catch (error) {
//     console.error("Error deleting spin reward:", error);
//     toast.error(
//       error?.response?.data?.message || "An unexpected error occurred"
//     );
//     return false;
//   } finally {
//     setLoading(false);
//   }
// };


const deleteSpinReward = async (id) => {
  if (!id) {
    toast.error("Reward ID missing");
    return false;
  }

  const result = await confirmAlert(
    "Do you really want to delete this Spin Reward?"
  );

  if (!result?.isConfirmed) {
    return false;
  }

  try {
    setLoading(true);
    const res = await fetchData({
      method: "DELETE",
      url: `${conf.apiBaseUrl}admin/spinReward/deleteReward/${id}`,
    });

    if (res?.success) {
      // ✅ 1. success toast / modal
      Swal.fire({
        title: "Deleted!",
        text: res?.message || "Spin reward deleted successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });

      // ✅ 2. Local state se bhi hata do
      setSpinRewardList((prev) => prev.filter((item) => item._id !== id));

      return true;
    } else {
      toast.error(res?.message || "Failed to delete spin reward");
      return false;
    }
  } catch (err) {
    console.error("Error deleting spin reward:", err);
    toast.error(
      err?.response?.data?.message || "An unexpected error occurred"
    );
    return false;
  } finally {
    setLoading(false);
  }
};

// ------------------------ SPIN PRICE: GET ------------------------
const fetchSpinPrice = async () => {
  setLoading(true);
  try {
    const res = await fetchData({
      method: "GET",
      url: `${conf.apiBaseUrl}admin/spinPrice/getSpinPrice`,
    });

    if (res?.success) {
      // { staffPricePerSpin, userPricePerSpin }
      return res.data;
    } else {
      toast.error(res?.message || "Failed to fetch spin price");
      return null;
    }
  } catch (error) {
    console.error("Error fetching spin price:", error);
    toast.error(
      error?.response?.data?.message || "Failed to fetch spin price"
    );
    return null;
  } finally {
    setLoading(false);
  }
};

// ------------------------ SPIN PRICE: CREATE OR UPDATE ------------------------
const createOrUpdateSpinPrice = async (payload) => {
  // payload: { staffPricePerSpin: number, userPricePerSpin: number }
  setLoading(true);
  try {
    const res = await fetchData({
      method: "POST",
      url: `${conf.apiBaseUrl}admin/spinPrice/createOrUpdateSpinPrice`,
      data: payload,
    });

    if (res?.success) {
      toast.success(res?.message || "Spin price updated successfully");
      return res.data;
    } else {
      toast.error(res?.message || "Failed to update spin price");
      return null;
    }
  } catch (error) {
    console.error("Error updating spin price:", error);
    toast.error(
      error?.response?.data?.message || "Failed to update spin price"
    );
    return null;
  } finally {
    setLoading(false);
  }
};



  return {
    loading,
    spinRewardList,
    fetchSpinRewardList,
    resetSpinRewardList,
    fetchSpinRewardById,
    updateSpinReward,
    addSpinReward,
    deleteSpinReward,
    fetchSpinPrice,         
    createOrUpdateSpinPrice, 
  };
};

export default useSpinRewardManagement;
