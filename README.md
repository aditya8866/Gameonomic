# Gameonomic

Gameonomic is a small full-stack project that helps users browse and track game prices. It aggregates prices from multiple stores and shows the lowest available price for each video game. The repository contains a React + Vite frontend and an Express + MongoDB backend.

## Table of contents

- [Project structure](#project-structure)
- [Requirements](#requirements)
- [Quick start](#quick-start)
- [Backend](#backend)
  - [Environment variables](#environment-variables)
  - [Install & run](#install--run)
  - [API endpoints](#api-endpoints)
  - [User model](#user-model)
- [Frontend](#frontend)
  - [Install & run](#install--run-1)
- [Scripts](#scripts)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Project structure

Top-level layout (important folders only):

- `backend/` - Express API, Mongoose models, controllers and routes
  - `app.js` - server entry
  - `controllers/` - request handlers
  - `models/` - Mongoose schemas
  - `service/` - business logic
  - `routes/` - express routes
  - `config/` - DB connection
  - `package.json` - backend dependencies & scripts
- `frontend/` - Vite + React SPA

## Requirements

- Node.js 16+ (or any modern LTS)
- MongoDB instance (local or hosted)

## Quick start

1. Clone the repo:

```powershell
git clone <repo-url>
cd minorproject
```

2. Start backend and frontend in two separate terminals (see instructions below).

## Backend

The backend is a small Express app with a single user registration route and a Mongoose user model.

Path: `backend/`

### Environment variables

Create a `.env` in `backend/` with at least:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=some_secret_key
PORT=4000 # optional, defaults to 3000
```

### Install & run

```powershell
cd backend
npm install
npm start
```

The server uses ES modules (`type: "module"` is set in `backend/package.json`). When the server starts it will first connect to MongoDB then listen on the configured port.

### API endpoints

All endpoints are prefixed with `/users` unless noted otherwise.

- `GET /` (root) — simple ping route
  - Response: 200, text

- `POST /users/register` — register a new user
  - Request body (JSON):
    - `firstname` (string, required, min 3 chars)
    - `lastname` (string, optional, min 3 chars)
    - `email` (string, required, valid email)
    - `password` (string, required, min 6 chars)
  - Success response:
    - Status: `201 Created`
    - Body (JSON):
      ```json
      {
        "message": "User registered successfully",
        "token": "<jwt-token>",
        "user": {
          /* user object without password */
        }
      }
      ```
  - Validation errors:
    - Status: `400 Bad Request` with `{ message: "<first validation message>" }`
  - Duplicate user:
    - Status: `400 Bad Request` with `{ message: "User already exists" }`
  - Server error:
    - Status: `500 Internal server error`

Notes: passwords are hashed using bcrypt before saving; tokens are generated with `JWT_SECRET`.

### User model

Important fields (Mongoose):

- `firstname` (String, required)
- `lastname` (String, optional)
- `email` (String, required)
- `password` (String, required, not selected by default)
- `history` (Array of `{ gameName, currPrice }`)
- `favGames` (Array of `{ gameName, currPrice }`)

## Frontend

Path: `frontend/` (Vite + React)

### Install & run

```powershell
cd frontend
npm install
npm run dev
```

The frontend expects the backend API to be available (adjust API base URL in the frontend config or code if needed).

## Scripts

- Backend
  - `npm start` — start backend with nodemon
- Frontend
  - `npm run dev` — start Vite dev server

## Troubleshooting

- "All fields are required except lastname" when registering
  - Cause: the backend service expects a `password` argument name; ensure the controller passes the hashed password under the expected key. A mismatch between parameter names (e.g. `hashPassword` vs `password`) will throw this error. See `backend/service/user.service.js` and `backend/controllers/user.controllers.js`.

- Server doesn't start / module errors
  - Ensure `backend/package.json` contains `"type": "module"` after converting to ES modules.

- MongoDB connection errors
  - Verify `MONGODB_URI` is set and reachable. Check logs printed by `backend/config/db.js`.

If you'd like, I can also:

- Add example `.env.example` files in `backend/` and `frontend/`.
