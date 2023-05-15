import React from "react";
import Button from "./Button";
import Text from "./Text";
import styles from "../Modules/Filter.module.scss";

function Filter({count, filters, onSelectFilter, onClearCompleted, selectedFilter}) {
  return (
    <div className={styles.filter}>
      <Text text={`${count} items left`} />
      {filters.map((filter) => (
        <Button name={filter}
          key ={filter}
          onClick={onSelectFilter}
          parameter={filter}
          isSelected={filter === selectedFilter} />
      ))}
        <Button name ="Clear Completed" onClick={onClearCompleted} />
    </div>
      );
    }

    export default Filter;