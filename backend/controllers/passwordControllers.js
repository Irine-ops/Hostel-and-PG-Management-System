import { Router } from 'express'
import db from '../config/db.js'
import bcrypt from 'bcrypt'

const router = Router()

router.put('/reset-password', async (req, res) => {
    try {
        const { newPassword, confirmPassword , email } = req.body

        // Validation
        if (!newPassword || !confirmPassword || !email) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' })
        }

        if (newPassword.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters' })
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(newPassword, 10)

        // Update the password in DB
        const query = 'UPDATE users SET password = ? WHERE email = ?'
        await db.query(query, [hashedPassword, email])

        res.json({ message: 'Password updated successfully' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server error' })
    }
})

export default router