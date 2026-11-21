# Part 1 – To-Do List API (Node.js + Express.js + MongoDB)

## Setup
1. `cd Part1-Backend`
2. `npm install`
3. Copy `.env.example` to `.env` and fill in the values.
4. `npm run dev` (or `npm start`) – server runs on http://localhost:5000

## Environment variables
| Variable | Description | Example |
|---|---|---|
| `PORT` | Port to listen on | `5000` |
| `MONGO_URI` | MongoDB connection string (local or Atlas) | `mongodb://127.0.0.1:27017/todo_db` |
| `CLIENT_URL` | Allowed frontend origin(s), comma separated (CORS) | `http://localhost:5173` |

## Structure
`routes/` → `controllers/` → `services/` → `models/`, plus `middleware/` (validation, error handling) and `config/` (DB).

## Endpoints
| Method | URL | Purpose |
|---|---|---|
| GET | `/api/tasks?search=&status=` | List / search / filter tasks |
| GET | `/api/tasks/:id` | Get one task |
| POST | `/api/tasks` | Create task `{ title, description?, status? }` |
| PUT | `/api/tasks/:id` | Update task details |
| PATCH | `/api/tasks/:id/status` | Update status `{ status }` (`pending`, `in-progress`, `completed`) |
| DELETE | `/api/tasks/:id` | Delete task |

Test every endpoint in Postman before moving to Part 2.

## Challenges & how I handled them
- **Keeping code organised:** split logic into routes, controllers and services so each file has one job.
- **Validation & errors:** added middleware for ObjectId/title/status checks and a central error handler so the API always returns clean JSON errors (400/404/500).
- **Search safely:** escaped user input before building the regex for search so special characters can't break the query.
- **CORS:** the browser blocked frontend calls until `cors` was configured with the frontend origin via `CLIENT_URL`.
