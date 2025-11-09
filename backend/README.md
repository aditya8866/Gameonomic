# Gameonomic Backend

## Overview
This is the backend for the Gameonomic project, built with Express.js and MongoDB (Mongoose). It provides user-related endpoints and serves EJS views.

---

## Getting Started

### Prerequisites
- Node.js
- MongoDB instance

### Installation
1. Clone the repository.
2. Navigate to the `backend` folder:
   ```powershell
   cd backend
   ```
3. Install dependencies:
   ```powershell
   npm install
   ```
4. Create a `.env` file and set your MongoDB URI:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```
5. Start the server:
   ```powershell
   npm start
   ```

---

## API Endpoints

### `GET /`
- **Description:** Default route.
- **Response:**
  - `200 OK`: "Default page"

### `GET /register`
- **Description:** Renders the registration page.
- **Response:**
  - `200 OK`: Renders `index.ejs`

---

## User Model

- `fullName`
  - `firstname` (String, required, min 3 chars)
  - `lastname` (String, required, min 3 chars)
- `email` (String, required, min 13 chars)
- `password` (String, required, min 6 chars, not selected by default)
- `history` (Array of games)
  - `gameName` (String, required)
  - `currPrice` (Number, required)
- `favGames` (Array of games)
  - `gameName` (String, required)
  - `currPrice` (Number, required)

---

## Error Codes
- `404 Not Found`: For undefined routes.
- `500 Internal Server Error`: For server/database errors.
- Validation errors for user fields (e.g., min length, required).

---

## Technologies Used
- Express.js
- MongoDB & Mongoose
- EJS
- CORS

---

