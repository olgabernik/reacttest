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
    const newItem = { id: uuidv4(), text: inputValue, isCompleted: false };
    dispatch(addTodo(newItem));
    setInputValue("");
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
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
