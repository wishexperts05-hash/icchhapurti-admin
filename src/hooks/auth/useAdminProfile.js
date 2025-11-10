import useFetch from "../useFetch";
import { useState } from "react";
import { useRecoilState } from "recoil";
import conf from "../../config/index";
import { adminProfileAtom, updateAdminAtom } from "../../state/adminProfile/adminProfileState";
import { toast } from 'react-toastify';

const useAdminProfile = () => {
    const [fetchData] = useFetch();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState("");
    const [adminProfile, setAdminProfile] = useRecoilState(adminProfileAtom);

    const fetchAdminProfile = async () => {
        setAdminProfile(null)
        setLoading(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}admin/getAdminProfile`,
            });
            if (res) {
                setAdminProfile(res);
                console.log(res)
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching admin profile:", error);
            setLoading(false);
        }
    };

    const updateAdminProfile = async (data) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "PUT",
                url: `${conf.apiBaseUrl}admin/updateAdminProfile`,
                data: data,
            });
            if (res) {
                setAdminProfile(res);
                toast.success(res?.message);
                setLoading(false);
                return res;
            }
        } catch (error) {
            console.error("Error updating admin profile:", error);
            toast.error(error?.response?.data?.message||"An unexpected error occured");
            setLoading(false);
            return false; 
        }
    };
    return { fetchAdminProfile, loading, errors, adminProfile, updateAdminProfile};
}

export default useAdminProfile