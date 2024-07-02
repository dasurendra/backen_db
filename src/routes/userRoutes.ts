import { Router } from "express";
import { signup,login } from "../controllers/userController";

// Initialize the router and user controller
const router = Router();


// Define the registration route
router.post("/signup", signup) 
// Define the login route
router.post("/login",login)

export default router;
