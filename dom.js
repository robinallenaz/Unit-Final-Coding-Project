// This file manages DOM manipulations and interactions.

// Function to display entities with pagination
// This function displays a list of entities with pagination controls.
// It takes in an array of entities, the current page number, and the page size.
export function displayEntities(entities, currentPage = 1, pageSize = 10) {
  // Calculate total pages
  const totalPages = Math.ceil(entities.length / pageSize);

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
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const currentEntities = entities.slice(start, end);
  currentEntities.forEach(entity => {
    const entityRow = document.createElement('tr');
    entityRow.innerHTML = `
      <td>${entity.id}</td>
      <td>${entity.name}</td>
      <td><button class="btn btn-danger delete-btn" data-id="${entity.id}" aria-label="Delete entity ${entity.name}">Delete</button></td>
    `;
    fragment.appendChild(entityRow);
  });
  tbody.appendChild(fragment); // Append all rows at once

  // Create pagination controls
  const pagination = document.createElement('div');
  pagination.className = 'pagination';

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.className = 'page-btn';
    pageButton.disabled = i === currentPage;
    pageButton.addEventListener('click', () => {
      displayEntities(entities, i, pageSize);
    });
    pagination.appendChild(pageButton);
  }
  entityList.appendChild(pagination);
}

// Function to create a new DOM element
// This function creates a new element of the specified type and returns it.
function createElement(type) {
    return document.createElement(type);
}

// Function to append a child element to a parent
// This function appends the given child element to the specified parent element.
function appendChild(parent, child) {
    parent.appendChild(child);
}

// Function to set text content of an element
// This function sets the text content of the specified element to the given text.
function setTextContent(element, text) {
    element.textContent = text;
}

// Example usage: Creating and appending a new paragraph to the body
const newParagraph = createElement('p');
setTextContent(newParagraph, 'This is a new paragraph.');
appendChild(document.body, newParagraph);

let currentPage = 1;
const usersPerPage = 5;
let allUsers = [];

// Function to display a page of users
// This function displays a list of users for the specified page.
function displayPage(page) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';
    const start = (page - 1) * usersPerPage;
    const end = start + usersPerPage;
    const usersToDisplay = allUsers.slice(start, end);
    usersToDisplay.forEach(user => {
        const userItem = document.createElement('li');
        userItem.textContent = `${user.name.first} ${user.name.last} (${user.email})`;
        userList.appendChild(userItem);
    });
    updatePaginationControls();
}

// Function to update pagination controls
// This function updates the pagination controls to reflect the current page and total pages.
function updatePaginationControls() {
    const paginationControls = document.getElementById('pagination-controls');
    paginationControls.innerHTML = '';
    const totalPages = Math.ceil(allUsers.length / usersPerPage);
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.disabled = i === currentPage;
        pageButton.addEventListener('click', () => {
            currentPage = i;
            displayPage(currentPage);
        });
        paginationControls.appendChild(pageButton);
    }
}

// Function to fetch and display users
// This function fetches a list of users from the API and displays the first page.
async function fetchAndDisplayUsers() {
    try {
        const response = await fetch('https://randomuser.me/api/?results=50');
        const data = await response.json();
        allUsers = data.results;
        displayPage(currentPage);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

// Event listener for DOMContentLoaded
// This function is called when the DOM is fully loaded and parsed.
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');
  const toggleButton = document.getElementById('dark-mode-toggle');
  const body = document.body;

  // Check for saved user preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    body.classList.add(savedTheme);
  }

  // Event listener for dark mode toggle button
  // This function toggles the dark mode class on the body element.
  toggleButton.addEventListener('click', () => {
    console.log('Dark mode toggle button clicked');
    body.classList.toggle('dark-mode');

    // Save user preference
    if (body.classList.contains('dark-mode')) {
      console.log('Dark mode class added');
      localStorage.setItem('theme', 'dark-mode');
    } else {
      console.log('Dark mode class removed');
      localStorage.setItem('theme', '');
    }
  });

  const fetchButton = document.getElementById('fetch-entities');
  fetchButton.addEventListener('click', fetchAndDisplayUsers);

  const form = document.getElementById('contactForm');

  // Event listener for form submission
  // This function validates the form fields and prevents submission if invalid.
  form.addEventListener('submit', function(event) {
    // Prevent form submission
    event.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();

    // Validate form fields
    if (name === '') {
      alert('Name is required.');
      return;
    }

    if (email === '') {
      alert('Email is required.');
      return;
    }

    // Simple email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // If validation passes, submit the form or perform desired actions
    alert('Form submitted successfully!');
    // form.submit(); // Uncomment this line to allow form submission
  });
});
