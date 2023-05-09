import React from "react";
import TodoItem from "./TodoItem";
import styles from "../Modules/TodoList.module.scss";

function TodoList({todos, onDeleteTodo, onCheckTodo}) {
  return (
    <ul className={styles.todoList}>
      {
        todos.map((todo) => (
        <TodoItem key ={todo.id} todo= {todo} onDeleteTodo = {onDeleteTodo} onCheckTodo= {onCheckTodo} />
      ))}
    </ul>
  );
}

export default TodoList;
