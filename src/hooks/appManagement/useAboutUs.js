import { useRecoilState } from "recoil";
import { aboutUsAtom } from "../../state/appManagement/AboutUsState";
import { useState } from "react";
import useFetch from "../useFetch";
import conf from "../../config";
import { toast } from "react-toastify";

const useAboutUs = () => {
  const [aboutUs, setAboutUs] = useRecoilState(aboutUsAtom);
  const [loading, setLoading] = useState(false);
  const [fetchData] = useFetch();

  // Get About Us
  const fetchAboutUs = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/appManagement/aboutUs`,
      });

      if (res) {
        setAboutUs(res?.data);
      }
    } catch (error) {
      console.error("Error fetching about us:", error);
      toast.error("Failed to fetch About Us");
    } finally {
      setLoading(false);
    }
  };

  // Update About Us
  const updateAboutUs = async (formData) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "PUT",
        url: `${conf.apiBaseUrl}admin/appManagement/aboutUs`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res) {
        setAboutUs(res?.data);
        toast.success(res?.message || "About Us updated successfully");
        return res;
      }
    } catch (error) {
      console.error("Error updating about us:", error);
      toast.error(
        error?.response?.data?.message || "Failed to update About Us"
      );
    } finally {
      setLoading(false);
    }
  };

  // Delete Image from About Us
  const deleteAboutUsImage = async (type, imageId) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "DELETE",
        url: `${conf.apiBaseUrl}admin/appManagement/aboutUs/deleteImage`,
        data: {
          type: type, // "heroSection", "ourMission", "ourVision", "ourTeam1", "ourTeam2", "ourTeam3"
          imageId: imageId,
        },
      });

      if (res) {
        toast.success(res?.message || "Image deleted successfully");
        // Refetch to get updated data
        await fetchAboutUs();
        return res;
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error(
        error?.response?.data?.message || "Failed to delete image"
      );
    } finally {
      setLoading(false);
    }
  };

  // Reset About Us
  const resetAboutUs = () => {
    setAboutUs(null);
  };

  return {
    loading,
    aboutUs,
    fetchAboutUs,
    updateAboutUs,
    deleteAboutUsImage,
    resetAboutUs,
  };
};

export default useAboutUs;