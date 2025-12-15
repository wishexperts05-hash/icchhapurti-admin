import { atom } from "recoil";
import { createPersistedAtom } from "../recoilConfig";

export const targetListAtom = atom(createPersistedAtom("targetListKey", []));

export const targetDetailsAtom = atom(createPersistedAtom("targetDetailsKey", null))