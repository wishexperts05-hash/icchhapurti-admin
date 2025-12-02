import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const termsAndConditionsListAtom = atom({
  key: "termsAndConditionsListKey",
  default: {
    data: [],
    currentPage: 1,
    totalPages: 1,
    totalTerms: 0,
    perPage: 10,
  },
  effects_UNSTABLE: [persistAtom],
});

export const termsAndConditionsDetailAtom = atom({
  key: "termsAndConditionsDetailKey",
  default: null,
  effects_UNSTABLE: [persistAtom],
});