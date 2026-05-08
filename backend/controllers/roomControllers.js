import db from '../config/db.js'

export const searchRooms = async (req, res) => {
    try {
        const { isAC, isSilent, location, roomType, startDate, endDate } = req.body

        let query = `
            SELECT * FROM rooms r
            WHERE r.room_id NOT IN (
                SELECT room_id FROM bookings
                WHERE (
                    (start_date <= ? AND end_date >= ?) OR
                    (start_date <= ? AND end_date >= ?)
                )
            )
        `

        let params = [startDate, startDate, endDate, endDate]

        if (isAC !== null) {
            query += " AND r.is_ac = ?"
            params.push(isAC)
        }

        if (isSilent !== null) {
            query += " AND r.is_silent_room = ?"
            params.push(isSilent)
        }

        if (location) {
            query += " AND r.location = ?"
            params.push(location)
        }

        if (roomType) {
            query += " AND r.room_type = ?"
            params.push(roomType)
        }

        const [rooms] = await db.query(query, params)

        return res.status(200).json(rooms)

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: error.message })
    }
}

export const addRoom = async(req , res , next) => {
    try {

        const {roomNumber , roomType , silent , ac , location , rentAmount , capacity} = req.body

        if (!roomNumber || !roomType || !location || !capacity || !rentAmount) {
            return res.status(400).json({ message: "All fields required" })
        }

        const [existing] = await db.query(
            "SELECT * FROM rooms WHERE room_number = ?",
            [roomNumber]
        );

        if (existing.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Room already exists"
            });
        }

        const query = `Insert into rooms(room_number, room_type , is_silent_room , is_ac , location , rent_amount , capacity , current_occupancy) values (?,?,?,?,?,?,?,?)`

        await db.query(query , [roomNumber , roomType , silent ? 1 : 0 , ac ? 1 : 0, location , rentAmount , capacity , 0])

        return res.status(201).json({
            success : true,
            message : "Room added Successfully"
        })

    }
    catch(error){
        console.error(error)
        return res.status(500).json({
            success : false,
            message : error.message,
        })
    }
}

export const bookRoom = async (req, res) => {
    try {
        const userId = req.user.id
        const { roomId, startDate, endDate } = req.body

        if (!roomId || !startDate || !endDate) {
            return res.status(400).json({ message: "All fields required" })
        }

        const [existingBooking] = await db.query(`select * from bookings where user_id = ? and end_date >= curdate()` , [userId])

        if (existingBooking.length > 0){
            return res.status(400).json({
                message : "You already have an active booking . Please pay the fee or cancel it before booking another room"
            })
        }

        const [existing] = await db.query(
            `SELECT * FROM bookings 
             WHERE room_id = ? 
             AND (
                (start_date <= ? AND end_date >= ?) OR
                (start_date <= ? AND end_date >= ?)
             )`,
            [roomId, startDate, startDate, endDate, endDate]
        )

        if (existing.length > 0) {
            return res.status(400).json({
                message: "Room already booked for selected dates"
            })
        }

        const [rooms] = await db.query(
            "SELECT capacity, current_occupancy FROM rooms WHERE room_id = ?",
            [roomId]
        )

        const room = rooms[0]

        if (room.current_occupancy >= room.capacity) {
            return res.status(400).json({
                message: "Room is already full"
            })
        }

        await db.query(
            `INSERT INTO bookings (user_id, room_id, start_date, end_date)
             VALUES (?, ?, ?, ?)`,
            [userId, roomId, startDate, endDate]
        )


        await db.query(
            `UPDATE rooms 
             SET current_occupancy = current_occupancy + 1 
             WHERE room_id = ?`,
            [roomId]
        )

        await db.query(`update users set room_id = ? where user_id = ?` , [roomId , userId])

        const [rentResult] = await db.query(
            "SELECT rent_amount FROM rooms WHERE room_id = ?",
            [roomId]
        )

        if (rentResult.length === 0) {
            return res.status(400).json({ message: "Room not found" })
        }

        const amount = rentResult[0].rent_amount

        console.log("ROOM RENT:", amount)

        await db.query(
            "INSERT INTO fee_payments (user_id, amount, payment_status) VALUES (?, ?, ?)",
            [userId, amount, "pending"]
        )

        console.log("✅ FEE INSERTED")
        
        return res.status(200).json({
            message: "Room booked successfully"
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: error.message })
    }
}


export const checkOutRoom = async(req , res , next) => {
    try {

        const userId = req.user.id;

        const [bookings] = await db.query(`select * from bookings where user_id = ? and end_date >= curdate()` , [userId]);

        if (bookings.length === 0){
            return res.status(400).json({
                message : "No active booking found"
            })
        }

        const booking = bookings[0]
        const roomId = booking.room_id;

        await db.query(`delete from bookings where booking_id = ?` , [booking.bookingId])

        await db.query(`update rooms set current_occupancy = current_occupancy - 1 where room_id = ? and current_occupancy > 0` , [roomId])

        await db.query(`update users set room_id = null where user_id = ? ` , [userId])

        return res.status(200).json({
            message : "Checked out successfully"
        });


    }
    catch(error){
        console.error(error)
        return res.status(500).json({
            message : error.message
        })
    }
}


export const getRoom = async(req ,res , next) => {
    try {

        const userId = req.user.id
        const [rows] = await db.query(
            `SELECT * 
             FROM rooms 
             WHERE room_id = (SELECT room_id FROM users WHERE user_id = ?)`,
            [userId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "Room not found" });
        }


        const room = rows[0]; 

        const [roommatesRows] = await db.query(
            `SELECT name 
            FROM users 
            WHERE room_id = ? AND user_id != ?`,
            [room.room_id, userId]
            );

            room.roommates = roommatesRows.map(r => r.name);

            const [dateRows] = await db.query(`select bookings.start_date from bookings inner join rooms on bookings.room_id = rooms.room_id WHERE bookings.user_id = ?` , [userId])

            room.checkInDate = dateRows.length > 0 ? dateRows[0].start_date : null;

            return res.status(200).json(room);
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            message : error.message,
        })
    }
}

export const deleteRoom = async(req , res , next) => {
    try {

        const roomId = req.params.id
        const [result] = await db.query(`delete from rooms where room_id = ? and current_occupancy = 0` , [roomId])

        if (result.affectedRows === 0){
            return res.status(404).json({
                message : "You can't delete the rooms where your tenants are currently staying"
            })
        }

        return res.status(200).json({
            message : "Room Deleted Successfully"
        })

    }
    catch(error){
        console.error(error)
        return res.status(500).json({
            message : error.message,
        })
    }
}