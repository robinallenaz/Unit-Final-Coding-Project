// Handles event listeners for entity actions.

import { fetchEntities, createEntity, deleteEntity } from './api.js';
import { displayEntities } from './dom.js';

export function initializeEventListeners() {
  // Get the form element for creating new entities
  const form = document.getElementById('entity-form');

  // Add entity on form submit
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Get the input field for the entity name
    const nameInput = document.getElementById('entity-name');

    // Trim the input value to remove whitespace
    const name = nameInput.value.trim();

    // Validate the input value
    if (!name) {
      alert('Please enter a name for the entity.');
      return;
    }

    try {
      // Create a new entity with the given name
      await createEntity(name);

      // Clear the input field
      nameInput.value = '';

      // Fetch the updated list of entities
      const entities = await fetchEntities();

      // Display the updated list of entities
      displayEntities(entities);
    } catch (error) {
      // Handle any errors that occur during entity creation
      alert(error.message);
    }
  });

  // Delete entity on button click
  document.addEventListener('click', async (event) => {
    // Check if the clicked element is a delete button
    if (event.target.classList.contains('delete-btn')) {
      // Get the ID of the entity to delete
      const id = event.target.getAttribute('data-id');

      try {
        // Delete the entity with the given ID
        await deleteEntity(id);

        // Fetch the updated list of entities
        const entities = await fetchEntities();

        // Display the updated list of entities
        displayEntities(entities);
      } catch (error) {
        // Handle any errors that occur during entity deletion
        alert(error.message);
      }
    }
  });

  // Initial load of entities
  fetchEntities().then(displayEntities).catch(error => alert(error.message));
}
