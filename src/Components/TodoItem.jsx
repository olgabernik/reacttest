import React from "react";
import Button from "./Button";
import Checkbox from "./Checkbox";
import styles from "../Modules/TodoItem.module.scss";

function TodoItem({todo, onDeleteTodo, onCheckTodo}) {
  console.log("todo="+todo);
  return (    
    <li  className={`${styles.todo} ${todo.isCompleted ? styles.completed : ""}`}>
      <Checkbox isCompleted={todo.isCompleted} onCheckTodo ={() => onCheckTodo(todo.id)} />
      {todo.text}
      <Button name = "X" onDeleteTodo ={ () => onDeleteTodo(todo.id)}/>
    </li>
  );
}

export default TodoItem;
