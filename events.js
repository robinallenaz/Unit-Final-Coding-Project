import { fetchEntities, createEntity, deleteEntity } from './api.js';
import { displayEntities } from './dom.js';

export function initializeEventListeners() {
  const form = document.getElementById('entity-form');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const nameInput = document.getElementById('entity-name');
    const name = nameInput.value.trim();
    if (!name) {
      alert('Please enter a name for the entity.');
      return;
    }
    try {
      await createEntity(name);
      nameInput.value = '';
      const entities = await fetchEntities();
      displayEntities(entities);
    } catch (error) {
      alert(error.message);
    }
  });

  document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-btn')) {
      const id = event.target.getAttribute('data-id');
      try {
        await deleteEntity(id);
        const entities = await fetchEntities();
        displayEntities(entities);
      } catch (error) {
        alert(error.message);
      }
    }
  });

  // Initial fetch of entities
  fetchEntities().then(displayEntities).catch(error => alert(error.message));
}
