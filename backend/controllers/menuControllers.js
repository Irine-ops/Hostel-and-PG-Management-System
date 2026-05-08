import db from '../config/db.js'

export const getMenu = async (req, res) => {
    try {
        const [menu] = await db.query("SELECT * FROM menu")
        res.json(menu)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}