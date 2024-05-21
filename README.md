# User Management App

This is a simple React app to manage user data. You can view, add, edit, and delete users. The app fetches data from a public API and displays it in a table.

## Features

- View Users: Fetches and displays users from an API.
- Add User: Fill out a form to add a new user.
- Edit User: Update existing user details.
- Delete User: Remove a user from the list.
- Loading Spinner: Shows a spinner while data is loading.
- Notifications: Alerts for actions like errors and successful operations.

## Components

### UserDetails
- Fetches and displays user data.
- Handles add, edit, and delete operations.
- Shows a loading spinner and notifications.

### UserForm
- Form for adding and editing users.
- Accepts props for form state and submission handling.

### Loader
- Displays a loading spinner.

## How to Run

1. Clone the repo:
   git clone https://github.com/your-username/user-management-app.git
   
2. Navigate to the project:
   cd user-management-app
   
3. Install dependencies:
   npm install
   
4. Start the app:
   npm start
   

The app will run at `http://localhost:3000`.

## Usage

- View Users**: Users are displayed in a table on page load.
- Add User**: Click "Add User", fill out the form, and submit.
- Edit User**: Click "Edit" next to a user, update the form, and submit.
- Delete User**: Click "Delete" next to a user and confirm.

## API

Uses [JSONPlaceholder API](https://jsonplaceholder.typicode.com/users) for user data.

- GET `/users`: Fetch users.
- POST `/users`: Add a user.
- PUT `/users/:id`: Update a user.
- DELETE `/users/:id`: Delete a user.
