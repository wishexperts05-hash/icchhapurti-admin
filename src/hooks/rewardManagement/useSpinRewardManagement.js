import { useState } from "react";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";

import useFetch from "../useFetch";
import conf from "../../config";
import { spinRewardListAtom } from "../../state/rewardManagement/rewardManagementState";

const useSpinRewardManagement = () => {
  const [spinRewardList, setSpinRewardList] = useRecoilState(spinRewardListAtom);
  const [loading, setLoading] = useState(false);
  const [fetchData] = useFetch();

  // 🔹 GET ALL – /admin/spinReward/getAllRewards
  const fetchSpinRewardList = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/spinReward/getAllRewards`,
      });

      if (res?.success) {
        setSpinRewardList(res.data || []);
      } else {
        toast.error(res?.message || "Failed to fetch spin rewards");
      }
    } catch (error) {
      console.error("Error fetching spin rewards:", error);
      toast.error(
        error?.response?.data?.message || "Failed to fetch spin rewards"
      );
    } finally {
      setLoading(false);
    }
  };

  const resetSpinRewardList = () => setSpinRewardList([]);

  // 🔹 GET BY ID – /admin/spinReward/getRewardById/:spinRewardId
  const fetchSpinRewardById = async (id) => {
    if (!id) return null;
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/spinReward/getRewardById/${id}`,
      });

      if (res?.success) {
        return res.data; // single reward object
      } else {
        toast.error(res?.message || "Failed to fetch spin reward");
        return null;
      }
    } catch (error) {
      console.error("Error fetching spin reward by ID:", error);
      toast.error(
        error?.response?.data?.message || "Failed to fetch spin reward"
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 UPDATE – /admin/spinReward/updateReward/:spinRewardId
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
      toast.error(
        error?.response?.data?.message || "An unexpected error occurred"
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
  };
};

export default useSpinRewardManagement;
