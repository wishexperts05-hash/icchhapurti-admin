import { atom } from "recoil";
import { createPersistedAtom } from "../recoilConfig";

export const withdrawSettingAtom = atom(createPersistedAtom("withdrawSettingKey", null));

export const commsissionSettingsListAtom = atom(createPersistedAtom("commsissionSettingsListKey", []));

export const commsissionSettingDetailsAtom = atom(createPersistedAtom("commsissionSettingDetailsKey", null));

export const coinSettingAtom = atom(createPersistedAtom("coinSettingKey", null));