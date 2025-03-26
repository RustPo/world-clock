import { configureStore } from '@reduxjs/toolkit';
import timezonesReducer from './timezone/timezone.slice';
import { useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
    reducer: {
        timezones: timezonesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
