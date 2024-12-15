// Base URL for the API
const apiUrl = 'http://localhost:3000/entities';

// Fetch all entities from the API
export async function fetchEntities() {
  try {
    const response = await fetch(apiUrl);
    return await response.json(); // Return the list of entities
  } catch (error) {
    throw new Error('Failed to fetch entities'); // Throw an error if fetching fails
  }
}

// Create a new entity via the API
export async function createEntity(name) {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    if (!response.ok) throw new Error('Failed to create entity'); // Check if the request was successful
  } catch (error) {
    throw new Error('Failed to create entity'); // Throw an error if creation fails
  }
}

// Delete an entity by ID via the API
export async function deleteEntity(id) {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete entity'); // Check if the request was successful
  } catch (error) {
    throw new Error('Failed to delete entity'); // Throw an error if deletion fails
  }
}
