import { Router } from 'express'
import db from '../config/db.js'
import { verifyToken , authorizeRole } from '../middleware/authMiddleware.js'

const router = Router();

router.get("/all-contacts" , verifyToken , authorizeRole(1) , async(req , res , next) => {
    try {
        const [rows] = await db.query(`SELECT  * from contacts`)

        res.json(rows)
    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }

})

router.post("/contact-form", verifyToken, authorizeRole(1), async (req, res) => {
    try {
        const { roomNumber, serviceProvider, taskDescription, location, time, exactLocation } = req.body;

        if (!serviceProvider || !taskDescription || !location || !time) {
            return res.status(400).json({ message: "All fields are required" });
        }


        if (location === "room") {
            const [existingRoom] = await db.query(
                "SELECT * FROM rooms WHERE room_number = ?",
                [roomNumber]
            );

            if (existingRoom.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "Room does not exist"
                });
            }
        }

        const finalLocationDetail = location === "room" ? roomNumber : exactLocation;

        const query = `
            INSERT INTO contacts_form 
            (service_provider, task, time, location, exact_location) 
            VALUES (?, ?, ?, ?, ?)
        `;

        const values = [
            serviceProvider,
            taskDescription,
            time,           // Your DB accepts varchar(50) for time
            location,       // 'room' or 'non-room'
            finalLocationDetail
        ];

        await db.query(query, values);

        res.status(201).json({ 
            success: true, 
            message: "Request submitted successfully" 
        });

    } catch (err) {
        console.error("Database Error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;