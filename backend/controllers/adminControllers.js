import db from '../config/db.js'

export const getAllUsers = async(req, res , next) => {
    try {

        const [users] = await db.query("SELECT users.*, COALESCE(rooms.room_number, 'Not Assigned') AS room_number FROM users LEFT JOIN rooms ON users.room_id = rooms.room_id WHERE users.role_id = 2;");
        res.json(users)

    }
    catch(error){
        return res.status(500).json({
            message : error.message
        })
    }
}

export const getAllRooms = async (req , res, next) => {
    try {
        const [rooms] = await db.query("select * from rooms order by room_number");
        res.json(rooms)
    }
    catch(error){
        return res.status(500).json({
            message : error.message,
        })
    }
}

export const getAllBookings = async (req, res) => {
    try {
        const [bookings] = await db.query(`
            SELECT b.*, u.name, r.room_number
            FROM bookings b
            JOIN users u ON b.user_id = u.user_id
            JOIN rooms r ON b.room_id = r.room_id
        `);
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getAllPayments = async (req, res) => {
    try {
        const [payments] = await db.query(`
            SELECT f.*, u.name
            FROM fee_payments f
            JOIN users u ON f.user_id = u.user_id
        `);
        res.json(payments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const getAllComplaints = async (req , res) => {
    try {
        const [complaints] = await db.query("select complaints.* , users.name from complaints inner join users on complaints.user_id = users.user_id order by priority desc")
        res.json(complaints)
    }
    catch(error){
        res.status(500).json({message : err.message})
    }
}


export const getAllFeedback = async (req , res) => {
    try {
        const [complaints] = await db.query("select feedback.* , users.name from feedback inner join users on feedback.user_id = users.user_id")
        res.json(complaints)
    }
    catch(error){
        res.status(500).json({message : err.message})
    }
}