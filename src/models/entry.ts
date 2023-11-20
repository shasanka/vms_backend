import mongoose, { model } from "mongoose";
import { EEntryStatus } from "../enum/ECommon";

export interface IEntry extends mongoose.Document {
  visitorId: mongoose.Schema.Types.ObjectId;
  checkinTimestamp: Date;
  checkoutTimestamp: Date;
  status: EEntryStatus;
  whomToMeet:string;
  department:string;
  createdAt: Date;
  updatedAt: Date;
}
const entrySchema = new mongoose.Schema<IEntry>(
  {
    visitorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Visitor",
    },
    checkinTimestamp: {
      type: Date,
    },
    checkoutTimestamp: {
      type: Date,
    },
    status: {
      type: Number, // Registered, CheckedIn, CheckedOut
      enum: EEntryStatus,
      default: 1,
    },
    whomToMeet:{
      type:String,
      required:true
    },
    department:{
      type:String,
      required:true
    }
  },
  {
        timestamps: { createdAt: true, updatedAt: false },
  }
);

const EntryModel = model<IEntry>("Entry", entrySchema);
export default EntryModel;
