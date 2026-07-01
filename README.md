# Task Tracker — MERN Stack Application

A full-stack Task Tracker with complete CRUD, validation, filtering, sorting, search, and a responsive React UI backed by an Express + MongoDB REST API.

## Project Structure

```
task-tracker/
├── backend/          Express + Mongoose REST API
│   ├── models/Task.js
│   ├── routes/tasks.js
│   ├── server.js
│   └── .env.example
└── frontend/          React app
    ├── src/
    │   ├── components/ (TaskForm, TaskList, TaskItem, Toast)
    │   ├── App.js
    │   └── api.js
    └── .env.example
```

## Features

- Full CRUD for tasks (title, description, status, priority, due date)
- Server-side + client-side form validation
- REST API (`GET/POST/PUT/PATCH/DELETE /api/tasks`)
- MongoDB persistence via Mongoose with schema validation
- Filtering by status/priority, text search, and sorting (createdAt, dueDate, priority, title)
- Optimistic status updates and toast notifications, no page reloads
- Fully responsive CSS grid layout (mobile → desktop)
- Environment-variable driven configuration on both ends

## 1. Local Setup

### Prerequisites
- Node.js 18+
- A MongoDB connection string (local `mongod`, or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) cluster)

### Backend
```bash
cd backend
cp .env.example .env     # then fill in MONGO_URI
npm install
npm run dev               # nodemon on http://localhost:5000
```

### Frontend
```bash
cd frontend
cp .env.example .env      # REACT_APP_API_URL=http://localhost:5000/api
npm install
npm start                 # http://localhost:3000
```

## 2. API Reference

| Method | Endpoint                | Description                          |
|--------|--------------------------|---------------------------------------|
| GET    | `/api/tasks`             | List tasks (`?status=&priority=&search=&sortBy=&order=`) |
| GET    | `/api/tasks/:id`         | Get a single task |
| POST   | `/api/tasks`             | Create a task |
| PUT    | `/api/tasks/:id`         | Update a task |
| PATCH  | `/api/tasks/:id/status`  | Update only the status |
| DELETE | `/api/tasks/:id`         | Delete a task |

Task schema:
```json
{
  "title": "string, required, 3-100 chars",
  "description": "string, optional, max 500 chars",
  "status": "pending | in-progress | completed",
  "priority": "low | medium | high",
  "dueDate": "ISO date, optional"
}
```
