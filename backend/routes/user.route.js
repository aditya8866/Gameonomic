
import express from "express";
import { body } from "express-validator";
import { registerUser,loginUser, verifyOtp, getCurrentUser, logoutUser } from "../controllers/user.controllers.js";
import authMiddleware from "../middleware/auth.js";


const router = express.Router();

  router.post(
  "/register",
  [
    body("firstname")
      .notEmpty()
      .withMessage("First name is required")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("lastname")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Last name must be at least 3 characters long"),
    body("email")
      .isEmail()
      .withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  registerUser
);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  loginUser
);

router.post("/verify-otp", verifyOtp);

router.get("/me", authMiddleware, getCurrentUser);


router.post("/logout", logoutUser);


export default router;