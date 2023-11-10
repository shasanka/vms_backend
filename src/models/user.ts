import mongoose from "mongoose";
import { Role } from "./role";
export interface User {
  username: string;
  email: string;
  password: string;
  roles: mongoose.Schema.Types.ObjectId[] | Role[]; // Assuming roles can be either ObjectId or populated RoleDocument
}

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
});

// Create the User model using the schema
const UserModel = mongoose.model("User", userSchema);

export default UserModel;
