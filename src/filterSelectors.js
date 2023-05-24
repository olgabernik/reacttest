import { createSelector } from '@reduxjs/toolkit';
import { FILTER_ACTIVE, FILTER_COMPLETED } from './constants';

const getFilter = (state) => state.todofilter;
const getTodos = (state) => state.todoitems;

const filteredTodosSelector = createSelector(
  getFilter,
  getTodos,
  (todofilter, todoitems) => {
    if (todofilter === FILTER_ACTIVE) {
      return todoitems.filter((todo) => !todo.isCompleted);
    }
    if (todofilter === FILTER_COMPLETED) {
      return todoitems.filter((todo) => todo.isCompleted);
    }
    return todoitems;
  },
);

export default filteredTodosSelector;
