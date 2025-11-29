import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

// Notification List State
export const notificationListAtom = atom({
  key: "notificationListKey",
  default: {
    data: [], // Array of notification objects
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalRecords: 0,
      limit: 10,
    },
    hasNextPage: false,
    hasPrevPage: false,
  },
  effects_UNSTABLE: [persistAtom],
});

// Notification Detail State
export const notificationDetailAtom = atom({
  key: "notificationDetailKey",
  default: null,
  effects_UNSTABLE: [persistAtom],
});