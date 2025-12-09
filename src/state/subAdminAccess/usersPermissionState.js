import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const usersPermissionAtom = atom({
    key: "usersPermissionKey",
    default: [],
    effects_UNSTABLE: [persistAtom],
})

export const usersPermissionDetailAtom = atom({
    key: "usersPermissionDetailKey",
    default: null,
    effects_UNSTABLE: [persistAtom],
})

export const usersDropListAtom = atom({
    key: "usersDropListKey",
    default: [],
    effects_UNSTABLE: [persistAtom],
})