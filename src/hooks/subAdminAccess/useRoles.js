import { confirmAlert } from '../../utils/alertToast';
import Swal from "sweetalert2";
import conf from "../../config";
import useFetch from "../useFetch";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { toast } from "react-toastify";
import { roleDetailsAtom, rolesAtom } from '../../state/subAdminAccess/roleState';

const useRoles = () => {
    const [fetchData] = useFetch();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useRecoilState(rolesAtom);
    const [roleDetails, setRoleDetails] = useRecoilState(roleDetailsAtom);

    const fetchRoles = async (page, limit, search) => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page,
                limit,
                search
            });
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}admin/roles/getAllRoles?${params}`,
            });
            if (res) {
                setRoles(res);
                setLoading(false);
            }
        } catch (err) {
            console.error("Error fetching roles list:", err);
            setError(err);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const fetchRoleDetails = async (id) => {
        setRoleDetails(null);
        setLoading(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}admin/roles/getRoleById/${id}`,
            });
            if (res) {
                setRoleDetails(res?.data);
                setLoading(false);
            }
        } catch (err) {
            console.error("Error fetching role details:", err);
            setError(err);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const addRole = async (data) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "POST",
                url: `${conf.apiBaseUrl}admin/roles/createRole`,
                data: data
            });
            if (res) {
                toast.success(res?.message);
                setLoading(false);
                return res;
            }
        } catch (err) {
            console.error("Error adding role:", err);
            toast.error(err?.response?.data?.message);
            setError(err);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const updateRole = async (id, data) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "PUT",
                url: `${conf.apiBaseUrl}admin/roles/updateRole/${id}`,
                data: data
            });
            if (res) {
                toast.success(res?.message);
                setLoading(false);
                return res;
            }
        } catch (err) {
            console.error("Error updating role:", err);
            toast.error(err?.response?.data?.message);
            setError(err);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const deleteRole = async (id) => {
        const result = await confirmAlert(
            "Do you really want to delete this role?"
        );
        if (result.isConfirmed) {
            try {
                setLoading(true);
                const res = await fetchData({
                    method: "DELETE",
                    url: `${conf.apiBaseUrl}admin/roles/deleteRole/${id}`,
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
                console.error("Error deleting role:", err);
                toast.error(err?.response?.data?.message)
                setError(err);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        }
    }

    const resetDetails = () => {
        setRoleDetails(null);
    }

    return {loading, error, roles, roleDetails, fetchRoles, fetchRoleDetails, addRole,
            resetDetails, updateRole, deleteRole};
}

export default useRoles