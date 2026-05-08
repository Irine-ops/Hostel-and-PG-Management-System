import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

export const register = async(req , res) => {
    try {
        const {name , email , password , phone_no} = req.body;

        if (!name || !email || !password){
            return res.status(400).json({message: "Please Fill in all the fields"})
        }

        const [exisitingUser] = await db.query(
            "select * from users where email = ?", 
            [email]
        )

        if (exisitingUser.length > 0){
            return res.status(400).json({message : "Email already registered"})
        }

        const hashedPassword = await bcrypt.hash(password , 10)

        await db.query(
            "insert into users(name , email , password , phone_no , role_id) values (? , ? , ? , ? , ?)",
            [name , email , hashedPassword , phone_no , 2]
        )

        return res.status(201).json({   
            message : "User registered successfully"
        })

    }
    catch(error){
        console.error("REGISTER ERROR:", error)
        return res.status(500).json({message : error.message})
    }
}


export const login = async (req, res) => {
    try {
        const { email , password } = req.body;

        const [rows] = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (rows.length === 0) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const user = rows[0];

        const isCorrect = await bcrypt.compare(password, user.password);

        if (!isCorrect) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user.user_id,
                role_id: user.role_id
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            message: "Login Successfully!",
            token: token,
            user: {
                id: user.user_id,
                name: user.name,
                role_id: user.role_id
            }
        });

    } catch (error) {
        console.error("LOGIN ERROR:", error)   
        return res.status(500).json({
            message: error.message            
        })
    }   
};


