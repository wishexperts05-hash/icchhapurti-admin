// state/countryManagement/CountryManagementState.js
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const countryManagementListAtom = atom({
  key: "countryManagementListKey",
  // default shape the UI expects
  default: {
    country: [],        // array of country objects
    currentPage: 1,
    totalPages: 1,
    totalCountries: 0,
    perPage: 10,
  },
  effects_UNSTABLE: [persistAtom],
});
