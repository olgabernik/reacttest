import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import styles from '../Modules/TodoList.module.scss';

function TodoList({ todos, onDeleteTodo, onCheckTodo }) {
  return (
    <ul
      className={styles.todoList}
      data-test="todo-list"
    >
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDeleteTodo={onDeleteTodo}
          onCheckTodo={onCheckTodo}
        />
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      isCompleted: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
  onCheckTodo: PropTypes.func.isRequired,
};

export default TodoList;
