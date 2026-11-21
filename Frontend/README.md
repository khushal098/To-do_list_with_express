# Part 2 – To-Do List React Frontend (integrated with the API)

## Setup
1. Start the Part 1 backend first (see `../Part1-Backend/README.md`).
2. `cd Part2-Frontend`
3. `npm install` (installs React, Vite and **Axios**)
4. Copy `.env.example` to `.env`
5. `npm run dev` – app runs on http://localhost:5173

## Environment variables
| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Base URL of the backend API (include `/api`) | `http://localhost:5000/api` |

For production set it to your Render URL, e.g. `https://your-app.onrender.com/api`.

## Features
- Fetch, add, edit, delete tasks, update status (checkbox or dropdown), search and filter by status
- Loading indicator, error banner with Retry, responsive layout
- State handled with `useState` / `useEffect`; all HTTP calls live in `src/api/tasks.js`

## Deployment
- **Backend (Render):** Web Service, root dir `Part1-Backend`, build `npm install`, start `npm start`. Add `MONGO_URI` (MongoDB Atlas) and `CLIENT_URL` (your Netlify URL) as environment variables.
- **Frontend (Netlify):** base dir `Part2-Frontend`, build `npm run build`, publish dir `dist`. Add `VITE_API_URL` as an environment variable.

Live links: Frontend: `<add Netlify link>` | Backend: `<add Render link>`

## Challenges & how I handled them
- **CORS errors:** fixed by allowing the frontend origin in the backend via `CLIENT_URL`.
- **Keeping UI in sync:** after each successful API call I update local state from the server's response, so the UI always matches the database.
- **Too many requests while searching:** added a 400 ms debounce on the search box.
- **Error handling:** a helper converts API/network errors into friendly messages shown in the UI.
- **Deployment env vars:** Vite reads `VITE_` variables at build time, so the API URL is set in Netlify before building.
