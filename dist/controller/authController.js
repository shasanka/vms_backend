"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const role_1 = __importDefault(require("../models/role"));
const signIn = async (req, res) => {
    try {
        const user = await user_1.default.findOne({ email: req.body.email }).populate("roles");
        if (!user) {
            return res.status(404).json({ message: "Invalid username or password!" });
        }
        const passwordIsValid = bcryptjs_1.default.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({ message: "Invalid username or password!" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.SECRET_PRIVATE_ACCESS_KEY, {
            algorithm: "HS256",
            expiresIn: "24h", // 24 hours
        });
        const authorities = (user.roles).map((role) => `ROLE_${role.name.toUpperCase()}`);
        res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token,
        });
    }
    catch (error) {
        console.error("Error during user sign-in:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
const signOut = (req, response) => {
    return response.status(200).json({ message: "Signedout" });
};
const signUp = async (req, res) => {
    try {
        const { username, email, password, roles } = req.body;
        const hashedPassword = bcryptjs_1.default.hashSync(password, 10);
        const user = new user_1.default({
            username,
            email,
            password: hashedPassword,
        });
        if (roles && roles.length > 0) {
            const rolesFound = await role_1.default.find({ name: { $in: roles } });
            if (!rolesFound || rolesFound.length !== roles.length) {
                throw new Error("Not all roles could be retrieved or do not exist.");
            }
            user.roles = rolesFound.map((role) => role._id);
        }
        else {
            const defaultRole = await role_1.default.findOne({ name: "user" });
            if (defaultRole) {
                user.roles = [defaultRole._id];
            }
        }
        await user.save();
        return res.status(200).json({ message: "User signed up" });
    }
    catch (error) {
        console.error("Error during user sign-up:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
const authController = {
    signIn,
    signOut,
    signUp,
};
exports.default = authController;
