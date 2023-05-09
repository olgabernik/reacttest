import React from "react";
import TodoItem from "./TodoItem";
import styles from "../Modules/TodoList.module.scss";

function TodoList({todos, onDeleteTodo, onCheckTodo}) {
  console.log("todolist="+todos);
  return (
    <ul className={styles.todoList}>
      {
        todos.map((todo) => (
        <TodoItem todo= {todo} onDeleteTodo = {onDeleteTodo} onCheckTodo= {onCheckTodo} />
      ))}
    </ul>
  );
}

export default TodoList;
