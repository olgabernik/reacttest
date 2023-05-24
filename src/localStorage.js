export const loadState = () => {
  const emptyState = {
    todoitems: [],
    todofilter: '',
  };
  try {
    const serializedState = localStorage.getItem('todoslist');
    if (serializedState === null) {
      return emptyState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return emptyState;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('todoslist', serializedState);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};
