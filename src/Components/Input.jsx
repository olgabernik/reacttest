import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Modules/Input.module.scss';

function Input({
  inputValue, handleInputChange, placeholder, maxLength,
}) {
  return (
    <input
      type="text"
      value={inputValue}
      className={styles.input}
      onChange={handleInputChange}
      maxLength={maxLength}
      placeholder={placeholder}
      data-testid="input-new-todo"
    />
  );
}

Input.propTypes = {
  inputValue: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  maxLength: PropTypes.string.isRequired,
};

export default Input;
