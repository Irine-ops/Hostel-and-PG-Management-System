import express from "express";
import {bookRoom , searchRooms , checkOutRoom , getRoom , deleteRoom , addRoom} from '../controllers/roomControllers.js'
import {verifyToken , authorizeRole} from '../middleware/authMiddleware.js'

const router = express.Router();


router.post("/book-room", verifyToken , authorizeRole(2) , bookRoom);
router.post("/search-room" , verifyToken , authorizeRole(2) , searchRooms);
router.delete("/checkout" , verifyToken , authorizeRole(2) , checkOutRoom);
router.post("/get/room" , verifyToken , authorizeRole(2) , getRoom);
router.delete("/delete/:id" , verifyToken , authorizeRole(1) , deleteRoom)
router.post("/add-room" , verifyToken , authorizeRole(1) , addRoom)


export default router;