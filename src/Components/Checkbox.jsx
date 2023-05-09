import React from "react";
import styles from "../Modules/Checkbox.module.scss";

function Checkbox({isCompleted, onCheckTodo, todoid}) {
  return (
    <input
        type="checkbox"
        checked={isCompleted}
        onChange={()=>onCheckTodo(todoid)}
        className={styles.roundCheckbox}
      />
  );
}

export default Checkbox;