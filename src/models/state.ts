import { Schema, model, Document } from 'mongoose';

// export interface Pincode  {
//   code: number;
// }

export interface District  {
  name: string;
  geoCode: number[];
  pinCodes: number[];
}

export interface State  {
  name: string;
  districts: District[];
}


const districtSchema = new Schema<District>({
  name: { type: String, },
  geoCode: { type: [Number], required: true },
  pinCodes:[Number],
});

const stateSchema = new Schema<State>({
    name: { type: String, unique: true },
    districts: [{ type: Schema.Types.ObjectId, ref: 'District' }], // Reference the 'District' model
  });

export const StateModel = model<State>('State', stateSchema);
export const DistrictModel = model<District>('District', districtSchema);