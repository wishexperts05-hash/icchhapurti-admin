import React, { useState } from 'react'
import useFetch from '../useFetch';
import { useRecoilState } from 'recoil';
import conf from "../../config/index";
import { toast } from "react-toastify";
import { referralDisSettingAtom, referralTrackingAtom, referralTrackingByIdAtom, referVideoAtom, refferalDisSettingByIdAtom } from '../../state/referAndEarn/referAndEarnState';

const useReferAndEarn = () => {
    const [fetchData] = useFetch();
    const [loading, setLoading] = useState(false);
    const [referralVideo, setReferralVideo] = useRecoilState(referVideoAtom);
    const [referralTracking, setReferralTracking] = useRecoilState(referralTrackingAtom);
    const [referralTrackingById, setReferralTrackingById] = useRecoilState(referralTrackingByIdAtom);
    const [refferalDisSetting, setRefferalDisSetting] = useRecoilState(referralDisSettingAtom);
    const [refferalDisSettingById, setRefferalDisSettingById] = useRecoilState(refferalDisSettingByIdAtom);

    const fetchReferralVideo = async () => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}admin/referAndEarnVideo/getReferAndEarnVideo`,
            });
            if (res) {
                setReferralVideo(res?.data);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching referral video:", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const fetchReferralTracking = async (page, limit, debouncedSearch, userType) => {
        setLoading(true);
        try {
            let url = `${conf.apiBaseUrl}admin/referralTracking/getAllReferralTracking?page=${page}&limit=${limit}`;
            if (debouncedSearch) {
                url += `&search=${encodeURIComponent(debouncedSearch.trim())}`;
            }
            if (userType) {
                url += `&userType=${encodeURIComponent(userType)}`;
            }
            const res = await fetchData({
                method: "GET",
                url: url,
            });
            if (res) {
                setReferralTracking(res);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching referral tracking:", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const fetchReferralTrackingById = async (id, page, limit) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}admin/referralTracking/getAllReferralTracking/${id}?page=${page}&limit=${limit}`,
            });
            if (res) {
                setReferralTrackingById(res);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching referral tracking by id:", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const fetchRefferalDisSetting = async () => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}admin/referralDiscounts/all`,
            });
            if (res) {
                setRefferalDisSetting(res);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching refferal dis setting:", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const fetchRefferalDisSettingById = async (id) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}admin/referralDiscounts/get-id/${id}`,
            });
            if (res) {
                setRefferalDisSettingById(res?.referral);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching refferal dis setting by id:", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const resetRefferalDisSettingById = () => {
        setRefferalDisSettingById(null);
    };

    const updateRefferalDisSetting = async (id, data) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "PUT",
                url: `${conf.apiBaseUrl}admin/referralDiscounts/update/${id}`,
                data: data,
            });
            if (res) {
                toast.success(res?.message);
                setRefferalDisSettingById(res?.data);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error updating refferal dis setting:", error);
            toast.error(error?.response?.data?.message);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const updateRefferalVideo = async (data) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "PUT",
                url: `${conf.apiBaseUrl}admin/referAndEarnVideo/updateReferAndEarnVideo`,
                data: data,
            });
            if (res) {
                toast.success(res?.message);
                // Update state with new video URL from response
                setReferralVideo(res?.data);
                setLoading(false);
                return res;
            }
        } catch (error) {
            console.error("Error updating refferal video:", error);
            toast.error(error?.response?.data?.message);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };


    return {loading, referralVideo, referralTracking, referralTrackingById, refferalDisSetting, refferalDisSettingById, 
        fetchReferralVideo, fetchReferralTracking, fetchReferralTrackingById, fetchRefferalDisSetting, fetchRefferalDisSettingById,
        updateRefferalDisSetting, updateRefferalVideo, resetRefferalDisSettingById
    };
}

export default useReferAndEarn