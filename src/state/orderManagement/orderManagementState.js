import { atom } from "recoil";
import { createPersistedAtom } from "../recoilConfig";

export const orderListAtom = atom(createPersistedAtom("orderListKey", []));

export const orderDetailsAtom = atom(createPersistedAtom("orderDetailsKey", null));