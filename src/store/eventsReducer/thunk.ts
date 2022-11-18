// import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { InitialStateProps } from '../types';

// export const getEventsArrayAsync = createAsyncThunk(
//   'initialize/app',
//   async () => {
//     const STRING_RESULT_ARRAY_EVENTS = await AsyncStorage.getItem(
//       '@ArrayEvents',
//     );
//     const PARSED_ARRAY_EVENTS = JSON.parse(STRING_RESULT_ARRAY_EVENTS as any);
//     return PARSED_ARRAY_EVENTS;
//   },
// );

// export const getArrayOfEventsAsync = (
//   builder: ActionReducerMapBuilder<InitialStateProps>,
// ) => {
//   builder
//     .addCase(getEventsArrayAsync.fulfilled, (state, action) => {
//       state.data.push(action.payload);
//       state.isLoading = false;
//     })
//     .addCase(getEventsArrayAsync.pending, (state, _) => {
//       state.isLoading = true;
//     })
//     .addCase(getEventsArrayAsync.rejected, (state, _) => {
//       console.log('rejected');
//       state.isLoading = false;
//     });
// };
