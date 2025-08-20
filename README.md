# Contact Management Frontend

This is the React frontend for the Contact Management System.

## Features

- User Authentication (Login/Register)
- CRUD operations for Contacts
- Search, filter, and sort contacts
- Reusable components (forms, dialogs)
- Pagination
- Toast notifications for errors and success messages

## Tech Stack

- React 18
- TypeScript
- Redux Toolkit
- React Router DOM
- Axios
- React-Bootstrap / Bootstrap 5
- React-Icons
- React-Toastify

## Setup Instructions

### Prerequisites
- Docker and Docker Compose
- Node.js (if not using Docker)

### Installation
1.  Clone the repository:
    ```bash
    git clone [https://github.com/SachiiR/contact-management-be.git](https://github.com/SachiiR/contact-management-be.git)
    cd contact-management-be
    ```
2.  Set up the environment variables:
    Create a `.env` file in the root directory and add your database credentials and any other required variables.

3.  Run the application using Docker Compose:
    ```bash
    docker-compose up -d --build
    ```
    This command will build the Docker images and start the containers in detached mode.

## API Documentation

| Endpoint                        | Method | Description                                    |
| ------------------------------- | ------ | ---------------------------------------------- |
| `/api/contacts`                 | `GET`  | Retrieves a list of all contacts.              |
| `/api/contacts`                 | `POST` | Creates a new contact.                         |
| `/api/contacts/:id`             | `PUT`  | Updates a contact by ID.                       |
| `/api/contacts/:id`             | `DELETE`| Deletes a contact by ID.                      |
| `/api/users`	                  | `POST` | Creates a new user account.                    |
| `/api/auth/login`	              | `POST` | Authenticates a user and returns a token.      |
| `/api/users`	                  | `GET`  | Retrieves all user by their ID.                |
| `/api/users/:id`	              |`PUT`    |Updates an existing user's information.        |                    
| `/api/users/:id`	              |`DELETE`	| Deletes a user by ID.|

### Postman API Example
src/utils/uploads/AllUsers.png

### UI
src/utils/uploads/Login.png
src/utils/uploads/Contacts.png
src/utils/uploads/AllUsers.png
src/utils/uploads/Register.png
