import express from "express";
import {
  deleteUser,
  getUser,
  forgotPassword,
  getUsers,
  googleSignIn,
  signin,
  signup,
  updateUser,
  resetPassword,
  postResetPassword,
} from "../controllers/auth.js";

const router = express.Router();
// all user routes

router.post("/register", signup);
router.post("/login", signin);
router.get("/all-users", getUsers);
router.get("/user-profile/:id", getUser);
router.delete("/delete-user/:id", deleteUser);
router.patch("/update-user/:id", updateUser);
router.post("/google-signin", googleSignIn);
router.post("/forgot-password", forgotPassword);
router.get("/reset-password/:id/:token", resetPassword);
router.post("/reset-password/:id/:token", postResetPassword);

export default router;
