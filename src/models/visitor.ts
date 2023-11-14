import mongoose, { Document, model } from "mongoose";
import { IDProofType } from "../enum/ECommon";

export interface Visitor extends Document {
  firstName: string;
  lastName: string;
  phoneNumber: number;
  email?: string;
  address: string;
  state: string;
  district: string;
  pincode: number;
  idProofType: IDProofType;
  idProofNumber: string;
}
const visitorSchema = new mongoose.Schema<Visitor>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique:true
    },
    email: {
      type: String,
      unique:true
    },
    address: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    idProofType: {
      type: Number,
      enum: IDProofType,
      default: IDProofType.DRIVING_LICENSE,
    },
    idProofNumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const VisitorModel = model<Visitor>("Visitor", visitorSchema);

export default VisitorModel;
