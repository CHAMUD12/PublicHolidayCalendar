// src/types/navigation.ts
import {HolidayWithFact} from "./holiday";

export type RootStackParamList = {
    Home: undefined;
    Details: { holiday: HolidayWithFact };
    Calendar: undefined;
    Comparison: undefined;
    Settings: undefined;
};
