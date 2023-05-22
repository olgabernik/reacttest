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
      const newState = state;
      const id = action.payload;
      const index = state.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        newState[index].isCompleted = !newState[index].isCompleted;
        saveState(newState);
      }
    },
    filterTodo: (state, action) => {
      const newState = loadState();
      const filter = action.payload;
      if (filter === 'All') {
        return newState || [];
      }
      if (filter === 'Completed') {
        return newState.filter((todo) => todo.isCompleted);
      }
      if (filter === 'Active') {
        return newState.filter((todo) => !todo.isCompleted);
      }
      return newState;
    },
    clearCompleted: (state) => {
      const newState = state.filter((todo) => !todo.isCompleted);
      saveState(newState);
      return newState;
    },
    reorderTodos: (state, action) => {
      const { source, destination } = action.payload;
      const newState = state;
      const [reorderedItem] = newState.splice(source.index, 1);
      newState.splice(destination.index, 0, reorderedItem);
      saveState(newState);
      return newState;
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  checkTodo,
  filterTodo,
  clearCompleted,
  reorderTodos,
} = todosSlice.actions;

export default todosSlice.reducer;
