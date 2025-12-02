import React, { useState } from 'react'
import useFetch from '../useFetch';
import { useRecoilState } from 'recoil';
import { offerDetailsAtom, offerListAtom } from '../../state/offerManagement/offerManagementState';
import conf from "../../config/index";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { confirmAlert, confirmDisable, confirmEnable } from "../../utils/alertToast";

const useOfferManagement = () => {
    const [fetchData] = useFetch();
    const [loading, setLoading] = useState(false);
    const [offerList, setOfferList] = useRecoilState(offerListAtom);
    const [offerDetail, setOfferDetail] = useRecoilState(offerDetailsAtom);

    const fetchOfferList = async (page, limit, debouncedSearch) => {
        setLoading(true);
        try {
            let url = `${conf.apiBaseUrl}admin/offers/all?page=${page}&limit=${limit}`;
            if (debouncedSearch) {
                url += `&search=${encodeURIComponent(debouncedSearch.trim())}`;
            }
            const res = await fetchData({
                method: "GET",
                url,
            });
            if (res) {
                setOfferList(res);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching offer list:", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const fetchOfferDetails = async (id) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}admin/offers/get-by-id/${id}`,
            });
            if (res) {
                setOfferDetail(res?.data);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching offer details:", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const resetOfferDetails = () => {
        setOfferDetail(null);
    }

    const addOffer = async (data) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "POST",
                url: `${conf.apiBaseUrl}admin/offers/create`,
                data: data,
            });
            if (res) {
                toast.success(res?.message);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error adding offer:", error);
            toast.error(error?.response?.data?.message);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const updateOffer = async (id, data) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "PUT",
                url: `${conf.apiBaseUrl}admin/offers/update/${id}`,
                data: data,
            });
            if (res) {
                toast.success(res?.message);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error updating offer:", error);
            toast.error(error?.response?.data?.message);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const offerEnableDisable = async (id, data) => {
        setLoading(true);
        const result = data.isActive === true
            ? await confirmEnable("Are you sure you want to disable this offer?")
            : await confirmDisable("Are you sure you want to enable this offer?");
        if (result.isConfirmed) {
            try {
                const res = await fetchData({
                    method: "PATCH",
                    url: `${conf.apiBaseUrl}admin/offers/update-status/${id}`,
                    data: data,
                });
                if (res) {
                    Swal.fire({
                        title: data.isActive === true ? "Enabled!!" : "Disabled!",
                        text: res?.message,
                        icon: "success",
                        confirmButtonText: "OK",
                    });
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error updating offer:", error);
                toast.error(error?.response?.data?.message);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        }
    };

    const deleteOffer = async (id) => {
        const result = await confirmAlert("Are you sure you want to delete this offer?");
        if (!result) return;
        setLoading(true);
        if (result.isConfirmed) {
            try {
                const res = await fetchData({
                    method: "DELETE",
                    url: `${conf.apiBaseUrl}admin/offers/delete/${id}`,
                });
                if (res) {
                    Swal.fire({
                        title: "Deleted!",
                        text: res?.message,
                        icon: "success",
                        confirmButtonText: "OK",
                    });
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error deleting offer:", error);
                toast.error(error?.response?.data?.message);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        }
    };

    return {
        fetchOfferList, fetchOfferDetails, addOffer, updateOffer, deleteOffer, loading, offerList, offerDetail,
        offerEnableDisable, resetOfferDetails    }
}

export default useOfferManagement