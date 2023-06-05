import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Modules/Checkbox.module.scss';

function Checkbox({ isCompleted = false, onCheckTodo, todoid }) {
  return (
    <input
      type="checkbox"
      checked={isCompleted}
      onChange={() => onCheckTodo(todoid)}
      className={styles.roundCheckbox}
    />
  );
}

Checkbox.propTypes = {
  isCompleted: PropTypes.bool.isRequired,
  onCheckTodo: PropTypes.func.isRequired,
  todoid: PropTypes.string.isRequired,
};

export default Checkbox;
