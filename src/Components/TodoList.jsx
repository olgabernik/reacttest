import React from "react";
import TodoItem from "./TodoItem";
import styles from "../Modules/TodoList.module.scss";

function TodoList({ todos, onDeleteTodo, onToggleTodo }) {
  return (
    <ul className={styles.todoList}>
      {todos ? todos.map((todo) => (
        TodoItem(todo, onDeleteTodo, onToggleTodo)
      )) : null}
    </ul>
  );
}

export default TodoList;
