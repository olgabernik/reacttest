import React, { useState  } from "react";
import { v4 as uuidv4 } from 'uuid';
import TodoList from './TodoList';
import Input from './Input';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    const newItem = { id: uuidv4(), text: inputValue, isCompleted: false };
    setTodos((prevTodos) => [...prevTodos, newItem]);
    setInputValue("");
  };

  const handleDeleteTodo = (id) => {
    const index = todos.findIndex((t) => t.id === id);
    if (index === -1) return; 
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleCheckTodo = (id) => {
    const index = todos.findIndex((t) => t.id === id);
    if (index === -1) return; 
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  return (
    <>
      <form onSubmit={handleAddTodo}>
      <Input inputValue={inputValue} handleInputChange={handleInputChange} />
      </form>
      <TodoList todos ={todos} handleDeleteTodo={handleDeleteTodo} handleCheckTodo ={handleCheckTodo}/>
    </>
  );
};

export default TodoApp;
