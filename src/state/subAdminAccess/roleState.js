import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const rolesAtom = atom({
    key: "rolesKey",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const roleDetailsAtom = atom({
    key: "roleDetailsKey",
    default: null,
    effects_UNSTABLE: [persistAtom],
});