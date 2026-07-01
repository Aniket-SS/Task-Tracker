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

## 3. Deploying to a Public URL

You need three free-tier pieces: a MongoDB Atlas cluster, a backend host (Render), and a frontend host (Vercel or Netlify).

### Step A — MongoDB Atlas (database)
1. Create a free cluster at https://cloud.mongodb.com.
2. Add a database user (username/password) and allow network access from `0.0.0.0/0` (or Render's IPs).
3. Copy the connection string, e.g.
   `mongodb+srv://<user>:<password>@cluster0.mongodb.net/taskTracker?retryWrites=true&w=majority`

### Step B — Backend on Render
1. Push this repo to GitHub.
2. In [Render](https://render.com) → New → Web Service → connect the repo, set **Root Directory** to `backend`.
3. Build command: `npm install`   Start command: `npm start`
4. Add environment variables:
   - `MONGO_URI` = your Atlas connection string
   - `CLIENT_URL` = your frontend URL (add after Step C, then redeploy)
   - `PORT` = `5000` (Render sets its own `PORT`, but the app already falls back correctly)
5. Deploy. Note the public URL, e.g. `https://task-tracker-api.onrender.com`.

### Step C — Frontend on Vercel
1. In [Vercel](https://vercel.com) → New Project → import the repo → set **Root Directory** to `frontend`.
2. Framework preset: Create React App.
3. Add environment variable:
   - `REACT_APP_API_URL` = `https://task-tracker-api.onrender.com/api`
4. Deploy. Vercel gives you a public URL, e.g. `https://task-tracker.vercel.app`.
5. Go back to Render and set `CLIENT_URL` to this Vercel URL, then redeploy the backend so CORS allows it.

(Netlify works the same way as Vercel — just set the same env var and point the build command to `npm run build` with publish directory `build`.)

### Step D — Verify
- Visit `https://<backend>.onrender.com/api/health` → should return `{ "status": "ok" }`.
- Visit your Vercel URL and confirm tasks can be created/edited/deleted with no page reloads.

## 4. Notes
- Render free-tier services spin down when idle — first request after inactivity may take ~30s.
- CORS is restricted to `CLIENT_URL`; update it whenever the frontend URL changes.
- Never commit `.env` files — only `.env.example` is included.
