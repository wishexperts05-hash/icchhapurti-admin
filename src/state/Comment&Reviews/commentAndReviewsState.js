import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();


export const getAllCommentandReviewsAtom= atom({
    key: "getAllCommentandReviews", 
    default:[],
     effects_UNSTABLE: [persistAtom]
})

export const getCommentById=atom({
    key:"getCommentById",
    default:{},
    effects_UNSTABLE: [persistAtom]  // this will persit the value even after refresh
})