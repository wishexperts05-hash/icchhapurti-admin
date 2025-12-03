import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const privacyPolicyListAtom = atom({
  key: "privacyPolicyListKey",
  default: {
    data: [], 
    currentPage: 1,
    totalPages: 1,
    totalPolicies: 0,
    perPage: 10,
  },
  effects_UNSTABLE: [persistAtom],
});

export const privacyPolicyDetailAtom = atom({
  key: "privacyPolicyDetailKey",
  default: null,
  effects_UNSTABLE: [persistAtom],
});