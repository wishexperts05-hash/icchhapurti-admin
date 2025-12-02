import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const luckyDrawListAtom = atom({
  key: "luckyDrawListAtomKey",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const luckyDrawDetailsAtom = atom({
  key: "luckyDrawListAtomKey",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
