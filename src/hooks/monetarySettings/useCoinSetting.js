import React, { useState } from 'react'
import { useRecoilState } from 'recoil';
import useFetch from '../useFetch';
import { toast } from "react-toastify";
import conf from "../../config/index";
import { coinSettingAtom } from '../../state/monetarySetting/monetarySettingState';

const useCoinSetting = () => {
    const [fetchData] = useFetch();
    const [loading, setLoading] = useState(false);
    const [coinSetting, setCoinSetting] = useRecoilState(coinSettingAtom);

    const fetchCoinSetting = async () => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}admin/coinSetting/getCoinsSetting`,
            });
            if (res) {
                setCoinSetting(res?.data);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching coin setting:", error);
            setLoading(false);
        }
    };

    const updateCoinSetting = async (data) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "PUT",
                url: `${conf.apiBaseUrl}admin/coinSetting/updateCoinsSetting`,
                data: data,
            });
            if (res) {
                toast.success(res?.message);
                setCoinSetting(res?.data);
                setLoading(false);
                return true;
            }
        } catch (error) {
            console.error("Error updating coin setting:", error);
            toast.error(error?.response?.data?.message);
            setLoading(false);
            return false;
        }
    };

    return { coinSetting, loading, fetchCoinSetting, updateCoinSetting };
}

export default useCoinSetting