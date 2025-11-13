import { atom } from "recoil";
import { createPersistedAtom } from "../recoilConfig";

export const adminProfileAtom = atom(createPersistedAtom("adminProfile", null));

export const updateAdminAtom = atom(createPersistedAtom("updateAdmin", null));

