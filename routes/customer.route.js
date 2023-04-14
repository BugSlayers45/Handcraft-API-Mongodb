import express from "express";
import { SignIn, SingUp, list } from "../controller/customer.controller.js";

const router = express.Router();
router.post("/signup", SingUp);
router.post("/signin", SignIn);
router.get("/list", list);
export default router;