/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import classnames from 'classnames';

import Button from './Button';
import Checkbox from './Checkbox';

import styles from '../Modules/TodoItem.module.scss';

function TodoItem({
  todo, index, onDeleteTodo, onCheckTodo,
}) {
  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided) => (
        <li
          className={classnames(styles.todo, {
            [styles.completed]: todo.isCompleted,
          })}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
          }}
          data-testid="todo-item"
        >
          <Checkbox
            isCompleted={todo.isCompleted}
            onCheckTodo={onCheckTodo}
            todoid={todo.id}
          />
          <span className={styles.text}>{todo.text}</span>
          <Button name="X" onClick={() => onDeleteTodo(todo.id)} />
        </li>
      )}
    </Draggable>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
  onCheckTodo: PropTypes.func.isRequired,
};

export default TodoItem;
