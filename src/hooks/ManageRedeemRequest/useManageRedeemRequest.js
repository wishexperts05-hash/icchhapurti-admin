import { useRecoilState } from "recoil";
import {
  getAllRedeemRequestsAtom,
  getDropdownOfStatusAtom,
  getRedeemRequestAtom,
} from "../../state/ManageRedeemRequest/manageRedeemRequestState";
import { useState } from "react";
import useFetch from "../useFetch";
import conf from "../../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useManageRedeemRequest = () => {
  const [loading, setLoading] = useState(false);
  const [fetchData] = useFetch();
  const navigate = useNavigate();
  const [redeemRequests, setRedeemRequests] = useRecoilState(
    getAllRedeemRequestsAtom
  );
  const [redeemRequestsDetails, setRedeemRequestsDetails] =
    useRecoilState(getRedeemRequestAtom);
  const [dropdownOfStatus, setDropdownOfStatus] = useRecoilState(
    getDropdownOfStatusAtom
  );

  const fetchRedeemRequests = async (page, limit, debouncedSearch, status, ) => {
    // setRedeemRequests([])
    setLoading(true);
    try {
      let url = `${conf.apiBaseUrl}admin/redeemRequests/getAllRedeemRequests?page=${page}&limit=${limit}`;
      if (debouncedSearch) {
        url += `&search=${encodeURIComponent(debouncedSearch.trim())}`;
      }
      if (status) {
        url += `&status=${encodeURIComponent(status.trim())}`;
      }

      const res = await fetchData({
        method: "GET",
        url,
      });
      if (res) {
        setRedeemRequests(res);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error while fetching Redeem Request :", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchRedeemRequestDetails = async (id) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/redeemRequests/getRedeemRequest/${id}`,
      });
      if (res) {
        setRedeemRequestsDetails(res?.data);
      }
    } catch (error) {
      console.log("Error while fetching Redeem Request Details :", error);
    } finally {
      setLoading(false);
    }
  };

  const updateRedeemRequestStatus = async (id, status, reason) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "PUT",
        url: `${conf.apiBaseUrl}admin/redeemRequests/updateRedeemRequest/${id}`,
        data: { status: status, rejectReason: reason },
      });
      if (res) {
        toast.success(res?.message);
        navigate("/manage-redeem-request");
      }
    } catch (error) {
      console.log("Error while Updating Redeem Request Status :", error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchDropdownOfStatus = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/redeemRequests/getDropdownOfStatus`,
      });
      if (res) {
        setDropdownOfStatus(res?.data);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error while fetching Dropdown Of Status :", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    fetchRedeemRequests,
    redeemRequests,
    fetchRedeemRequestDetails,
    redeemRequestsDetails,
    updateRedeemRequestStatus,
    fetchDropdownOfStatus,
    dropdownOfStatus,
  };
};

export default useManageRedeemRequest;
