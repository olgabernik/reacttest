import React from "react";
import styles from "../Modules/Button.module.scss";

function Button({name, onDeleteTodo, todoid} ) {
  return (
    <button className={styles.button} onClick={()=>onDeleteTodo(todoid)}>
        {name}
    </button>
  );
}

export default Button;