"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const role_1 = __importDefault(require("../models/role"));
const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!email || !password || !username)
        return res.status(401).json({ message: "Invalid email, username or password" });
    try {
        const userEmail = await user_1.default.findOne({ email });
        if (userEmail) {
            return res.status(400).send({ message: "Failed! Email is already in use!" });
        }
        const userUsername = await user_1.default.findOne({ username });
        if (userUsername) {
            return res.status(400).send({ message: "Failed! Username is already in use!" });
        }
    }
    catch (E) {
        console.error('Error checking duplicate username or email:', E);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    next();
};
const checkRolesExisted = async (req, res, next) => {
    if (req.body.roles) {
        try {
            const existingRoles = await role_1.default.find({
                name: { $in: req.body.roles },
            });
            const nonExistingRoles = req.body.roles.filter((role) => !existingRoles.some((existingRole) => existingRole.name === role));
            if (nonExistingRoles.length > 0) {
                return res.status(400).json({
                    message: `Failed! Roles ${nonExistingRoles.join(", ")} do not exist!`,
                });
            }
        }
        catch (error) {
            console.error("Error checking roles:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
    next();
};
const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted,
};
exports.default = verifySignUp;
