import express from "express";
import { getProductByCategory, getProductById, list, search } from "../controller/product.controller.js";

const router = express.Router();

// router.post("/saveproduct", Save);
router.get("/list", list);
router.get("/:id", getProductById);
router.get("/getProduct/:categoryId", getProductByCategory);
router.post("/search", search);
// seller functionality:-------------




export default router;