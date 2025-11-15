import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const getAllRedeemRequestsAtom = atom({
  key: "getAllRedeemRequests",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const getRedeemRequestAtom = atom({
  key: "getRedeemRequest",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const getDropdownOfStatusAtom = atom({
  key: "getDropdownOfStatus",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
