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
  const [distributedTickets, setDistributedTickets] = useState([]);

  const [luckyDrawDetail, setLuckyDrawDetail] = useState(null);

  const fetchLuckyDrawList = async (page = 1, limit = 10, search) => {
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

  const fetchDistributedTicketsByLuckyDrawId = async (luckyDrawId) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/luckyDraw/distributedTickets/${luckyDrawId}`,
      });

      if (res?.success) {
        setDistributedTickets(res.data || []);
      } else {
        toast.error(res?.message || "Failed to fetch distributed tickets");
        setDistributedTickets([]);
      }

      return res;
    } catch (err) {
      console.error("Error fetching distributed tickets:", err);
      toast.error("Error fetching distributed tickets");
      setDistributedTickets([]);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const addLuckyDrawWinners = async (luckyDrawId, payload) => {
    if (!luckyDrawId) return;

    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}admin/luckyDraw/addWinners/${luckyDrawId}`,
        data: payload,
      });

      if (res?.success) {
        toast.success(res?.message || "Winners added successfully");
      } else {
        toast.error(res?.message || "Failed to add winners");
      }

      return res;
    } catch (err) {
      console.error("Error adding winners:", err);
      toast.error("Error adding winners");
      throw err;
    }
  };

  const createLuckyDraw = async (payload) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}admin/luckyDraw/create`,
        data: payload,
      });

      if (res?.success) {
        toast.success(res.message || "Lucky Draw Event created successfully.");
      } else {
        toast.error(res?.message || "Failed to create Lucky Draw Event");
      }

      return res;
    } catch (error) {
      console.error("Error creating lucky draw event:", error);
      toast.error("Failed to create Lucky Draw Event");
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
    fetchDistributedTicketsByLuckyDrawId,
    addLuckyDrawWinners,
    luckyDrawDetail,
    distributedTickets,
    fetchLuckyDrawDetailById,
    updateLuckyDrawById,
    createLuckyDraw,
  };
};

export default useLuckyDrawManagement;
