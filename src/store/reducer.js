export function reducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        ui: {
          ...state.ui,
          loading: action.payload,
        },
      };

    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case 'MOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.taskId
            ? { ...task, columnId: action.payload.columnId }
            : task,
        ),
      };

    case 'INIT_COLUMNS':
      return {
        ...state,
        columns: [
          { id: 1, title: 'Backlog' },
          { id: 2, title: 'Todo' },
          { id: 3, title: 'In Progress' },
          { id: 4, title: 'Review' },
          { id: 5, title: 'Done' },
        ],
      };

    case 'ADD_COLUMN':
      return {
        ...state,
        columns: [...state.columns, action.payload],
      };

    case 'REMOVE_COLUMN': {
      const columnId = action.payload;

      return {
        ...state,
        columns: state.columns.filter(
          (col) => String(col.id) !== String(columnId),
        ),
        tasks: state.tasks.filter(
          (task) => String(task.columnId) !== String(columnId),
        ),
      };
    }

    case 'RENAME_COLUMN':
      return {
        ...state,
        columns: state.columns.map((column) =>
          String(column.id) === String(action.payload.columnId)
            ? { ...column, title: action.payload.title }
            : column,
        ),
      };

    case 'REMOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(
          (task) => String(task.id) !== String(action.payload),
        ),
      };

    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          String(t.id) === String(action.payload.id)
            ? { ...t, ...action.payload }
            : t,
        ),
      };

    case 'SET_USERS':
      return {
        ...state,
        users: action.payload,
      };

    case 'SET_SEARCH':
      return {
        ...state,
        filters: {
          ...state.filters,
          search: action.payload,
        },
      };

    case 'SET_PRIORITY_FILTER':
      return {
        ...state,
        filters: {
          ...state.filters,
          priority: action.payload,
        },
      };

    case 'SET_USER_FILTER':
      return {
        ...state,
        filters: {
          ...state.filters,
          userId: action.payload,
        },
      };

    case 'SET_STATUS_FILTER':
      return {
        ...state,
        filters: {
          ...state.filters,
          status: action.payload,
        },
      };

    case 'RESET_FILTERS':
      return {
        ...state,
        filters: {
          search: '',
          priority: null,
          userId: null,
          status: null,
        },
      };

    default:
      return state;
  }
}
