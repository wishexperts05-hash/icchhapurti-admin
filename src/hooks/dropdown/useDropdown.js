import React, { useState } from "react";
import useFetch from "../useFetch";
import conf from "../../config/index";

import {
  offerTypeAtom,
  orderStatusAtom,
  productCategoryAtom,
  productDropdownAtom,
  salesTypeAtom,
  userTypeAtom,
  countriesAtom,
  bannerTypesAtom,
  appTypesAtom,
} from "../../state/dropdown/dropdownState";

import { useRecoilState } from "recoil";


const useDropdown = () => {
  const [fetchData] = useFetch();

  const [loadingSales, setLoadingSales] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [loadingOrderStatus, setLoadingOrderStatus] = useState(false);
  const [loadingOfferType, setLoadingOfferType] = useState(false);
  const [countryLoading, setCountryLoading] = useState(false);
  const [loadingBannerTypes, setLoadingBannerTypes] = useState(false);
  const [loadingAppTypes, setLoadingAppTypes] = useState(false);
  const [loadingBankList,setLoadingBankList] =useState (false);
  const [cities, setCities] = useState([]);



  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingRegion,setLoadingRegion]=useState(false);
 
  const [salesType, setSalesType] = useRecoilState(salesTypeAtom);
  const [userType, setUserType] = useRecoilState(userTypeAtom);
  const [productDropdown, setProductDropdown] = useRecoilState(productDropdownAtom);
  const [productCategory, setProductCategory] = useRecoilState(productCategoryAtom);
  const [orderStatus, setOrderStatus] = useRecoilState(orderStatusAtom);
  const [offerType, setOfferType] = useRecoilState(offerTypeAtom);
  const [countries, setCountries] = useRecoilState(countriesAtom);
  const [bannerTypes, setBannerTypes] = useRecoilState(bannerTypesAtom);
  const [appTypes, setAppTypes] = useRecoilState(appTypesAtom);
  const [region ,setRegion]=useState([]);
  const [banklist ,setBanklist]  =useState ([]);
  const [states, setStates] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [countryCode,setCountryCode] = useState();
  const [loadingCode, setLoadingCode] = useState(false);
  const [userTypeFAQ ,setUserTypeFAQ] =useState([])
  const [dropdownfaq, setDropdownfaq] = useState ([]);

  const fetchAlCountriescallingcodes = async () => {
  setLoadingCode(true);

  try {
    const res = await fetchData({
      method: "GET",
      url: `${conf.apiBaseUrl}admin/country/all/calling-code/dropdown`,
    });
    if (res?.success) {
      setCountryCode(res.countries || []);
    }
  } finally {
    setLoadingCode(false);
  }
};

const fetchAppTypesDropdown = async () => {
  setLoadingAppTypes(true);

  try {

    const res = await fetchData({
      method: "GET",
      url: `${conf.apiBaseUrl}admin/banners/getAppTypesDropdown`,
    });

    if (res?.success) {
      setAppTypes(res.data || []);
    }
  } finally {
    setLoadingAppTypes(false);
  }
};

const resetAppTypes = () => setAppTypes([]);

const fetchBannerTypesDropdown = async (appType = null) => {
  setLoadingBannerTypes(true);

  try {
    const params = new URLSearchParams();
    if (appType) params.append("appType", appType);  

    const res = await fetchData({
      method: "GET",
      url: `${conf.apiBaseUrl}admin/banners/getBannerTypesDropdown?${params.toString()}`,
    });

    if (res?.success) {
      setBannerTypes(res.data || []);
    } else {
      setBannerTypes([]);
    }
  } finally {
    setLoadingBannerTypes(false);
  }
};

const resetBannerTypes = () => setBannerTypes([]);

  const fetchSalesType = async () => {
    setLoadingSales(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/commissionSetting/getCommissionTypeDropdownValues`,
      });
      if (res) setSalesType(res?.data);
    } finally {
      setLoadingSales(false);
    }
  };  

  const fetchUserType = async (salesType = null) => {
    setLoadingUser(true);
    try {
      const params = new URLSearchParams();
      if (salesType) params.append("salesType", salesType);

      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/commissionSetting/getUserTypeDropdownValues?${params.toString()}`,
      });

      if (res) setUserType(res?.data);
    } finally {
      setLoadingUser(false);
    }
  };

  const resetUserType = () => setUserType([]);

  const fetchProductDropdown = async () => {
    setLoadingProduct(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}product/dropdown`,
      });
      if (res) setProductDropdown(res?.products);
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
      if (res) setProductCategory(res?.products);
    } finally {
      setLoadingProduct(false);
    }
  };
  // -----------------------------
  // country dropdown
  // -----------------------------
  const fetchCountryDropdown = async () => {
    setCountryLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/country/all/dropdown`,
      });
      if (res) setCountries(res?.countries || res?.data || []);
    } finally {
      setCountryLoading(false);
    }
  };

