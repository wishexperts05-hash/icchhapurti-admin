import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();
import { createPersistedAtom } from "../recoilConfig";

export const allCommentandReviewsAtom = atom(createPersistedAtom("allCommentandReviewsKey", []));

export const commentReviewByIdAtom = atom (createPersistedAtom("commentReviewByIdKey", null));

export const userRatingAtom = atom (createPersistedAtom("userRatingKey", null))