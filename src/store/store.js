import { loadStateFromLS, saveStateToLS } from './localstorage.js';
import { reducer } from './reducer.js';
import { initialState } from './state.js';

const persisted = loadStateFromLS();

let state = persisted
  ? {
      ...initialState,
      ...persisted,
      filters: {
        ...initialState.filters,
        ...(persisted.filters || {}),
      },
      ui: {
        ...initialState.ui,
      },
      users: [],
    }
  : initialState;
const listeners = [];

export function getState() {
  return state;
}

export function dispatch(action) {
  state = reducer(state, action);
  saveStateToLS({
    columns: state.columns,
    tasks: state.tasks,
    filters: state.filters,
  });

  listeners.forEach((listener) => listener());
}

export function subscribe(listener) {
  listeners.push(listener);
}
