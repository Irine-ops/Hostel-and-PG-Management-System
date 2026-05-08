import db from "../config/db.js";

export const getPayment = async (req, res) => {
    try {
        let query = "";
        let params = [];

        if (req.user.role_id === 1) {
            //  ADMIN => get ALL payments
            query = `
                SELECT users.name, fee_payments.*
                FROM fee_payments
                INNER JOIN users ON users.user_id = fee_payments.user_id
                ORDER BY fee_payments.payment_date DESC
            `;
        } else {
            // STUDENT => only their payments
            query = `
                SELECT users.name, fee_payments.*
                FROM fee_payments
                INNER JOIN users ON users.user_id = fee_payments.user_id
                WHERE fee_payments.user_id = ?
                ORDER BY fee_payments.payment_date DESC
            `;
            params = [req.user.id];
        }

        const [payments] = await db.query(query, params);

        res.status(200).json({ payments });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const makePayment = async (req, res) => {
    try {
        const userId = req.user.id;
        const { amount , payment_method } = req.body;

        if (!amount || isNaN(amount) || amount <= 0) {
            return res.status(400).json({ message: "Please provide a valid payment amount." });
        }

        const [existing] = await db.query(
            `SELECT * FROM fee_payments 
             WHERE user_id = ?
             AND payment_status = 'completed'
             AND MONTH(payment_date) = MONTH(CURRENT_DATE())
             AND YEAR(payment_date) = YEAR(CURRENT_DATE())`,
            [userId]
        );

        if (existing.length > 0) {
            return res.status(400).json({
                message: "You have already paid for this month!"
            });
        }

        const transactionId = "TXN" + Date.now();

        // 3. Insert the payment record
        await db.query(
            `INSERT INTO fee_payments (user_id, amount, payment_method , payment_status, transaction_id)
             VALUES (?, ?, ?, ? , ?)`,
            [userId, amount, payment_method, "completed", transactionId]
        );

        res.status(200).json({
            message: "Payment successful",
            transactionId
        });

    } catch (error) {
        console.error("Payment Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
