const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");

// Auth middleware
exports.auth = async (req, res, next) => {
    try {
        // Token extraction from sources
        const token = req.cookies.token || req.body.token || req.header("Authorization")?.replace("Bearer ", "").trim();

        if (!token) {
            console.error("Token not found");
            return res.status(401).json({
                success: false,
                msg: "Unauthorized. Token not found"
            });
        }

        // Verify the token
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = decoded; // Attach the decoded user data to the request
        } catch (error) {
            console.error("Error verifying token:", error.message); // Log the error message
            return res.status(401).json({
                success: false,
                msg: "Token is invalid"
            });
        }

        next();
    } catch (error) {
        console.error("Error in auth middleware:", error.message); // Log unexpected errors
        return res.status(401).json({
            success: false,
            msg: "Unauthorized. Token processing failed"
        });
    }
};

// Is Student middleware
exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Student") {
            return res.status(403).json({
                success: false,
                msg: "This route is protected for students only"
            });
        }
        next();
    } catch (error) {
        console.error("Error in isStudent middleware:", error.message);
        return res.status(500).json({
            success: false,
            msg: "User role is not verified, please try again"
        });
    }
};

// Is Instructor middleware
exports.isInstructor = async (req, res, next) => {
    try {
        
        if (req.user.accountType !== "Instructor") {
            return res.status(403).json({
                success: false,
                msg: "This route is protected for instructors only"
            });
        }
        next();
    } catch (error) {
        console.error("Error in isInstructor middleware:", error.message);
        return res.status(500).json({
            success: false,
            msg: "User role is not verified, please try again"
        });
    }
};

// Is Admin middleware
exports.isAdmin = async (req, res, next) => {
    try {
        console.log("accttypoe ",req.user.accountType)
        if (req.user.accountType !== "Admin") {
            return res.status(403).json({
                success: false,
                msg: "This route is protected for admins only"
            });
        }
        next();
    } catch (error) {
        console.error("Error in isAdmin middleware:", error.message);
        return res.status(500).json({
            success: false,
            msg: "User role is not verified, please try again"
        });
    }
};
