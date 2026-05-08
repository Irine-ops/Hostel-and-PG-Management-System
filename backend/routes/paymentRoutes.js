import express from "express";
import {makePayment , getPayment} from '../controllers/paymentControllers.js'
import {verifyToken , authorizeRole} from '../middleware/authMiddleware.js'

const router = express.Router();


router.post("/make-payment", verifyToken , authorizeRole(2) , makePayment);
router.post("/my-payment" , verifyToken , authorizeRole(2) , getPayment);
router.get("/all-payments" , verifyToken , authorizeRole(1) , getPayment);


export default router;