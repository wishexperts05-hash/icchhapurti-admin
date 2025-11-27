import { useRecoilState } from "recoil";
import { countryManagementListAtom } from "../../state/countryManagement/CountryManagementState";
import { useState } from "react";
import useFetch from "../useFetch";
import { useNavigate } from "react-router-dom";
import conf from "../../config";
import { toast } from "react-toastify";
import { confirmAlert } from "../../utils/alertToast";
import Swal from "sweetalert2";


const useCountryManagement = () => {
  const [countryList, setCountryList] = useRecoilState(
    countryManagementListAtom
  );
  const [countryDetail, setCountryDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dropdown,setDropdown] = useState([]);
  const [fetchData] = useFetch();
  const navigate = useNavigate();


  const fetchCountryList = async (page, limit, search) => {
    setLoading(true);
    try {
      let url = `${conf.apiBaseUrl}admin/country/all?page=${page || 1}&limit=${
        limit || ""
      }`;
      if (search && search.trim() !== "") {
        url += `&search=${encodeURIComponent(search.trim())}`;
      }

      const res = await fetchData({
        method: "GET",
        url,
      });

      if (res) {
        setCountryList(res);
      }
    } catch (error) {
      console.error("Error fetching country list", error);
      toast.error("Failed to fetch Country List");
    } finally {
      setLoading(false);
    }
  };

  const resetCountryList = () => {
    setCountryList([]);
  };

  const updateCountry = async (id, data) => {
    // setLoading(true);

    try {
      const res = await fetchData({
        method: "PUT",
        url: `${conf.apiBaseUrl}admin/country/${id}`,
        data,
      });

      if (res) {
        toast.success(res?.message);
        
        navigate(`/country-management`);
        // console.log(res);
      }
    } catch (error) {
      console.error("Error updating country details", error);
      toast.error(
        error?.response?.data?.message || "An unexpected error occured"
      );
    } finally {
      setLoading(false);
    }
  };

  const addCountry = async (formdata) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}admin/country/add`,
        data: formdata,
      });
      if (res) {
        toast.success(res?.message);
        navigate("/country-management");
        setLoading(false);
        // console.log(res);
      }
    } catch (error) {
      console.error("Error creating counrty:", error);
      toast.error(
        error?.response?.data?.message || "An unexpected error occured"
      );
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchCountryDetailById = async (id) => {
    setCountryDetail(null);
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/country/${id}`,
      });
      if (res) {
        setCountryDetail(res);
        // console.log(res);
      }
    } catch (error) {
      console.error("Error fetching country details:", error);
    } finally {
      setLoading(false);
    }
  };
  const resetCountryDetails = () => {
    setCountryDetail(null);
  };

  const deleteCountryListById = async (id) => {
    const result = await confirmAlert(
      "Do you really want to delete this Country?"
    );
    if (result.isConfirmed) {
      try {
        setLoading(true);
        const res = await fetchData({
          method: "DELETE",
          url: `${conf.apiBaseUrl}admin/country/delete/${id}`,
        });

        if (res) {
          Swal.fire({
            title: "Deleted!",
            text: res?.message,
            icon: "success",
            confirmButtonText: "OK",
          });
          setLoading(false);
          return res;
        }
      } catch (err) {
        console.error("Error deleting  country:", err);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };

  const countryDropdown = async()=>{

    setDropdown([]);
    setLoading(true);

    try{
        const res = await fetchData({
            method:"GET",
            url: `${conf.apiBaseUrl}admin/country/all/dropdown-add`,
        });

        if (res) {
  const list = res?.data || res?.countries || res?.list || [];
  setDropdown(list);
//   console.log("Dropdown list:", list);
}

    }catch (error) {
            console.error("Failed to load dropdown:", error);
        }
        finally {
            setLoading(false)
        }
    };
    

    const getCountryByName = async (name) => {
  try {
    const res = await fetchData({
      method: "GET",
      url: `${conf.apiBaseUrl}admin/country/name/${name}`,
    });

    return res?.country || null;
  } catch (error) {
    console.error("Error fetching country by name:", error);
    return null;
  }
};

 

  return {
    loading,
    countryList,
    fetchCountryList,
    resetCountryList,
    countryDetail,
    addCountry,
    updateCountry,
    fetchCountryDetailById,
    countryDropdown,
    resetCountryDetails,
    deleteCountryListById,
    dropdown,
    getCountryByName
  };
};

export default useCountryManagement;
