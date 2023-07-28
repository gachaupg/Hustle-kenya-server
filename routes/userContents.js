import express from "express";
import  { createUser, deleteUserContent, getAllUserContents, getContentsByUser, getSingleUserContent, updateUserContent } from '../controllers/userContents.js'
const router = express.Router();

router.post("/user-content", createUser);
router.get("/all-users-contents", getAllUserContents);
router.get("/user-content/:id", getSingleUserContent);
router.get("/users-own-content/:id", getContentsByUser);
router.delete("/delete-user-content/:id", deleteUserContent);
router.patch("/update-user-content/:id", updateUserContent);


export default router