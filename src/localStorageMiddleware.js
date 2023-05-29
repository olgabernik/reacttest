import { saveState } from './localStorageRepository';
import {
  ADD_TODO,
  DELETE_TODO,
  CHECK_TODO,
  CLEAR_COMPLETED,
  REORDER_TODOS,
  TODO_LIST,
} from './constants';

const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  const actionsToPersist = [
    `${TODO_LIST}/${ADD_TODO}`,
    `${TODO_LIST}/${DELETE_TODO}`,
    `${TODO_LIST}/${CHECK_TODO}`,
    `${TODO_LIST}/${CLEAR_COMPLETED}`,
    `${TODO_LIST}/${REORDER_TODOS}`,
  ];

  if (actionsToPersist.includes(action.type)) {
    const todoslist = store.getState();
    saveState(todoslist);
  }

  return result;
};

export default localStorageMiddleware;
