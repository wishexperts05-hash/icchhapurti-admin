import { atom } from "recoil";
import { createPersistedAtom } from "../recoilConfig";

export const offerListAtom = atom(createPersistedAtom("offerListKey", []));

export const offerDetailsAtom = atom(createPersistedAtom("offerDetailsKey", null));
