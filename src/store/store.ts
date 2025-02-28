// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import holidaysReducer from './holidaysSlice';
import settingsReducer from './settingsSlice';

export const store = configureStore({
    reducer: {
        holidays: holidaysReducer,
        settings: settingsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
