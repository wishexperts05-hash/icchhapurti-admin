import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const usersAtom = atom({
    key: "usersListKey",
    default: [],
    effects_UNSTABLE: [persistAtom],
})

export const usersDetailAtom = atom({
    key: "userDetailsIdKey",
    default: null,
    effects_UNSTABLE: [persistAtom],
})

export const roleNameListAtom = atom({
    key: "roleNameDropKey",
    default: [],
    effects_UNSTABLE: [persistAtom],
})