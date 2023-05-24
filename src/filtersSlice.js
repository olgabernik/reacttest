import { createSlice } from '@reduxjs/toolkit';
import { FILTER_ALL } from './constants';

const filtersSlice = createSlice({
  name: 'todofilter',
  initialState: FILTER_ALL,
  reducers: {
    setFilter: (state, action) => action.payload,
  },
});

export const { setFilter } = filtersSlice.actions;

export default filtersSlice.reducer;
