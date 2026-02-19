import { getState } from '../store/store.js';
import { refs } from './refs.js';

export function render() {
  const { columns, tasks } = getState();
  const markup = columns
    .map((column) => {
      const columnTasks = tasks.filter(
        (task) => String(task.columnId) === String(column.id),
      );

      console.log(column.title, columnTasks);
      const tasksMarkup = columnTasks
        .map((task) => `<div class = 'tasks'>${task.title}</div>`)
        .join('');
      return `<div class="column" data-id="${column.id}">
  <div class="column__header">
    <h3 class="column__title">${column.title}</h3>
    <div class="column__actions">
      <button class="column__edit" type="button">✏️</button>
      <button class="column__delete" type="button">🗑</button>
    </div>
  </div>

  <div class="column__body">
    <div class="tasks">
      ${tasksMarkup}
    </div>

    <button class="column__add-task" type="button">
      + Add task
    </button>
  </div>
</div>
`;
    })

    .join('');

  refs.sectionContainer.innerHTML = markup;
}

export function renderTaskCreateForm(columnId) {
  return `<div class="task-create-form" data-column-id="${columnId}">
  <div class="task-create-form__row">
    <input
      class="task-create-form__input task-create-form__title"
      type="text"
      placeholder="Title *"
      autocomplete="off"
    />
  </div>

  <div class="task-create-form__row">
    <textarea
      class="task-create-form__textarea task-create-form__description"
      placeholder="Description"
      rows="3"
    ></textarea>
  </div>

  <div class="task-create-form__row task-create-form__row--grid">
    <label class="task-create-form__field">
      <span class="task-create-form__label">Priority</span>
      <select class="task-create-form__select task-create-form__priority">
        <option value="low">low</option>
        <option value="medium" selected>medium</option>
        <option value="high">high</option>
      </select>
    </label>

    <label class="task-create-form__field">
      <span class="task-create-form__label">Deadline</span>
      <input
        class="task-create-form__input task-create-form__deadline"
        type="date"
      />
    </label>
  </div>

  <div class="task-create-form__actions">
    <button class="task-create-form__btn task-create-form__btn--save" type="button">
      Save
    </button>
    <button class="task-create-form__btn task-create-form__btn--cancel" type="button">
      Cancel
    </button>
  </div>
</div>
`;
}
