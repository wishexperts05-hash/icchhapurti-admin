import React, { useState } from 'react'
import useFetch from '../useFetch';
import conf from "../../config/index";
import { offerTypeAtom, orderStatusAtom, productCategoryAtom, productDropdownAtom, salesTypeAtom, userTypeAtom, countriesAtom
 } from '../../state/dropdown/dropdownState';
import { useRecoilState } from 'recoil';
import { toast } from 'react-toastify'; // Add this import

const useDropdown = () => {
    const [fetchData] = useFetch();
    const [loadingSales, setLoadingSales] = useState(false);
    const [loadingUser, setLoadingUser] = useState(false);
    const [loadingProduct, setLoadingProduct] = useState(false);
    const [loadingOrderStatus, setLoadingOrderStatus] = useState(false);
    const [loadingOfferType, setLoadingOfferType] = useState(false);
    const [loadingFaqCategories, setLoadingFaqCategories] = useState(false);

    const [countryLoading, setCountryLoading] = useState(false); 
    const [salesType, setSalesType] = useRecoilState(salesTypeAtom);
    const [userType, setUserType] = useRecoilState(userTypeAtom);
    const [productDropdown, setProductDropdown] = useRecoilState(productDropdownAtom);
    const [productCategory, setProductCategory] = useRecoilState(productCategoryAtom);
    const [orderStatus, setOrderStatus] = useRecoilState(orderStatusAtom);
    const [offerType, setOfferType] = useRecoilState(offerTypeAtom);
    const [countries, setCountries] = useRecoilState(countriesAtom); 
    const [faqCategories , setFaqCategories] = useState([]);

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
    
    const fetchCountryDropdown = async () => {
        setCountryLoading(true);
        try {
            const url = `${conf.apiBaseUrl}admin/country/all/dropdown`;

            const res = await fetchData({
                method: "GET",
                url,
            });

            if (res) {
                setCountries(res?.countries || res?.data || res || []);
            }
        } catch (error) {
            console.error("Error fetching countries:", error);
            toast.error("Failed to load countries");
        } finally {
            setCountryLoading(false);
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

        const fetchFaqCategories = async () => {
        setLoadingOfferType(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}admin/faq/categories`,
                  headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
            });
            if (res) {
                setFaqCategories(res?.data);
                setLoadingFaqCategories(false);
            }
        } catch (error) {
            console.error("Error fetching product dropdown:", error);
            setLoadingFaqCategories(false);
        } finally {
            setLoadingFaqCategories(false);
        }
    };

    
    const loading = loadingSales || loadingUser || loadingProduct || loadingOrderStatus || countryLoading;
    
    return { 
        loading, 
        loadingSales, 
        loadingUser, 
        loadingProduct, 
        loadingOrderStatus,
        countryLoading,
        fetchSalesType, 
        fetchProductCategory, 
        fetchOrderStatus, 
        fetchUserType, 
        fetchProductDropdown,
        fetchCountryDropdown,
        salesType, 
        userType, 
        productDropdown, 
        productCategory, 
        orderStatus,
        countries,
        resetUserType,
        fetchFaqCategories,
        faqCategories,
        loadingFaqCategories,
        fetchOfferType, loadingOfferType, offerType, fetchProducts: fetchProductDropdown, products: productDropdown, loadingProducts: loadingProduct 
    }
}

export default useDropdown