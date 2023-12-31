"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
const userBoard = (req, res) => {
    res.status(200).send("User Content.");
};
const adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};
const moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};
const testController = {
    allAccess,
    userBoard,
    adminBoard,
    moderatorBoard,
};
exports.default = testController;
