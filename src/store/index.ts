import { configureStore } from '@reduxjs/toolkit';
import { EventsSlice } from './eventsReducer/slice';

export const Store = configureStore({
  reducer: {
    Events: EventsSlice.reducer,
  },
});
