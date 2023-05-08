import React, { useState } from "react";
import TodoList from './TodoList';
import Input from './Input';
import Button from './Button';

// Organisms
const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    setTodos([...todos, inputValue]);
    setInputValue("");
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleToggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <>
      <h1>Todo List</h1>
      <form onSubmit={handleAddTodo}>
        {Input(inputValue, handleInputChange)}
        {Button(handleAddTodo,"Add Todo")}
      </form>
      {TodoList( todos, handleDeleteTodo, handleToggleTodo )}
    </>
  );
};

export default TodoApp;
