import { saveState } from './localStorage';

const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  const actionsToPersist = ['todoslist/addTodo', 'todoslist/deleteTodo', 'todoslist/checkTodo', 'todoslist/clearCompleted', 'todoslist/reorderTodos'];

  if (actionsToPersist.includes(action.type)) {
    const todoslist = store.getState();
    saveState(todoslist);
  }

  return result;
};

export default localStorageMiddleware;
