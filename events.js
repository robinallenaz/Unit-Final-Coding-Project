// This file handles event-related functionalities for entity management.

import { fetchEntities, createEntity, deleteEntity } from './api.js';
import { displayEntities } from './dom.js';

/**
 * Initializes event listeners for entity creation and deletion.
 */
export function initializeEventListeners() {
  // Get the form element for creating new entities
  const form = document.getElementById('entity-form');

  /**
   * Event listener for form submission.
   * Prevents default form submission and creates a new entity.
   */
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

  /**
   * Event listener for delete button clicks.
   * Deletes an entity with the given ID.
   */
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

  // Initial fetch of entities
  // Fetch the list of entities and display them
  fetchEntities().then(displayEntities).catch(error => alert(error.message));
}
