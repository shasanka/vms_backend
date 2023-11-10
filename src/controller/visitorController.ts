import { Request, Response } from "express";
import VisitorModel, { Visitor } from "../models/visitor";
import mongoose from "mongoose";

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
      const visitorId = req.params.id;
  
      // Check if the id parameter is missing or not a valid ObjectId
      if (!visitorId || !mongoose.Types.ObjectId.isValid(visitorId)) {
        return res.status(400).json({ message: 'Invalid or missing visitor ID' });
      }
  
      const updatedVisitorData = req.body;


  
      // Check if the request body is empty or an empty object
      if (!updatedVisitorData || Object.keys(updatedVisitorData).length === 0) {
        return res.status(400).json({ message: 'Invalid data' });
      }
  
      const existingVisitor= await VisitorModel.findById(visitorId) as any
  
      if (!existingVisitor) {
        return res.status(404).json({ message: 'Visitor not found' });
      }
  
      // Update visitor fields
      Object.keys(updatedVisitorData).forEach((key) => {
        existingVisitor[key] = updatedVisitorData[key];
      });
  
      const updatedVisitor = await existingVisitor.save();
  
      return res.status(200).json({ message: 'Visitor updated', data: updatedVisitor });
    } catch (error) {
      console.error('Error updating visitor:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

//DELETE
const deleteVisitor = (req: Request, res: Response) => {};

const visitorController = {
  addVisitor,
  getVisitor,
  updateVisitor,
  deleteVisitor,
};
export default visitorController;
