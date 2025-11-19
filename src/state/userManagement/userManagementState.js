import { atom } from "recoil";
import { createPersistedAtom } from "../recoilConfig";

export const userListAtom = atom(createPersistedAtom("userListKey", []));

export const userDetailsAtom = atom(createPersistedAtom("userDetailsKey", null));