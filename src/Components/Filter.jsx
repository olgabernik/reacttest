import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

import { FILTER_ALL, FILTER_ACTIVE, FILTER_COMPLETED } from '../constants';

import styles from '../Modules/Filter.module.scss';

const filters = [FILTER_ALL, FILTER_ACTIVE, FILTER_COMPLETED];

function Filter({
  count, onSelectFilter, onClearCompleted, selectedFilter,
}) {
  return (
    <div className={styles.filter}>
      <span className={styles.text}>{`${count} items left`}</span>
      <span className={styles.divider} />
      <div className={styles.buttons}>
        {filters.map((filter) => (
          <Button
            name={filter}
            key={filter}
            onClick={() => onSelectFilter(filter)}
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
