import { useRecoilState } from "recoil";
import { storiesAtom } from "../../state/appManagement/StoriesState";
import { useState } from "react";
import useFetch from "../useFetch";
import conf from "../../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { confirmAlert } from "../../utils/alertToast";

const useStoriesSection = () => {
  const [stories, setAllStories] = useRecoilState(storiesAtom);
  const [loading, setLoading] = useState(false);
  const [storyDetail, setStoryDetail] = useState(null);
  const [fetchData] = useFetch();
   const navigate = useNavigate();

  // Get Other Settings
  
  const fetchAllStories = async (page,limit) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/ourStory?page=${page || ""}&limit=${limit || ""}`,
      });

      if (res) {
        setAllStories(res);
        // toast.success(res?.message || "Settings fetched successfully");
      }
    } catch (error) {
      console.error("Error fetching stories:", error);
      toast.error("Failed to fetch stories");
    } finally {
      setLoading(false);
    }
  };


  const createStory = async (formData) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}admin/ourStory`,
        data: formData,
      });

      if (res) {
        toast.success(res?.message || "Story Created Successfully");
        navigate("/app-management/stories-section");
      }

      return res;
    } catch (error) {
      console.error("Error creating story:", error);
      toast.error(
        error?.response?.data?.message || "Failed to create story"
      );
    } finally {
      setLoading(false);
    }
  };
    // Get Story By ID
  const fetchStoryById = async (id) => {
    setLoading(true);
    setStoryDetail(null);

    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/ourStory/${id}`,
      });

      if (res) {
        setStoryDetail(res);
      }

      return res;
    } catch (error) {
      console.error("Error fetching story details:", error);
      toast.error("Failed to fetch story details");
    } finally {
      setLoading(false);
    }
  };

    const editStory = async (id,formData) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "PUT",
        url: `${conf.apiBaseUrl}admin/ourStory/${id}`,
        data: formData,
      });

      if (res) {
        toast.success(res?.message || "Story Created Successfully");
        navigate("/app-management/stories-section");
      }

      return res;
    } catch (error) {
      console.error("Error creating story:", error);
      toast.error(
        error?.response?.data?.message || "Failed to edit story"
      );
    } finally {
      setLoading(false);
    }
  };

    const deleteStory = async (id) => {
    const result = await confirmAlert(
      "Do you really want to delete this Story?"
    );

    if (!result.isConfirmed) return;

    setLoading(true);

    try {
      const res = await fetchData({
        method: "DELETE",
        url: `${conf.apiBaseUrl}admin/ourStory/${id}`,
      });

      if (res) {
        Swal.fire({
          title: "Deleted!",
          text: res?.message || "Story Deleted Successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
      }

      return res;
    } catch (error) {
      console.error("Error deleting story:", error);
      toast.error(
        error?.response?.data?.message || "Failed to delete story"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    fetchAllStories,
    stories,
    createStory,
    fetchStoryById,
    storyDetail, editStory,
    
    deleteStory, 
  };
};

export default useStoriesSection;