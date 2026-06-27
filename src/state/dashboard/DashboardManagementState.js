import { atom } from "recoil";
import { createPersistedAtom } from "../recoilConfig";

export const dashboardTotalStateAtom = atom(createPersistedAtom("dashboardtotalcountkey", null));

export const saleChartAtom = atom(createPersistedAtom("salechart", null));

export const CityWiseSalesReportAtom = atom(createPersistedAtom("citysalesreport", { monthlyData: [] }));

export const totalUserAtom = atom(createPersistedAtom("totalusers", null));

export const totalstaffAtom = atom(createPersistedAtom("totalstaff", { monthlyData: [] }));

