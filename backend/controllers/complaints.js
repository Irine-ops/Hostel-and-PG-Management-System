import { Router } from 'express'
import db from '../config/db.js'
import { verifyToken , authorizeRole } from '../middleware/authMiddleware.js'

const router = Router();

function getPriority(text){

    const normalize = (t) => t.toLowerCase().replace(/[^a-z0-9 ]/g, " ")

    const normalText = normalize(text)
    const finalText = normalText.toLowerCase()

    const highPriority = [
        "power" , "no power" , "electric shock" , "short circuit" , "fuse" , "burning smell" , "spark" , "wire", "voltage fluctuation",
        "water leak" , "leakage" , "flooding" , "no water" , "pipe burst" , "overflow" , "drainage blocked" , "sewage" , "tank overflow",
        "theft" , "stolen" , "intruder" , "unknown person" , "break in" , "break-in" , "cctv not working" , "cctv is not working" , "gate broken" , "broken gate",
        "gate is broken" , "unsafe" , "emergency" , "fire" , "electricity cut"
    ]

    const mediumPriority = [
        "fan not working" , "light not working" , "socket" , "switch broken" , "broken switch" , "switch is broken" , "ac not working" , "ac is not working",
        "not working ac" , "appliance" , "heater" , "low pressure" , "tap broken" , "broken tap" , "tap is broken" , "flush" , "bathroom issue" , "issue in bathroom",
        "geyser" , "water heater" , "hot water" , "water hot" , "wifi" , "internet" , "network" , "router" , "slow internet" , "internet slow" , "disconnect" , 
        "bed broken" , "broken bed" , "chair" , "table" , "door lock" , "window" , "cupboard" , "repair" , "rent" , "payment issue" , "billing", "maintenance delay",
        "complaint pending" , "pending complaint"
    ]

    const lowPriority = [
        "cleaning", "dirty" , "garbage" , "smell" , "dust" , "pest" , "cockroach" , "ants" , "lizards" , "noise" , "loud", "music" , "disturbance" , 
        "tv sound" , "shouting" , "food" , "mess" , "menu" , "breakfast" ,"lunch", "dinner" , "taste" , "quality"
    ]

    for (let i = 0; i < highPriority.length; i++){
        if (finalText.includes(highPriority[i])){
            return "High"
        }
    }

    for (let i = 0; i < mediumPriority.length; i++){
        if (finalText.includes(mediumPriority[i])){
            return "Medium"
        }
    }

    for (let i = 0; i < lowPriority.length; i++){
        if (finalText.includes(lowPriority[i])){
            return "Low"
        }
    }

    return "Low"
}

router.post('/', verifyToken, authorizeRole(2), async (req, res) => {
    try {
        const { title, description, complaintType, roomNumber } = req.body
        const user_id = req.user.id   

        if (!title || !description || !complaintType || !roomNumber) {
            return res.status(400).json({ error: "All fields are required" })
        }

        const priority = getPriority(description)

        const query = `
            INSERT INTO complaints 
            (user_id, complaint_title, complaint_content, status, complaint_type, room_no , priority) 
            VALUES (?, ?, ?, ?, ?, ? , ?)
        `

        await db.query(query, [user_id, title, description, 'Pending', complaintType, roomNumber , priority])

        return res.status(200).json({ message: "Complaint submitted successfully" , priority : priority})

    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Server error" })
    }
})


router.get('/user', verifyToken, authorizeRole(2), async (req, res) => {
    try {
        const user_id = req.user.id
        const [rows] = await db.query(
            "SELECT * FROM complaints WHERE user_id = ? ORDER BY created_at DESC",
            [user_id]
        )
        res.status(200).json(rows)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Server error" })
    }
})

router.put('/:id/resolve', verifyToken, authorizeRole(1), async (req, res) => {
    try {
        const complaintId = req.params.id

        const query = `
            UPDATE complaints 
            SET status = 'Resolved', resolved_at = NOW()
            WHERE complaint_id = ?
        `

        const [result] = await db.query(query, [complaintId])

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Complaint not found" })
        }

        res.json({ message: "Complaint resolved successfully" })

    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Server error" })
    }
})


router.delete('/:id', verifyToken, authorizeRole(1), async (req, res) => {
    try {
        const complaintId = req.params.id

        const query = `DELETE FROM complaints WHERE complaint_id = ?`

        const [result] = await db.query(query, [complaintId])

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Complaint not found" })
        }

        res.json({ message: "Complaint deleted successfully" })

    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Server error" })
    }
})


export default router
