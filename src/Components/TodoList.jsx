import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TodoItem from './TodoItem';
import styles from '../Modules/TodoList.module.scss';

function TodoList({
  todos, onDeleteTodo, onCheckTodo, onDragEnd,
}) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          <ul
            ref={provided.innerRef}
            className={styles.todoList}
            data-test="todo-list"
            onDragEnter={provided.droppableProps.onDragEnter}
            onDragLeave={provided.droppableProps.onDragLeave}
            onDragOver={provided.droppableProps.onDragOver}
            onDrop={provided.droppableProps.onDrop}
          >
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                index={todos.indexOf(todo)}
                onDeleteTodo={onDeleteTodo}
                onCheckTodo={onCheckTodo}
              />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
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
  onDragEnd: PropTypes.func.isRequired,
};

export default TodoList;
