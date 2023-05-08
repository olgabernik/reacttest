import React from "react";
import styles from "../Modules/Input.module.scss";

function Input({ value, onChange }) {
  return (
    <input type="text" value={value} className={styles.input} onChange={onChange} />
  );
}

export default Input;