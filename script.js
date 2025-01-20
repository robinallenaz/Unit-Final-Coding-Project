document.addEventListener('DOMContentLoaded', () => {
  const apiUrl = 'http://localhost:3000/entities'; 

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

    const table = document.createElement('table');
    table.className = 'table table-striped';
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    table.appendChild(thead);
    table.appendChild(tbody);
    entityList.appendChild(table);

    const tr = document.createElement('tr');
    thead.appendChild(tr);
    const thId = document.createElement('th');
    thId.textContent = 'ID';
    const thName = document.createElement('th');
    thName.textContent = 'Name';
    const thActions = document.createElement('th');
    thActions.textContent = 'Actions';
    tr.appendChild(thId);
    tr.appendChild(thName);
    tr.appendChild(thActions);

    entities.forEach(entity => {
      const entityRow = document.createElement('tr');
      entityRow.innerHTML = `
        <td>${entity.id}</td>
        <td>${entity.name}</td>
        <td><button class="btn btn-danger" onclick="window.deleteEntity(${entity.id})">Delete</button></td>
      `;
      tbody.appendChild(entityRow);
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

  // Define deleteEntity globally
  window.deleteEntity = async function(id) {
    try {
      await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
      });
      fetchEntities(); // Refresh the list
    } catch (error) {
      console.error('Error deleting entity:', error);
    }
  }

  // Function to show the loading spinner
  function showSpinner() {
    document.getElementById('loading-spinner').style.display = 'block';
  }

  // Function to hide the loading spinner
  function hideSpinner() {
    document.getElementById('loading-spinner').style.display = 'none';
  }

  // Example usage: show the spinner for 3 seconds
  showSpinner();
  setTimeout(hideSpinner, 3000);

  // Event listener for form submission
  const form = document.getElementById('entity-form');
  form.addEventListener('submit', createEntity);

  // Event listener for fetching entities
  const fetchButton = document.getElementById('fetch-entities');
  fetchButton.addEventListener('click', fetchEntities);

  // Initial fetch of entities
  fetchEntities();
});
