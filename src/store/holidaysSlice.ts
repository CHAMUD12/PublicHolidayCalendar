// src/store/holidaysSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchHolidays, fetchHolidayFact, compareHolidays } from '../api/holidayApi';
import { Holiday, HolidayWithFact } from '../types/holiday';

interface HolidaysState {
    holidays: HolidayWithFact[];
    comparisonHolidays: {
        country1: HolidayWithFact[];
        country2: HolidayWithFact[];
    };
    loading: boolean;
    error: string | null;
}

const initialState: HolidaysState = {
    holidays: [],
    comparisonHolidays: {
        country1: [],
        country2: []
    },
    loading: false,
    error: null,
};

export const fetchHolidaysWithFacts = createAsyncThunk(
    'holidays/fetchWithFacts',
    async ({ countryCode, year }: { countryCode: string; year: number }) => {
        const holidays = await fetchHolidays(countryCode, year);

        // Calculate days until each holiday
        const now = new Date();
        const holidaysWithExtras = await Promise.all(
            holidays.map(async (holiday) => {
                const holidayDate = new Date(holiday.date);
                let daysUntil = Math.ceil((holidayDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

                // If the holiday already passed this year, calculate for next year
                if (daysUntil < 0) {
                    const nextYearDate = new Date(holiday.date);
                    nextYearDate.setFullYear(nextYearDate.getFullYear() + 1);
                    daysUntil = Math.ceil((nextYearDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                }

                // Fetch fact about the holiday
                const fact = await fetchHolidayFact(holiday.name);

                return {
                    ...holiday,
                    fact,
                    daysUntil
                };
            })
        );

        return holidaysWithExtras;
    }
);

export const compareCountryHolidays = createAsyncThunk(
    'holidays/compareCountries',
    async ({
               countryCode1,
               countryCode2,
               year
           }: {
        countryCode1: string;
        countryCode2: string;
        year: number
    }) => {
        const { country1, country2 } = await compareHolidays(countryCode1, countryCode2, year);

        // Add facts and days until for both countries
        const now = new Date();

        const processHolidays = async (holidays: Holiday[]): Promise<HolidayWithFact[]> => {
            return Promise.all(
                holidays.map(async (holiday) => {
                    const holidayDate = new Date(holiday.date);
                    let daysUntil = Math.ceil((holidayDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

                    if (daysUntil < 0) {
                        const nextYearDate = new Date(holiday.date);
                        nextYearDate.setFullYear(nextYearDate.getFullYear() + 1);
                        daysUntil = Math.ceil((nextYearDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                    }

                    const fact = await fetchHolidayFact(holiday.name);

                    return {
                        ...holiday,
                        fact,
                        daysUntil
                    };
                })
            );
        };

        const country1WithFacts = await processHolidays(country1);
        const country2WithFacts = await processHolidays(country2);

        return {
            country1: country1WithFacts,
            country2: country2WithFacts
        };
    }
);

const holidaysSlice = createSlice({
    name: 'holidays',
    initialState,
    reducers: {
        clearHolidays: (state) => {
            state.holidays = [];
        },
        clearComparisonHolidays: (state) => {
            state.comparisonHolidays = { country1: [], country2: [] };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHolidaysWithFacts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHolidaysWithFacts.fulfilled, (state, action: PayloadAction<HolidayWithFact[]>) => {
                state.holidays = action.payload;
                state.loading = false;
            })
            .addCase(fetchHolidaysWithFacts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch holidays';
            })
            .addCase(compareCountryHolidays.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(compareCountryHolidays.fulfilled, (state, action) => {
                state.comparisonHolidays = action.payload;
                state.loading = false;
            })
            .addCase(compareCountryHolidays.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to compare holidays';
            });
    }
});

export const { clearHolidays, clearComparisonHolidays } = holidaysSlice.actions;
export default holidaysSlice.reducer;
