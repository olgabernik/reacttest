import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Modules/Input.module.scss';

function Input({ inputValue, handleInputChange }) {
  return (
    <input
      type="text"
      value={inputValue}
      className={styles.input}
      onChange={handleInputChange}
      maxLength="50"
      placeholder="Please enter text here..."
      data-test="input-new-todo"
    />
  );
}

Input.propTypes = {
  inputValue: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default Input;
