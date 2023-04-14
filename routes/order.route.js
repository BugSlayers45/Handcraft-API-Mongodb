import express from "express";
import { orderDetails, placeOrder, updateOrder } from "../controller/order.controller.js";

const router = express.Router()

router.post("/orderProduct", placeOrder)
router.get("/order-detail", orderDetails)
router.post("/updateOrderStatus/:orderId", updateOrder)
export default router;