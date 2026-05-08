import express from "express";
import {getMenu} from '../controllers/menuControllers.js'
import {verifyToken , authorizeRole} from '../middleware/authMiddleware.js'

const router = express.Router();


router.get("/view-menu", verifyToken , authorizeRole(2) , getMenu);



export default router;