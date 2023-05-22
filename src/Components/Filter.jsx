import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import Text from './Text';
import styles from '../Modules/Filter.module.scss';

function Filter({
  count,
  filters,
  onSelectFilter,
  onClearCompleted,
  selectedFilter,
}) {
  return (
    <div className={styles.filter}>
      <Text text={`${count} items left`} />
      {filters.map((filter) => (
        <Button
          name={filter}
          key={filter}
          onClick={onSelectFilter}
          parameter={filter}
          isSelected={filter === selectedFilter}
        />
      ))}
      <Button name="Clear Completed" onClick={onClearCompleted} />
    </div>
  );
}

Filter.propTypes = {
  count: PropTypes.number.isRequired,
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectFilter: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
  selectedFilter: PropTypes.string.isRequired,
};

export default Filter;
