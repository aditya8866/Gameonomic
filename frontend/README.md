# Frontend (React + Vite)

This frontend is a Vite + React single-page app for the Gameonomic project. It consumes the backend API to show, search and track game prices.

## What this README covers

- How to install and run the dev server
- Environment variables and how to configure the API base URL
- Build and preview commands
- Common troubleshooting tips

## Requirements

- Node.js 16+ (LTS recommended)

## Install & run (development)

Open a terminal and run:

```powershell
cd frontend
npm install
npm run dev
```

Vite's dev server runs (by default) at http://localhost:5173 — the terminal will show the exact URL.

## Environment variables

The frontend can be configured via environment variables prefixed with `VITE_`. Create a `.env` or `.env.development` file in the `frontend/` folder.

Recommended variables:

```env
# Example: point the frontend to your backend API
VITE_API_BASE=http://localhost:4000
```

Usage in code (example):

```js
const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:4000";
fetch(`${apiBase}/users/register`, { ... })
```

If your backend runs on a different port or host, update `VITE_API_BASE` accordingly.

## Build & preview

Build the production bundle:

```powershell
cd frontend
npm run build
```

Preview the production build locally:

```powershell
npm run preview
```

## Scripts (from `frontend/package.json`)

- `npm run dev` — start Vite dev server
- `npm run build` — build production assets into `dist/`
- `npm run preview` — locally preview the production build

## Connecting to the backend (CORS)

The backend must allow requests from the frontend origin (e.g., `http://localhost:5173`). The backend already uses CORS; if you see CORS errors, ensure the backend's CORS configuration includes the frontend origin or use a permissive config during local development.

## Common issues & troubleshooting

- Dev server won't start / port in use:
  - Kill the process using the port or change Vite's port in `vite.config.js`.

- Frontend can't reach backend / network errors:
  - Confirm `VITE_API_BASE` is set and the backend server is running.
  - Ensure backend CORS allows the frontend origin.

- Environment variable changes not applied:
  - Restart the dev server after modifying `.env` files.

## Optional improvements

- Add a `.env.example` file with recommended keys.
- Add a README section documenting each UI route and feature.
- Add end-to-end tests (Cypress or Playwright) for critical flows like signup/login.

If you'd like, I can add a `.env.example` here and a short curl/Postman example showing `POST /users/register` against your running backend. Which would you prefer?
