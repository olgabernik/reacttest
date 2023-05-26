import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import TodoList from '../Components/TodoList';
import Button from '../Components/Button';
import Checkbox from '../Components/Checkbox';
import Filter from '../Components/Filter';
import Input from '../Components/Input';
import TodoApp from '../Components/TodoApp';
import store from '../store';

describe('TodoList', () => {
  const onDeleteTodo = jest.fn();
  const onCheckTodo = jest.fn();
  const onDragEnd = jest.fn();

  it('TodoList should match the snapshot', () => {
    const todos = [
      { id: '1', text: 'Todo 1', isCompleted: false },
      { id: '2', text: 'Todo 2', isCompleted: true },
    ];

    const { asFragment } = render(
      <TodoList
        todos={todos}
        onDeleteTodo={onDeleteTodo}
        onCheckTodo={onCheckTodo}
        onDragEnd={onDragEnd}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('Button should match the snapshot', () => {
    const onClick = jest.fn();
    const isSelected = true;

    const { asFragment } = render(
      <Button
        name="Test Button"
        onClick={onClick}
        parameter="testParameter"
        isSelected={isSelected}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('Checkbox should match the snapshot', () => {
    const isCompleted = true;

    const { asFragment } = render(
      <Checkbox
        isCompleted={isCompleted}
        onCheckTodo={onCheckTodo}
        todoid="1"
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('Filter should match the snapshot', () => {
    const onSelectFilter = jest.fn();
    const onClearCompleted = jest.fn();

    const { asFragment } = render(
      <Filter
        count={5}
        onSelectFilter={onSelectFilter}
        onClearCompleted={onClearCompleted}
        selectedFilter="all"
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('Input should match the snapshot', () => {
    const inputValue = 'Example input';
    const handleInputChange = jest.fn();

    const { asFragment } = render(
      <Input inputValue={inputValue} handleInputChange={handleInputChange} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('TodoApp should match the snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <TodoApp />
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
