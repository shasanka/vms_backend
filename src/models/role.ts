// const mongoose = require("mongoose");

import mongoose, { ObjectId, model } from "mongoose";

export interface Role {
  // _id: ObjectId;
  name: string;
}

const roleSchema = new mongoose.Schema({
  name: String,
});
const RoleModel = mongoose.model("Role", roleSchema);
export default RoleModel;
