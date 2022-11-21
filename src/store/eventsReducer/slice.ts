import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { eventsProps } from '../types';
// import { getArrayOfEventsAsync } from './thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const EventsSlice = createSlice({
  name: 'events',
  initialState: initialState,
  reducers: {
    ADD_EVENT(state, action: PayloadAction<eventsProps>) {
      state.data.push(action.payload);
      AsyncStorage.setItem('@ArrayEvents', JSON.stringify(state.data));
    },
    INITIALIZE_APP(state, action: PayloadAction<eventsProps[]>) {
      state.data = action?.payload;
    },
    EDIT_EVENT(state, action: PayloadAction<eventsProps[]>) {
      state.data = action?.payload;
      AsyncStorage.setItem('@ArrayEvents', JSON.stringify(state.data));
      state.reload = !state.reload;
    },
  },
  // extraReducers: builder => {
  //   getArrayOfEventsAsync(builder);
  // },
});
