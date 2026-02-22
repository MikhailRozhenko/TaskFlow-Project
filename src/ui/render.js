import { getState } from '../store/store.js';
import { refs } from './refs.js';

export function render() {
  const { columns, tasks, users } = getState();
  const markup = columns
    .map((column) => {
      const columnTasks = tasks.filter(
        (task) => String(task.columnId) === String(column.id),
      );

      const tasksMarkup = columnTasks
        .map((task) => {
          const user = users.find((u) => String(u.id) === String(task.userId));
          const assigneeName = user ? user.name : 'Unassigned';
          return `<div class="task" data-task-id="${task.id}">
    <div class="task__title">${task.title}</div>
    <div class="task__description">${task.description || ''}</div>
    <div class="task__priority">Priority: ${task.priority}</div>
    <div class="task__deadline">
      ${task.deadline ? `Deadline: ${task.deadline}` : ''}
    </div>
	 <button class="task__edit">✏️</button>
	 <button class="task__delete">🗑</button>
  </div>`;
        })
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
  const { users } = getState();
  const usersOptionsMarkup = users
    .map((user) => `<option value="${user.id}">${user.name}</option>`)
    .join('');
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
     <label class="task-create-form__field">
  <span class="task-create-form__label">Assignee</span>
  <select class="task-create-form__assignee">
    <option value="">Unassigned</option>
    ${usersOptionsMarkup}
  </select>
</label>
 

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

export function renderTaskCreateFormEdit(task) {
  const { users } = getState();
  const usersOptionsMarkup = users
    .map(
      (user) =>
        `<option value="${user.id}" ${String(user.id) === String(task.userId) ? 'selected' : ''}>${user.name}</option>`,
    )
    .join('');
  return `<div class="task-edit-form" data-task-id="${task.id}">
  <input
    class="task-edit-form__input task-edit-form__title"
    type="text"
    value="${task.title}"
  />

  <textarea
    class="task-edit-form__textarea task-edit-form__description"
  >${task.description || ''}</textarea>

  <select class="task-edit-form__select task-edit-form__priority">
    <option value="low" ${task.priority === 'low' ? 'selected' : ''}>low</option>
    <option value="medium" ${task.priority === 'medium' ? 'selected' : ''}>medium</option>
    <option value="high" ${task.priority === 'high' ? 'selected' : ''}>high</option>
  </select>

  <input
    class="task-edit-form__input task-edit-form__deadline"
    type="date"
    value="${task.deadline || ''}"
  />

  <label class="task-edit-form__field">
  <span class="task-edit-form__label">Assignee</span>
  <select class="task-edit-form__assignee">
    <option value="">Unassigned</option>
    ${usersOptionsMarkup}
  </select>
</label>

  <div class="task-edit-form__actions">
    <button class="task-edit-form__btn task-edit-form__save" type="button">
      Save
    </button>
    <button class="task-edit-form__btn task-edit-form__cancel" type="button">
      Cancel
    </button>
  </div>
</div>`;
}
