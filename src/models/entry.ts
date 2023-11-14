import mongoose, { model } from "mongoose";
import { EEntryStatus } from "../enum/ECommon";

export interface IEntry extends mongoose.Document {
  visitorId: mongoose.Schema.Types.ObjectId;
  registrationTimestamp: Date;
  checkinTimestamp: Date;
  checkoutTimestamp: Date;
  status: EEntryStatus;
  createdAt: Date;
  updatedAt: Date;
}
const entrySchema = new mongoose.Schema<IEntry>(
  {
    visitorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Visitor",
    },
    registrationTimestamp: {
      type: Date,
      default: Date.now(),
      immutable: true,
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
  },
  {
    timestamps: true,
  }
);

const EntryModel = model<IEntry>("Entry", entrySchema);
export default EntryModel;
