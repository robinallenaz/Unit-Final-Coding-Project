export function displayEntities(entities) {
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
  const headers = ['ID', 'Name', 'Actions'];
  headers.forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    tr.appendChild(th);
  });

  const fragment = document.createDocumentFragment();
  entities.forEach(entity => {
    const entityRow = document.createElement('tr');
    entityRow.innerHTML = `
      <td>${entity.id}</td>
      <td>${entity.name}</td>
      <td><button class="btn btn-danger delete-btn" data-id="${entity.id}">Delete</button></td>
    `;
    fragment.appendChild(entityRow);
  });
  tbody.appendChild(fragment);
}