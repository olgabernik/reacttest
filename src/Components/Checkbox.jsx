import React from "react";
import styles from "../Modules/Checkbox.module.scss";

function Checkbox({isCompleted, onCheckTodo}) {
  return (
    <input
        type="checkbox"
        checked={isCompleted}
        onChange={()=> onCheckTodo()}
        className={styles.roundCheckbox}
      />
  );
}

export default Checkbox;