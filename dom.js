// Function to display entities in a table format
export function displayEntities(entities) {
  // Get the entity list container
  const entityList = document.getElementById('entity-list');
  entityList.innerHTML = ''; // Clear existing entities

  // Create a table element
  const table = document.createElement('table');
  table.className = 'table table-striped';
  table.setAttribute('role', 'table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  table.appendChild(thead);
  table.appendChild(tbody);
  entityList.appendChild(table);

  // Create table headers
  const tr = document.createElement('tr');
  thead.appendChild(tr);
  const headers = ['ID', 'Name', 'Actions'];
  headers.forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    th.setAttribute('scope', 'col');
    tr.appendChild(th);
  });

  // Use a Document Fragment for efficient DOM updates
  const fragment = document.createDocumentFragment();
  entities.forEach(entity => {
    const entityRow = document.createElement('tr');
    entityRow.innerHTML = `
      <td>${entity.id}</td>
      <td>${entity.name}</td>
      <td><button class="btn btn-danger delete-btn" data-id="${entity.id}" aria-label="Delete entity ${entity.name}">Delete</button></td>
    `;
    fragment.appendChild(entityRow);
  });
  tbody.appendChild(fragment); // Append all rows at once
}
