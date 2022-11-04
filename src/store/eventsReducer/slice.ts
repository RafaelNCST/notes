import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { eventsProps } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const EventsSlice = createSlice({
  name: 'events',
  initialState: initialState,
  reducers: {
    ADD_EVENT(state, action: PayloadAction<eventsProps>) {
      state.data.push(action.payload);
      AsyncStorage.setItem('@ArrayEvents', JSON.stringify(state.data));
    },
    // EDIT_EVENT(state, action: PayloadAction<string>) {
    //   state.data[0].circle = action.payload;
    // },
  },
});
