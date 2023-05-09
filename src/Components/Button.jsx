import React from "react";
import styles from "../Modules/Button.module.scss";

function Button({name, onDeleteTodo} ) {
  return (
    <button className={styles.button} onClick={onDeleteTodo}>
        {name}
    </button>
  );
}

export default Button;