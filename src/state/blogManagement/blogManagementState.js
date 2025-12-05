import { atom } from "recoil";
import { createPersistedAtom } from "../recoilConfig";

export const blogListAtom = atom(createPersistedAtom("blogListKey", []));

export const blogDetailsAtom = atom(createPersistedAtom("blogDetailsKey", null));