// src/types/holiday.ts
export interface Holiday {
    date: string;
    localName: string;
    name: string;
    countryCode: string;
    fixed: boolean;
    global: boolean;
    counties: string[] | null;
    launchYear: number | null;
    types: string[];
}

export interface Country {
    countryCode: string;
    name: string;
}

export interface HolidayWithFact extends Holiday {
    fact?: string;
    daysUntil?: number;
}
