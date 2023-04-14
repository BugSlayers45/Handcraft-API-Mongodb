import express from "express";
import { Save, SignIn, SingUp, productList, removeProduct, updateproducts } from "../controller/seller.controller.js";
import { body } from "express-validator";

const router = express.Router();
router.post("/signup",
    body("sellerName", "Enter name").notEmpty(),
    body("sellerEmail", "Invalid Email").isEmail(),
    body("sellerContact").isNumeric(),
    body("sellerPassword", "enter password").notEmpty(), SingUp);
router.post("/signin", SignIn);
router.post("/saveproduct", Save);
router.get("/productList/:sellerId", productList);
router.post("/update", updateproducts);
router.post("/delete/:sellerId", removeProduct);
// router.post("/saveproduct", saveProduct);

// router.post("/searchKeyword/:keyword", searchByKeyword);

export default router;