import React, { useState } from 'react'
import useFetch from '../useFetch';
import conf from "../../config/index";
import { productDropdownAtom, salesTypeAtom, userTypeAtom } from '../../state/dropdown/dropdownState';
import { useRecoilState } from 'recoil';

const useDropdown = () => {
    const [fetchData] = useFetch();
    const [loadingSales, setLoadingSales] = useState(false);
    const [loadingUser, setLoadingUser] = useState(false);
    const [loadingProduct, setLoadingProduct] = useState(false);
    const [salesType, setSalesType] = useRecoilState(salesTypeAtom);
    const [userType, setUserType] = useRecoilState(userTypeAtom);
    const [productDropdown, setProductDropdown] = useRecoilState(productDropdownAtom);

    const fetchSalesType = async () => {
        setLoadingSales(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}admin/commissionSetting/getCommissionTypeDropdownValues`,
            });
            if (res) {
                setSalesType(res?.data);
            }
        } catch (error) {
            console.error("Error fetching sales type:", error);
        } finally {
            setLoadingSales(false);
        }
    };

    const fetchUserType = async (salesType = null) => {
        setLoadingUser(true);
        try {
            const params = new URLSearchParams();
            if (salesType) {
                params.append('salesType', salesType);
            }
            const url = salesType 
                ? `${conf.apiBaseUrl}admin/commissionSetting/getUserTypeDropdownValues?${params.toString()}`
                : `${conf.apiBaseUrl}admin/commissionSetting/getUserTypeDropdownValues`;
            
            const res = await fetchData({
                method: "GET",
                url,
            });
            // Debug: log requested URL and response
            // (helps detect whether API respects the salesType query)
            // eslint-disable-next-line no-console
            console.log("fetchUserType -> url:", url, "res:", res);
            if (res) {
                setUserType(res?.data);
            }
        } catch (error) {
            console.error("Error fetching user type:", error);
        } finally {
            setLoadingUser(false);
        }
    };

    const resetUserType = () => {
        setUserType([]);
    }

    const fetchProductDropdown = async () => {
        setLoadingProduct(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}product/dropdown`,
            });
            if (res) {
                setProductDropdown(res?.products);
            }   
        } catch (error) {
            console.error("Error fetching product dropdown:", error);
        } finally {
            setLoadingProduct(false);
        }
    };

    const loading = loadingSales || loadingUser || loadingProduct;
    return {loading, loadingSales, loadingUser, loadingProduct, fetchSalesType, fetchUserType, fetchProductDropdown, salesType, userType, productDropdown, resetUserType}
}

export default useDropdown