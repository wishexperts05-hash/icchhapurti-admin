import { useRecoilState } from "recoil";
import { testimonialsAtom } from "../../state/appManagement/TestimonialState";
import { useState } from "react";
import useFetch from "../useFetch";
import conf from "../../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { confirmAlert } from "../../utils/alertToast";

const useTestimonials = () => {
  const [testimonials, setAllTestimonials] = useRecoilState(testimonialsAtom);
  const [loading, setLoading] = useState(false);
  const [fetchData] = useFetch();
  const navigate = useNavigate();

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/testimonials/`,
      });

      if (res) {
        setAllTestimonials(res.data || []);
        // toast.success(res?.message || "Settings fetched successfully");
      }
    } catch (error) {
      console.error("Error fetching stories:", error);
      toast.error("Failed to fetch stories");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Create Testimonial ---------------- */
  const createTestimonial = async (formData) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}admin/testimonials/`,
        data: formData,
      });

      if (res?.success) {
        toast.success(res?.message || "Testimonial created");
        navigate("/app-management/testimonials");
      }

      return res;
    } catch (error) {
      console.error("Error creating testimonial:", error);
      toast.error(
        error?.response?.data?.message || "Failed to create testimonial"
      );
    } finally {
      setLoading(false);
    }
  };
  /* ---------------- Delete Story ---------------- */
  const deleteTestimonial = async (imageUrl) => {
    const result = await confirmAlert(
      "Do you really want to delete this testimonials?"
    );

    if (!result.isConfirmed) return;

    setLoading(true);

    try {
      const res = await fetchData({
        method: "DELETE",
        url: `${conf.apiBaseUrl}admin/testimonials`,
        data: {
          image: imageUrl,
        },
      });

      if (res) {
        Swal.fire({
          title: "Deleted!",
          text: res?.message || "Testimonials Deleted Successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
      if (res?.success) {
        fetchTestimonials(); // 🔁 reload from backend
      }

      return res;
    } catch (error) {
      console.error("Error deleting story:", error);
      toast.error(error?.response?.data?.message || "Failed to delete story");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    fetchTestimonials,
    testimonials,
    createTestimonial,
    deleteTestimonial,
  };
};

export default useTestimonials;
