import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;

