import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';
import filtersReducer from './filtersSlice';
import { loadState } from './localStorage';
import localStorageMiddleware from './localStorageMiddleware';

const persistedState = loadState();

const store = configureStore({
  reducer: {
    todoitems: todosReducer,
    todofilter: filtersReducer,
  },
  middleware: [localStorageMiddleware],
  preloadedState: persistedState,
});

export default store;
