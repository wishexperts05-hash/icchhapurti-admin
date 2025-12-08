import { atom } from "recoil";

export const helpSupportAtom = atom({
  key: "helpSupportAtom",
  default: {
    contactNumber: null,
    loading: false,
    error: null,
  },
});