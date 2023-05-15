import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import Text from './Text';
import styles from '../Modules/Filter.module.scss';

function Filter({
  todos,
  filters,
  onSelectFilter,
  onClearCompleted,
  selectedFilter,
}) {
  const count = todos.filter((todo) => !todo.isCompleted).length;
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
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      isCompleted: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectFilter: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
  selectedFilter: PropTypes.string.isRequired,
};

export default Filter;
