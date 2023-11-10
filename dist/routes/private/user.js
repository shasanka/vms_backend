"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/', async (req, res) => {
    try {
        console.log("🚀 ~ file: user.ts:8 ~ router.post ~ req.body;:", req.body);
        // const userData = req.params;
        // // Create a new user with the provided data
        // const newUser = await User.create(userData);
        // // Save the new user to the database
        // await newUser.save();
        res.status(201).json({ message: 'd' });
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.default = router;
