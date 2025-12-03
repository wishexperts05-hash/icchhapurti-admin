import { atom } from "recoil";

export const faqListAtom = atom({
  key: "faqListAtom",
  default: {
    data: [],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalRecords: 0,
      limit: 10,
      hasNextPage: false,
      hasPrevPage: false,
    },
  },
});

export const faqDetailAtom = atom({
  key: "faqDetailAtom",
  default: null,
});

