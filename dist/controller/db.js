"use strict";
// import mongoose from "mongoose";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// let connection: typeof mongoose;
// export const connectMongoDB = async () => {
//   try {
//     if (!connection) {
//       // await mongoose.connect(process.env.MONGODB_URI!);
//       connection = await mongoose.connect(process.env.MONGODB_CONNECT_URI!);
//     }
//     return connection;
//   } catch (e) {
//     console.error("Error connecting to the database:", e);
//     throw new Error("Failed to connect to the database");
//   }
// };
const mongoose_1 = __importDefault(require("mongoose"));
let connection;
const connectToDatabase = async () => {
    if (connection) {
        return connection;
    }
    try {
        connection = await mongoose_1.default.connect(process.env.MONGODB_CONNECT_URI);
        console.log("Connected to the database");
        return connection;
    }
    catch (error) {
        console.error("Error connecting to the database:", error);
        throw new Error("Failed to connect to the database");
    }
};
exports.default = connectToDatabase;
