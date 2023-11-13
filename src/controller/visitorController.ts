import { Request, Response } from "express";
import VisitorModel, { Visitor } from "../models/visitor";
import mongoose from "mongoose";
import { saveStates, transformedData } from "./stateDataEntry";

// POST
const addVisitor = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Invalid data" });
    }

    console.log(
      "🚀 ~ file: visitorController.ts:7 ~ addVisitor ~ req.body:",
      req.body
    );

    const visitorData = req.body;

    const visitor = await VisitorModel.create(visitorData);

    console.log(
      "🚀 ~ file: visitorController.ts:10 ~ addVisitor ~ visitor:",
      visitor
    );

    if (visitor) {
      return res.status(201).json({ message: "Visitor created" });
    } else {
      return res.status(500).json({ message: "Unable to create visitor" });
    }
  } catch (error) {
    console.error("Error adding visitor:", error);

    return res.status(500).json({ message: "Server error" });
  }
};

//GET
const getVisitor = async (req: Request, res: Response) => {

  try {
    const visitors = await VisitorModel.find({});

    if (visitors.length > 0) {
      return res.status(200).json({ message: "All visitors", data: visitors });
    } else {
      return res.status(404).json({ message: "No visitors found" });
    }
  } catch (error) {
    console.error("Error getting visitors:", error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//PUT
const updateVisitor = async (req: Request, res: Response) => {
  try {
    const visitorId = req.query.id as string;

    // Check if the id parameter is missing or not a valid ObjectId
    if (!visitorId || !mongoose.Types.ObjectId.isValid(visitorId)) {
      return res.status(400).json({ message: "Invalid or missing visitor ID" });
    }

    const updatedVisitorData: Partial<Visitor> = req.body; // Use Partial to allow partial updates

    // Check if the request body is empty or an empty object
    if (!updatedVisitorData || Object.keys(updatedVisitorData).length === 0) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const options = { new: true }; // Return the modified document instead of the original

    const updatedVisitor = await VisitorModel.findOneAndUpdate(
      { _id: visitorId },
      updatedVisitorData,
      options
    );

    if (!updatedVisitor) {
      return res.status(404).json({ message: "Visitor not found" });
    }

    return res
      .status(200)
      .json({ message: "Visitor updated", data: updatedVisitor });
  } catch (error) {
    console.error("Error updating visitor:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
//DELETE
const deleteVisitor = async (req: Request, res: Response) => {
  try {
    const visitorId = req.query.id as string;

    // Check if the id parameter is missing or not a valid ObjectId
    if (!visitorId || !mongoose.Types.ObjectId.isValid(visitorId)) {
      return res.status(400).json({ message: "Invalid or missing visitor ID" });
    }

    const deletedVisitor = await VisitorModel.findByIdAndDelete(visitorId);

    if (!deletedVisitor) {
      return res.status(404).json({ message: "Visitor not found" });
    }

    return res
      .status(200)
      .json({ message: "Visitor deleted", data: deletedVisitor });
  } catch (error) {
    console.error("Error deleting visitor:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const visitorController = {
  addVisitor,
  getVisitor,
  updateVisitor,
  deleteVisitor,
};
export default visitorController;
