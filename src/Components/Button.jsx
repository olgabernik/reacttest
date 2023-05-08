import React from "react";
import styles from "./Button.module.scss";

function Button( onClick, name ) {
  return (
    <button className={styles.button} onClick={onClick}>
        {name}
    </button>
  );
}

export default Button;