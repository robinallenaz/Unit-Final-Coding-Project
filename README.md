# CRD Application

This project is a simple CRD (Create, Read, Delete) application using `json-server` as a backend API. It allows users to create, view, and delete entities. The application is styled with Bootstrap for a clean and responsive user interface.

## Features
- Create new entities using a form.
- View a list of existing entities.
- Delete entities from the list.

## Technologies Used
- **json-server**: Provides a simple REST API for CRUD operations.
- **Bootstrap**: Used for styling and responsive design.
- **JavaScript**: Handles API interactions using `fetch` and `async/await`.

## Code Structure

The codebase has been modularized into the following files for better organization and maintainability:

- **api.js**: Handles all API interactions, including fetching, creating, and deleting entities.
- **dom.js**: Manages DOM manipulations, specifically for displaying entities in a table.
- **events.js**: Sets up event listeners for form submissions and button clicks.

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/YourUserName/YourRepoName.git
   cd YourRepoName
   ```

2. **Install Dependencies**
   - Run the following command to install `json-server` and other dependencies:
   ```bash
   npm install
   ```

3. **Start the JSON Server**
   ```bash
   npm start
   ```
   This will start the server on `http://localhost:3000`.

4. **Open the Application**
   - Open `index.html` in a web browser to interact with the application.

Ensure that you have a modern browser to support ES6 modules used in the code.

## Usage
- Fill out the form to add a new entity.
- View the list of entities displayed below the form.
- Click the "Delete" button next to an entity to remove it.

## Testing the API Endpoints

You can test the API endpoints using a tool like Postman or by using curl commands in the terminal. Here are the steps to test each endpoint:

### Get All Entities
- **Endpoint:** `GET http://localhost:3000/entities`
- **Description:** Retrieves a list of all entities.
- **Test with curl:**
  ```bash
  curl http://localhost:3000/entities
  ```

### Create a New Entity
- **Endpoint:** `POST http://localhost:3000/entities`
- **Description:** Adds a new entity to the list.
- **Test with curl:**
  ```bash
  curl -X POST http://localhost:3000/entities -H "Content-Type: application/json" -d '{"name": "New Entity"}'
  ```

### Delete an Entity
- **Endpoint:** `DELETE http://localhost:3000/entities/:id`
- **Description:** Deletes an entity by its ID.
- **Test with curl:**
  ```bash
  curl -X DELETE http://localhost:3000/entities/1
  ```
  Replace `1` with the ID of the entity you want to delete.

These commands assume `json-server` is running on `http://localhost:3000`. Make sure to replace placeholder values with actual data when testing.
