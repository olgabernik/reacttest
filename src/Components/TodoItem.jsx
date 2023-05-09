import React from "react";
import Button from "./Button";
import Checkbox from "./Checkbox";
import Text from "./Text";

import styles from "../Modules/TodoItem.module.scss";

function TodoItem({todo, onDeleteTodo, onCheckTodo}) {
  return (    
    <li className={`${styles.todo} ${todo.isCompleted ? styles.completed : ""}`}>
      <Checkbox isCompleted={todo.isCompleted} onCheckTodo ={onCheckTodo} todoid = {todo.id} />
      <Text text={todo.text} />
      <Button name = "X" onDeleteTodo ={onDeleteTodo} todoid = {todo.id}/>
    </li>
  );
}

export default TodoItem;
