export const initialState = {
  columns: [],
  tasks: [],
  users: [],
  filters: {
    search: '',
    priority: null,
    userId: null,
  },
  ui: {
    loading: false,
    error: null,
  },
};
