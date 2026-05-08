import { Router } from 'express'
import db from '../config/db.js'
import { verifyToken , authorizeRole } from '../middleware/authMiddleware.js'

const router = Router();

router.post('/update-attendance', verifyToken, authorizeRole(1), async (req, res) => {
    try {
        const { user_id, status } = req.body
        const today = new Date().toISOString().split('T')[0]

        const query = `
            INSERT INTO attendance (user_id, attended_date, status)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE status = ?
        `

        await db.query(query, [user_id, today, status, status])

        res.json({ message: "Attendance marked successfully" })

    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Server error" })
    }
})

router.get('/get-attendance', verifyToken, authorizeRole(1), async (req, res) => {
    try {
        const [rows] = await db.query(`SELECT users.user_id,users.name,attendance.status, attendance.attended_date FROM users LEFT JOIN attendance ON users.user_id = attendance.user_id AND attendance.attended_date = CURDATE() WHERE users.role_id = 2;`)

        res.json(rows)

    } catch (err) {
        res.status(500).json({ error: "Server error" })
    }
})


export default router;