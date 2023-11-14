import { Request, Response } from "express";
import EntryModel from "../models/entry";

const getEntry = (req: Request, res: Response) => {};

const getSingleEntry = async (req: Request, res: Response) => {
  console.log(
    "🚀 ~ file: entryController.ts:9 ~ getSingleEntry ~ req.params:",
    req.params
  );
  const visitorId = req.params.visitorId;

  if (!visitorId) return res.status(400).json({ message: "Invalid query" });
  try {
    const entries = await EntryModel.find({ visitorId });
    if (entries.length > 0) {
      return res.status(200).json({ message: "Entries found", data: entries });
    } else {
      return res.status(200).json({ message: "Resource not found",data:[] });
    }
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ message: "Server error in get single entry" });
  }
};

const addEntry = async (req: Request, res: Response) => {
  const visitorId = req.body.visitorId;
  if (!visitorId)
    return res.status(400).json({ message: "Bad request in entry" });
  try {
    const entry = await EntryModel.create({
      visitorId: visitorId,
    });

    if (entry) {
      return res.status(201).json({ message: "Entry created", data: entry });
    } else
      return res
        .status(401)
        .json({ message: "Unable to create entry", data: [] });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Server error" });
  }
};

const entryController = {
  getEntry,
  addEntry,
  getSingleEntry,
};

export default entryController;
