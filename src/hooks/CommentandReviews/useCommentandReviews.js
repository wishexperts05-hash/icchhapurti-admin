import { useState, useCallback } from "react";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import conf from "../../config";
import useFetch from "../useFetch";
import { getAllCommentandReviewsAtom } from "../../state/Comment&Reviews/commentAndReviewsState";

const useCommentandReviews = () => {
  const [loading, setLoading] = useState(false);
  const [fetchData] = useFetch();
  const [commentAndReviews, setCommentAndReviews] = useRecoilState(getAllCommentandReviewsAtom);

  const fetchCommentsList = useCallback(
    async (page, limit, search) => {
      setLoading(true);
      try {
        let url = `${conf.apiBaseUrl}admin/reviews/getAllReviews?page=${
          page || 1
        }&limit=${limit || ""}`;

        if (search && search.trim() !== "") {
          url += `&search=${encodeURIComponent(search.trim())}`;
        }

        const res = await fetchData({
          method: "GET",
          url,
        });

        if (res) {
          setCommentAndReviews(res);
        }
      } catch (error) {
        console.error("Error fetching reviews list:", error);
        toast.error("Failed to load comments & reviews");
      } finally {
        setLoading(false);
      }
    },
    [fetchData, setCommentAndReviews]
  );

  return {
    loading,
    commentAndReviews,
    fetchCommentsList,
  };
};

export default useCommentandReviews;

