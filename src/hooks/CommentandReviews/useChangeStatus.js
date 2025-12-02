import { useState, useCallback } from "react";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import conf from "../../config";
import useFetch from "../useFetch";
import { getCommentById } from "../../state/Comment&Reviews/commentAndReviewsState";

const useChangeStatus = () => {
  const [loading, setLoading] = useState(false);
  const [fetchData] = useFetch();
  const [commentById, setCommentById] = useRecoilState(getCommentById);

  const changeStatus = useCallback(
    async (reviewId, reviewType, newStatus) => {
      setLoading(true);
      try {
        let url = `${conf.apiBaseUrl}admin/reviews/updateReviewStatus/${reviewId}/${reviewType}`;

        console.log("Calling updateReviewStatus with:", {
          reviewId,
          reviewType,
          newStatus,
        });
        const res = await fetchData({
          method: "PUT",
          url,
          data: {
            status: newStatus,
            userType: reviewType, // "show" or "hide"
          },
        });

        if (res?.success) {
          setCommentById((prev) =>
            prev && prev._id === reviewId
              ? { ...prev, status: newStatus }
              : prev
          );
        } else {
          toast.error(res?.message || "Failed to change status");
        }

        return res;
      } catch (error) {
        console.error(`Error while chnaging Status :${error}`);
        toast.error(`Error Occured !`);
      } finally {
        setLoading(false);
      }
    },
    [fetchData, setCommentById]
  );
  return {
    loading,
    commentById,
    changeStatus,
  };
};

export default useChangeStatus;
