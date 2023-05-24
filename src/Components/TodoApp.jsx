import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { todoActions } from '../todosSlice';
import { setFilter } from '../filtersSlice';
import store from '../store';
import filteredTodosSelector from '../filterSelectors';
import { FILTER_ALL } from '../constants';

import TodoList from './TodoList';
import Input from './Input';
import Filter from './Filter';

function TodoApp() {
  const dispatch = useDispatch();
  let todos = useSelector((state) => state.todoitems);
  const count = todos ? todos.filter((todo) => !todo.isCompleted).length : 0;
  const filteredTodos = filteredTodosSelector(store.getState());
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
      dispatch(todoActions.addTodo(newItem));
      setInputValue('');
    } else {
      // eslint-disable-next-line no-alert
      alert('Please enter a valid todo item.');
    }
  };

  const handleDeleteTodo = (id) => {
    // eslint-disable-next-line no-alert
    const confirmed = window.confirm(
      'Are you sure you want to delete this todo?',
    );
    if (confirmed) {
      dispatch(todoActions.deleteTodo(id));
    }
  };

  const handleCheckTodo = (id) => {
    dispatch(todoActions.checkTodo(id));
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
      dispatch(todoActions.clearCompleted());
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    dispatch(todoActions.reorderTodos(result));
  };

  return (
    <>
      <form onSubmit={handleAddTodo}>
        <Input inputValue={inputValue} handleInputChange={handleInputChange} />
      </form>
      <TodoList
        todos={todos}
        onDeleteTodo={handleDeleteTodo}
        onCheckTodo={handleCheckTodo}
        onDragEnd={handleDragEnd}
      />
      <Filter
        count={count}
        onSelectFilter={onSelectFilter}
        onClearCompleted={onClearCompleted}
        selectedFilter={selectedFilter}
      />
    </>
  );
}

export default TodoApp;
