import { Request, Response } from "express";
import { StateModel } from "../models/state";
import { saveStates } from "./stateDataEntry";

const getStates = async (req: Request, res: Response) => {
  try {
    const states = await StateModel.find({});
    if (states) {
      const statesWithId = states.map((state) => ({
        name: state.name,
        id: state._id,
      }));
      return res.status(200).json({ data: statesWithId });
    } else {
      return res.status(401).json({ message: "No states data" });
    }
  } catch (E) {
    console.log(E);
  }
};

const getDistricts = async (req: Request, res: Response) => {
  const stateId = req.params.stateId;
  if (!stateId) return res.status(401).json({ message: "Invalid state id" });
  try {
    const stateData = await StateModel.findById(stateId).populate("districts");
    if (!stateData) return res.status(401).json({ message: "State not found" });
    return res.status(200).json({ data: stateData });
  } catch (e) {
    return res.status(500).json({ message: e });
  }
};

const addStatesData = async (req: Request, res: Response) => {
  try {
    const stateCount = await StateModel.estimatedDocumentCount();
    if (stateCount === 0) {
      await saveStates();
      return res.status(200).json({ message: "All states added successfully" });
    }else{
        return res.status(200).json({ message: "States are already updated" });
    }
  } catch (e) {
    return res.status(500).json({ message: "Error in state addition" });
  }
};

const stateController = {
  getStates,
  getDistricts,
  addStatesData,
};

export default stateController;
