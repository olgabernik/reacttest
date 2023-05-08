import React from "react";
import styles from "../Modules/Button.module.scss";

function Button( onClick, name ) {
  return (
    <button className={styles.button} onClick={onClick}>
        {name}
    </button>
  );
}

export default Button;