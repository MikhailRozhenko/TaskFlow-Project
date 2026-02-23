const LS_KEY = 'taskflow_state';

export function saveStateToLS(state) {
  localStorage.setItem(LS_KEY, JSON.stringify(state));
}

export function loadStateFromLS() {
  const raw = localStorage.getItem(LS_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
