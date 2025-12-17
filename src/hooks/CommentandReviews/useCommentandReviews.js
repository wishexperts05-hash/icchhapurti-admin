import { useState, useCallback } from "react";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import conf from "../../config";
import useFetch from "../useFetch";
import { allCommentandReviewsAtom, commentReviewByIdAtom, userRatingAtom } from "../../state/Comment&Reviews/commentAndReviewsState";

const useCommentandReviews = () => {
  const [loading, setLoading] = useState(false);
  const [fetchData] = useFetch();
  const [commentAndReviews, setCommentAndReviews] = useRecoilState(allCommentandReviewsAtom);
  const [commentReviewById, setCommentReviewById] = useRecoilState(commentReviewByIdAtom);
  const [userRating, setUserRating] = useRecoilState(userRatingAtom);

  const fetchCommentsList = async (page, limit, search) => {
    setLoading(true);
    try {
      let url = `${conf.apiBaseUrl}admin/reviews/getAllReviews?page=${page}&limit=${limit}`;
      if (search && search.trim() !== "") {
        url += `&search=${encodeURIComponent(search.trim())}`;
      }
      const res = await fetchData({
        method: "GET",
        url,
      });
      if (res) {
        setCommentAndReviews(res);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching reviews list:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviewById = async (reviewId, reviewType) => {
    setLoading(true);
    try {
      let url = `${conf.apiBaseUrl}admin/reviews/getReviewById/${reviewId}/${reviewType}`
      const res = await fetchData({
        method: "GET",
        url
      })
      if (res?.success) {
        setCommentReviewById(res.data)
        setLoading(false);
      }
    }
    catch (error) {
      console.error(`Error Fetching Comment: ${error}`);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  const changeStatus = async (reviewId, reviewType, data) => {
    setLoading(true);
    try {
      let url = `${conf.apiBaseUrl}admin/reviews/updateReviewStatus/${reviewId}/${reviewType}`;
      const res = await fetchData({
        method: "PUT",
        url,
        data: data
      });
      if (res) {
        setCommentReviewById(res?.data)
        toast.success(res?.message);
        setLoading(false);
      }
      return res;
    } catch (error) {
      console.error(`Error while chnaging Status :${error}`);
      toast.error(error?.response?.data?.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  const fetchUserRating = async (reviewId, reviewType) => {
    setLoading(true);
    try {
      let url = `${conf.apiBaseUrl}admin/reviews/getUserRatingById/${reviewId}/${reviewType}`
      const res = await fetchData({
        method: "GET",
        url
      })
      if (res?.success) {
        setUserRating(res.data)
        setLoading(false);
      }
    }
    catch (error) {
      console.error(`Error Fetching Comment: ${error}`);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  const updatingUserRating = async (reviewId, reviewType, data) => {
    setLoading(true);
    try {
      let url = `${conf.apiBaseUrl}admin/reviews/updateUserRatingById/${reviewId}/${reviewType}`;
      const res = await fetchData({
        method: "PUT",
        url,
        data: data
      });
      if (res) {
        setUserRating(res?.data)
        toast.success(res?.message);
        setLoading(false);
      }
      return res;
    } catch (error) {
      console.error(`Error while chnaging Status :${error}`);
      toast.error(error?.response?.data?.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    commentAndReviews,
    fetchCommentsList,
    commentReviewById,
    fetchReviewById,
    fetchUserRating,
    userRating,
    changeStatus,
    updatingUserRating,
  };
};

export default useCommentandReviews;

