const apiUrl = 'http://localhost:3000/entities';

export async function fetchEntities() {
  try {
    const response = await fetch(apiUrl);
    return await response.json();
  } catch (error) {
    throw new Error('Failed to fetch entities');
  }
}

export async function createEntity(name) {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    if (!response.ok) throw new Error('Failed to create entity');
  } catch (error) {
    throw new Error('Failed to create entity');
  }
}

export async function deleteEntity(id) {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete entity');
  } catch (error) {
    throw new Error('Failed to delete entity');
  }
}
