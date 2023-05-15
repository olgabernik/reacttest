import React from "react";
import styles from "../Modules/Button.module.scss";

function Button({name, onClick, parameter, isSelected} ) {

  const handleClick = () => {
    onClick(parameter);
  };
  return (
    <button className={isSelected ? styles.buttonClicked : styles.button} onClick={handleClick}>
        {name}
    </button>
  );
}

export default Button;