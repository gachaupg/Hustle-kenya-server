import express from "express";
import { createOrder, getAllOrders, getOrderByUser, getSingleOrder } from "../controllers/order.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getAllOrders);

router.get("/:id", getSingleOrder);
router.get("/users-orders/:id", getOrderByUser);





export default router