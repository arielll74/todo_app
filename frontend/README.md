# Full-Stack To-Do List Application

## 📌 Description
This is a full-stack To-Do List application built using **React (Frontend)** and **Django REST Framework (Backend)**. It allows users to **create, read, update, and delete tasks** efficiently.

## 🛠️ Tech Stack
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Django REST Framework
- **Database**: PostgreSQL (or SQLite)
- **Deployment**: Netlify (Frontend), Render (Backend)

## 🚀 Live Demo
- **Frontend**: [Live Link](https://arielll74.github.io/todo_app)  
- **Backend API**: [Live API](https://your-backend-link.onrender.com)  

## 📌 Backend API Endpoints
## Backend API Endpoints

| Method | Endpoint             | Description                                  | Request Body (JSON) | Response Body (JSON) |
| :----- | :------------------- | :------------------------------------------- | :------------------ | :------------------- |
| GET    | `/api/todos/`        | Retrieves a list of all To-Do items.           | None                | `[{"id": 1, "title": "Task 1", "completed": false}, ...]` |
| POST   | `/api/todos/`        | Creates a new To-Do item.                   | `{"title": "New Task", "completed": false}` | `{"id": 2, "title": "New Task", "completed": false}` |
| GET    | `/api/todos/{id}/`   | Retrieves a specific To-Do item by ID.      | None                | `{"id": 1, "title": "Task 1", "completed": false}` |
| PUT    | `/api/todos/{id}/`   | Updates a specific To-Do item by ID.      | `{"title": "Updated Task", "completed": true}` | `{"id": 1, "title": "Updated Task", "completed": true}` |
| DELETE | `/api/todos/{id}/`   | Deletes a specific To-Do item by ID.      | None                | `{}` (empty JSON object indicating success) |


## Setup/Installation

### Backend Setup

1.  Navigate to the backend directory:

    ```bash
    cd backend
    ```

2.  Create a virtual environment:

    ```bash
    python -m venv venv
    ```

3.  Activate the virtual environment:

    * macOS/Linux:

        ```bash
        source venv/bin/activate
        ```

    * Windows:

        ```bash
        venv\Scripts\activate
        ```

4.  Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```

5.  Run database migrations:

    ```bash
    python manage.py migrate
    ```

6.  Start the development server:

    ```bash
    python manage.py runserver
    ```

    ### Frontend Setup

1.  Navigate to the frontend directory:

    ```bash
    cd ../frontend
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Start the development server:

    ```bash
    npm start
    ```

## 🛠️ How to Run Locally
1. **Clone the Repository**  
   ```sh
   git clone https://github.com/arielll74/todo_app.git
   cd todo_app
