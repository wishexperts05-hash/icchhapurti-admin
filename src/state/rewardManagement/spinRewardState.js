import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const spinRewardListAtom = atom({
  key: "spinRewardListKey",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
