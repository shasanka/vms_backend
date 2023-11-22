import { Request, Response } from "express";
import EntryModel from "../models/entry";
import mongoose, { Error } from "mongoose";

const getEntry = async (req: Request, res: Response) => {
  try {
    const entries = await EntryModel.find({});
    if (entries) {
      return res.status(200).json({ data: entries });
    } else {
      return res.status(200).json({ message: [] });
    }
  } catch (e) {
    console.log("Error in get entry :", e);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

const getSingleEntry = async (req: Request, res: Response) => {
  console.log(
    "🚀 ~ file: entryController.ts:9 ~ getSingleEntry ~ req.params:",
    req.params
  );
  const entryId = req.params.entryId;

  if (!entryId) return res.status(400).json({ message: "Invalid query" });
  try {
    const entry = await EntryModel.findById( entryId );
    if (entry) {
      return res.status(200).json({ message: "Entries found", data: entry });
    } else {
      return res.status(200).json({ message: "Resource not found", data: null });
    }
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ message: "Server error in get single entry" });
  }
};

const addEntry = async (req: Request, res: Response) => {
  const { visitorId, whomToMeet, department } = req.body;
  if (!visitorId)
    return res.status(400).json({ message: "Bad request in entry" });
  try {
    const entry = await EntryModel.create({
      visitorId: visitorId,
      whomToMeet,
      department
    });

    if (entry) {
      return res.status(201).json({ message: "Entry created", data: entry });
    } else
      return res
        .status(401)
        .json({ message: "Unable to create entry", data: [] });
  } catch (e) {
    // console.log(e.message);
    if (e instanceof mongoose.Error) {
      res.statusMessage = e.message
      return res.status(500).end();
    }
  }
};

const entryController = {
  getEntry,
  addEntry,
  getSingleEntry,
};

export default entryController;
