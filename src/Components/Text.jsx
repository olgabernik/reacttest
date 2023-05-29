import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Modules/Text.module.scss';

function Text({ text, style }) {
  return <span className={style}>{text}</span>;
}

Text.propTypes = {
  text: PropTypes.string.isRequired,
  style: PropTypes.string,
};

Text.defaultProps = {
  style: styles.text,
};

export default Text;
