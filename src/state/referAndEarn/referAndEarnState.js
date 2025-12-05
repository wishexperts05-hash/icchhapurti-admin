import { atom } from "recoil";
import { createPersistedAtom } from "../recoilConfig";

export const referVideoAtom = atom(createPersistedAtom("referVideoKey", null));

export const referralTrackingAtom = atom(createPersistedAtom("referralTrackingKey", []));

export const referralTrackingByIdAtom = atom(createPersistedAtom("referralTrackingByIdKey", null));

export const referralDisSettingAtom = atom(createPersistedAtom("referralDisSettingKey", []));

export const refferalDisSettingByIdAtom = atom(createPersistedAtom("referralDisSettingByIdKey", null));
