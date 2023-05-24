import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import todosReducer, { todoActions } from '../todosSlice';
import filtersReducer, { setFilter } from '../filtersSlice';
import { FILTER_ALL, FILTER_ACTIVE, FILTER_COMPLETED } from '../constants';
import { loadState } from '../localStorage';
import TodoApp from '../Components/TodoApp';
import '../common.css';

const todoitems = [
  { id: '1', text: 'Task 1', isCompleted: true },
  { id: '2', text: 'Task 2', isCompleted: false },
];

const mockStore = configureMockStore([thunk]);
let store;
const localStorageMock = {
  loadState: jest.fn(),
  saveState: jest.fn(),
};
global.localStorage = localStorageMock;

jest.mock('../filterSelectors', () => ({
  __esModule: true,
  default: jest.fn(),
  getTodos: jest.fn().mockReturnValue(todoitems),
}));

describe('TodoApp', () => {
  beforeEach(() => {
    store = mockStore({
      todoitems,
      todofilter: FILTER_ALL,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('store configuration is correct', () => {
    const persistedState = loadState();
    const teststore = configureStore({
      reducer: {
        todoitems: todosReducer,
        todofilter: filtersReducer,
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

    const listitem = screen.getAllByTestId('todo-item');
    expect(listitem).toHaveLength(2);

    const completedItem = screen
      .getAllByTestId('todo-item')
      .filter((item) => item.classList.contains('completed'));
    expect(completedItem).toHaveLength(1);
  });

  test('renders filters correctly', () => {
    render(
      <Provider store={store}>
        <TodoApp />
      </Provider>,
    );
    const allFilterButton = screen.getByText(FILTER_ALL);
    const activeFilterButton = screen.getByText(FILTER_ACTIVE);
    const completedFilterButton = screen.getByText(FILTER_COMPLETED);

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
    const allFilterButton = screen.getByText(FILTER_ALL);
    const activeFilterButton = screen.getByText(FILTER_ACTIVE);
    const completedFilterButton = screen.getByText(FILTER_COMPLETED);

    // Initially, all todos are displayed
    expect(screen.getAllByTestId('todo-item').length).toBe(2);

    // Click Active filter
    fireEvent.click(activeFilterButton);
    expect(store.getActions()).toContainEqual(setFilter(FILTER_ACTIVE));
    waitFor(() => {
      expect(screen.getAllByTestId('todo-item').length).toBe(1);
      expect(
        screen
          .getAllByTestId('todo-item')
          .filter((item) => item.classList.contains('completed')).length,
      ).toBe(1);
    });

    // Click Completed filter
    fireEvent.click(completedFilterButton);
    expect(store.getActions()).toContainEqual(setFilter(FILTER_COMPLETED));
    waitFor(() => {
      expect(screen.getAllByTestId('todo-item').length).toBe(1);
      expect(
        screen
          .getAllByTestId('todo-item')
          .filter((item) => !item.classList.contains('completed')).length,
      ).toBe(1);
    });

    // Click All filter
    fireEvent.click(allFilterButton);
    expect(store.getActions()).toContainEqual(setFilter(FILTER_ALL));
    waitFor(() => {
      expect(screen.getAllByTestId('todo-item').length).toBe(2);
    });
  });

  test('clear completed works correctly', async () => {
    render(
      <Provider store={store}>
        <TodoApp />
      </Provider>,
    );
    const clearCompletedButton = screen.getByText('Clear Completed');

    expect(screen.getAllByTestId('todo-item').length).toBe(2);
    expect(
      screen
        .getAllByTestId('todo-item')
        .filter((item) => item.classList.contains('completed')).length,
    ).toBe(1);
    expect(
      screen
        .getAllByTestId('todo-item')
        .filter((item) => !item.classList.contains('completed')).length,
    ).toBe(1);

    jest.spyOn(window, 'confirm').mockImplementation(() => true);
    fireEvent.click(clearCompletedButton);

    expect(store.getActions()).toContainEqual(todoActions.clearCompleted());
    waitFor(() => {
      expect(
        screen
          .getAllByTestId('todo-item')
          .filter((item) => !item.classList.contains('completed')).length,
      ).toBe(1);
      expect(
        screen
          .getAllByTestId('todo-item')
          .filter((item) => item.classList.contains('completed')).length,
      ).toBe(0);
    });
  });

  test('checks a todo item', async () => {
    render(
      <Provider store={store}>
        <TodoApp />
      </Provider>,
    );

    const listItem = screen
      .getAllByTestId('todo-item')
      .filter((item) => !item.classList.contains('completed'))[0];
    const checkbox = listItem.querySelector('input[type="checkbox"]');

    fireEvent.click(checkbox);

    expect(store.getActions()).toContainEqual(todoActions.checkTodo('2'));

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

    expect(store.getActions()).toContainEqual(todoActions.deleteTodo('1'));
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

    expect(store.getActions()).toContainEqual(
      todoActions.addTodo({
        id: expect.any(String),
        text: 'New Todo',
        isCompleted: false,
      }),
    );

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
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    fireEvent.submit(inputElement);

    expect(store.getActions()).toEqual([]);
    waitFor(() => {
      expect(window.alert).toHaveBeenCalledTimes(1);
      expect(window.alert).toHaveBeenCalledWith(
        'Please enter a valid todo item.',
      );
    });
  });

  test('reorders todos on drag and drop', () => {
    render(
      <Provider store={store}>
        <TodoApp />
      </Provider>,
    );

    const draggable = screen.getAllByTestId('todo-item')[1]; // Assuming the second draggable item
    const droppable = screen.queryByRole('list');

    fireEvent.dragStart(draggable);
    fireEvent.dragEnter(droppable);
    fireEvent.dragOver(droppable);
    fireEvent.drop(droppable);
    fireEvent.dragEnd(draggable);

    waitFor(() => {
      expect(store.getState().todoitems).toEqual({
        todoitems: [
          { id: '2', text: 'Task 2', isCompleted: false },
          { id: '1', text: 'Task 1', isCompleted: false },
        ],
        todofilter: FILTER_ALL,
      });
    });
  });

  describe('test todosReducer reducer', () => {
    test('test reducer for add a new todo item', () => {
      const emptyInitialState = [];
      const action = todoActions.addTodo({
        id: '1',
        text: 'New Todo',
        isCompleted: false,
      });
      const state = todosReducer(emptyInitialState, action);
      expect(state).toEqual([
        {
          id: '1',
          text: 'New Todo',
          isCompleted: false,
        },
      ]);
    });

    test('test reducer for delete a todo item', () => {
      const action = todoActions.deleteTodo('1');
      const state = todosReducer(store.getState().todoitems, action);
      expect(state).toEqual([{ id: '2', text: 'Task 2', isCompleted: false }]);
    });

    test('test reducer for mark a todo item as completed', () => {
      const action = todoActions.checkTodo('2');
      const state = todosReducer(store.getState().todoitems, action);
      expect(state).toEqual([
        { id: '1', text: 'Task 1', isCompleted: true },
        { id: '2', text: 'Task 2', isCompleted: true },
      ]);
    });

    test('test reducer for clear completed todos', () => {
      const action = todoActions.clearCompleted();
      const state = todosReducer(store.getState().todoitems, action);
      expect(state).toEqual([{ id: '2', text: 'Task 2', isCompleted: false }]);
    });
  });

  describe('test filter reducer', () => {
    test('test reducer for filter todos by "Completed" status', () => {
      const action = setFilter(FILTER_COMPLETED);
      const state = filtersReducer(store.getState(), action);
      expect(state).toEqual(FILTER_COMPLETED);
    });

    test('test reducer for filter todos by "Active" status', () => {
      const action = setFilter(FILTER_ACTIVE);
      const state = filtersReducer(store.getState(), action);
      expect(state).toEqual(FILTER_ACTIVE);
    });
    test('test reducer for show all todos', () => {
      const action = setFilter(FILTER_ALL);
      const state = filtersReducer(store.getState(), action);
      expect(state).toEqual(FILTER_ALL);
    });
  });
});
