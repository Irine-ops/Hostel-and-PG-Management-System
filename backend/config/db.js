import mysql from 'mysql2/promise'

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'ammuachuappu',
    database: 'hostel_management',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

console.log("Database connected ✅")

export default db