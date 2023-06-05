import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { todoActions } from '../Slices/todosSlice';
import { setFilter } from '../Slices/filtersSlice';
import filteredTodosSelector from '../filterSelectors';
import {
  ADD_TODO,
  CHECK_TODO,
  CLEAR_COMPLETED,
  DELETE_TODO,
  FILTER_ALL,
  REORDER_TODOS,
} from '../constants';

import TodoList from './TodoList';
import Input from './Input';
import Filter from './Filter';

import styles from '../Modules/TodoApp.module.scss';

function TodoApp() {
  const dispatch = useDispatch();
  let todos = useSelector((state) => state.todoitems);
  const count = todos ? todos.filter((todo) => !todo.isCompleted).length : 0;
  const filteredTodos = useSelector(filteredTodosSelector);
  todos = filteredTodos || todos;

  const [inputValue, setInputValue] = useState('');

  const [selectedFilter, setSelectedFilter] = useState(FILTER_ALL);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      const newItem = { id: uuidv4(), text: inputValue, isCompleted: false };
      dispatch(todoActions[ADD_TODO](newItem));
      setInputValue('');
    }
  };

  const handleDeleteTodo = (id) => {
    // eslint-disable-next-line no-alert
    const confirmed = window.confirm(
      'Are you sure you want to delete this todo?',
    );
    if (confirmed) {
      dispatch(todoActions[DELETE_TODO](id));
    }
  };

  const handleCheckTodo = (id) => {
    dispatch(todoActions[CHECK_TODO](id));
  };

  const onSelectFilter = (filter = FILTER_ALL) => {
    setSelectedFilter(filter);
    dispatch(setFilter(filter));
  };

  const onClearCompleted = () => {
    // eslint-disable-next-line no-alert
    const confirmed = window.confirm(
      'Are you sure you want to clear all completed todos?',
    );
    if (confirmed) {
      dispatch(todoActions[CLEAR_COMPLETED]());
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    dispatch(todoActions[REORDER_TODOS](result));
  };

  return (
    <>
      <span className={styles.header}>TO DO</span>
      <form onSubmit={handleAddTodo}>
        <Input inputValue={inputValue} handleInputChange={handleInputChange} placeholder="Please enter text here..." maxLength="50" />
      </form>
      <div className={styles.container}>
        {todos.length === 0 ? (
          <span className={styles.text}>No todos found...</span>
        ) : (
          <TodoList
            todos={todos}
            onDeleteTodo={handleDeleteTodo}
            onCheckTodo={handleCheckTodo}
            onDragEnd={handleDragEnd}
          />
        )}
        <Filter
          count={count}
          onSelectFilter={onSelectFilter}
          onClearCompleted={onClearCompleted}
          selectedFilter={selectedFilter}
        />
      </div>

    </>
  );
}

export default TodoApp;
