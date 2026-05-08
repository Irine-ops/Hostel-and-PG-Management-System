import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token missing or malformed" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

export const authorizeRole = (requiredRole) => {
    return (req , res , next) => {
        if (req.user.role_id !== requiredRole){
            return res.status(403).json({message : "Forbidden. Access denied"})
        }
        next();

    }
}