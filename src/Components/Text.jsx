import React from "react";
import styles from "../Modules/Text.module.scss";

function Text({text}) {
  return (
    <span className={styles.text}>{text}</span>
  );
}

export default Text;