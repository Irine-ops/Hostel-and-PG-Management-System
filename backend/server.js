import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import AuthRoutes from './routes/authRoutes.js'
import Feedback from './controllers/feedback.js'
import Complaints from './controllers/complaints.js'
import roomRoutes from './routes/roomRoutes.js';
import menuRoutes from './routes/menuRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import profileRoutes from './routes/profileRoutes.js'
import Attendance from './controllers/attendanceControllers.js'
import Passwords from './controllers/passwordControllers.js'
import Announcements from './controllers/announcementControllers.js'
import Tenants from './controllers/tenantControllers.js'
import Stocks from './controllers/stockControllers.js'
import Contacts from './controllers/contactControllers.js'

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions))
app.use(express.json())
app.use("/api/auth" , AuthRoutes)
app.use("/api/feedback" , Feedback)
app.use("/api/complaint" , Complaints)
app.use("/api/room" , roomRoutes)
app.use("/api/menu" , menuRoutes)
app.use("/api/payments" , paymentRoutes)
app.use("/api/admin" , adminRoutes)
app.use("/api/profile" , profileRoutes)
app.use("/api/attendance" , Attendance )
app.use("/api/passwords" , Passwords)
app.use("/api/announcements" , Announcements)
app.use("/api/tenants" , Tenants)
app.use("/api/stocks" , Stocks)
app.use("/api/contacts" ,Contacts)

app.get("/" , (req,res) => {
    res.send("server is running")
});

app.listen(5000 , () => {
    console.log("Server is running on port 5000")
})