// src/hooks/rewardManagement/useLuckyDrawManagement.js

import { useState } from "react";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";

import useFetch from "../useFetch";
import conf from "../../config";
import { luckyDrawListAtom } from "../../state/rewardManagement/luckyDrawState";

const useLuckyDrawManagement = () => {
  const [luckyDrawList, setLuckyDrawList] = useRecoilState(luckyDrawListAtom);
  const [loading, setLoading] = useState(false);
  const [fetchData] = useFetch();

  const [luckyDrawDetail, setLuckyDrawDetail] = useState(null);

  const fetchLuckyDrawList = async (page = 1, limit = 10, search = "") => {
    setLoading(true);
    try {
      let url = `${conf.apiBaseUrl}admin/luckyDraw/getAllLuckyDraws?page=${page}&limit=${limit}`;

      if (search && search.trim() !== "") {
        url += `&search=${encodeURIComponent(search.trim())}`;
      }

      const res = await fetchData({
        method: "GET",
        url,
      });

      if (res?.success) {
        setLuckyDrawList(res);
      } else {
        toast.error(res?.message || "Failed to fetch lucky draw events");
      }
    } catch (error) {
      console.error("Error fetching lucky draw events:", error);
      toast.error("Failed to fetch lucky draw events");
    } finally {
      setLoading(false);
    }
  };

  const resetLuckyDrawList = () => setLuckyDrawList(null);

  // 🔹 Get Lucky Draw Event by ID
  const fetchLuckyDrawDetailById = async (id) => {
    if (!id) return;
    setLoading(true);
    setLuckyDrawDetail(null);

    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/luckyDraw/luckyDrawById/${id}`,
      });

      if (res?.success) {
        // res.data = single lucky draw object
        setLuckyDrawDetail(res.data);
      } else {
        toast.error(res?.message || "Failed to fetch lucky draw event");
      }
    } catch (error) {
      console.error("Error fetching lucky draw event by ID:", error);
      toast.error("Failed to fetch lucky draw event");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Update Lucky Draw Event by ID
  const updateLuckyDrawById = async (id, payload) => {
    if (!id) return null;
    setLoading(true);

    try {
      const res = await fetchData({
        method: "PUT",
        url: `${conf.apiBaseUrl}admin/luckyDraw/updateLuckyDraw/${id}`,
        data: payload,
      });

      if (res?.success) {
        toast.success(res.message || "Lucky Draw Event updated successfully.");
      } else {
        toast.error(res?.message || "Failed to update Lucky Draw Event");
      }

      return res;
    } catch (error) {
      console.error("Error updating lucky draw event:", error);
      toast.error("Failed to update Lucky Draw Event");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    luckyDrawList,
    fetchLuckyDrawList,
    resetLuckyDrawList,

    luckyDrawDetail,
    fetchLuckyDrawDetailById,
    updateLuckyDrawById,
  };
};

export default useLuckyDrawManagement;
