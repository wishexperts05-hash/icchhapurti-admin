import React, { useState } from 'react'
import useFetch from '../useFetch';
import conf from "../../config/index";
import { offerTypeAtom, orderStatusAtom, productCategoryAtom, productDropdownAtom, salesTypeAtom, userTypeAtom } from '../../state/dropdown/dropdownState';
import { useRecoilState } from 'recoil';

const useDropdown = () => {
    const [fetchData] = useFetch();
    const [loadingSales, setLoadingSales] = useState(false);
    const [loadingUser, setLoadingUser] = useState(false);
    const [loadingProduct, setLoadingProduct] = useState(false);
    const [loadingOrderStatus, setLoadingOrderStatus] = useState(false);
    const [loadingOfferType, setLoadingOfferType] = useState(false);

    const [salesType, setSalesType] = useRecoilState(salesTypeAtom);
    const [userType, setUserType] = useRecoilState(userTypeAtom);
    const [productDropdown, setProductDropdown] = useRecoilState(productDropdownAtom);
    const [productCategory, setProductCategory] = useRecoilState(productCategoryAtom);
    const [orderStatus, setOrderStatus] = useRecoilState(orderStatusAtom);
    const [offerType, setOfferType] = useRecoilState(offerTypeAtom);

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

    const fetchProductCategory = async () => {
        setLoadingProduct(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}admin/orders/getProductCategory`,
            });
            if (res) {
                setProductCategory(res?.products);
            }
        } catch (error) {
            console.error("Error fetching product dropdown:", error);
        } finally {
            setLoadingProduct(false);
        }
    };

    const fetchOrderStatus = async () => {
        setLoadingOrderStatus(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}admin/orders/getOrderStatus`,
            });
            if (res) {
                setOrderStatus(res?.data);
            }
        } catch (error) {
            console.error("Error fetching product dropdown:", error);
        } finally {
            setLoadingOrderStatus(false);
        }
    };

    const fetchOfferType = async () => {
        setLoadingOfferType(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}admin/offers/dropdown/offer-types`,
            });
            if (res) {
                setOfferType(res?.data);
                setLoadingOfferType(false);
            }
        } catch (error) {
            console.error("Error fetching product dropdown:", error);
            setLoadingOfferType(false);
        } finally {
            setLoadingOfferType(false);
        }
    };

    const loading = loadingSales || loadingUser || loadingProduct || loadingOrderStatus;
    return { loading, loadingSales, loadingUser, loadingProduct, loadingOrderStatus, fetchSalesType, 
        fetchProductCategory, fetchOrderStatus, fetchUserType, fetchProductDropdown, salesType, userType, productDropdown, 
        productCategory, orderStatus, resetUserType, fetchOfferType, loadingOfferType, offerType, fetchProducts: fetchProductDropdown, products: productDropdown, loadingProducts: loadingProduct}
}

export default useDropdown