document.addEventListener('DOMContentLoaded', () => {
  // API endpoint URL for entity management
  const apiUrl = 'http://localhost:3000/entities'; 

  // Function to fetch and display entities
  // This function retrieves entities from the API and displays them on the page.
  async function fetchEntities() {
    try {
      // Fetch entities from the API
      const response = await fetch(apiUrl);
      const entities = await response.json();
      // Display the fetched entities
      displayEntities(entities);
    } catch (error) {
      console.error('Error fetching entities:', error);
    }
  }

  // Function to display entities on the page
  // This function takes an array of entities and displays them in a table.
  function displayEntities(entities) {
    // Get the entity list element
    const entityList = document.getElementById('entity-list');
    // Clear existing entities
    entityList.innerHTML = ''; 

    // Create a table to display entities
    const table = document.createElement('table');
    table.className = 'table table-striped';
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    table.appendChild(thead);
    table.appendChild(tbody);
    entityList.appendChild(table);

    // Create table headers
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

    // Display each entity in the table
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
  // This function handles the form submission and creates a new entity based on form data.
  async function createEntity(event) {
    event.preventDefault();
    // Get the entity name from the form input
    const nameInput = document.getElementById('entity-name');
    const newEntity = { name: nameInput.value };

    try {
      // Send a POST request to the API to create a new entity
      await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEntity)
      });
      // Clear the form input
      nameInput.value = '';
      // Refresh the entity list
      fetchEntities(); 
    } catch (error) {
      console.error('Error creating entity:', error);
    }
  }

  // Define deleteEntity globally
  // This function deletes an entity by sending a DELETE request to the API.
  window.deleteEntity = async function(id) {
    try {
      // Send a DELETE request to the API to delete the entity
      await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
      });
      // Refresh the entity list
      fetchEntities(); 
    } catch (error) {
      console.error('Error deleting entity:', error);
    }
  }

  // This script handles various functionalities including showing and hiding a loading spinner.

  // Function to show the loading spinner
  // This function makes the spinner visible by changing its display style.
  function showSpinner() {
      document.getElementById('loading-spinner').style.display = 'block';
  }

  // Function to hide the loading spinner
  // This function hides the spinner by setting its display style to 'none'.
  function hideSpinner() {
      document.getElementById('loading-spinner').style.display = 'none';
  }

  // Example usage: show the spinner for 3 seconds
  // This demonstrates how to use the showSpinner and hideSpinner functions.
  showSpinner();
  setTimeout(hideSpinner, 3000);

  // Event listener for form submission
  // This listener triggers the createEntity function when the form is submitted.
  const form = document.getElementById('entity-form');
  form.addEventListener('submit', createEntity);

  // Event listener for fetching entities
  // This listener triggers the fetchEntities function when the button is clicked.
  const fetchButton = document.getElementById('fetch-entities');
  fetchButton.addEventListener('click', fetchEntities);

  // Initial fetch of entities
  fetchEntities();
});
