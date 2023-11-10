// import mongoose from "mongoose";

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

import mongoose from "mongoose";
let connection: typeof mongoose;

const connectToDatabase = async () => {
  if (connection) {
    return connection;
  }

  try {
    connection = await mongoose.connect(process.env.MONGODB_CONNECT_URI!);
    console.log("Connected to the database");
    return connection;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw new Error("Failed to connect to the database");
  }
};

export default connectToDatabase;