// -----------------------------
// states dropdown (BY COUNTRY)
// -----------------------------
const fetchStatesByCountry = async (countryName) => {
  if (!countryName) {
    setStates([]);
    return;
  }

  setLoadingStates(true);
  try {
    const res = await fetchData({
      method: "POST",
      url: `${conf.apiBaseUrl}admin/country/external/states`,
      data: { country: countryName },
    });

    if (res?.success) {
      setStates(res.states || []);
    } else {
      setStates([]);
    }
  } finally {
    setLoadingStates(false);
  }
};

const fetchCitiesByState = async (countryName, stateName) => {
  if (!countryName || !stateName) {
    setCities([]);
    return;
  }

  setLoadingCities(true);
  try {
    const res = await fetchData({
      method: "POST",
      url: `${conf.apiBaseUrl}admin/country/external/cities`,
      data: { country: countryName, state: stateName },
    });

    if (res?.success && Array.isArray(res.cities)) {
      setCities(res.cities); // ✅ THIS WAS THE BUG
    } else {
      setCities([]);
    }
  } finally {
    setLoadingCities(false);
  }
};

  // -----------------------------
  // order status
  // -----------------------------
  const fetchOrderStatus = async () => {
    setLoadingOrderStatus(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/orders/getOrderStatus`,
      });

      if (res) setOrderStatus(res?.data);
    } finally {
      setLoadingOrderStatus(false);
    }
  };
  // -----------------------------
  // offer type
  // -----------------------------
  const fetchOfferType = async () => {
    setLoadingOfferType(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/offers/dropdown/offer-types`,
      });

      if (res) setOfferType(res?.data);
    } finally {
      setLoadingOfferType(false);
    }
  };

  // ----------------------------- BANK LIST ----------------------------------- //
    const fetchBanklist = async () => {
    setLoadingBankList(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/staff/dropdown/bank-list`,
      });
      if (res) setBanklist(res?.bankList);
    } finally {
      setLoadingBankList(false);
    }
  };

// -----------------------------Region Dropdown----------------------------------- //
  const fetchAllRegion = async () => {
  setLoadingRegion(true);
  try {
    const res = await fetchData({
      method: "GET",
      url: `${conf.apiBaseUrl}admin/shipping/available-domestic-regions`,
    });
    if (res?.success) {
      setRegion(res.regions|| []);
    }
  } finally {
    setLoadingRegion(false);
  }
};


// ----------------------------- User Type Dropdown----------------------------------- //
  const fetchAllUserType = async () => {
  setLoadingUser(true);
  try {
    const res = await fetchData({
      method: "GET",
      url: `${conf.apiBaseUrl}admin/termsAndCondition/userType-dropdown`,
    });
    if (res?.success) {
      setUserTypeFAQ(res.data || []);
    }
  } finally {
    setLoadingUser(false);
  }
};

// -----------------------------Fetch user type in FAQ management----------------------------------- //
const fetchUserTypeFAQ = async () => {
  setLoadingUser(true);
  try { 
    const res = await fetchData({
      method: "GET",
      url: `${conf.apiBaseUrl}admin/faq/categories`,
    });
    if (res?.success) {
      setDropdownfaq(res.data || []);
    }
  } finally {
    setLoadingUser(false);
  } 
};

  const loading =
    loadingSales ||
    loadingRegion ||
    loadingUser ||
    loadingProduct ||
    loadingOrderStatus ||
    countryLoading ||
    loadingBannerTypes ||
    loadingBankList ||
    loadingStates ||
    loadingCode ||
    loadingAppTypes ||
    loadingCities ||
    loadingOfferType;

  return {
    loading,
    region,
   fetchAllRegion,  fetchAllUserType,userTypeFAQ,
    fetchCitiesByState,
    fetchSalesType,
    fetchProductCategory,
    fetchOrderStatus,
    fetchUserType,
    fetchUserTypeFAQ,
    fetchProductDropdown,
    fetchCountryDropdown,
    fetchStatesByCountry,
fetchAlCountriescallingcodes,
    fetchBannerTypesDropdown,
    fetchAppTypesDropdown,
    fetchBanklist,
    
    states,
    countryCode,
    cities,
    banklist,
    salesType,
    userType,
    productDropdown,
    productCategory,
    orderStatus,
    countries,
    bannerTypes,
    appTypes,
    dropdownfaq,

    resetUserType,
    resetBannerTypes,
    resetAppTypes,

    fetchOfferType,
    loadingOfferType,
    offerType,
  };
};

export default useDropdown;
