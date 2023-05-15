import { createSlice } from '@reduxjs/toolkit';
import { loadState, saveState } from './localStorage';

const todosSlice = createSlice({
  name: 'todos',
  initialState: loadState() || [],
  reducers: {
    addTodo: (state, action) => {
      state.unshift(action.payload);
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
    filterTodo: (state, action) => {
      state = loadState();
      const filter = action.payload;
      if (filter === 'All') {
        return state || [];
      } else if (filter === 'Completed') {
        return state.filter((todo) => todo.isCompleted);
      } else if (filter === 'Active') {
        return state.filter((todo) => !todo.isCompleted);
      }      
    },    
    clearCompleted: (state) => {
      var newState = state.filter((todo) => !todo.isCompleted);
      saveState(newState);
      return newState;
    }
  },
});

export const { addTodo, deleteTodo, checkTodo, filterTodo, clearCompleted } = todosSlice.actions;

export default todosSlice.reducer;
