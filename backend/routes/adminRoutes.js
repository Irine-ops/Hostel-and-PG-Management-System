import express from "express";
import {getAllUsers , getAllRooms , getAllBookings , getAllPayments , getAllComplaints , getAllFeedback} from '../controllers/adminControllers.js'
import {verifyToken , authorizeRole} from '../middleware/authMiddleware.js'

const router = express.Router();

router.post("/tenants" , verifyToken , authorizeRole(1) , getAllUsers)
router.post("/rooms" , verifyToken , authorizeRole(1) , getAllRooms)
router.post("/bookings" , verifyToken , authorizeRole(1) , getAllBookings)
router.post("/payments" , verifyToken , authorizeRole(1) , getAllPayments)
router.post("/complaints" , verifyToken , authorizeRole(1) , getAllComplaints)
router.post("/feedback" , verifyToken , authorizeRole(1) , getAllFeedback)
router.get("/feedback" , verifyToken , authorizeRole(2) , getAllFeedback)


export default router;