import { Request, Response } from "express";
import EntryModel from "../models/entry";

const getEntry = (req: Request, res: Response) => {};

const addEntry = async(req: Request, res: Response) => {
  const visitorId = req.query.visitorId;
  if (!visitorId)
    return res.status(400).json({ message: "Bad request in entry" });
  try {
    const entry = await EntryModel.create({
        visitorId : visitorId,
    });

    if(entry){
        return res.status(201).json({message:'Entry created',data:entry})
    }else return res.status(401).json({message:'Unable to create entry', data:[]})
  } catch (e) {
    console.log(e);
    return res.status(500).json({message:"Server error"})
  }
};

const entryController = {
  getEntry,
  addEntry,
};

export default entryController;
