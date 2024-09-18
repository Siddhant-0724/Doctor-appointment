import jwt from 'jsonwebtoken';
import Doctor from '../models/DoctorSchema.js';
import User from '../models/UserSchema.js';

export const authenticate = async (req, res, next) => {
    // Get token from header
    const authtoken = req.headers.authorization;

    // Check if token exists and starts with 'Bearer '
    if (!authtoken || !authtoken.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: "No token, authorization denied" });
    }

    try {
        // Extract token from 'Bearer <token>'
        const token = authtoken.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.userId = decoded.id;
        req.role = decoded.role;

        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "Token has expired" });
        }
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};

export const restrict = (roles) => async (req, res, next) => {
    const userId = req.userId;
    let user;

    const patient = await User.findById(userId);
    const doctor = await Doctor.findById(userId);

    user = patient || doctor;

    if (!user || !roles.includes(user.role)) {
        return res.status(403).json({ success: false, message: "You are not authorized" });
    }

    next();
};
