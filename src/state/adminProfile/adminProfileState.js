import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const adminProfileAtom = atom({
    key: "adminProfile",
    default: [],
    effects_UNSTABLE: [persistAtom],
})
export const updateAdminAtom  = atom({
    key: "updateAdmin",
    default: [],
    effects_UNSTABLE: [persistAtom],
})