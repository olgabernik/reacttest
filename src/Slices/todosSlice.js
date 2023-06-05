import { createSlice } from '@reduxjs/toolkit';
import { loadState } from '../localStorageRepository';
import {
  FILTER_ALL,
  ADD_TODO,
  DELETE_TODO,
  CHECK_TODO,
  CLEAR_COMPLETED,
  REORDER_TODOS,
} from '../constants';

const todoitems = loadState();

const todosSlice = createSlice({
  name: 'todoslist',
  initialState: {
    todoitems,
    todofilter: FILTER_ALL,
  },
  reducers: {
    [ADD_TODO]: (state, action) => {
      state.unshift(action.payload);
    },
    [DELETE_TODO]: (state, action) => {
      const id = action.payload;
      const index = state.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    [CHECK_TODO]: (state, action) => {
      const id = action.payload;
      const index = state.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        state[index].isCompleted = !state[index].isCompleted;
      }
    },
    [CLEAR_COMPLETED]: (state) => {
      const newState = state.filter((todo) => !todo.isCompleted);
      return newState;
    },
    [REORDER_TODOS]: (state, action) => {
      const { source, destination } = action.payload;
      const [reorderedItem] = state.splice(source.index, 1);
      state.splice(destination.index, 0, reorderedItem);
    },
  },
});
export const todoActions = todosSlice.actions;
export default todosSlice.reducer;
