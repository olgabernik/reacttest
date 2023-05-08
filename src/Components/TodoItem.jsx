import React from "react";
import Button from "./Button";
import styles from "./TodoItem.module.scss";

function TodoItem({ todo, onDeleteTodo, onToggleTodo }) {
  return (
    <li className={`${styles.todo} ${todo.isCompleted ? styles.completed : ""}`}>
      {todo.text}
      {Button(onDeleteTodo(todo), "Delete")}
      {Button(onToggleTodo(todo), "Toggle")}
    </li>
  );
}

export default TodoItem;
