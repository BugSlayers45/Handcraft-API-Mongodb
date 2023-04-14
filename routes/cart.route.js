import express from "express";
import { addToCart, viewCartItems } from "../controller/cart.controller.js";

const router = express.Router();

router.post("/add-to-cart", addToCart)
router.post("/viewCartItems", viewCartItems)

export default router;