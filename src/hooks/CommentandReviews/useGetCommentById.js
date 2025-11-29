import { useState, useCallback } from "react";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import conf from "../../config";
import useFetch from "../useFetch";
import { getCommentById } from "../../state/Comment&Reviews/commentAndReviewsState";

const useGetCommentById =()=> {
 const [loading, setLoading] = useState(false);
  const [fetchData] = useFetch();
  const [commentById, setCommentById]=useRecoilState(getCommentById);

  const fetchComment = useCallback(
    async(reviewId, reviewType)=>{
        setLoading(true);
        try{
         let url=`${conf.apiBaseUrl}admin/reviews/getReviewById/${reviewId}/${reviewType}`


         const res = await fetchData({
            method:"GET",
            url
         })

         if(res?.success){
            setCommentById(res.data)
         }
        }
        catch(error){
        console.error(`Error Fetching Comment: ${error}`);
        toast.error(`Failed to Load the Comment`)
        }finally{
            setLoading(false);
        }
        
    }, [fetchData,setCommentById]
  )
  return {
    loading,
    commentById,
    fetchComment
  }
}

export default useGetCommentById


