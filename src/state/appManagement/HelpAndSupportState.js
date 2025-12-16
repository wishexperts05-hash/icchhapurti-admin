import { atom } from "recoil";
import { createPersistedAtom } from "../recoilConfig";

export const helpSupportAtom = atom(createPersistedAtom("helpSupportKey", null));