import express from "express";
import { signup, login } from "../controllers/userController";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login); // New route for login

export default router;
