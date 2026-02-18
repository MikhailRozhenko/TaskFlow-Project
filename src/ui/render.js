import { getState } from '../store/store.js';
import { refs } from './refs.js';

export function render() {
  const { columns } = getState();
  const markup = columns
    .map(
      (column) => `<div class="column" data-id="${column.id}">
  <div class="column__header">
    <h3 class="column__title">${column.title}</h3>
    <div class="column__actions">
      <button class="column__edit" type="button">✏️</button>
      <button class="column__delete" type="button">🗑</button>
    </div>
  </div>

  <div class="column__body">
    <div class="tasks">
      
    </div>

    <button class="column__add-task" type="button">
      + Add task
    </button>
  </div>
</div>
`,
    )
    .join('');

  refs.sectionContainer.innerHTML = markup;
}
