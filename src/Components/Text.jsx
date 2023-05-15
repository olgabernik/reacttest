import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Modules/Text.module.scss';

function Text({ text }) {
  return <span className={styles.text}>{text}</span>;
}

Text.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Text;
