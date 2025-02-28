// src/store/settingsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
    selectedCountry: string;
    selectedYear: number;
    theme: 'light' | 'dark';
    comparisonCountries: {
        country1: string;
        country2: string;
    };
}

const initialState: SettingsState = {
    selectedCountry: 'US', // Default to United States
    selectedYear: new Date().getFullYear(),
    theme: 'light',
    comparisonCountries: {
        country1: 'US',
        country2: 'GB' // Default to United States and United Kingdom for comparison
    }
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setSelectedCountry: (state, action: PayloadAction<string>) => {
            state.selectedCountry = action.payload;
        },
        setSelectedYear: (state, action: PayloadAction<number>) => {
            state.selectedYear = action.payload;
        },
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        },
        setComparisonCountry1: (state, action: PayloadAction<string>) => {
            state.comparisonCountries.country1 = action.payload;
        },
        setComparisonCountry2: (state, action: PayloadAction<string>) => {
            state.comparisonCountries.country2 = action.payload;
        }
    }
});

export const {
    setSelectedCountry,
    setSelectedYear,
    toggleTheme,
    setComparisonCountry1,
    setComparisonCountry2
} = settingsSlice.actions;
export default settingsSlice.reducer;
