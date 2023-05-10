import { createSlice } from '@reduxjs/toolkit';
import { loadState, saveState } from './localStorage';

const todosSlice = createSlice({
  name: 'todos',
  initialState: loadState() || [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
      saveState(state);
    },
    deleteTodo: (state, action) => {
      const id = action.payload;
      const index = state.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        state.splice(index, 1);
        saveState(state);
      }
    },    
    checkTodo: (state, action) => {
      const id = action.payload;
      const index = state.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        state[index].isCompleted = !state[index].isCompleted;
        saveState(state);
      }
    },
  },
});

export const { addTodo, deleteTodo, checkTodo, } = todosSlice.actions;

export default todosSlice.reducer;
