import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  addTodo,
  checkTodo,
  deleteTodo,
  filterTodo,
  clearCompleted,
  reorderTodos,
} from '../todosSlice';

import TodoList from './TodoList';
import Input from './Input';
import Filter from './Filter';

function TodoApp() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const [inputValue, setInputValue] = useState('');
  const filters = ['All', 'Completed', 'Active'];
  const [selectedFilter, setSelectedFilter] = useState('All');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      const newItem = { id: uuidv4(), text: inputValue, isCompleted: false };
      dispatch(addTodo(newItem));
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
      dispatch(deleteTodo(id));
    }
  };

  const handleCheckTodo = (id) => {
    dispatch(checkTodo(id));
  };

  const onSelectFilter = (filter = 'All') => {
    setSelectedFilter(filter);
    dispatch(filterTodo(filter));
  };

  const onClearCompleted = () => {
    // eslint-disable-next-line no-alert
    const confirmed = window.confirm(
      'Are you sure you want to clear all completed todos?',
    );
    if (confirmed) {
      dispatch(clearCompleted());
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    dispatch(reorderTodos(result));
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
        todos={todos}
        filters={filters}
        onSelectFilter={onSelectFilter}
        onClearCompleted={onClearCompleted}
        selectedFilter={selectedFilter}
      />
    </>
  );
}

export default TodoApp;
