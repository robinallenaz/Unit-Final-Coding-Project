document.addEventListener('DOMContentLoaded', () => {
  const apiUrl = 'http://localhost:3000/entities'; // Adjust the URL if necessary

  // Function to fetch and display entities
  async function fetchEntities() {
    try {
      const response = await fetch(apiUrl);
      const entities = await response.json();
      displayEntities(entities);
    } catch (error) {
      console.error('Error fetching entities:', error);
    }
  }

  // Function to display entities on the page
  function displayEntities(entities) {
    const entityList = document.getElementById('entity-list');
    entityList.innerHTML = ''; // Clear existing entities

    entities.forEach(entity => {
      const entityItem = document.createElement('div');
      entityItem.className = 'entity-item';
      entityItem.innerHTML = `
        <p>${entity.name}</p>
        <button onclick="deleteEntity(${entity.id})">Delete</button>
      `;
      entityList.appendChild(entityItem);
    });
  }

  // Function to create a new entity
  async function createEntity(event) {
    event.preventDefault();
    const nameInput = document.getElementById('entity-name');
    const newEntity = { name: nameInput.value };

    try {
      await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEntity)
      });
      nameInput.value = '';
      fetchEntities(); // Refresh the list
    } catch (error) {
      console.error('Error creating entity:', error);
    }
  }

  // Function to delete an entity
  async function deleteEntity(id) {
    try {
      await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
      });
      fetchEntities(); // Refresh the list
    } catch (error) {
      console.error('Error deleting entity:', error);
    }
  }

  // Event listener for form submission
  const form = document.getElementById('entity-form');
  form.addEventListener('submit', createEntity);

  // Event listener for fetching entities
  const fetchButton = document.getElementById('fetch-entities');
  fetchButton.addEventListener('click', fetchEntities);

  // Initial fetch of entities
  fetchEntities();
});
