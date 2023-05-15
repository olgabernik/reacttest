import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Modules/Button.module.scss';

function Button({
  name,
  onClick,
  parameter,
  isSelected,
}) {
  const handleClick = () => {
    onClick(parameter);
  };
  return (
    <button
      type="button"
      className={isSelected ? styles.buttonClicked : styles.button}
      onClick={handleClick}
    >
      {name}
    </button>
  );
}

Button.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  parameter: PropTypes.string,
  isSelected: PropTypes.bool,
};

Button.defaultProps = {
  isSelected: false,
  parameter: '',
};

export default Button;
