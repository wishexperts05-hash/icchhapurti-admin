import { atom } from "recoil";
import { createPersistedAtom } from "../recoilConfig";

export const staffListAtom = atom(createPersistedAtom("staffListKey", []));

export const staffDetailsAtom = atom(createPersistedAtom("staffDetailsKey", null));