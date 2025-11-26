import { atom } from "recoil";
import { createPersistedAtom } from "../recoilConfig";

export const withdrawSettingAtom = atom(createPersistedAtom("withdrawSettingKey", null));
