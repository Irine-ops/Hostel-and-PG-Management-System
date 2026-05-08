import express from "express";
import {getUser , updateProfile} from '../controllers/profileControllers.js'
import {verifyToken , authorizeRole} from '../middleware/authMiddleware.js'

const router = express.Router();


router.get("/get-user", verifyToken , authorizeRole(2) , getUser);
router.put ("/update-user" , verifyToken , authorizeRole(2) , updateProfile)



export default router;