import { createSlice } from '@reduxjs/toolkit';
import { loadState } from './localStorage';
import { FILTER_ALL } from './constants';

const savedTodos = loadState();
const todoitems = savedTodos || [];

const todosSlice = createSlice({
  name: 'todoslist',
  initialState: {
    todoitems,
    todofilter: FILTER_ALL,
  },
  reducers: {
    addTodo: (state, action) => {
      state.unshift(action.payload);
    },
    deleteTodo: (state, action) => {
      const id = action.payload;
      const index = state.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    checkTodo: (state, action) => {
      const id = action.payload;
      const index = state.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        state[index].isCompleted = !state[index].isCompleted;
      }
    },
    clearCompleted: (state) => {
      const newstate = state.filter((todo) => !todo.isCompleted);
      return newstate;
    },
    reorderTodos: (state, action) => {
      const { source, destination } = action.payload;
      const [reorderedItem] = state.splice(source.index, 1);
      state.splice(destination.index, 0, reorderedItem);
    },
  },
});

export const todoActions = todosSlice.actions;
export default todosSlice.reducer;
