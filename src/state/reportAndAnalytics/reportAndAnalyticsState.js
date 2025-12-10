import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const reportAndAnalyticsListAtom = atom({
  key: "reportAndAnalyticsListKey",
  default: [],
  effects_UNSTABLE: [persistAtom],
});