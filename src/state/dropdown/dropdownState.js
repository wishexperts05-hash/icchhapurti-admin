import { atom } from "recoil";
import { createPersistedAtom } from "../recoilConfig";

export const salesTypeAtom = atom(createPersistedAtom("salesTypeKey", []));

export const userTypeAtom = atom(createPersistedAtom("userTypeKey", []));

export const productDropdownAtom = atom(createPersistedAtom("productDropdownKey", []));

export const productCategoryAtom = atom(createPersistedAtom("productCategoryKey", []));

export const orderStatusAtom = atom(createPersistedAtom("orderStatusKey", []));

export const faqCategoriesDropdownAtom = atom(createPersistedAtom("faqCategoriesDropdownKey", []));

export const offerTypeAtom = atom(createPersistedAtom("offerTypeKey", []));

export const countriesAtom = atom(createPersistedAtom("countriesAtomKey", []));
