import { atom } from "recoil";
import { createPersistedAtom } from "../recoilConfig";

export const salesTypeAtom = atom(createPersistedAtom("salesTypeKey", []));

export const userTypeAtom = atom(createPersistedAtom("userTypeKey", []));

export const productDropdownAtom = atom(createPersistedAtom("productDropdownKey", []));