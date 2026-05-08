import db from '../config/db.js'

export const getUser = async (req, res) => {
    try {
        const userId = req.user.id; 

        const [rows] = await db.query(
            "SELECT users.name, users.email, users.phone_no, rooms.room_number FROM users LEFT JOIN rooms ON users.room_id = rooms.room_id WHERE users.user_id = ?",
            [userId]
        );

        if (!rows.length) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(rows[0]);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const updateProfile = (req, res) => {
  const id = req.user.id;
  const { phoneNumber, email } = req.body;

  
  if (phoneNumber && !/^[6-9][0-9]{9}$/.test(phoneNumber)) {
    return res.status(400).json({ message: 'Invalid phone number' });
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'Invalid email' });
  }

  let query = "UPDATE users SET ";
  const params = [];

  if (phoneNumber) {
    query += "phone_no = ?, ";
    params.push(phoneNumber);
  }

  if (email) {
    query += "email = ?, ";
    params.push(email);
  }

  // 3. Safety Check: If neither field was provided
  if (params.length === 0) {
    return res.status(400).json({ message: 'No fields provided for update' });
  }

  // Remove the trailing comma and space, then add the WHERE clause
  query = query.slice(0, -2) + " WHERE user_id = ?";
  params.push(id);

  // 4. Execute the Query
  try {
    db.query(query, params, (err, result) => {
      if (err) {
        console.error("SQL Error:", err);
        return res.status(500).json({ message: 'Database error' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({ message: 'Profile updated successfully' });
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

