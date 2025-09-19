import dotenv from 'dotenv';
dotenv.config();


import express from "express";
import cors from "cors";
import userRoutes from './routes/user.route.js';
import connectToDB from "./config/db.js";

const app = express();

// View engine
app.set("view engine", "ejs");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.get("/",(req,res,next)=>{
  res.send("hey")
})

app.use("/users", userRoutes);

// Port fallback to 3000 if not in env
const PORT = process.env.PORT || 3000;

// Start server after DB connection
(async () => {
  try {
    await connectToDB();
    app.listen(PORT, () => {
      console.log(` Server started on port ${PORT} and connected to MongoDB`);
    });
  } catch (error) {
    console.error(" Failed to start server:", error.message);
    process.exit(1);
  }
})();
