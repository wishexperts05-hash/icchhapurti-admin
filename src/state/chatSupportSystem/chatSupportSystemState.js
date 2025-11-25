import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const chatSupportSystemListAtom = atom({
  key: "chatSupportSystemListKey",
  default: [],
  effects_UNSTABLE: [persistAtom],
});