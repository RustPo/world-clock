import { TimeZoneEntity } from '@/shared/api/model/timezone';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TimezoneState = {
    selectedTimezones: TimeZoneEntity[];
    timezones: TimeZoneEntity[];
};

const initialState: TimezoneState = {
    selectedTimezones: [],
    timezones: [],
};

const timezoneSlice = createSlice({
    name: 'timezones',
    initialState,
    reducers: {
        setAvailableTimezones: (state, action: PayloadAction<TimeZoneEntity[]>) => {
            state.timezones = action.payload;
        },

        setTimezone: (state, action: PayloadAction<string>) => {
            if (state.selectedTimezones.length < 10) {
                const selectedTimezone = state.timezones.find((tz) => tz.id === action.payload);
                if (selectedTimezone && !state.selectedTimezones.some((tz) => tz.id === action.payload)) {
                    state.selectedTimezones.push(selectedTimezone);
                }
            }
        },

        removeTimezone: (state, action: PayloadAction<string>) => {
            state.selectedTimezones = state.selectedTimezones.filter((timezone) => timezone.id !== action.payload);
        },

        clearTimezones: (state) => {
            state.selectedTimezones = [];
        },
    },
});

export const { setTimezone, removeTimezone, setAvailableTimezones, clearTimezones } = timezoneSlice.actions;
export default timezoneSlice.reducer;
