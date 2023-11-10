"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const role_1 = __importDefault(require("../models/role"));
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        // Check if bearer[1] exists
        if (bearer.length < 2 || !bearer[1]) {
            return res.status(401).json({ message: "Invalid token format" });
        }
        const bearerToken = bearer[1];
        // Verify the token
        jsonwebtoken_1.default.verify(bearerToken, process.env.SECRET_PRIVATE_ACCESS_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid token" });
            }
            const decodedPayload = decoded;
            // If the token is valid, you can access the decoded information in `decoded`
            req.userId = decodedPayload.id;
            next();
        });
    }
    else {
        return res.status(401).json({ message: "Auth header not provided" });
    }
};
const isAdmin = async (req, res, next) => {
    try {
        // Check if the request has a userId
        if (!req.userId) {
            return res.status(401).json({ message: "Unauthorized: Missing userId" });
        }
        // Find the user by ID
        const user = await user_1.default.findById(req.userId).exec();
        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        try {
            // Find roles associated with the user
            const roles = await role_1.default.find({
                _id: { $in: user.roles },
            });
            // Check if user has the admin role
            const isAdmin = roles.some((role) => role.name === "admin");
            if (isAdmin) {
                // If user is an admin, proceed to the next middleware
                next();
            }
            else {
                // If user is not an admin, return a 403 Forbidden status
                return res.status(403).json({ message: "Require Admin Role!" });
            }
        }
        catch (err) {
            // Handle role retrieval errors with a 500 Internal Server Error status
            return res
                .status(500)
                .json({ message: err.message || "Internal Server Error" });
        }
    }
    catch (err) {
        // Handle unexpected errors with a 500 Internal Server Error status
        return res
            .status(500)
            .json({ message: err.message || "Internal Server Error" });
    }
};
const isModerator = async (req, res, next) => {
    try {
        // Check if the request has a userId
        if (!req.userId) {
            return res.status(401).json({ message: "Unauthorized: Missing userId" });
        }
        // Find the user by ID
        const user = await user_1.default.findById(req.userId).exec();
        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Find roles associated with the user
        const roles = await role_1.default.find({
            _id: { $in: user.roles },
        });
        // Check if user has the moderator role
        const isModerator = roles.some((role) => role.name === "moderator");
        if (isModerator) {
            // If user is a moderator, proceed to the next middleware
            next();
        }
        else {
            // If user is not a moderator, return a 403 Forbidden status
            return res.status(403).json({ message: "Require Moderator Role!" });
        }
    }
    catch (err) {
        // Handle unexpected errors with a 500 Internal Server Error status
        return res
            .status(500)
            .json({ message: err.message || "Internal Server Error" });
    }
};
const authJwt = {
    verifyToken,
    isAdmin,
    isModerator,
};
exports.default = authJwt;
