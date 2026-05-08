import db from '../config/db.js'
import {Router} from "express"
const router = Router();


router.delete('/delete/:id', (req, res) => {
    const tenantId = req.params.id;

    const sql = "DELETE FROM users WHERE user_id = ?";

    db.query(sql, [tenantId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error deleting tenant" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Tenant not found" });
        }

        res.json({ message: "Tenant deleted successfully" });
    });
});

router.get("/contacts", async (req, res) => {
    try {
        const sql = "SELECT * FROM contacts";

        const [rows] = await db.query(sql); // 

        return res.json(rows);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server Error" });
    }
});

export default router;
