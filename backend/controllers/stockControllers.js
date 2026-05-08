import { Router } from 'express'
import db from '../config/db.js'
import { verifyToken , authorizeRole } from '../middleware/authMiddleware.js'

const router = Router();

router.get("/all-stocks" , verifyToken , authorizeRole(1) , async(req , res , next) => {
    try {
        const [rows] = await db.query(`SELECT  * from stock`)

        res.json(rows)
    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }

})

router.post('/add-stock', verifyToken, authorizeRole(1), async (req, res) => {
    try {
        const { item_name , quantity , unit } = req.body

        if (!item_name || !quantity || !unit) {
            return res.status(400).json({ message: "All fields required" })
        }

        const query = `
            INSERT INTO stock (item_name, quantity, unit)
            VALUES (?, ?, ?)
        `

        await db.query(query, [item_name, quantity, unit])

        res.json({ message: "Stock added successfully" })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Server error" })
    }
})

router.post('/stock-help' , verifyToken , authorizeRole(1) , async(req, res) => {

    try {
        const {stockProvider , itemRequired , quantity} = req.body;

        if (!stockProvider || !itemRequired || !quantity){
            return res.status(400).json({message : "All fields required"})
        }

        const query = `insert into stockHelp(stock_provider , required_item , quantity) values(? ,? , ?)`

        await db.query(query , [stockProvider ,itemRequired , quantity])

        res.json({message : "Help Submitted Successfully!!!!"})

    } catch(err){
        console.error(err)
        res.status(500).json({message : "Server error"})
    }

})

router.delete('/delete-stock/:id', verifyToken, authorizeRole(1), async (req, res) => {
    try {
        const { id } = req.params

        await db.query(
            "DELETE FROM stock WHERE id = ?",
            [id]
        )

        res.json({ message: "Stock Deleted successfully" })
    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
})

router.put("/update-stock/:id", verifyToken, authorizeRole(1), async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        if (quantity === undefined || isNaN(quantity)) {
            return res.status(400).json({ message: "Invalid quantity provided." });
        }

        const query = `UPDATE stock SET quantity = ? WHERE id = ?`;
        
        const [result] = await db.query(query, [quantity, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Stock item not found." });
        }

        res.json({ message: "Stock Updated Successfully!!" });
    }
    catch (err) {
        console.error("DB Error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
