import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { dispatch, subscribe } from './store/store.js';
import { refs } from './ui/refs.js';
import { render } from './ui/render.js';

function showEmptyColumnWarning() {
  iziToast.warning({
    message: 'Пожалуйста, заполните поле формы для добавления новой колонки',
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
    showEmptyColumnWarning();
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
  const input = document.createElement('input');
  input.value = oldTitle;
  titleEl.replaceWith(input);
  input.focus();
  input.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') {
      return;
    }
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
  });
});
