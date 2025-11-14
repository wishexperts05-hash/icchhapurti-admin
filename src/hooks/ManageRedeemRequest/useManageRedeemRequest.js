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

  const fetchRedeemRequests = async (page, limit, status, status) => {
    setLoading(true);
    try {
      const params = {
        page: page,
        limit: limit,
        search: search,
        status: status,
      };

      const queryParams = new URLSearchParams(params).toString();
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/redeemRequests/getAllRedeemRequests?${queryParams}`,
      });
      if (res) {
        setRedeemRequests(res);
      }
    } catch (error) {
      console.log("Error while fetching Redeem Request :", error);
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
    } finally {
      setLoading(false);
    }
  };

  const fetchDropdownOfStatus = async (role) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/redeemRequests/getDropdownOfStatus/${role}`,
      });
      if (res) {
        setDropdownOfStatus(res?.data);
      }
    } catch (error) {
      console.log("Error while fetching Dropdown Of Status :", error);
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
