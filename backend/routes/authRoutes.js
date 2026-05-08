import express from "express";
import {register , login} from "../controllers/authControllers.js";
import {verifyToken , authorizeRole} from '../middleware/authMiddleware.js'

const router = express.Router();

router.post("/add" , verifyToken , authorizeRole(1))

router.post("/register", register);
router.post("/login", login);

export default router;