import { Router } from 'express'
import db from '../config/db.js'
import { verifyToken } from '../middleware/authMiddleware.js'

const router = Router()

router.post('/', verifyToken, async (req, res) => {
    try {
        const {rating, message } = req.body
        const user_id = req.user.id 

        // Validation
        if (!rating || !message) {
            return res.status(400).json({ error: "All fields are required" })
        }

        // Insert feedback
        const query = `
            INSERT INTO feedback (user_id,rating, feedback_content)
            VALUES (?, ?, ?)
        `
        await db.query(query, [user_id, rating, message])

        return res.status(200).json({ message: "Feedback submitted successfully" })

    } catch (error) {
        console.error("Feedback ERROR:", error)
        return res.status(500).json({ error: "Server error" })
    }
})

router.get('/user', verifyToken, async (req, res) => {
    try {
        const user_id = req.user.id
        const [rows] = await db.query(
            "SELECT * FROM feedback WHERE user_id = ? ORDER BY created_at DESC",
            [user_id]
        )
        res.status(200).json(rows)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Server error" })
    }
})

export default router