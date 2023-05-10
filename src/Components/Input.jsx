import React from "react";
import styles from "../Modules/Input.module.scss";

function Input({inputValue, handleInputChange}) {
  return (
    <input type="text" value={inputValue} className={styles.input} onChange={handleInputChange} placeholder="Please enter text here..."/>
  );
}

export default Input;