import React, { useState } from 'react'
import useFetch from '../useFetch';
import { useRecoilState } from 'recoil';
import conf from "../../config/index";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { confirmAlert } from "../../utils/alertToast";
import { blogDetailsAtom, blogListAtom } from '../../state/blogManagement/blogManagementState';

const useBlogManagement = () => {
    const [fetchData] = useFetch();
    const [loading, setLoading] = useState(false);
    const [blogList, setBlogList] = useRecoilState(blogListAtom);
    const [blogDetail, setBlogDetail] = useRecoilState(blogDetailsAtom);

    const fetchBlogList = async (page, limit, debouncedSearch) => {
        setLoading(true);
        try {
            let url = `${conf.apiBaseUrl}admin/blogs/all?page=${page}&limit=${limit}`;
            if (debouncedSearch) {
                url += `&search=${encodeURIComponent(debouncedSearch.trim())}`;
            }
            const res = await fetchData({
                method: "GET",
                url,
            });
            if (res) {
                setBlogList(res);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching blog list:", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const fetchBlogDetails = async (id) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}admin/blogs/get-blog-by-id/${id}`,
            });
            if (res) {
                setBlogDetail(res?.data);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching blog details:", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const resetBlogDetails = () => {
        setBlogDetail(null);
    }

    const createBlog = async (data) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "POST",
                url: `${conf.apiBaseUrl}admin/blogs/add`,
                data: data,
            });
            if (res) {
                toast.success(res?.message);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error creating blog:", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const updateBlog = async (id, data) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "PUT",
                url: `${conf.apiBaseUrl}admin/blogs/edit/${id}`,
                data: data,
            });
            if (res) {
                toast.success(res?.message);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error updating blog:", error);
            toast.error(error?.response?.data?.message);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const deleteBlog = async (id) => {
        const confirm = await confirmAlert(
            "Are you sure you want to delete this blog?"
        );
        if (!confirm) return;
        setLoading(true);
        if (confirm.isConfirmed) {
            try {
                const res = await fetchData({
                    method: "DELETE",
                    url: `${conf.apiBaseUrl}admin/blogs/delete/${id}`,
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
                console.error("Error deleting blog:", error);
                toast.error(error?.response?.data?.message);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        }
    };

    return {
        loading,
        blogList,
        blogDetail,
        fetchBlogList,
        fetchBlogDetails,
        resetBlogDetails,
        createBlog,
        updateBlog,
        deleteBlog,
    };
}

export default useBlogManagement