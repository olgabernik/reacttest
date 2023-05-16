import React from 'react';
import { configureStore } from '@reduxjs/toolkit';

import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import todosReducer, {
  addTodo, deleteTodo, checkTodo, clearCompleted, filterTodo,
} from '../todosSlice';
import { loadState } from '../localStorage';
import TodoApp from '../Components/TodoApp';
import '../common.css';

const mockStore = configureMockStore();
let store;
const localStorageMock = {
  loadState: jest.fn(),
  saveState: jest.fn(),
};
global.localStorage = localStorageMock;

describe('TodoApp', () => {
  beforeEach(() => {
    store = mockStore({
      todos: [
        { id: '1', text: 'Task 1', isCompleted: false },
        { id: '2', text: 'Task 2', isCompleted: false },
        { id: '3', text: 'Task 3', isCompleted: true },
        { id: '4', text: 'Task 4', isCompleted: true },
      ],
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('store configuration is correct', () => {
    const persistedState = loadState();
    const teststore = configureStore({
      reducer: {
        todos: todosReducer,
      },
      preloadedState: persistedState,
    });

    expect(teststore.getState()).toBeDefined();
    expect(teststore.dispatch).toBeDefined();
  });

  test('renders todo list correctly', () => {
    const div = document.createElement('div');
    render(
      <Provider store={store}>
        <TodoApp />
      </Provider>,
      div,
    );

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();

    const listitem = screen.getAllByRole('listitem');
    expect(listitem).toHaveLength(4);

    const completedItem = screen.getAllByRole('listitem').filter((item) => item.classList.contains('completed'));
    expect(completedItem).toHaveLength(2);
  });

  test('renders filters correctly', () => {
    render(
      <Provider store={store}>
        <TodoApp />
      </Provider>,
    );
    const allFilterButton = screen.getByText('All');
    const activeFilterButton = screen.getByText('Active');
    const completedFilterButton = screen.getByText('Completed');

    expect(allFilterButton).toBeInTheDocument();
    expect(activeFilterButton).toBeInTheDocument();
    expect(completedFilterButton).toBeInTheDocument();
  });

  test('applies correct filter when filter button is clicked', async () => {
    render(
      <Provider store={store}>
        <TodoApp />
      </Provider>,
    );
    const allFilterButton = screen.getByText('All');
    const activeFilterButton = screen.getByText('Active');
    const completedFilterButton = screen.getByText('Completed');

    // Initially, all todos are displayed
    expect(screen.getAllByRole('listitem').length).toBe(4);

    // Click Active filter
    fireEvent.click(activeFilterButton);
    expect(store.getActions()).toContainEqual(filterTodo('Active'));
    waitFor(() => {
      expect(screen.getAllByRole('listitem').length).toBe(2);
      expect(screen.getAllByRole('listitem').filter((item) => item.classList.contains('completed')).length).toBe(2);
    });

    // Click Completed filter
    fireEvent.click(completedFilterButton);
    expect(store.getActions()).toContainEqual(filterTodo('Completed'));
    waitFor(() => {
      expect(screen.getAllByRole('listitem').length).toBe(2);
      expect(screen.getAllByRole('listitem').filter((item) => !item.classList.contains('completed')).length).toBe(2);
    });

    // Click All filter
    fireEvent.click(allFilterButton);
    expect(store.getActions()).toContainEqual(filterTodo('All'));
    waitFor(() => {
      expect(screen.getAllByRole('listitem').length).toBe(4);
    });
  });

  test('clear completed works correctly', async () => {
    render(
      <Provider store={store}>
        <TodoApp />
      </Provider>,
    );
    const clearCompletedButton = screen.getByText('Clear Completed');

    expect(screen.getAllByRole('listitem').length).toBe(4);
    expect(screen.getAllByRole('listitem').filter((item) => item.classList.contains('completed')).length).toBe(2);
    expect(screen.getAllByRole('listitem').filter((item) => !item.classList.contains('completed')).length).toBe(2);

    jest.spyOn(window, 'confirm').mockImplementation(() => true);
    fireEvent.click(clearCompletedButton);

    expect(store.getActions()).toContainEqual(clearCompleted());
    waitFor(() => {
      expect(screen.getAllByRole('listitem').filter((item) => !item.classList.contains('completed')).length).toBe(2);
      expect(screen.getAllByRole('listitem').filter((item) => item.classList.contains('completed')).length).toBe(0);
    });
  });

  test('checks a todo item', async () => {
    render(
      <Provider store={store}>
        <TodoApp />
      </Provider>,
    );

    const listItem = screen.queryAllByRole('listitem').filter((item) => !item.classList.contains('completed'))[1];
    const checkbox = listItem.querySelector('input[type="checkbox"]');

    fireEvent.click(checkbox);

    expect(store.getActions()).toContainEqual(checkTodo('2'));

    waitFor(() => {
      expect(checkbox).toBeChecked();
      expect(listItem).toHaveClass('completed');
    });
  });

  test('deletes a todo item', async () => {
    render(
      <Provider store={store}>
        <TodoApp />
      </Provider>,
    );
    jest.spyOn(window, 'confirm').mockImplementation(() => true);
    const deleteButton = screen.getAllByText('X')[0];
    fireEvent.click(deleteButton);

    expect(store.getActions()).toContainEqual(deleteTodo('1'));
    waitFor(() => {
      const deletedTodoItem = screen.queryByText('Task 1');
      expect(deletedTodoItem).not.toBeInTheDocument();
    });
  });

  test('adds a new todo item', async () => {
    render(
      <Provider store={store}>
        <TodoApp />
      </Provider>,
    );

    const inputElement = screen.getByRole('textbox');

    fireEvent.change(inputElement, { target: { value: 'New Todo' } });
    fireEvent.submit(inputElement);

    expect(store.getActions()).toContainEqual(addTodo({
      id: expect.any(String),
      text: 'New Todo',
      isCompleted: false,
    }));

    waitFor(() => {
      const todoItem = screen.getByText('New Todo');
      expect(todoItem).toBeInTheDocument();
    });
  });

  test('alert on adding empty todo item', async () => {
    render(
      <Provider store={store}>
        <TodoApp />
      </Provider>,
    );

    const inputElement = screen.getByRole('textbox');

    fireEvent.submit(inputElement);

    expect(store.getActions()).toEqual([]);
    waitFor(() => {
      expect(window.alert).toHaveBeenCalledTimes(1);
      expect(window.alert).toHaveBeenCalledWith('Please enter a valid todo item.');
    });
  });
});

describe('check todosSlice reducers', () => {
  it('should add a new todo item', () => {
    const initialState = [];
    const action = addTodo({
      id: '1',
      text: 'New Todo',
      isCompleted: false,
    });
    const state = todosReducer(initialState, action);
    expect(state).toEqual([
      {
        id: '1',
        text: 'New Todo',
        isCompleted: false,
      },
    ]);
  });

  it('should delete a todo item', () => {
    const initialState = [
      { id: '1', text: 'Todo 1', isCompleted: false },
      { id: '2', text: 'Todo 2', isCompleted: false },
    ];
    const action = deleteTodo('1');
    const state = todosReducer(initialState, action);
    expect(state).toEqual([
      { id: '2', text: 'Todo 2', isCompleted: false },
    ]);
  });

  it('should mark a todo item as completed', () => {
    const initialState = [
      { id: '1', text: 'Todo 1', isCompleted: false },
      { id: '2', text: 'Todo 2', isCompleted: false },
    ];
    const action = checkTodo('1');
    const state = todosReducer(initialState, action);
    expect(state).toEqual([
      { id: '1', text: 'Todo 1', isCompleted: true },
      { id: '2', text: 'Todo 2', isCompleted: false },
    ]);
  });

  it('should filter todos by "Completed" status', () => {
    const initialState = [
      { id: '1', text: 'Todo 1', isCompleted: true },
      { id: '2', text: 'Todo 2', isCompleted: false },
    ];
    const action = filterTodo('Completed');
    const state = todosReducer(initialState, action);
    expect(state).toEqual([
      { id: '1', text: 'Todo 1', isCompleted: true },
    ]);
  });

  it('should filter todos by "Active" status', () => {
    const initialState = [
      { id: '1', text: 'Todo 1', isCompleted: true },
      { id: '2', text: 'Todo 2', isCompleted: false },
    ];
    const action = filterTodo('Active');
    const state = todosReducer(initialState, action);
    expect(state).toEqual([
      { id: '2', text: 'Todo 2', isCompleted: false },
    ]);
  });

  it('should clear completed todos', () => {
    const initialState = [
      { id: '1', text: 'Todo 1', isCompleted: true },
      { id: '2', text: 'Todo 2', isCompleted: false },
    ];
    const action = clearCompleted();
    const state = todosReducer(initialState, action);
    expect(state).toEqual([
      { id: '2', text: 'Todo 2', isCompleted: false },
    ]);
  });
});
