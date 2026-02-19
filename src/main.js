import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { dispatch, getState, subscribe } from './store/store.js';
import './style.css';
import { refs } from './ui/refs.js';
import { render, renderTaskCreateForm } from './ui/render.js';

function showEmptyColumnWarning(message) {
  iziToast.warning({
    message: message,
    position: 'topRight',
    timeout: 3000,
  });
}

subscribe(render);

dispatch({ type: 'INIT_COLUMNS' });

render();

refs.buttonAddColumn.addEventListener('click', () => {
  const title = refs.input.value.trim();
  if (!title || title === '') {
    showEmptyColumnWarning(
      'Пожалуйста, заполните поле формы для добавления новой колонки',
    );
    return;
  }

  dispatch({
    type: 'ADD_COLUMN',
    payload: {
      id: crypto.randomUUID(),
      title,
    },
  });

  refs.input.value = '';
});

refs.sectionContainer.addEventListener('click', (event) => {
  const deleteBtn = event.target.closest('.column__delete');
  if (!deleteBtn) {
    return;
  }
  const columnEl = deleteBtn.closest('.column');
  if (!columnEl) {
    return;
  }
  const columnId = columnEl.dataset.id;
  dispatch({ type: 'REMOVE_COLUMN', payload: columnId });
});

refs.sectionContainer.addEventListener('click', (event) => {
  const columnEdit = event.target.closest('.column__edit');
  if (!columnEdit) {
    return;
  }
  const columnEl = columnEdit.closest('.column');
  if (!columnEl) {
    return;
  }
  const columnId = columnEl.dataset.id;
  const titleEl = columnEl.querySelector('.column__title');
  const oldTitle = titleEl.textContent;
  if (columnEl.querySelector('.column__title-input')) {
    return;
  }
  const input = document.createElement('input');
  input.classList.add('column__title-input');
  input.value = oldTitle;
  function resizeInput() {
    const span = document.createElement('span');
    span.style.visibility = 'hidden';
    span.style.position = 'absolute';
    span.style.whiteSpace = 'pre';
    const titleStyles = window.getComputedStyle(titleEl);
    span.style.font = titleStyles.font;
    span.textContent = input.value || ' ';
    document.body.append(span);

    const width = span.offsetWidth;

    input.style.width = width + 12 + 'px';

    span.remove();
  }

  function finishRename() {
    const newTitle = input.value.trim();
    if (!newTitle) {
      input.replaceWith(titleEl);
      return;
    } else {
      dispatch({
        type: 'RENAME_COLUMN',
        payload: {
          columnId,
          title: newTitle,
        },
      });
    }
  }

  resizeInput();
  input.addEventListener('input', resizeInput);
  titleEl.replaceWith(input);
  input.focus();
  input.addEventListener('blur', finishRename);

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      input.blur();
    }
    if (event.key === 'Escape') {
      input.replaceWith(titleEl);
    }
  });
});

refs.sectionContainer.addEventListener('click', (event) => {
  const addBtn = event.target.closest('.column__add-task');
  if (!addBtn) {
    return;
  }
  const columnEl = addBtn.closest('.column');
  const columnId = columnEl.dataset.id;
  const taskContainer = columnEl.querySelector('.tasks');

  if (columnEl.querySelector('.task-create-form')) {
    return;
  }
  taskContainer.insertAdjacentHTML(
    'afterbegin',
    renderTaskCreateForm(columnId),
  );
});

refs.sectionContainer.addEventListener('click', (event) => {
  const btnCancelInputForm = event.target.closest(
    '.task-create-form__btn--cancel',
  );
  if (!btnCancelInputForm) {
    return;
  }
  const formEl = btnCancelInputForm.closest('.task-create-form');
  formEl.remove();
});

refs.sectionContainer.addEventListener('click', (event) => {
  const saveBtn = event.target.closest('.task-create-form__btn--save');
  if (!saveBtn) {
    return;
  }
  const formEl = saveBtn.closest('.task-create-form');
  if (!formEl) {
    return;
  }

  const inputTitle = formEl.querySelector('.task-create-form__title');

  if (!inputTitle.value.trim() || inputTitle.value.trim() === '') {
    showEmptyColumnWarning(
      'Пожалуйста, укажите название задачи для ее добавления',
    );
    return;
  }
  const formTextArea = formEl.querySelector('.task-create-form__description');
  const optionForm = formEl.querySelector('.task-create-form__priority');
  const formDeadline = formEl.querySelector('.task-create-form__deadline');
  const columnIdForm = formEl.dataset.columnId;

  const task = {
    id: crypto.randomUUID(),
    title: inputTitle.value.trim(),
    description: formTextArea.value.trim(),
    priority: optionForm.value.trim(),
    deadline: formDeadline.value.trim(),
    columnId: columnIdForm,
  };
  dispatch({ type: 'ADD_TASK', payload: task });
});
