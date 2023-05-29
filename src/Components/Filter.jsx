import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import Text from './Text';

import { FILTER_ALL, FILTER_ACTIVE, FILTER_COMPLETED } from '../constants';

import styles from '../Modules/Filter.module.scss';

const filters = [FILTER_ALL, FILTER_ACTIVE, FILTER_COMPLETED];

function Filter({
  count, onSelectFilter, onClearCompleted, selectedFilter,
}) {
  return (
    <div className={styles.filter}>
      <Text text={`${count} items left`} />
      <span className={styles.divider} />
      <div className={styles.buttons}>
        {filters.map((filter) => (
          <Button
            name={filter}
            key={filter}
            onClick={onSelectFilter}
            parameter={filter}
            isSelected={filter === selectedFilter}
          />
        ))}
      </div>
      <span className={styles.divider} />
      <Button name="Clear Completed" onClick={onClearCompleted} />
    </div>
  );
}

Filter.propTypes = {
  count: PropTypes.number.isRequired,
  onSelectFilter: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
  selectedFilter: PropTypes.string.isRequired,
};

export default Filter;
