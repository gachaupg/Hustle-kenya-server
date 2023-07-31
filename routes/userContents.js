import express from "express";
import  { createUser, deleteUserContent, getAllUserContents, getContentsByUser, getSingleUserContent, updateUserContent } from '../controllers/userContents.js'
const router = express.Router();

router.post("/user-content",auth, createUser);
router.get("/all-users-contents", getAllUserContents);
router.get("/user-content/:id", getSingleUserContent);
router.get("/users-own-content/:id", getContentsByUser);
router.delete("/delete-user-content/:id", deleteUserContent);
router.patch("/update-user-content/:id", updateUserContent);
router.patch("/update-user-contentlikes/:id",Addlikes);
router.patch("/update-user-contentremovelikes/:id",RemoveLike);
router.patch("/update-user-contentdislikes/:id",Adddislikes);
router.patch("/update-user-contentremovedislikes/:id",RemovedisLike);


export default router