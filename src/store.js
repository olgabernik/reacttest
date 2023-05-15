import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';
import { loadState } from './localStorage';

const persistedState = loadState();

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  preloadedState: persistedState,
});

export default store;
