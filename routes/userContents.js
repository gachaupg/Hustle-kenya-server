import express from "express";
import  { createUser,RemoveLike,Addlikes,Adddislikes,RemovedisLike, 
    deleteUserContent, getAllUserContents, getContentsByUser, getSingleUserContent, updateUserContent, Addsubscribers, Addissubscribers, Removesubscriber, Removedissubscriber } from '../controllers/userContents.js'
const router = express.Router();

router.post("/user-content", createUser);
router.get("/all-users-contents", getAllUserContents);
router.get("/user-content/:id", getSingleUserContent);
router.get("/users-own-content/:id", getContentsByUser);
router.delete("/delete-user-content/:id", deleteUserContent);
router.patch("/update-user-content/:id", updateUserContent);
router.patch("/update-user-contentlikes/:id",Addlikes);
router.patch("/update-user-contentremovelikes/:id",RemoveLike);
router.patch("/update-user-contentdislikes/:id",Adddislikes);
router.patch("/update-user-contentremovedislikes/:id",RemovedisLike);
router.patch("/update-user-contentsubscribers/:id",Addsubscribers);
router.patch("/update-user-contentremovesubscribers/:id",Removesubscriber);
router.patch("/update-user-contentremovedissubscribers/:id",Removedissubscriber);
router.patch("/update-user-contentdissubscriber/:id",Addissubscribers);



export default router