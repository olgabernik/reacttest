import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './Slices/todosSlice';
import filtersReducer from './Slices/filtersSlice';
import { loadState } from './localStorageRepository';
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
