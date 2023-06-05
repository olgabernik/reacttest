import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Modules/Button.module.scss';

function Button({
  name, onClick, isSelected,
}) {
  return (
    <button
      type="button"
      className={isSelected ? styles.buttonClicked : styles.button}
      onClick={onClick}
    >
      {name}
    </button>
  );
}

Button.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
};

Button.defaultProps = {
  isSelected: false,
};

export default Button;
