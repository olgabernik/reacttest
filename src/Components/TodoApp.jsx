import React, { useState  } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, checkTodo, deleteTodo } from '../todosSlice';
import { v4 as uuidv4 } from 'uuid';
import TodoList from './TodoList';
import Input from './Input';

const TodoApp = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      const newItem = { id: uuidv4(), text: inputValue, isCompleted: false };
      dispatch(addTodo(newItem));
      setInputValue("");
    }
    else {
      alert("Please enter a valid todo item.");
    }
  };

  const handleDeleteTodo = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this todo?");
    if (confirmed) {
      dispatch(deleteTodo(id));
    }
  };

  const handleCheckTodo = (id) => {
    dispatch(checkTodo(id));
  };

  return (
    <>
      <form onSubmit={handleAddTodo}>
      <Input inputValue={inputValue} handleInputChange={handleInputChange} />
      </form>
      <TodoList todos ={todos} onDeleteTodo={handleDeleteTodo} onCheckTodo ={handleCheckTodo}/>
    </>
  );
};

export default TodoApp;
