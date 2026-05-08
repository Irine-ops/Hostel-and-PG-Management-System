import { Router } from 'express'
import db from '../config/db.js'
import { verifyToken , authorizeRole } from '../middleware/authMiddleware.js'

const router = Router()

router.post('/add-announcement', verifyToken, authorizeRole(1), async (req, res) => {
    try {
        const { title, content } = req.body
        const user_id = req.user.id

        if (!title || !content) {
            return res.status(400).json({ message: "All fields required" })
        }

        const query = `
            INSERT INTO announcements (user_id, title, content)
            VALUES (?, ?, ?)
        `

        await db.query(query, [user_id, title, content])

        res.json({ message: "Announcement created successfully" })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Server error" })
    }
})

router.get('/get-announcement', verifyToken, async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT a.*, u.name 
            FROM announcements a
            JOIN users u ON a.user_id = u.user_id
            ORDER BY a.created_at DESC
        `)

        res.json(rows)
    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
})

router.delete('/delete-announcement/:id', verifyToken, authorizeRole(1), async (req, res) => {
    try {
        const { id } = req.params

        await db.query(
            "DELETE FROM announcements WHERE announcement_id = ?",
            [id]
        )

        res.json({ message: "Deleted successfully" })
    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
})


export default router