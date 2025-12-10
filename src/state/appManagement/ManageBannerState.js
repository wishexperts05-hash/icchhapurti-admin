import { atom } from "recoil";

export const bannerManagementListAtom = atom({
  key: "bannerManagementList",
  default: {
    data: [],
    totalPages: 0,
    currentPage: 1,
    totalCount: 0,
  },
});

export const bannerDetailAtom = atom({
  key: "bannerDetail",
  default: null,
});